"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User, Mail, Phone, Building } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    startupName: "",
    presenterName: "",
    phone: "",
    congressThemes: [] as string[],
    agreeToTerms: false,
  })

  const themes = ["AI (Artificial Intelligence)", "Robotics", "Surgery", "Med-tech", "Digital Health"]

  const handleThemeChange = (theme: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      congressThemes: checked ? [...prev.congressThemes, theme] : prev.congressThemes.filter((t) => t !== theme),
    }))
  }

  const generateRegistrationNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `ISMIT2026-${timestamp}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    if (formData.congressThemes.length === 0) {
      setError("Please select at least one congress theme")
      setIsLoading(false)
      return
    }

    try {
      const registrationNumber = generateRegistrationNumber()

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          registrationNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setSuccess(`Registration successful! Your registration number is: ${registrationNumber}`)

      // Redirect to submission page after 3 seconds
      setTimeout(() => {
        router.push(`/submit?reg=${registrationNumber}`)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register for ISMIT 2026</CardTitle>
            <p className="text-muted-foreground text-center">Complete your registration to submit your startup pitch</p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-primary">
                <AlertDescription className="text-primary">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="startupName" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Startup Name
                  </Label>
                  <Input
                    id="startupName"
                    value={formData.startupName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startupName: e.target.value }))}
                    required
                    placeholder="Your Startup Name"
                  />
                </div>

                <div>
                  <Label htmlFor="presenterName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Presenter Name
                  </Label>
                  <Input
                    id="presenterName"
                    value={formData.presenterName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, presenterName: e.target.value }))}
                    required
                    placeholder="Full name of the presenter"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Congress Themes (Select all that apply)</Label>
                  <div className="mt-3 space-y-3">
                    {themes.map((theme) => (
                      <div key={theme} className="flex items-center space-x-2">
                        <Checkbox
                          id={theme}
                          checked={formData.congressThemes.includes(theme)}
                          onCheckedChange={(checked) => handleThemeChange(theme, checked as boolean)}
                        />
                        <Label htmlFor={theme} className="text-sm font-normal">
                          {theme}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and confirm that I will pay the participation fee
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already registered?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
