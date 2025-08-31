"use client"

import { useState } from "react"
import { Roboto_Condensed, Orbitron } from "next/font/google"
import { TicketSelection } from "@/components/ticket-selection"
import { CheckoutForm } from "@/components/checkout-form"
import { PaymentSuccess } from "@/components/payment-success"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  currency: string
  available: boolean
  deadline: string
}

type RegistrationStep = "selection" | "checkout" | "success"

export default function Registration() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("selection")
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleTicketSelection = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    setCurrentStep("checkout")
  }

  const handleBackToSelection = () => {
    setCurrentStep("selection")
    setSelectedTicket(null)
  }

  const handleCheckoutSuccess = (newOrderId: string) => {
    setOrderId(newOrderId)
    setCurrentStep("success")
  }

  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2eniT8eW-yIJxNvDrn9TosGzHhFJMfYWVtWYOTq.jpeg"
            alt="Medical professionals in geometric low-poly style"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FE6448] bg-opacity-70"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#0D1858] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <a href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </a>
              <a href="/registration" className="text-[#FE6448] text-sm font-orbitron font-black uppercase">
                Registration
              </a>
              <a href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                About
              </a>
              <a href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Program
              </a>
              <a href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </a>
              <a href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Submissions
              </a>
              <a href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Pavilions
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            Registration
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            {currentStep === "selection" && "Choose Your Registration Type"}
            {currentStep === "checkout" && "Complete Your Registration"}
            {currentStep === "success" && "Registration Confirmed"}
          </p>
        </div>
      </section>

      {/* Registration Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {currentStep === "selection" && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
                  Join the Future of Medical Technology
                </h2>
                <p className="text-lg font-roboto-condensed text-[#0D1858]">
                  Register now for iSMIT 2026 and be part of the most innovative medical technology congress of the
                  year.
                </p>
              </div>
              <TicketSelection onSelectTicket={handleTicketSelection} />
            </>
          )}

          {currentStep === "checkout" && selectedTicket && (
            <CheckoutForm
              selectedTicket={selectedTicket}
              onBack={handleBackToSelection}
              onSuccess={handleCheckoutSuccess}
            />
          )}

          {currentStep === "success" && orderId && <PaymentSuccess orderId={orderId} />}

          {/* Important Information - only show on selection step */}
          {currentStep === "selection" && (
            <div className="bg-[#85AFFB] rounded-lg p-8 text-white mt-12">
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4 text-center">Important Information</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm font-roboto-condensed">
                <div>
                  <h4 className="font-bold uppercase mb-2">Registration Includes:</h4>
                  <ul className="space-y-1">
                    <li>• Access to all scientific sessions</li>
                    <li>• Welcome reception on November 19</li>
                    <li>• Coffee breaks and networking sessions</li>
                    <li>• Digital congress materials</li>
                    <li>• Certificate of attendance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-2">Cancellation Policy:</h4>
                  <ul className="space-y-1">
                    <li>• Until September 30: Full refund</li>
                    <li>• Until October 31: 50% refund</li>
                    <li>• After October 31: No refund</li>
                    <li>• Processing fee: €25</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
