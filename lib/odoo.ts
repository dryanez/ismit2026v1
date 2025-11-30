/**
 * Odoo JSON-2 API Client
 * For Odoo Online at https://ismit2026.odoo.com
 * 
 * JSON-2 API format: pass method parameters directly in the body (no jsonrpc wrapper)
 * Response is the raw result, not wrapped in jsonrpc
 */

const ODOO_URL = process.env.ODOO_URL || 'https://ismit2026.odoo.com'
const ODOO_DATABASE = process.env.ODOO_DATABASE || 'ismit2026'
const ODOO_API_KEY = process.env.ODOO_API_KEY

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  affiliation?: string
  country?: string
  ticketType: string
  ticketPrice: number
  basePrice?: number
  currency: string
  orderId: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  tags?: string[] // Tags for categorization (e.g., "iSMIT Member", "Gala Dinner", "XR Workshop")
  addOns?: string[] // Add-ons description
}

/**
 * Make a JSON-2 API call to Odoo
 * JSON-2 uses direct named parameters in the body, response is raw (not wrapped in jsonrpc)
 */
async function odooApiCall<T>(
  model: string,
  method: string,
  params: Record<string, any> = {}
): Promise<T> {
  if (!ODOO_API_KEY) {
    throw new Error('ODOO_API_KEY is not configured')
  }

  const url = `${ODOO_URL}/json/2/${model}/${method}`
  
  console.log('[Odoo] Calling:', url)
  console.log('[Odoo] Params:', JSON.stringify(params, null, 2))
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${ODOO_API_KEY}`,
      'X-Odoo-Database': ODOO_DATABASE,
    },
    body: JSON.stringify(params),
  })

  const text = await response.text()
  console.log('[Odoo] Response status:', response.status)
  console.log('[Odoo] Response:', text.substring(0, 500))

  if (!response.ok) {
    console.error('[Odoo] HTTP Error:', response.status)
    throw new Error(`Odoo API error: ${response.status} ${response.statusText}`)
  }

  // JSON-2 returns raw result, not wrapped in jsonrpc
  const result = JSON.parse(text) as T
  console.log('[Odoo] Result:', JSON.stringify(result))
  return result
}

/**
 * Get or create category IDs in Odoo for tags
 */
async function getOrCreateCategoryIds(tags: string[]): Promise<number[]> {
  const categoryIds: number[] = []
  
  for (const tag of tags) {
    try {
      // Search for existing category
      const existingIds = await odooApiCall<number[]>(
        'res.partner.category',
        'search',
        { domain: [['name', '=', tag]], limit: 1 }
      )
      
      if (existingIds && existingIds.length > 0) {
        categoryIds.push(existingIds[0])
        console.log(`[Odoo] Found existing category "${tag}" with ID:`, existingIds[0])
      } else {
        // Create new category
        const newIds = await odooApiCall<number[]>(
          'res.partner.category',
          'create',
          { vals_list: [{ name: tag }] }
        )
        if (newIds && newIds.length > 0) {
          categoryIds.push(newIds[0])
          console.log(`[Odoo] Created new category "${tag}" with ID:`, newIds[0])
        }
      }
    } catch (error) {
      console.error(`[Odoo] Error getting/creating category "${tag}":`, error)
    }
  }
  
  return categoryIds
}

/**
 * Create or update a contact in Odoo from registration data
 */
export async function createOrUpdateContact(data: RegistrationData): Promise<number> {
  console.log('[Odoo] Creating contact for:', data.email)
  console.log('[Odoo] Tags:', data.tags)
  console.log('[Odoo] Add-ons:', data.addOns)
  
  // Build detailed comment with add-ons
  let comment = `iSMIT 2026 Registration\n` +
    `Ticket: ${data.ticketType}\n`
  
  if (data.addOns && data.addOns.length > 0) {
    comment += `Add-ons: ${data.addOns.join(', ')}\n`
  }
  
  if (data.basePrice && data.basePrice !== data.ticketPrice) {
    comment += `Base Price: ${data.currency} ${data.basePrice}\n`
  }
  
  comment += `Total Price: ${data.currency} ${data.ticketPrice}\n` +
    `Order ID: ${data.orderId}\n` +
    `Payment Status: ${data.paymentStatus}\n` +
    `Date: ${new Date().toISOString()}`
  
  const partnerData: Record<string, any> = {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    comment,
  }
  
  if (data.affiliation) {
    partnerData.company_name = data.affiliation
  }
  
  // Get or create category IDs for tags
  if (data.tags && data.tags.length > 0) {
    const categoryIds = await getOrCreateCategoryIds(data.tags)
    if (categoryIds.length > 0) {
      // Use (6, 0, [ids]) to set many2many field - replaces existing
      partnerData.category_id = [[6, 0, categoryIds]]
      console.log('[Odoo] Setting category_id:', categoryIds)
    }
  }
  
  // Create new partner using vals_list parameter
  const newIds = await odooApiCall<number[]>(
    'res.partner',
    'create',
    { vals_list: [partnerData] }
  )
  
  console.log('[Odoo] Created partner with IDs:', newIds)
  // create returns array of IDs, get first one
  return Array.isArray(newIds) ? newIds[0] : newIds
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
    // Search for partner by email
    const ids = await odooApiCall<number[]>(
      'res.partner',
      'search',
      { domain: [['email', '=', email]], limit: 1 }
    )
    
    if (!ids || ids.length === 0) {
      console.warn('[Odoo] Partner not found for status update:', email)
      return false
    }
    
    const partnerId = ids[0]
    
    // Read current comment
    const partners = await odooApiCall<any[]>(
      'res.partner',
      'read',
      { ids: [partnerId], fields: ['comment'] }
    )
    
    const existingComment = partners?.[0]?.comment || ''
    const updatedComment = existingComment.replace(
      /Payment Status: \w+/,
      `Payment Status: ${status}`
    ) + `\nPayment ${status} at: ${new Date().toISOString()}`
    
    // Write updated comment
    await odooApiCall<boolean>(
      'res.partner',
      'write',
      { ids: [partnerId], vals: { comment: updatedComment } }
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
    const result = await odooApiCall<any[]>(
      'res.company',
      'search_read',
      { domain: [], fields: ['name'], limit: 1 }
    )
    console.log('[Odoo] Connection test successful. Company:', result?.[0]?.name)
    return true
  } catch (error) {
    console.error('[Odoo] Connection test failed:', error)
    return false
  }
}
