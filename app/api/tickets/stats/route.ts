/**
 * Tickets Stats API - Get check-in statistics
 * GET /api/tickets/stats - Get total, checked-in, and pending counts with lists
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get all tickets
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('id, ticket_number, first_name, last_name, email, ticket_type, affiliation, country, add_ons, status, checked_in_at, created_at')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('[Stats API] Error fetching tickets:', error)
      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
    
    const allTickets = tickets || []
    const checkedInTickets = allTickets.filter(t => t.status === 'used' || t.checked_in_at)
    const pendingTickets = allTickets.filter(t => t.status !== 'used' && !t.checked_in_at)
    
    // Format ticket info
    const formatTicket = (t: any) => ({
      ticketId: t.id,
      ticketNumber: t.ticket_number,
      firstName: t.first_name,
      lastName: t.last_name,
      email: t.email,
      ticketType: t.ticket_type,
      affiliation: t.affiliation,
      country: t.country,
      addOns: t.add_ons,
      status: t.status,
      checkedInAt: t.checked_in_at,
      issuedAt: t.created_at,
    })
    
    return NextResponse.json({
      total: allTickets.length,
      checkedIn: checkedInTickets.length,
      pending: pendingTickets.length,
      checkedInList: checkedInTickets.map(formatTicket),
      pendingList: pendingTickets.map(formatTicket),
    })
    
  } catch (error: any) {
    console.error('[Stats API] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
