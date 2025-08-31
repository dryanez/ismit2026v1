import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { checkout_id, status, transaction_id, event_type } = body

    // Verify webhook signature if SumUp provides one
    // const signature = request.headers.get('x-sumup-signature')
    // TODO: Implement signature verification for security

    if (event_type !== "CHECKOUT_STATUS_CHANGED") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Find payment by SumUp checkout ID
    const { data: payment, error: paymentFindError } = await supabase
      .from("payments")
      .select("*")
      .eq("sumup_checkout_id", checkout_id)
      .single()

    if (paymentFindError || !payment) {
      console.error("Payment not found for webhook:", paymentFindError)
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const isPaymentCompleted = status === "PAID"

    // Update payment status
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        status: isPaymentCompleted ? "completed" : status.toLowerCase(),
        transaction_id: transaction_id,
        confirmed_at: isPaymentCompleted ? new Date().toISOString() : null,
      })
      .eq("id", payment.id)

    if (paymentError) {
      console.error("Payment update error:", paymentError)
      return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
    }

    // Update order and generate tickets if payment completed
    if (isPaymentCompleted) {
      const { error: orderError } = await supabase
        .from("orders")
        .update({
          status: "confirmed",
          confirmed_at: new Date().toISOString(),
        })
        .eq("id", payment.order_id)

      if (orderError) {
        console.error("Order update error:", orderError)
      }

      const { error: ticketError } = await supabase.from("tickets").insert({
        order_id: payment.order_id,
        ticket_number: `ISMIT2026-${Date.now()}`,
        status: "active",
        issued_at: new Date().toISOString(),
      })

      if (ticketError) {
        console.error("Ticket generation error:", ticketError)
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
