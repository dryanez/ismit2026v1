"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Loader2, Smartphone } from "lucide-react"
import Link from "next/link"

interface PaymentSuccessProps {
  orderId: string
}

interface Order {
  id: string
  ticket_type: string
  quantity: number
  attendee_info: any
  status: string
  total_amount: number
  tickets: Array<{
    ticket_number: string
    status: string
  }>
}

export function PaymentSuccess({ orderId }: PaymentSuccessProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) throw new Error("Failed to fetch order details")

      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      setError("Failed to load order details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#0D1858]" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-roboto-condensed">{error || "Order not found"}</p>
      </div>
    )
  }

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
                <span className="font-bold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Ticket Type:</span>
                <span className="capitalize">{order.ticket_type.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{order.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">€{order.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-bold capitalize">{order.status}</span>
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
                  {order.attendee_info.firstName} {order.attendee_info.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span>{order.attendee_info.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Organization:</span>
                <span>{order.attendee_info.organization}</span>
              </div>
            </div>
          </div>

          {/* Ticket Numbers */}
          {order.tickets && order.tickets.length > 0 && (
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-orbitron font-bold text-[#0D1858] mb-4">Your Tickets</h3>
              <div className="space-y-2">
                {order.tickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-[#85AFFB] text-white rounded">
                    <span className="font-orbitron font-bold">{ticket.ticket_number}</span>
                    <span className="text-sm capitalize">{ticket.status}</span>
                  </div>
                ))}
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
