"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Smartphone } from "lucide-react"
import Link from "next/link"

export interface OrderData {
  orderId: string
  ticketType: string
  firstName: string
  lastName: string
  email: string
  organization: string
  totalAmount: number
  ticketNumber?: string
  addOns?: string[]
}

interface PaymentSuccessProps {
  orderData: OrderData
}

export function PaymentSuccess({ orderData }: PaymentSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto">
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
                <span className="font-bold">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Ticket Type:</span>
                <span className="capitalize">{orderData.ticketType}</span>
              </div>
              {orderData.addOns && orderData.addOns.length > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span>{orderData.addOns.join(", ")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">€{orderData.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-bold">Completed</span>
              </div>
            </div>
          </div>

          {/* Attendee Information */}
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Attendee Information</h3>
            <div className="space-y-2 font-roboto-condensed">
              <div className="flex justify-between">
                <span>Name:</span>
                <span>{orderData.firstName} {orderData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span>{orderData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Organization:</span>
                <span>{orderData.organization}</span>
              </div>
            </div>
          </div>

          {/* Ticket Number */}
          {orderData.ticketNumber && (
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Your Ticket</h3>
              <div className="flex justify-between items-center p-3 bg-[#85AFFB] text-white rounded">
                <span className="font-orbitron font-bold">{orderData.ticketNumber}</span>
                <span className="text-sm">Active</span>
              </div>
            </div>
          )}

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
  )
}
