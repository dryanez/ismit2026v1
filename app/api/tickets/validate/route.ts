/**
 * Ticket Validation API - For check-in scanning
 * POST /api/tickets/validate - Validate and check-in a ticket
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyQRCode, checkInTicket, undoCheckIn, getTicketById } from '@/lib/tickets'

/**
 * POST /api/tickets/validate
 * Validate a QR code and optionally check-in the ticket
 */
export async function POST(request: NextRequest) {
  console.log('[Validate API] Validating ticket')
  
  try {
    const body = await request.json()
    const { 
      qrData,           // The scanned QR code data
      action = 'check_in', // Default to check_in for scanner app
      checkedInBy,      // Who is performing the check-in
      deviceInfo,       // Device information
      location,         // Check-in location (e.g., "Main Entrance")
    } = body
    
    if (!qrData) {
      return NextResponse.json(
        { success: false, message: 'Missing qrData parameter' },
        { status: 400 }
      )
    }
    
    // Verify the QR code
    const verification = verifyQRCode(qrData)
    
    if (!verification.valid) {
      console.log('[Validate API] Invalid QR code:', verification.error)
      return NextResponse.json({
        success: false,
        message: verification.error || 'Invalid or expired QR code',
      })
    }
    
    const ticketId = verification.ticketId!
    const ticketNumber = verification.ticketNumber!
    
    console.log('[Validate API] QR verified, ticket:', ticketNumber)
    
    // Get ticket details
    const ticket = await getTicketById(ticketId)
    
    if (!ticket) {
      return NextResponse.json({
        success: false,
        message: 'Ticket not found in database',
      })
    }
    
    // Format ticket info for response
    const ticketInfo = {
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      firstName: ticket.first_name,
      lastName: ticket.last_name,
      email: ticket.email,
      ticketType: ticket.ticket_type,
      affiliation: ticket.affiliation,
      country: ticket.country,
      addOns: ticket.add_ons,
      status: ticket.status,
      checkedInAt: ticket.checked_in_at,
      issuedAt: ticket.created_at,
    }
    
    // Just validate (don't check-in)
    if (action === 'validate') {
      return NextResponse.json({
        success: true,
        message: 'Ticket is valid',
        ticket: ticketInfo,
        alreadyCheckedIn: ticket.status === 'used',
        checkedInAt: ticket.checked_in_at,
      })
    }
    
    // Check-in the ticket (default action)
    if (action === 'check_in') {
      // Check if already checked in
      if (ticket.status === 'used') {
        return NextResponse.json({
          success: true,
          message: 'This ticket has already been checked in',
          ticket: ticketInfo,
          alreadyCheckedIn: true,
          checkedInAt: ticket.checked_in_at,
        })
      }
      
      const result = await checkInTicket(ticketId, checkedInBy, deviceInfo, location)
      
      if (!result.success) {
        return NextResponse.json({
          success: false,
          message: result.message || 'Check-in failed',
          ticket: ticketInfo,
        })
      }
      
      return NextResponse.json({
        success: true,
        message: 'Check-in successful!',
        ticket: {
          ...ticketInfo,
          status: 'used',
          checkedInAt: result.ticket?.checked_in_at || new Date().toISOString(),
        },
        alreadyCheckedIn: false,
      })
    }
    
    // Undo check-in
    if (action === 'undo_check_in') {
      const result = await undoCheckIn(ticketId, checkedInBy)
      
      return NextResponse.json({
        success: result.success,
        message: result.message,
      })
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid action. Use: validate, check_in, or undo_check_in' },
      { status: 400 }
    )
    
  } catch (error: any) {
    console.error('[Validate API] Error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Validation failed' },
      { status: 500 }
    )
  }
}
