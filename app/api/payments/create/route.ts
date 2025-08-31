import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, currency = "EUR" } = body

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Validate order exists
    const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const sumupCheckout = {
      checkout_reference: `ismit-${orderId}-${Date.now()}`,
      amount: amount,
      currency: currency,
      description: `iSMIT 2026 Conference Registration - Order ${orderId}`,
      merchant_code: process.env.SUMUP_MERCHANT_CODE!,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/success?orderId=${orderId}`,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/confirm`,
    }

    // Create SumUp checkout
    const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SUMUP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sumupCheckout),
    })

    if (!sumupResponse.ok) {
      const errorData = await sumupResponse.json()
      console.error("SumUp checkout creation failed:", errorData)
      return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
    }

    const sumupData = await sumupResponse.json()

    const paymentSession = {
      id: sumupData.id,
      orderId: orderId,
      amount: amount,
      currency: currency,
      status: "pending",
      checkoutUrl: `https://checkout.sumup.com/${sumupData.id}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      sumupCheckoutId: sumupData.id,
      checkoutReference: sumupCheckout.checkout_reference,
    }

    // Store payment session in database
    const { error: paymentError } = await supabase.from("payments").insert({
      id: paymentSession.id,
      order_id: orderId,
      amount: amount,
      currency: currency,
      status: "pending",
      checkout_url: paymentSession.checkoutUrl,
      expires_at: paymentSession.expiresAt,
      sumup_checkout_id: sumupData.id,
      checkout_reference: sumupCheckout.checkout_reference,
    })

    if (paymentError) {
      console.error("Payment session creation error:", paymentError)
      return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      paymentSession,
    })
  } catch (error) {
    console.error("Error creating payment session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
