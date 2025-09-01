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
    id: "ismit-member",
    name: "iSMIT Member",
    description: "iSMIT Member Other Associated organisation Member",
    price: 210,
    currency: "EUR",
    available: true,
    deadline: "2026-11-15T23:59:59Z",
  },
  {
    id: "non-member-surgeon",
    name: "Non-Member Surgeon/Physician",
    description: "Non-members of iSMIT: Surgeons & Physicians",
    price: 420,
    currency: "EUR",
    available: true,
    deadline: "2026-11-15T23:59:59Z",
  },
  {
    id: "non-member-scientist",
    name: "Non-Member Engineer/Scientist",
    description: "Non-members of iSMIT Engineers & Scientists",
    price: 360,
    currency: "EUR",
    available: true,
    deadline: "2026-11-15T23:59:59Z",
  },
  {
    id: "student-resident",
    name: "Student/Resident",
    description: "Students & Residents",
    price: 150,
    currency: "EUR",
    available: true,
    deadline: "2026-11-15T23:59:59Z",
  },
];

export function TicketSelection({ onSelectTicket }: TicketSelectionProps) {
  const isDeadlinePassed = (deadline: string) => {
    return new Date() > new Date(deadline)
  }

  const getCardColor = (ticketId: string) => {
    switch (ticketId) {
      case "ismit-member":
        return "bg-[#85AFFB]"
      case "non-member-surgeon":
        return "bg-[#FE6448]"
      case "non-member-scientist":
        return "bg-[#0D1858]"
      case "student-resident":
        return "bg-[#85AFFB]"
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
