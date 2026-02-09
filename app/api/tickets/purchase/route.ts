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

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

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
      console.error("Ticket type error:", ticketError)
      return NextResponse.json({ error: "Invalid ticket type" }, { status: 400 })
    }

    const unitPrice = ticketData.price
    let ticketPrice = unitPrice * quantity
    if (hasDiscount) {
      ticketPrice *= 0.5
    }

    let addonsPrice = 0
    if (galaDinner) addonsPrice += 95
    if (aiAcademy) addonsPrice += 100
    if (psiPavilion) addonsPrice += 100

    const finalPrice = ticketPrice + addonsPrice

    // Create the order first
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: finalPrice,
        currency: "EUR",
        status: "pending",
        payment_method: paymentMethod,
        billing_first_name: attendeeInfo.firstName,
        billing_last_name: attendeeInfo.lastName,
        billing_email: attendeeInfo.email,
        billing_phone: attendeeInfo.phone,
        billing_organization: attendeeInfo.organization,
        billing_country: attendeeInfo.country,
        gala_dinner: galaDinner,
        ai_academy: aiAcademy,
        psi_pavilion: psiPavilion,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Database error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Then create the order item
    const { error: orderItemError } = await supabase.from("order_items").insert({
      order_id: order.id,
      ticket_type_id: ticketType,
      quantity: quantity,
      unit_price: unitPrice,
      total_price: ticketPrice, // This is the price for the tickets only
      attendee_first_name: attendeeInfo.firstName,
      attendee_last_name: attendeeInfo.lastName,
      attendee_email: attendeeInfo.email,
      attendee_organization: attendeeInfo.organization,
      dietary_requirements: attendeeInfo.dietaryRequirements,
      special_needs: attendeeInfo.specialNeeds,
    })

    if (orderItemError) {
      console.error("Database error creating order item:", orderItemError)
      // Optional: You might want to delete the order record here to clean up
      await supabase.from("orders").delete().eq("id", order.id)
      return NextResponse.json({ error: "Failed to create order item" }, { status: 500 })
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