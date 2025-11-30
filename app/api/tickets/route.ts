/**
 * Tickets API - Generate and send tickets
 * POST /api/tickets - Create a new ticket and send email
 */

import { NextRequest, NextResponse } from 'next/server'
import { createTicket, updateTicketEmailSent, TicketData } from '@/lib/tickets'
import { sendTicketEmail, isResendConfigured } from '@/lib/email'
import { getAppleWalletLink, isAppleWalletConfigured } from '@/lib/apple-wallet'
import { getGoogleWalletSaveUrl, isGoogleWalletConfigured } from '@/lib/google-wallet'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ismit2026.com'

export async function POST(request: NextRequest) {
  console.log('[Tickets API] Creating new ticket')
  
  try {
    const body = await request.json()
    const {
      orderId,
      firstName,
      lastName,
      email,
      affiliation,
      country,
      ticketType,
      basePrice,
      totalPrice,
      currency,
      addOns,
      tags,
    } = body
    
    console.log('[Tickets API] Request:', JSON.stringify(body, null, 2))
    
    // Validate required fields
    if (!orderId || !firstName || !lastName || !email || !ticketType) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, firstName, lastName, email, ticketType' },
        { status: 400 }
      )
    }
    
    // Create ticket data
    const ticketData: TicketData = {
      orderId,
      firstName,
      lastName,
      email,
      affiliation,
      country,
      ticketType,
      basePrice: basePrice || totalPrice || 0,
      totalPrice: totalPrice || 0,
      currency: currency || 'EUR',
      addOns: addOns || [],
      tags: tags || [],
    }
    
    // Generate the ticket
    const ticket = await createTicket(ticketData)
    console.log('[Tickets API] Ticket created:', ticket.ticketNumber)
    
    // Generate wallet links if configured
    let appleWalletUrl: string | null = null
    let googleWalletUrl: string | null = null
    
    if (isAppleWalletConfigured()) {
      appleWalletUrl = getAppleWalletLink(ticket.id, SITE_URL)
    }
    
    if (isGoogleWalletConfigured()) {
      googleWalletUrl = await getGoogleWalletSaveUrl({
        ticketNumber: ticket.ticketNumber,
        ticketId: ticket.id,
        firstName,
        lastName,
        email,
        ticketType,
        addOns: addOns || [],
        eventDate: '2026-11-18',
        eventLocation: 'Nuremberg, Germany',
        qrCodeData: ticket.qrCodeData,
      })
    }
    
    // Send ticket email
    let emailResult: { success: boolean; id?: string; error?: string } = { success: false }
    
    if (isResendConfigured()) {
      emailResult = await sendTicketEmail({
        to: email,
        ticketNumber: ticket.ticketNumber,
        ticketId: ticket.id,
        firstName,
        lastName,
        ticketType,
        totalPrice: totalPrice || 0,
        currency: currency || 'EUR',
        addOns: addOns || [],
        qrCodeImage: ticket.qrCodeImage,
        appleWalletUrl,
        googleWalletUrl,
      })
      
      if (emailResult.success && emailResult.id) {
        await updateTicketEmailSent(ticket.id, emailResult.id)
      }
    } else {
      console.warn('[Tickets API] Email not configured - ticket created but not sent')
    }
    
    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        qrCodeImage: ticket.qrCodeImage,
      },
      email: {
        sent: emailResult.success,
        id: emailResult.id,
      },
      wallets: {
        apple: !!appleWalletUrl,
        google: !!googleWalletUrl,
      },
    })
    
  } catch (error: any) {
    console.error('[Tickets API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create ticket' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/tickets?ticketNumber=ISMIT-2026-XXXX
 * Get ticket details (for admin/check-in)
 */
export async function GET(request: NextRequest) {
  const ticketNumber = request.nextUrl.searchParams.get('ticketNumber')
  const ticketId = request.nextUrl.searchParams.get('ticketId')
  
  if (!ticketNumber && !ticketId) {
    return NextResponse.json(
      { error: 'Provide ticketNumber or ticketId parameter' },
      { status: 400 }
    )
  }
  
  try {
    const { getTicketByNumber, getTicketById } = await import('@/lib/tickets')
    
    const ticket = ticketNumber 
      ? await getTicketByNumber(ticketNumber)
      : await getTicketById(ticketId!)
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      ticket,
    })
    
  } catch (error: any) {
    console.error('[Tickets API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get ticket' },
      { status: 500 }
    )
  }
}
