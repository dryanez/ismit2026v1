import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      orderId,
      sumupCheckoutId,
      amount,
      currency = 'EUR',
      firstName,
      lastName,
      email,
      affiliation,
      country,
      ticketType,
      basePrice,
      totalPrice,
      addOns,
      tags,
    } = body
    
    if (!orderId || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, email, firstName, lastName" },
        { status: 400 }
      )
    }
    
    console.log('[Payments] Creating payment record:', orderId)
    
    // Insert payment record
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        sumup_checkout_id: sumupCheckoutId,
        amount: amount || totalPrice,
        currency,
        status: 'pending',
        first_name: firstName,
        last_name: lastName,
        email,
        affiliation,
        country,
        ticket_type: ticketType,
        base_price: basePrice,
        total_price: totalPrice,
        add_ons: addOns,
        tags,
      })
      .select()
      .single()
    
    if (error) {
      console.error('[Payments] Error creating payment:', error)
      return NextResponse.json(
        { error: `Failed to create payment: ${error.message}` },
        { status: 500 }
      )
    }
    
    console.log('[Payments] Created payment:', payment.id)
    
    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        orderId: payment.order_id,
        status: payment.status,
      }
    })
    
  } catch (error) {
    console.error('[Payments] Error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      orderId,
      status,
      sumupTransactionId,
      ticketId,
      ticketNumber,
      odooSynced,
      odooContactId,
      odooError,
    } = body
    
    if (!orderId) {
      return NextResponse.json(
        { error: "Missing required field: orderId" },
        { status: 400 }
      )
    }
    
    console.log('[Payments] Updating payment:', orderId, 'status:', status)
    
    // Build update object
    const updateData: Record<string, any> = {}
    if (status) updateData.status = status
    if (sumupTransactionId) updateData.sumup_transaction_id = sumupTransactionId
    if (ticketId) updateData.ticket_id = ticketId
    if (ticketNumber) updateData.ticket_number = ticketNumber
    if (odooSynced !== undefined) updateData.odoo_synced = odooSynced
    if (odooContactId) updateData.odoo_contact_id = odooContactId
    if (odooError !== undefined) updateData.odoo_error = odooError
    
    // Set completed_at if status is completed
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    }
    
    const { data: payment, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('order_id', orderId)
      .select()
      .single()
    
    if (error) {
      console.error('[Payments] Error updating payment:', error)
      return NextResponse.json(
        { error: `Failed to update payment: ${error.message}` },
        { status: 500 }
      )
    }
    
    console.log('[Payments] Updated payment:', payment.order_id, '→', payment.status)
    
    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        orderId: payment.order_id,
        status: payment.status,
        ticketNumber: payment.ticket_number,
        odooSynced: payment.odoo_synced,
      }
    })
    
  } catch (error) {
    console.error('[Payments] Error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const email = searchParams.get('email')
    
    if (!orderId && !email) {
      return NextResponse.json(
        { error: "Missing query parameter: orderId or email" },
        { status: 400 }
      )
    }
    
    let query = supabase.from('payments').select('*')
    
    if (orderId) {
      query = query.eq('order_id', orderId)
    } else if (email) {
      query = query.eq('email', email).order('created_at', { ascending: false })
    }
    
    const { data: payments, error } = await query
    
    if (error) {
      console.error('[Payments] Error fetching payments:', error)
      return NextResponse.json(
        { error: `Failed to fetch payments: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      payments: orderId ? payments[0] : payments,
    })
    
  } catch (error) {
    console.error('[Payments] Error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
