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
import { GoogleAuth } from 'google-auth-library'

// Configuration from environment
const GOOGLE_WALLET_ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID
const GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL
const GOOGLE_WALLET_PRIVATE_KEY = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, '\n') // PEM format

// Class ID for iSMIT 2026 event tickets (v2 with updated branding)
const CLASS_ID = GOOGLE_WALLET_ISSUER_ID ? `${GOOGLE_WALLET_ISSUER_ID}.ismit2026_event_ticket_v2` : ''

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
 * Create the Event Ticket Class (only needs to be done once)
 */
async function getOrCreateEventTicketClass(): Promise<void> {
  if (!isGoogleWalletConfigured()) return

  const credentials = {
    client_email: GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_WALLET_PRIVATE_KEY,
  }

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  })

  const httpClient = await auth.getClient()
  
  // Check if class exists
  try {
    await httpClient.request({
      url: `https://walletobjects.googleapis.com/walletobjects/v1/eventTicketClass/${CLASS_ID}`,
      method: 'GET',
    })
    console.log('[GoogleWallet] Event ticket class already exists:', CLASS_ID)
    return
  } catch (error: any) {
    if (error.response?.status !== 404) {
      console.error('[GoogleWallet] Error checking class:', error.message)
      return
    }
  }

  // Create the class
  const eventTicketClass = {
    id: CLASS_ID,
    issuerName: 'iSMIT 2026',
    eventName: {
      defaultValue: {
        language: 'en',
        value: 'iSMIT 2026 - International Society for Medical Innovation and Technology'
      }
    },
    venue: {
      name: {
        defaultValue: {
          language: 'en',
          value: 'NCC Ost, Nuremberg'
        }
      },
      address: {
        defaultValue: {
          language: 'en',
          value: 'Messezentrum 1, 90471 Nuremberg, Germany'
        }
      }
    },
    dateTime: {
      start: '2026-11-18T09:00:00+01:00',
      end: '2026-11-21T18:00:00+01:00'
    },
    reviewStatus: 'UNDER_REVIEW',
    hexBackgroundColor: '#0D1858',
    logo: {
      sourceUri: {
        uri: 'https://ismit2026.com/ismit2026-logo-orange.png'
      },
      contentDescription: {
        defaultValue: {
          language: 'en',
          value: 'iSMIT 2026 Logo'
        }
      }
    },
    heroImage: {
      sourceUri: {
        uri: 'https://ismit2026.com/ismit2026-mascot.png'
      },
      contentDescription: {
        defaultValue: {
          language: 'en',
          value: 'iSMIT 2026 - See you soon!'
        }
      }
    }
  }

  try {
    await httpClient.request({
      url: 'https://walletobjects.googleapis.com/walletobjects/v1/eventTicketClass',
      method: 'POST',
      data: eventTicketClass,
    })
    console.log('[GoogleWallet] Event ticket class created:', CLASS_ID)
  } catch (error: any) {
    console.error('[GoogleWallet] Error creating class:', error.response?.data || error.message)
  }
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
    
    // Ensure the class exists
    await getOrCreateEventTicketClass()
    
    const objectId = `${GOOGLE_WALLET_ISSUER_ID}.${data.ticketId.replace(/-/g, '_')}`
    
    // Event ticket object
    const eventTicketObject = {
      id: objectId,
      classId: CLASS_ID,
      state: 'ACTIVE',
      
      // Ticket holder info
      ticketHolderName: `${data.firstName} ${data.lastName}`,
      
      // Ticket number
      ticketNumber: data.ticketNumber,
      
      // Seat info (we use this for ticket type)
      seatInfo: {
        seat: {
          defaultValue: {
            language: 'en',
            value: data.ticketType
          }
        }
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
          header: 'Ticket Type',
          body: data.ticketType,
          id: 'ticket_type'
        },
        ...(data.addOns.length > 0 ? [{
          header: 'Add-ons',
          body: data.addOns.join(', '),
          id: 'addons'
        }] : []),
        {
          header: 'Attendee Email',
          body: data.email,
          id: 'email'
        }
      ],
      
      // Link modules
      linksModuleData: {
        uris: [
          {
            uri: 'https://ismit2026.com',
            description: 'Event Website',
            id: 'website'
          },
          {
            uri: 'https://ismit2026.com/program',
            description: 'Event Program',
            id: 'program'
          }
        ]
      },
      
      // Styling
      hexBackgroundColor: '#0D1858',
    }
    
    // Create JWT payload for "Add to Wallet" button
    const claims = {
      iss: GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL,
      aud: 'google',
      origins: ['https://ismit2026.com', 'https://www.ismit2026.com'],
      typ: 'savetowallet',
      payload: {
        eventTicketObjects: [eventTicketObject],
      },
    }
    
    // Sign the JWT
    const token = jwt.sign(claims, GOOGLE_WALLET_PRIVATE_KEY!, {
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
