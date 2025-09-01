import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketType, quantity, attendeeInfo, paymentMethod, hasDiscount, galaDinner, aiAcademy, psiPavilion } = body

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

    // Get ticket price
    const { data: ticketData, error: ticketError } = await supabase
      .from("ticket_types")
      .select("price")
      .eq("id", ticketType)
      .single()

    if (ticketError || !ticketData) {
      return NextResponse.json({ error: "Invalid ticket type" }, { status: 400 })
    }

    let ticketPrice = ticketData.price * quantity
    if (hasDiscount) {
      ticketPrice *= 0.5
    }

    let addonsPrice = 0
    if (galaDinner) addonsPrice += 95
    if (aiAcademy) addonsPrice += 100
    if (psiPavilion) addonsPrice += 100

    const finalPrice = ticketPrice + addonsPrice

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        ticket_type: ticketType,
        quantity: quantity,
        attendee_info: attendeeInfo,
        payment_method: paymentMethod,
        status: "pending",
        total_amount: finalPrice,
        gala_dinner: galaDinner,
        ai_academy: aiAcademy,
        psi_pavilion: psiPavilion,
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