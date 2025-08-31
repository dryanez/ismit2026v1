import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Fetch order with related payment and ticket data
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`
        *,
        payments (*),
        tickets (*)
      `)
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
