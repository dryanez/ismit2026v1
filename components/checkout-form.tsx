"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Orbitron, Roboto_Condensed } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SumUpCardPayment } from "@/components/sumup-card-payment"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
})

// Add-on definitions
const ADD_ONS = {
  galaDinner: {
    id: 'gala-dinner',
    name: 'Gala Dinner',
    description: '20th November 2026',
    price: 95,
    tag: 'Gala Dinner',
  },
  xrWorkshop: {
    id: 'xr-workshop',
    name: 'XR Workshop',
    description: 'Limited to 48 participants',
    price: 100,
    tag: 'XR Workshop',
  },
  aiWorkshop: {
    id: 'ai-workshop',
    name: 'AI Workshop',
    description: 'Limited to 48 participants',
    price: 100,
    tag: 'AI Workshop',
  },
} as const

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  currency: string
  available: boolean
  deadline: string
}

interface CheckoutFormProps {
  selectedTicket: TicketType
  onBack: () => void
  onSuccess: (orderId: string) => void
}

type CheckoutStep = "details" | "payment"

export function CheckoutForm({ selectedTicket, onBack, onSuccess }: CheckoutFormProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [country, setCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  
  // Add-ons state
  const [hasGalaDinner, setHasGalaDinner] = useState(false)
  const [hasXrWorkshop, setHasXrWorkshop] = useState(false)
  const [hasAiWorkshop, setHasAiWorkshop] = useState(false)
  
  // Payment state
  const [step, setStep] = useState<CheckoutStep>("details")
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  // Calculate total price with add-ons
  const totalPrice = useMemo(() => {
    let total = selectedTicket.price
    if (hasGalaDinner) total += ADD_ONS.galaDinner.price
    if (hasXrWorkshop) total += ADD_ONS.xrWorkshop.price
    if (hasAiWorkshop) total += ADD_ONS.aiWorkshop.price
    return total
  }, [selectedTicket.price, hasGalaDinner, hasXrWorkshop, hasAiWorkshop])

  // Generate tags for Odoo based on ticket and add-ons
  const generateTags = useCallback(() => {
    const tags: string[] = [selectedTicket.name]
    if (hasGalaDinner) tags.push(ADD_ONS.galaDinner.tag)
    if (hasXrWorkshop) tags.push(ADD_ONS.xrWorkshop.tag)
    if (hasAiWorkshop) tags.push(ADD_ONS.aiWorkshop.tag)
    return tags
  }, [selectedTicket.name, hasGalaDinner, hasXrWorkshop, hasAiWorkshop])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          setEmail(user.email || "")
        }
      } catch (e) {
        // Supabase not configured, continue without user
        console.log("Supabase auth not available")
      }
    }
    getUser()
  }, [supabase])

  // Save registration to Odoo CRM
  const saveToOdoo = async (paymentStatus: 'pending' | 'completed' | 'failed', orderIdOverride?: string) => {
    const effectiveOrderId = orderIdOverride || orderId
    const tags = generateTags()
    
    // Build add-ons description
    const addOns: string[] = []
    if (hasGalaDinner) addOns.push(`Gala Dinner (€${ADD_ONS.galaDinner.price})`)
    if (hasXrWorkshop) addOns.push(`XR Workshop (€${ADD_ONS.xrWorkshop.price})`)
    if (hasAiWorkshop) addOns.push(`AI Workshop (€${ADD_ONS.aiWorkshop.price})`)
    
    console.group("🔵 [Odoo Integration] Saving to CRM")
    console.log("📋 Payment Status:", paymentStatus)
    console.log("👤 Customer Info:", { firstName, lastName, email, affiliation, country })
    console.log("🎫 Ticket Info:", { 
      name: selectedTicket.name, 
      basePrice: selectedTicket.price,
      totalPrice: totalPrice,
      currency: selectedTicket.currency 
    })
    console.log("🎁 Add-ons:", addOns.length > 0 ? addOns : "None")
    console.log("🏷️ Tags:", tags)
    console.log("🆔 Order ID:", effectiveOrderId)
    
    try {
      const requestBody = {
        firstName,
        lastName,
        email,
        affiliation,
        country,
        ticketType: selectedTicket.name,
        ticketPrice: totalPrice, // Use total price including add-ons
        basePrice: selectedTicket.price,
        currency: selectedTicket.currency,
        orderId: effectiveOrderId,
        paymentStatus,
        tags, // Tags for Odoo category_id
        addOns, // Add-ons description
      }
      
      console.log("📤 Request Body:", JSON.stringify(requestBody, null, 2))
      
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log("✅ Odoo Save SUCCESS:", data)
        if (data.partnerId) {
          console.log("🎉 New Contact Created in Odoo! Partner ID:", data.partnerId)
        }
      } else {
        console.error("❌ Odoo Save FAILED:", data)
      }
      
      console.groupEnd()
      return data
    } catch (err) {
      console.error("❌ Error saving to Odoo:", err)
      console.groupEnd()
      // Don't fail the checkout if Odoo save fails
      return null
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const tags = generateTags()
    const addOnsList = []
    if (hasGalaDinner) addOnsList.push('Gala Dinner')
    if (hasXrWorkshop) addOnsList.push('XR Workshop')
    if (hasAiWorkshop) addOnsList.push('AI Workshop')

    console.group("🚀 [CheckoutForm] Starting Checkout Process")
    console.log("📝 Form Data:", { firstName, lastName, email, affiliation, country })
    console.log("🎫 Selected Ticket:", selectedTicket)
    console.log("🎁 Add-ons:", addOnsList.length > 0 ? addOnsList : "None")
    console.log("💰 Total Price:", totalPrice)
    console.log("🏷️ Tags:", tags)

    try {
      // Generate a simple order ID for now
      const generatedOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      setOrderId(generatedOrderId)
      console.log("🆔 Generated Order ID:", generatedOrderId)

      // Build description including add-ons
      let description = `iSMIT 2026 - ${selectedTicket.name}`
      if (addOnsList.length > 0) {
        description += ` + ${addOnsList.join(', ')}`
      }
      description += ` - ${firstName} ${lastName}`

      // Create a checkout for the card widget
      console.log("💳 Creating SumUp checkout...")
      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice, // Use total price including add-ons
          currency: selectedTicket.currency,
          description,
          reference: generatedOrderId,
        }),
      })

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json()
        console.error("❌ Checkout creation failed:", errorData)
        throw new Error(errorData.error || "Failed to create payment session.")
      }

      const checkoutData = await checkoutResponse.json()
      console.log("✅ Checkout created:", checkoutData)
      setCheckoutId(checkoutData.checkoutId)
      
      // Save to Odoo with pending status before payment
      // We do this here so we have the contact even if payment fails
      // Pass generatedOrderId directly since setOrderId is async
      console.log("📤 Saving to Odoo CRM (pending status)...")
      await saveToOdoo('pending', generatedOrderId)
      
      console.log("➡️ Moving to payment step")
      console.groupEnd()
      setStep("payment")
      
    } catch (err: any) {
      console.error("❌ [CheckoutForm] Error:", err)
      console.groupEnd()
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = useCallback(async (result: any) => {
    console.group("🎉 [CheckoutForm] Payment Success!")
    console.log("💰 Payment result:", result)
    
    // Update Odoo with completed status
    try {
      console.log("📤 Updating Odoo with completed status...")
      const response = await fetch("/api/register", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          orderId,
          paymentStatus: 'completed',
        }),
      })
      const data = await response.json()
      console.log("✅ Odoo status update result:", data)
    } catch (err) {
      console.error("❌ Error updating Odoo status:", err)
    }
    
    console.groupEnd()
    if (orderId) {
      onSuccess(orderId)
    }
  }, [orderId, email, onSuccess])

  const handlePaymentError = useCallback(async (error: any) => {
    console.group("❌ [CheckoutForm] Payment Failed")
    console.error("Payment error details:", error)
    
    // Update Odoo with failed status
    try {
      console.log("📤 Updating Odoo with failed status...")
      const response = await fetch("/api/register", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          orderId,
          paymentStatus: 'failed',
        }),
      })
      const data = await response.json()
      console.log("Odoo status update result:", data)
    } catch (err) {
      console.error("Error updating Odoo status:", err)
    }
    
    console.groupEnd()
    setError(error?.message || "Payment failed. Please try again.")
    // Go back to details step to retry
    setStep("details")
    setCheckoutId(null)
  }, [email, orderId])

  const handleBackToDetails = () => {
    setStep("details")
    setCheckoutId(null)
    setError(null)
  }

  return (
    <div
      className={`${orbitron.variable} ${robotoCondensed.variable} max-w-2xl mx-auto bg-gradient-to-br from-[#0D1858] to-[#162A8D] p-8 rounded-lg shadow-2xl text-white`}
    >
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-3xl font-bold uppercase">
          {step === "details" ? "Complete Your Registration" : "Payment"}
        </h2>
        <p className="font-roboto-condensed text-lg text-gray-300 mt-2">
          You are registering for: <span className="font-bold text-[#85AFFB]">{selectedTicket.name}</span>
        </p>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          <div className={`flex items-center ${step === "details" ? "text-[#85AFFB]" : "text-green-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === "details" ? "border-[#85AFFB] bg-[#85AFFB]/20" : "border-green-400 bg-green-400"}`}>
              {step === "payment" ? "✓" : "1"}
            </div>
            <span className="ml-2 text-sm">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-600"></div>
          <div className={`flex items-center ${step === "payment" ? "text-[#85AFFB]" : "text-gray-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === "payment" ? "border-[#85AFFB] bg-[#85AFFB]/20" : "border-gray-500"}`}>
              2
            </div>
            <span className="ml-2 text-sm">Payment</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="space-y-6 font-roboto-condensed">
          {/* User Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-300">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                className="bg-white/10 border-white/20 focus:ring-[#85AFFB] focus:border-[#85AFFB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                className="bg-white/10 border-white/20 focus:ring-[#85AFFB] focus:border-[#85AFFB]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={!!user}
              className="bg-white/10 border-white/20 focus:ring-[#85AFFB] focus:border-[#85AFFB] disabled:opacity-70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliation" className="text-gray-300">
              Affiliation / Institution
            </Label>
            <Input
              id="affiliation"
              type="text"
              placeholder="e.g., University of Innovation"
              value={affiliation}
              onChange={e => setAffiliation(e.target.value)}
              required
              className="bg-white/10 border-white/20 focus:ring-[#85AFFB] focus:border-[#85AFFB]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-gray-300">
              Country
            </Label>
            <Select onValueChange={setCountry} value={country} required>
              <SelectTrigger className="w-full bg-white/10 border-white/20 focus:ring-[#85AFFB] focus:border-[#85AFFB]">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-[#162A8D] text-white border-white/20 max-h-60">
                <SelectItem value="DEU">Germany</SelectItem>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="GBR">United Kingdom</SelectItem>
                <SelectItem value="FRA">France</SelectItem>
                <SelectItem value="ITA">Italy</SelectItem>
                <SelectItem value="ESP">Spain</SelectItem>
                <SelectItem value="NLD">Netherlands</SelectItem>
                <SelectItem value="BEL">Belgium</SelectItem>
                <SelectItem value="AUT">Austria</SelectItem>
                <SelectItem value="CHE">Switzerland</SelectItem>
                <SelectItem value="JPN">Japan</SelectItem>
                <SelectItem value="CHN">China</SelectItem>
                <SelectItem value="KOR">South Korea</SelectItem>
                <SelectItem value="AUS">Australia</SelectItem>
                <SelectItem value="CAN">Canada</SelectItem>
                <SelectItem value="BRA">Brazil</SelectItem>
                <SelectItem value="MEX">Mexico</SelectItem>
                <SelectItem value="IND">India</SelectItem>
                <SelectItem value="TUR">Turkey</SelectItem>
                <SelectItem value="POL">Poland</SelectItem>
                <SelectItem value="SWE">Sweden</SelectItem>
                <SelectItem value="NOR">Norway</SelectItem>
                <SelectItem value="DNK">Denmark</SelectItem>
                <SelectItem value="FIN">Finland</SelectItem>
                <SelectItem value="PRT">Portugal</SelectItem>
                <SelectItem value="GRC">Greece</SelectItem>
                <SelectItem value="CZE">Czech Republic</SelectItem>
                <SelectItem value="ROU">Romania</SelectItem>
                <SelectItem value="HUN">Hungary</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Optional Add-Ons */}
          <div className="space-y-4 pt-4">
            <h3 className="font-orbitron text-lg font-bold text-[#85AFFB]">Optional Add-Ons</h3>
            
            {/* Gala Dinner */}
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <Checkbox
                id="galaDinner"
                checked={hasGalaDinner}
                onCheckedChange={(checked) => setHasGalaDinner(checked === true)}
                className="border-white/30 data-[state=checked]:bg-[#85AFFB] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="galaDinner" className="text-white cursor-pointer font-medium">
                  {ADD_ONS.galaDinner.name} – €{ADD_ONS.galaDinner.price}
                </Label>
                <p className="text-sm text-gray-400">{ADD_ONS.galaDinner.description}</p>
              </div>
            </div>

            {/* XR Workshop */}
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <Checkbox
                id="xrWorkshop"
                checked={hasXrWorkshop}
                onCheckedChange={(checked) => setHasXrWorkshop(checked === true)}
                className="border-white/30 data-[state=checked]:bg-[#85AFFB] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="xrWorkshop" className="text-white cursor-pointer font-medium">
                  {ADD_ONS.xrWorkshop.name} – €{ADD_ONS.xrWorkshop.price}
                </Label>
                <p className="text-sm text-gray-400">{ADD_ONS.xrWorkshop.description}</p>
              </div>
            </div>

            {/* AI Workshop */}
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <Checkbox
                id="aiWorkshop"
                checked={hasAiWorkshop}
                onCheckedChange={(checked) => setHasAiWorkshop(checked === true)}
                className="border-white/30 data-[state=checked]:bg-[#85AFFB] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="aiWorkshop" className="text-white cursor-pointer font-medium">
                  {ADD_ONS.aiWorkshop.name} – €{ADD_ONS.aiWorkshop.price}
                </Label>
                <p className="text-sm text-gray-400">{ADD_ONS.aiWorkshop.description}</p>
              </div>
            </div>
          </div>

          {/* Total and Continue */}
          <div className="pt-6 text-center">
            <div className="mb-6">
              <p className="font-roboto-condensed text-xl">Total Amount</p>
              <p className="font-orbitron text-4xl font-bold text-[#85AFFB]">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: selectedTicket.currency,
                }).format(totalPrice)}
              </p>
              {totalPrice !== selectedTicket.price && (
                <p className="text-sm text-gray-400 mt-2">
                  Base ticket: €{selectedTicket.price}
                  {hasGalaDinner && ` + Gala Dinner: €${ADD_ONS.galaDinner.price}`}
                  {hasXrWorkshop && ` + XR Workshop: €${ADD_ONS.xrWorkshop.price}`}
                  {hasAiWorkshop && ` + AI Workshop: €${ADD_ONS.aiWorkshop.price}`}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="border-[#85AFFB] text-[#85AFFB] hover:bg-[#85AFFB] hover:text-[#0D1858] w-40 h-12 font-orbitron uppercase"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#FE6448] to-[#E53E3E] hover:from-[#E53E3E] hover:to-[#FE6448] w-40 h-12 font-orbitron uppercase text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {step === "payment" && checkoutId && (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <h3 className="font-orbitron text-lg mb-2">Order Summary</h3>
            <div className="font-roboto-condensed text-gray-300 space-y-1">
              <p><span className="text-gray-400">Name:</span> {firstName} {lastName}</p>
              <p><span className="text-gray-400">Email:</span> {email}</p>
              <p><span className="text-gray-400">Ticket:</span> {selectedTicket.name}</p>
              <p className="text-xl font-bold text-[#85AFFB] mt-2">
                Total: {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: selectedTicket.currency,
                }).format(selectedTicket.price)}
              </p>
            </div>
          </div>

          {/* Payment Widget */}
          <div>
            <h3 className="font-orbitron text-lg mb-4 text-center">Enter Card Details</h3>
            <SumUpCardPayment
              checkoutId={checkoutId}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>

          {/* Back button */}
          <div className="text-center pt-4">
            <Button
              type="button"
              onClick={handleBackToDetails}
              variant="outline"
              className="border-[#85AFFB] text-[#85AFFB] hover:bg-[#85AFFB] hover:text-[#0D1858] font-orbitron uppercase"
            >
              ← Back to Details
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
