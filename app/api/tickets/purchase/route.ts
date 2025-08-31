import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketType, quantity, attendeeInfo, paymentMethod } = body

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Validate required fields
    if (!ticketType || !quantity || !attendeeInfo || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        ticket_type: ticketType,
        quantity: quantity,
        attendee_info: attendeeInfo,
        payment_method: paymentMethod,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError) {
      console.error("Database error:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Return order details for payment processing
    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error processing ticket purchase:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
