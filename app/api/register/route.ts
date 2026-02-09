import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateContact, updatePaymentStatus } from '@/lib/odoo'

export async function POST(request: NextRequest) {
  console.log('[Register API] Received request')
  
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      affiliation, 
      country,
      ticketType,
      ticketPrice,
      basePrice,
      currency,
      orderId,
      paymentStatus,
      tags,
      addOns,
    } = body

    console.log('[Register API] Request body:', JSON.stringify(body, null, 2))

    // Validate required fields
    if (!firstName || !lastName || !email || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, orderId' },
        { status: 400 }
      )
    }

    // Check if Odoo is configured
    if (!process.env.ODOO_API_KEY) {
      console.warn('[Register API] Odoo not configured, skipping CRM save')
      return NextResponse.json({
        success: true,
        message: 'Registration recorded (CRM not configured)',
        orderId,
      })
    }

    // Save to Odoo
    const partnerId = await createOrUpdateContact({
      firstName,
      lastName,
      email,
      affiliation,
      country,
      ticketType: ticketType || 'Unknown',
      ticketPrice: ticketPrice || 0,
      basePrice: basePrice,
      currency: currency || 'EUR',
      orderId,
      paymentStatus: paymentStatus || 'pending',
      tags: tags || [],
      addOns: addOns || [],
    })

    console.log('[Register API] Saved to Odoo, partner ID:', partnerId)

    return NextResponse.json({
      success: true,
      message: 'Registration saved to CRM',
      partnerId,
      orderId,
      tags: tags || [],
    })
  } catch (error: any) {
    console.error('[Register API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save registration' },
      { status: 500 }
    )
  }
}

// Update payment status endpoint
export async function PATCH(request: NextRequest) {
  console.log('[Register API] Update payment status')
  
  try {
    const body = await request.json()
    const { email, orderId, paymentStatus } = body

    if (!email || !orderId || !paymentStatus) {
      return NextResponse.json(
        { error: 'Missing required fields: email, orderId, paymentStatus' },
        { status: 400 }
      )
    }

    if (!process.env.ODOO_API_KEY) {
      console.warn('[Register API] Odoo not configured, skipping status update')
      return NextResponse.json({
        success: true,
        message: 'Status update skipped (CRM not configured)',
      })
    }

    const success = await updatePaymentStatus(email, orderId, paymentStatus)

    return NextResponse.json({
      success,
      message: success ? 'Payment status updated' : 'Partner not found',
    })
  } catch (error: any) {
    console.error('[Register API] Error updating status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update status' },
      { status: 500 }
    )
  }
}
