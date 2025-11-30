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
      action,           // 'validate' | 'check_in' | 'undo_check_in'
      checkedInBy,      // Who is performing the check-in
      deviceInfo,       // Device information
      location,         // Check-in location (e.g., "Main Entrance")
    } = body
    
    if (!qrData) {
      return NextResponse.json(
        { error: 'Missing qrData parameter' },
        { status: 400 }
      )
    }
    
    // Verify the QR code
    const verification = verifyQRCode(qrData)
    
    if (!verification.valid) {
      console.log('[Validate API] Invalid QR code:', verification.error)
      return NextResponse.json({
        success: false,
        valid: false,
        error: verification.error || 'Invalid QR code',
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
        valid: false,
        error: 'Ticket not found in database',
      })
    }
    
    // Just validate (don't check-in)
    if (!action || action === 'validate') {
      return NextResponse.json({
        success: true,
        valid: true,
        ticket: {
          id: ticket.id,
          ticketNumber: ticket.ticket_number,
          firstName: ticket.first_name,
          lastName: ticket.last_name,
          email: ticket.email,
          ticketType: ticket.ticket_type,
          addOns: ticket.add_ons,
          status: ticket.status,
          checkedInAt: ticket.checked_in_at,
          checkedInBy: ticket.checked_in_by,
        },
      })
    }
    
    // Check-in the ticket
    if (action === 'check_in') {
      const result = await checkInTicket(ticketId, checkedInBy, deviceInfo, location)
      
      return NextResponse.json({
        success: result.success,
        valid: true,
        message: result.message,
        ticket: result.ticket ? {
          id: result.ticket.id,
          ticketNumber: result.ticket.ticket_number,
          firstName: result.ticket.first_name,
          lastName: result.ticket.last_name,
          email: result.ticket.email,
          ticketType: result.ticket.ticket_type,
          addOns: result.ticket.add_ons,
          status: result.ticket.status,
          checkedInAt: result.ticket.checked_in_at,
          checkedInBy: result.ticket.checked_in_by,
        } : null,
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
      { error: 'Invalid action. Use: validate, check_in, or undo_check_in' },
      { status: 400 }
    )
    
  } catch (error: any) {
    console.error('[Validate API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Validation failed' },
      { status: 500 }
    )
  }
}
