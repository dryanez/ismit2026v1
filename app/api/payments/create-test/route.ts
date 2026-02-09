import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getSumUpAccessToken } from "@/lib/sumup"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: "Supabase URL is not set." }, { status: 500 });
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Supabase service role key is not set." }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json({ error: "Base URL is not set." }, { status: 500 });
    }
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

    // Create a dummy order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: 1,
        currency: "USD",
        status: "pending",
        payment_method: "sumup",
      })
      .select()
      .single()

    if (orderError || !order) {
        console.error("Database error creating order:", orderError)
        return NextResponse.json({ error: "Failed to create test order" }, { status: 500 })
    }

    const orderId = order.id

    if (!process.env.SUMUP_MERCHANT_CODE) {
      return NextResponse.json({ error: "SumUp merchant code is not set." }, { status: 500 });
    }

    const sumupCheckout = {
      checkout_reference: `ismit-test-${orderId}-${Date.now()}`,
      amount: 1,
      currency: "USD",
      description: `iSMIT 2026 - Test Payment`,
      merchant_code: process.env.SUMUP_MERCHANT_CODE!,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/success?orderId=${orderId}`,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/confirm`,
    }

    const accessToken = await getSumUpAccessToken()

    // Create SumUp checkout
    const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
      amount: 1,
      currency: "USD",
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
      amount: 1,
      currency: "USD",
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
      checkoutUrl: paymentSession.checkoutUrl,
    })
  } catch (error) {
    console.error("Error creating payment session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
