/**
 * Odoo JSON-2 API Client
 * For Odoo Online at https://ismit2026.odoo.com
 * 
 * Uses the modern JSON-RPC 2.0 API endpoint: /json/2/<model>/<method>
 */

const ODOO_URL = process.env.ODOO_URL || 'https://ismit2026.odoo.com'
const ODOO_DATABASE = process.env.ODOO_DATABASE || 'ismit2026'
const ODOO_API_KEY = process.env.ODOO_API_KEY

interface OdooResponse<T> {
  jsonrpc: '2.0'
  id: number
  result?: T
  error?: {
    code: number
    message: string
    data: {
      name: string
      debug: string
      message: string
    }
  }
}

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  affiliation?: string
  country?: string
  ticketType: string
  ticketPrice: number
  currency: string
  orderId: string
  paymentStatus: 'pending' | 'completed' | 'failed'
}

/**
 * Make a JSON-2 API call to Odoo
 */
async function odooApiCall<T>(
  model: string,
  method: string,
  args: any[] = [],
  kwargs: Record<string, any> = {}
): Promise<T> {
  if (!ODOO_API_KEY) {
    throw new Error('ODOO_API_KEY is not configured')
  }

  const url = `${ODOO_URL}/json/2/${model}/${method}`
  
  console.log('[Odoo] Calling:', url)
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ODOO_API_KEY}`,
      'X-Odoo-Database': ODOO_DATABASE,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      params: {
        args,
        kwargs,
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('[Odoo] HTTP Error:', response.status, text)
    throw new Error(`Odoo API error: ${response.status} ${response.statusText}`)
  }

  const data: OdooResponse<T> = await response.json()

  if (data.error) {
    console.error('[Odoo] API Error:', data.error)
    throw new Error(data.error.data?.message || data.error.message)
  }

  return data.result as T
}

/**
 * Get country ID from Odoo by country code (ISO 3166-1 alpha-3)
 */
async function getCountryId(countryCode: string): Promise<number | null> {
  try {
    // Map alpha-3 to alpha-2 codes for Odoo
    const alpha3ToAlpha2: Record<string, string> = {
      'DEU': 'DE', 'USA': 'US', 'GBR': 'GB', 'FRA': 'FR', 'ITA': 'IT',
      'ESP': 'ES', 'NLD': 'NL', 'BEL': 'BE', 'AUT': 'AT', 'CHE': 'CH',
      'JPN': 'JP', 'CHN': 'CN', 'KOR': 'KR', 'AUS': 'AU', 'CAN': 'CA',
      'BRA': 'BR', 'MEX': 'MX', 'IND': 'IN', 'TUR': 'TR', 'POL': 'PL',
      'SWE': 'SE', 'NOR': 'NO', 'DNK': 'DK', 'FIN': 'FI', 'PRT': 'PT',
      'GRC': 'GR', 'CZE': 'CZ', 'ROU': 'RO', 'HUN': 'HU',
    }
    
    const alpha2 = alpha3ToAlpha2[countryCode] || countryCode
    
    const ids = await odooApiCall<number[]>(
      'res.country',
      'search',
      [[['code', '=', alpha2]]],
      { limit: 1 }
    )
    
    return ids.length > 0 ? ids[0] : null
  } catch (error) {
    console.error('[Odoo] Error getting country ID:', error)
    return null
  }
}

/**
 * Check if a partner (contact) exists by email
 */
async function findPartnerByEmail(email: string): Promise<number | null> {
  try {
    const ids = await odooApiCall<number[]>(
      'res.partner',
      'search',
      [[['email', '=', email]]],
      { limit: 1 }
    )
    return ids.length > 0 ? ids[0] : null
  } catch (error) {
    console.error('[Odoo] Error finding partner:', error)
    return null
  }
}

/**
 * Create or update a contact in Odoo from registration data
 */
export async function createOrUpdateContact(data: RegistrationData): Promise<number> {
  console.log('[Odoo] Creating/updating contact for:', data.email)
  
  const countryId = data.country ? await getCountryId(data.country) : null
  
  const partnerData: Record<string, any> = {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    company_name: data.affiliation || undefined,
    comment: `iSMIT 2026 Registration\n` +
             `Ticket: ${data.ticketType}\n` +
             `Price: ${data.currency} ${data.ticketPrice}\n` +
             `Order ID: ${data.orderId}\n` +
             `Payment Status: ${data.paymentStatus}\n` +
             `Date: ${new Date().toISOString()}`,
  }
  
  if (countryId) {
    partnerData.country_id = countryId
  }
  
  // Check if partner already exists
  const existingId = await findPartnerByEmail(data.email)
  
  if (existingId) {
    // Update existing partner
    console.log('[Odoo] Updating existing partner:', existingId)
    await odooApiCall<boolean>(
      'res.partner',
      'write',
      [[existingId], partnerData]
    )
    return existingId
  } else {
    // Create new partner
    console.log('[Odoo] Creating new partner')
    const newId = await odooApiCall<number>(
      'res.partner',
      'create',
      [partnerData]
    )
    console.log('[Odoo] Created partner with ID:', newId)
    return newId
  }
}

/**
 * Update payment status for a contact
 */
export async function updatePaymentStatus(
  email: string,
  orderId: string,
  status: 'completed' | 'failed'
): Promise<boolean> {
  try {
    const partnerId = await findPartnerByEmail(email)
    
    if (!partnerId) {
      console.warn('[Odoo] Partner not found for status update:', email)
      return false
    }
    
    // Update the comment with payment status
    const partner = await odooApiCall<any[]>(
      'res.partner',
      'read',
      [[partnerId], ['comment']]
    )
    
    const existingComment = partner[0]?.comment || ''
    const updatedComment = existingComment.replace(
      /Payment Status: \w+/,
      `Payment Status: ${status}`
    ) + `\nPayment ${status} at: ${new Date().toISOString()}`
    
    await odooApiCall<boolean>(
      'res.partner',
      'write',
      [[partnerId], { comment: updatedComment }]
    )
    
    console.log('[Odoo] Updated payment status for partner:', partnerId)
    return true
  } catch (error) {
    console.error('[Odoo] Error updating payment status:', error)
    return false
  }
}

/**
 * Test the Odoo connection
 */
export async function testOdooConnection(): Promise<boolean> {
  try {
    // Try to read company info as a simple test
    const result = await odooApiCall<any[]>(
      'res.company',
      'search_read',
      [[]],
      { fields: ['name'], limit: 1 }
    )
    console.log('[Odoo] Connection test successful. Company:', result[0]?.name)
    return true
  } catch (error) {
    console.error('[Odoo] Connection test failed:', error)
    return false
  }
}

/**
 * Get all contacts with iSMIT 2026 registrations
 */
export async function getRegistrations(): Promise<any[]> {
  try {
    const partners = await odooApiCall<any[]>(
      'res.partner',
      'search_read',
      [[['comment', 'ilike', 'iSMIT 2026']]],
      { 
        fields: ['name', 'email', 'company_name', 'country_id', 'comment'],
        order: 'create_date desc'
      }
    )
    return partners
  } catch (error) {
    console.error('[Odoo] Error getting registrations:', error)
    return []
  }
}
