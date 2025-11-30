/**
 * Google Wallet Pass Generator
 * Creates JWT-based passes for Google Wallet
 * 
 * Requirements:
 * - Google Cloud Project with Wallet API enabled
 * - Service account with Wallet Issuer permissions
 * - Issuer ID from Google Pay & Wallet Console
 */

import jwt from 'jsonwebtoken'

// Configuration from environment
const GOOGLE_WALLET_ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID
const GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL
const GOOGLE_WALLET_PRIVATE_KEY = process.env.GOOGLE_WALLET_PRIVATE_KEY // PEM format

export interface GoogleWalletPassData {
  ticketNumber: string
  ticketId: string
  firstName: string
  lastName: string
  email: string
  ticketType: string
  addOns: string[]
  eventDate: string
  eventLocation: string
  qrCodeData: string
}

/**
 * Check if Google Wallet is configured
 */
export function isGoogleWalletConfigured(): boolean {
  return !!(GOOGLE_WALLET_ISSUER_ID && GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL && GOOGLE_WALLET_PRIVATE_KEY)
}

/**
 * Generate a Google Wallet pass JWT
 */
export async function generateGoogleWalletPass(data: GoogleWalletPassData): Promise<string | null> {
  if (!isGoogleWalletConfigured()) {
    console.log('[GoogleWallet] Not configured - will use QR code in email instead')
    return null
  }
  
  try {
    console.log('[GoogleWallet] Generating pass for:', data.ticketNumber)
    
    const classId = `${GOOGLE_WALLET_ISSUER_ID}.ismit2026_ticket`
    const objectId = `${GOOGLE_WALLET_ISSUER_ID}.${data.ticketId}`
    
    // Event ticket object
    const eventTicketObject = {
      id: objectId,
      classId: classId,
      state: 'ACTIVE',
      
      // Ticket holder info
      ticketHolderName: `${data.firstName} ${data.lastName}`,
      
      // Ticket info
      ticketNumber: data.ticketNumber,
      ticketType: {
        defaultValue: {
          language: 'en',
          value: data.ticketType,
        },
      },
      
      // Event details
      eventName: {
        defaultValue: {
          language: 'en',
          value: 'iSMIT 2026',
        },
      },
      venue: {
        name: {
          defaultValue: {
            language: 'en',
            value: data.eventLocation || 'Nuremberg, Germany',
          },
        },
        address: {
          defaultValue: {
            language: 'en',
            value: 'Nuremberg Convention Center, Germany',
          },
        },
      },
      dateTime: {
        start: '2026-11-18T09:00:00+01:00',
        end: '2026-11-21T18:00:00+01:00',
      },
      
      // Barcode
      barcode: {
        type: 'QR_CODE',
        value: data.qrCodeData,
        alternateText: data.ticketNumber,
      },
      
      // Text modules for additional info
      textModulesData: [
        {
          header: 'Add-ons',
          body: data.addOns.length > 0 ? data.addOns.join(', ') : 'None',
        },
        {
          header: 'Email',
          body: data.email,
        },
      ],
      
      // Styling
      hexBackgroundColor: '#0D1858',
    }
    
    // Create JWT payload
    const claims = {
      iss: GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL,
      aud: 'google',
      origins: ['https://www.ismit2026.com'],
      typ: 'savetowallet',
      payload: {
        eventTicketObjects: [eventTicketObject],
      },
    }
    
    // Sign the JWT
    const token = jwt.sign(claims, GOOGLE_WALLET_PRIVATE_KEY!.replace(/\\n/g, '\n'), {
      algorithm: 'RS256',
    })
    
    console.log('[GoogleWallet] Pass JWT generated successfully')
    return token
    
  } catch (error) {
    console.error('[GoogleWallet] Error generating pass:', error)
    return null
  }
}

/**
 * Get the Google Wallet "Add to Wallet" URL
 */
export function getGoogleWalletLink(jwtToken: string): string {
  return `https://pay.google.com/gp/v/save/${jwtToken}`
}

/**
 * Generate a deep link for adding to Google Wallet
 * This creates the full flow: generate JWT and return the save URL
 */
export async function getGoogleWalletSaveUrl(data: GoogleWalletPassData): Promise<string | null> {
  const token = await generateGoogleWalletPass(data)
  if (!token) return null
  return getGoogleWalletLink(token)
}
