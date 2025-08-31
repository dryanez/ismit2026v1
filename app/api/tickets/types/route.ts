import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Define available ticket types for iSMIT 2026
    const ticketTypes = [
      {
        id: "early-bird",
        name: "Early Bird Registration",
        description: "Special early bird pricing until May 31, 2026",
        price: 299,
        currency: "EUR",
        available: true,
        deadline: "2026-05-31",
      },
      {
        id: "regular",
        name: "Regular Registration",
        description: "Standard conference registration",
        price: 399,
        currency: "EUR",
        available: true,
        deadline: "2026-10-31",
      },
      {
        id: "student",
        name: "Student Registration",
        description: "Discounted rate for students (ID required)",
        price: 199,
        currency: "EUR",
        available: true,
        deadline: "2026-10-31",
      },
      {
        id: "group",
        name: "Group Registration (5+)",
        description: "Special pricing for groups of 5 or more",
        price: 349,
        currency: "EUR",
        available: true,
        deadline: "2026-10-31",
      },
    ]

    return NextResponse.json({ ticketTypes })
  } catch (error) {
    console.error("Error fetching ticket types:", error)
    return NextResponse.json({ error: "Failed to fetch ticket types" }, { status: 500 })
  }
}
