import { type NextRequest, NextResponse } from "next/server"
import { getSumUpAccessToken } from "@/lib/sumup"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "EUR", description, reference } = body

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Amount is required and must be positive" },
        { status: 400 }
      )
    }

    const checkoutReference = reference || `ismit-${Date.now()}`
    const merchantCode = process.env.SUMUP_MERCHANT_CODE

    if (!merchantCode) {
      console.error("SUMUP_MERCHANT_CODE not configured")
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      )
    }

    // Get access token
    const accessToken = await getSumUpAccessToken()

    // Create SumUp checkout
    const checkoutPayload = {
      checkout_reference: checkoutReference,
      amount: Number(amount),
      currency: currency,
      description: description || `iSMIT 2026 Registration`,
      merchant_code: merchantCode,
    }

    console.log("[create-checkout] Creating checkout:", {
      ...checkoutPayload,
      merchant_code: "***hidden***",
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
          error: sumupData.message || "Failed to create checkout",
          details: sumupData 
        },
        { status: sumupResponse.status }
      )
    }

    console.log("[create-checkout] Checkout created:", sumupData.id)

    // Return checkout ID for the card widget
    return NextResponse.json({
      checkoutId: sumupData.id,
      checkoutReference: checkoutReference,
      amount: Number(amount),
      currency: currency,
    })

  } catch (error: any) {
    console.error("[create-checkout] Error:", error.message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
