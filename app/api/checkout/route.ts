import { type NextRequest, NextResponse } from "next/server"
import { getSumUpAccessToken } from "@/lib/sumup"

export async function POST(request: NextRequest) {
  console.log("[create-checkout] Starting checkout creation...")
  
  try {
    const body = await request.json()
    const { amount, currency = "EUR", description, reference } = body

    console.log("[create-checkout] Request body:", { amount, currency, description, reference })

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Amount is required and must be positive" },
        { status: 400 }
      )
    }

    const checkoutReference = reference || `ismit-${Date.now()}`
    const merchantCode = process.env.SUMUP_MERCHANT_CODE
    const clientId = process.env.SUMUP_CLIENT_ID
    const clientSecret = process.env.SUMUP_CLIENT_SECRET

    console.log("[create-checkout] Environment check:", {
      hasMerchantCode: !!merchantCode,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    })

    if (!merchantCode) {
      console.error("[create-checkout] SUMUP_MERCHANT_CODE not configured")
      return NextResponse.json(
        { error: "Payment system not configured: missing merchant code" },
        { status: 500 }
      )
    }

    if (!clientId || !clientSecret) {
      console.error("[create-checkout] SUMUP credentials not configured")
      return NextResponse.json(
        { error: "Payment system not configured: missing credentials" },
        { status: 500 }
      )
    }

    // Get access token
    console.log("[create-checkout] Getting access token...")
    const accessToken = await getSumUpAccessToken()
    console.log("[create-checkout] Got access token:", accessToken ? "yes" : "no")

    // Create SumUp checkout
    const checkoutPayload = {
      checkout_reference: checkoutReference,
      amount: Number(amount),
      currency: currency,
      description: description || `iSMIT 2026 Registration`,
      merchant_code: merchantCode,
    }

    console.log("[create-checkout] Creating checkout with payload:", {
      ...checkoutPayload,
      merchant_code: merchantCode.substring(0, 4) + "***",
    })

    const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    })

    const responseText = await sumupResponse.text()
    console.log("[create-checkout] SumUp response status:", sumupResponse.status)
    console.log("[create-checkout] SumUp response body:", responseText.substring(0, 500))

    let sumupData: any

    try {
      sumupData = JSON.parse(responseText)
    } catch {
      console.error("[create-checkout] Invalid JSON response:", responseText)
      return NextResponse.json(
        { error: "Invalid response from payment provider" },
        { status: 500 }
      )
    }

    if (!sumupResponse.ok) {
      console.error("[create-checkout] SumUp error:", sumupData)
      return NextResponse.json(
        { 
          error: sumupData.message || sumupData.error_message || "Failed to create checkout",
          details: sumupData 
        },
        { status: sumupResponse.status }
      )
    }

    console.log("[create-checkout] Checkout created successfully:", sumupData.id)

    // Return checkout ID for the card widget
    return NextResponse.json({
      checkoutId: sumupData.id,
      checkoutReference: checkoutReference,
      amount: Number(amount),
      currency: currency,
    })

  } catch (error: any) {
    console.error("[create-checkout] Caught error:", error.message, error.stack)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
