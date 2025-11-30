/**
 * QR Code Image API
 * Serves QR code images for tickets
 * GET /api/tickets/qr/[ticketId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params
    
    // Get the ticket from database
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('qr_code_data')
      .eq('id', ticketId)
      .single()
    
    if (error || !ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }
    
    // The qr_code_data is the signed JWT, we need to regenerate the QR image
    // Or we could store the base64 image - let's do that
    
    // For now, generate a new QR code from the stored data
    const QRCode = (await import('qrcode')).default
    
    const qrBuffer = await QRCode.toBuffer(ticket.qr_code_data, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark: '#0D1858',
        light: '#FFFFFF'
      }
    })
    
    return new NextResponse(new Uint8Array(qrBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('[QR API] Error:', error)
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 })
  }
}
