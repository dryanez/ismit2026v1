"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Smartphone } from "lucide-react"
import Link from "next/link"

// Mock data for preview
const mockOrder = {
  id: "ISMIT-2026-A7B3C9D2",
  ticket_type: "Early Bird iSMIT Member",
  quantity: 1,
  attendee_info: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    organization: "Medical University of Vienna"
  },
  status: "completed",
  total_amount: 400,
  tickets: [
    {
      ticket_number: "ISMIT-2026-A7B3C9D2",
      status: "active"
    }
  ],
  addOns: ["Gala Dinner", "XR Workshop"]
}

export default function SuccessPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1858] to-[#1a2980] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-yellow-300 text-sm font-bold mb-2">⚠️ PREVIEW MODE - This is how the success page looks</p>
        </div>
        
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="font-orbitron font-bold text-[#0D1858] text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="font-roboto-condensed text-lg">
              Your registration for iSMIT 2026 has been confirmed
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Order Details</h3>
              <div className="space-y-2 font-roboto-condensed">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-bold">{mockOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Type:</span>
                  <span className="capitalize">{mockOrder.ticket_type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{mockOrder.quantity}</span>
                </div>
                {mockOrder.addOns && mockOrder.addOns.length > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons:</span>
                    <span>{mockOrder.addOns.join(", ")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">€{mockOrder.total_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-600 font-bold capitalize">{mockOrder.status}</span>
                </div>
              </div>
            </div>

            {/* Attendee Information */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Attendee Information</h3>
              <div className="space-y-2 font-roboto-condensed">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>
                    {mockOrder.attendee_info.firstName} {mockOrder.attendee_info.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{mockOrder.attendee_info.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization:</span>
                  <span>{mockOrder.attendee_info.organization}</span>
                </div>
              </div>
            </div>

            {/* Ticket Numbers */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Your Tickets</h3>
              <div className="space-y-2">
                {mockOrder.tickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-[#85AFFB] text-white rounded">
                    <span className="font-orbitron font-bold">{ticket.ticket_number}</span>
                    <span className="text-sm capitalize">{ticket.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#85AFFB] text-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold mb-4">What&apos;s Next?</h3>
              <ul className="space-y-2 font-roboto-condensed">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Check your email for your ticket with QR code
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Add your ticket to Google Wallet for easy access
                </li>
                <li>• Congress materials will be sent closer to the event</li>
                <li>• Check your email for important updates</li>
              </ul>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button variant="link" className="font-orbitron font-bold text-[#0D1858]">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
