/**
 * Ticket Generation Library
 * Generates unique tickets with QR codes for iSMIT 2026
 */

import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Secret for signing QR codes (should be in env)
const QR_SECRET = process.env.TICKET_QR_SECRET || 'ismit-2026-ticket-secret'

export interface TicketData {
  orderId: string
  firstName: string
  lastName: string
  email: string
  affiliation?: string
  country?: string
  ticketType: string
  basePrice: number
  totalPrice: number
  currency: string
  addOns: string[]
  tags: string[]
}

export interface GeneratedTicket {
  id: string
  ticketNumber: string
  qrCodeData: string
  qrCodeImage: string // Base64 PNG
  qrCodeSvg: string
}

/**
 * Generate a human-readable ticket number
 * Format: ISMIT-2026-XXXX (where XXXX is sequential + random)
 */
function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ISMIT-2026-${timestamp.slice(-4)}${random}`
}

/**
 * Create signed QR code data
 * Contains ticket ID + signature that can be verified
 */
function createQRCodeData(ticketId: string, ticketNumber: string): string {
  const payload = {
    tid: ticketId, // Ticket UUID
    tn: ticketNumber, // Ticket number
    iat: Math.floor(Date.now() / 1000),
    iss: 'ismit2026',
  }
  
  // Sign with JWT for verification
  const token = jwt.sign(payload, QR_SECRET, { algorithm: 'HS256' })
  return token
}

/**
 * Verify QR code data and extract ticket info
 */
export function verifyQRCode(qrData: string): { valid: boolean; ticketId?: string; ticketNumber?: string; error?: string } {
  try {
    const decoded = jwt.verify(qrData, QR_SECRET) as { tid: string; tn: string }
    return {
      valid: true,
      ticketId: decoded.tid,
      ticketNumber: decoded.tn,
    }
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Invalid QR code',
    }
  }
}

/**
 * Generate QR code images (PNG and SVG)
 */
async function generateQRImages(data: string): Promise<{ png: string; svg: string }> {
  // Generate PNG as base64
  const pngDataUrl = await QRCode.toDataURL(data, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    width: 300,
    margin: 2,
    color: {
      dark: '#0D1858',
      light: '#FFFFFF',
    },
  })
  
  // Generate SVG
  const svg = await QRCode.toString(data, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    width: 300,
    margin: 2,
    color: {
      dark: '#0D1858',
      light: '#FFFFFF',
    },
  })
  
  return { png: pngDataUrl, svg }
}

/**
 * Create a new ticket in the database
 */
export async function createTicket(data: TicketData): Promise<GeneratedTicket> {
  const ticketId = uuidv4()
  const ticketNumber = generateTicketNumber()
  const qrCodeData = createQRCodeData(ticketId, ticketNumber)
  
  console.log('[Tickets] Creating ticket:', ticketNumber)
  console.log('[Tickets] For:', data.email)
  
  // Generate QR code images
  const qrImages = await generateQRImages(qrCodeData)
  
  // Insert into database
  const { data: ticket, error } = await supabase
    .from('tickets')
    .insert({
      id: ticketId,
      ticket_number: ticketNumber,
      qr_code_data: qrCodeData,
      order_id: data.orderId,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      affiliation: data.affiliation,
      country: data.country,
      ticket_type: data.ticketType,
      base_price: data.basePrice,
      total_price: data.totalPrice,
      currency: data.currency,
      add_ons: data.addOns,
      tags: data.tags,
      status: 'valid',
    })
    .select()
    .single()
  
  if (error) {
    console.error('[Tickets] Error creating ticket:', error)
    throw new Error(`Failed to create ticket: ${error.message}`)
  }
  
  console.log('[Tickets] Created ticket:', ticketNumber)
  
  return {
    id: ticketId,
    ticketNumber,
    qrCodeData,
    qrCodeImage: qrImages.png,
    qrCodeSvg: qrImages.svg,
  }
}

/**
 * Get ticket by ticket number
 */
export async function getTicketByNumber(ticketNumber: string) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('ticket_number', ticketNumber)
    .single()
  
  if (error) {
    console.error('[Tickets] Error fetching ticket:', error)
    return null
  }
  
  return data
}

/**
 * Get ticket by ID
 */
export async function getTicketById(ticketId: string) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single()
  
  if (error) {
    console.error('[Tickets] Error fetching ticket:', error)
    return null
  }
  
  return data
}

/**
 * Validate and check-in a ticket
 */
export async function checkInTicket(
  ticketId: string, 
  checkedInBy?: string,
  deviceInfo?: string,
  location?: string
): Promise<{ success: boolean; message: string; ticket?: any }> {
  // Get current ticket status
  const ticket = await getTicketById(ticketId)
  
  if (!ticket) {
    return { success: false, message: 'Ticket not found' }
  }
  
  if (ticket.status === 'used') {
    return { 
      success: false, 
      message: `Ticket already used at ${new Date(ticket.checked_in_at).toLocaleString()}`,
      ticket,
    }
  }
  
  if (ticket.status === 'cancelled' || ticket.status === 'refunded') {
    return { success: false, message: `Ticket is ${ticket.status}`, ticket }
  }
  
  // Update ticket status
  const { error: updateError } = await supabase
    .from('tickets')
    .update({
      status: 'used',
      checked_in_at: new Date().toISOString(),
      checked_in_by: checkedInBy,
    })
    .eq('id', ticketId)
  
  if (updateError) {
    console.error('[Tickets] Error checking in:', updateError)
    return { success: false, message: 'Failed to check in ticket' }
  }
  
  // Log the check-in
  await supabase.from('ticket_check_ins').insert({
    ticket_id: ticketId,
    action: 'check_in',
    performed_by: checkedInBy,
    device_info: deviceInfo,
    location,
  })
  
  // Get updated ticket
  const updatedTicket = await getTicketById(ticketId)
  
  return { 
    success: true, 
    message: 'Check-in successful!',
    ticket: updatedTicket,
  }
}

/**
 * Undo check-in (for mistakes)
 */
export async function undoCheckIn(
  ticketId: string,
  performedBy?: string
): Promise<{ success: boolean; message: string }> {
  const { error } = await supabase
    .from('tickets')
    .update({
      status: 'valid',
      checked_in_at: null,
      checked_in_by: null,
    })
    .eq('id', ticketId)
  
  if (error) {
    return { success: false, message: 'Failed to undo check-in' }
  }
  
  // Log the undo
  await supabase.from('ticket_check_ins').insert({
    ticket_id: ticketId,
    action: 'undo_check_in',
    performed_by: performedBy,
  })
  
  return { success: true, message: 'Check-in undone' }
}

/**
 * Update ticket with email sent info
 */
export async function updateTicketEmailSent(ticketId: string, resendId: string) {
  await supabase
    .from('tickets')
    .update({
      email_sent_at: new Date().toISOString(),
      email_resend_id: resendId,
    })
    .eq('id', ticketId)
}

/**
 * Update ticket with wallet pass info
 */
export async function updateTicketWalletInfo(
  ticketId: string, 
  applePassSerial?: string,
  googlePassId?: string
) {
  const updates: Record<string, string> = {}
  if (applePassSerial) updates.apple_pass_serial = applePassSerial
  if (googlePassId) updates.google_pass_id = googlePassId
  
  await supabase
    .from('tickets')
    .update(updates)
    .eq('id', ticketId)
}
