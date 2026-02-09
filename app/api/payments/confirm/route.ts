import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getSumUpAccessToken } from "@/lib/sumup"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { checkout_id, status: sumupStatus, transaction_id } = body

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
      console.error("Payment not found:", paymentFindError)
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const accessToken = await getSumUpAccessToken()

    // Verify payment status with SumUp API
    const sumupVerifyResponse = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkout_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!sumupVerifyResponse.ok) {
      console.error("Failed to verify payment with SumUp")
      return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
    }

    const sumupPaymentData = await sumupVerifyResponse.json()
    const isPaymentCompleted = sumupPaymentData.status === "PAID"

    // Update payment status
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        status: isPaymentCompleted ? "completed" : "failed",
        transaction_id: sumupPaymentData.transaction_id || transaction_id,
        confirmed_at: isPaymentCompleted ? new Date().toISOString() : null,
        sumup_data: sumupPaymentData,
      })
      .eq("id", payment.id)

    if (paymentError) {
      console.error("Payment update error:", paymentError)
      return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
    }

    // Update order status if payment is completed
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

      // Generate tickets for completed payment
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

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      status: isPaymentCompleted ? "completed" : "failed",
    })
  } catch (error) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
