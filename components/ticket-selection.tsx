"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

const ticketTypes: TicketType[] = [
  {
    id: "early-bird-congress",
    name: "Early Bird - Congress Fee",
    description: "Full congress access (until 28th February 2026)",
    price: 200,
    currency: "EUR",
    available: true,
    deadline: "2026-02-28T23:59:59Z",
  },
  {
    id: "early-bird-student",
    name: "Early Bird - Student/Resident",
    description: "Students & Residents (until 28th February 2026)",
    price: 50,
    currency: "EUR",
    available: true,
    deadline: "2026-02-28T23:59:59Z",
  },
  {
    id: "regular-congress",
    name: "Regular - Congress Fee",
    description: "Full congress access (from 1st May 2026)",
    price: 300,
    currency: "EUR",
    available: true,
    deadline: "2026-12-10T23:59:59Z",
  },
  {
    id: "regular-student",
    name: "Regular - Student/Resident",
    description: "Students & Residents (from 1st May 2026)",
    price: 80,
    currency: "EUR",
    available: true,
    deadline: "2026-12-10T23:59:59Z",
  },
];

export function TicketSelection({ onSelectTicket }: TicketSelectionProps) {
  const isDeadlinePassed = (deadline: string) => {
    return new Date() > new Date(deadline)
  }

  const getCardColor = (ticketId: string) => {
    switch (ticketId) {
      case "early-bird-congress":
        return "bg-[#85AFFB]"
      case "early-bird-student":
        return "bg-[#85AFFB]"
      case "regular-congress":
        return "bg-[#FE6448]"
      case "regular-student":
        return "bg-[#FE6448]"
      case "gala-dinner":
        return "bg-[#0D1858]"
      case "xr-workshop":
        return "bg-[#0D1858]"
      case "ai-workshop":
        return "bg-[#0D1858]"
      default:
        return "bg-[#0D1858]"
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ticketTypes.map((ticket) => {
        const deadlinePassed = isDeadlinePassed(ticket.deadline)
        const isAvailable = ticket.available && !deadlinePassed

        return (
          <Card key={ticket.id} className={`${getCardColor(ticket.id)} text-white relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105`}>
            <CardHeader className="text-center px-8">
              <CardTitle className="font-orbitron font-bold uppercase text-lg text-center break-words leading-tight">{ticket.name}</CardTitle>
              <CardDescription className="text-white/90 font-roboto-condensed text-center mt-2">{ticket.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="text-4xl font-orbitron font-black mb-2">€{ticket.price}</div>
              <p className="text-sm font-roboto-condensed mb-4">
                {deadlinePassed ? "Deadline passed" : `Until ${new Date(ticket.deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}`}
              </p>

              <ul className="text-sm font-roboto-condensed space-y-2 text-left">
                <li>• Full congress access</li>
                <li>• Welcome reception</li>
                <li>• Coffee breaks</li>
                <li>• Congress materials</li>
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
