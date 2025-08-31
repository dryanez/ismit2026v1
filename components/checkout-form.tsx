"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"

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

interface AttendeeInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  position: string
  country: string
  dietaryRequirements: string
  specialNeeds: string
}

export function CheckoutForm({ selectedTicket, onBack, onSuccess }: CheckoutFormProps) {
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    country: "",
    dietaryRequirements: "",
    specialNeeds: "",
  })

  const [quantity, setQuantity] = useState(1)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!attendeeInfo.firstName.trim()) newErrors.firstName = "First name is required"
    if (!attendeeInfo.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!attendeeInfo.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(attendeeInfo.email)) newErrors.email = "Email is invalid"
    if (!attendeeInfo.phone.trim()) newErrors.phone = "Phone number is required"
    if (!attendeeInfo.organization.trim()) newErrors.organization = "Organization is required"
    if (!attendeeInfo.country.trim()) newErrors.country = "Country is required"
    if (!agreeTerms) newErrors.terms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch("/api/tickets/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketType: selectedTicket.id,
          quantity,
          attendeeInfo,
          paymentMethod: "sumup",
        }),
      })

      if (!response.ok) throw new Error("Failed to create order")

      const data = await response.json()
      onSuccess(data.orderId)
    } catch (error) {
      console.error("Order creation failed:", error)
      setErrors({ submit: "Failed to create order. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = selectedTicket.price * quantity

  return (
    <div className="max-w-4xl mx-auto">
      <Button onClick={onBack} variant="outline" className="mb-6 font-orbitron font-bold bg-transparent">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Ticket Selection
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-[#85AFFB] text-white">
            <CardHeader>
              <CardTitle className="font-orbitron font-bold uppercase">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-orbitron font-bold">{selectedTicket.name}</h4>
                <p className="text-sm font-roboto-condensed opacity-90">{selectedTicket.description}</p>
              </div>

              <div className="flex justify-between">
                <span>Price per ticket:</span>
                <span>€{selectedTicket.price}</span>
              </div>

              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>

              <hr className="border-white/20" />

              <div className="flex justify-between text-xl font-orbitron font-bold">
                <span>Total:</span>
                <span>€{totalAmount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron font-bold text-[#0D1858]">Attendee Information</CardTitle>
              <CardDescription>Please provide your details for registration</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={attendeeInfo.firstName}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, firstName: e.target.value })}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={attendeeInfo.lastName}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, lastName: e.target.value })}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={attendeeInfo.email}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, email: e.target.value })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={attendeeInfo.phone}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, phone: e.target.value })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      value={attendeeInfo.organization}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, organization: e.target.value })}
                      className={errors.organization ? "border-red-500" : ""}
                    />
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                  </div>

                  <div>
                    <Label htmlFor="position">Position/Title</Label>
                    <Input
                      id="position"
                      value={attendeeInfo.position}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, position: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select onValueChange={(value) => setAttendeeInfo({ ...attendeeInfo, country: value })}>
                    <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="austria">Austria</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="italy">Italy</SelectItem>
                      <SelectItem value="spain">Spain</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="dietary">Dietary Requirements</Label>
                  <Textarea
                    id="dietary"
                    value={attendeeInfo.dietaryRequirements}
                    onChange={(e) => setAttendeeInfo({ ...attendeeInfo, dietaryRequirements: e.target.value })}
                    placeholder="Please specify any dietary requirements or allergies"
                  />
                </div>

                <div>
                  <Label htmlFor="special">Special Needs</Label>
                  <Textarea
                    id="special"
                    value={attendeeInfo.specialNeeds}
                    onChange={(e) => setAttendeeInfo({ ...attendeeInfo, specialNeeds: e.target.value })}
                    placeholder="Please specify any accessibility requirements or special needs"
                  />
                </div>

                {/* Quantity Selection */}
                {selectedTicket.id === "group" && (
                  <div>
                    <Label htmlFor="quantity">Number of Tickets (minimum 5)</Label>
                    <Select onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} tickets
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-[#FE6448] hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-[#FE6448] hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FE6448] hover:bg-[#FE6448]/90 text-white font-orbitron font-bold uppercase py-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Proceed to Payment - €${totalAmount}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
