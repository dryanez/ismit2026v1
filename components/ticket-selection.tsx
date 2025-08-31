"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  currency: string
  available: boolean
  deadline: string
}

interface TicketSelectionProps {
  onSelectTicket: (ticketType: TicketType) => void
}

export function TicketSelection({ onSelectTicket }: TicketSelectionProps) {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTicketTypes()
  }, [])

  const fetchTicketTypes = async () => {
    try {
      const response = await fetch("/api/tickets/types")
      if (!response.ok) throw new Error("Failed to fetch ticket types")

      const data = await response.json()
      setTicketTypes(data.ticketTypes)
    } catch (err) {
      setError("Failed to load ticket types")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isDeadlinePassed = (deadline: string) => {
    return new Date() > new Date(deadline)
  }

  const getCardColor = (ticketId: string) => {
    switch (ticketId) {
      case "early-bird":
        return "bg-[#85AFFB]"
      case "regular":
        return "bg-[#FE6448]"
      case "student":
        return "bg-[#0D1858]"
      case "group":
        return "bg-[#85AFFB]"
      default:
        return "bg-[#0D1858]"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#0D1858]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-roboto-condensed">{error}</p>
        <Button onClick={fetchTicketTypes} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ticketTypes.map((ticket) => {
        const deadlinePassed = isDeadlinePassed(ticket.deadline)
        const isAvailable = ticket.available && !deadlinePassed

        return (
          <Card key={ticket.id} className={`${getCardColor(ticket.id)} text-white relative overflow-hidden`}>
            {ticket.id === "early-bird" && (
              <Badge className="absolute top-4 right-4 bg-white text-[#85AFFB] font-orbitron font-bold">
                SAVE €100
              </Badge>
            )}

            <CardHeader className="text-center">
              <CardTitle className="font-orbitron font-bold uppercase text-xl">{ticket.name}</CardTitle>
              <CardDescription className="text-white/90 font-roboto-condensed">{ticket.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="text-4xl font-orbitron font-black mb-2">€{ticket.price}</div>
              <p className="text-sm font-roboto-condensed mb-4">
                {deadlinePassed ? "Deadline passed" : `Until ${new Date(ticket.deadline).toLocaleDateString()}`}
              </p>

              <ul className="text-sm font-roboto-condensed space-y-2 text-left">
                <li>• Full congress access</li>
                <li>• Welcome reception</li>
                <li>• Coffee breaks</li>
                <li>• Congress materials</li>
                {ticket.id === "student" && <li>• Student ID required</li>}
                {ticket.id === "group" && <li>• Minimum 5 people</li>}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => onSelectTicket(ticket)}
                disabled={!isAvailable}
                className="w-full bg-white text-[#0D1858] hover:bg-gray-100 font-orbitron font-bold uppercase"
              >
                {!isAvailable ? "Not Available" : "Select Ticket"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
