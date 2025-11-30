/**
 * Resend Email Integration
 * Sends ticket confirmation emails with QR codes and wallet links
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'tickets@ismit2026.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ismit2026.com'

export interface TicketEmailData {
  to: string
  ticketNumber: string
  ticketId: string
  firstName: string
  lastName: string
  ticketType: string
  totalPrice: number
  currency: string
  addOns: string[]
  qrCodeImage: string // Base64 data URL
  appleWalletUrl?: string | null
  googleWalletUrl?: string | null
}

/**
 * Check if Resend is configured
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY
}

/**
 * Send ticket confirmation email
 */
export async function sendTicketEmail(data: TicketEmailData): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!isResendConfigured()) {
    console.warn('[Resend] Not configured - skipping email')
    return { success: false, error: 'Email service not configured' }
  }
  
  console.log('[Resend] Sending ticket email to:', data.to)
  
  try {
    const addOnsHtml = data.addOns.length > 0 
      ? `<p style="margin: 0; color: #666;"><strong>Add-ons:</strong> ${data.addOns.join(', ')}</p>`
      : ''
    
    const walletButtonsHtml = generateWalletButtons(data.appleWalletUrl, data.googleWalletUrl)
    
    const { data: result, error } = await resend.emails.send({
      from: `iSMIT 2026 <${FROM_EMAIL}>`,
      to: data.to,
      subject: `🎫 Your iSMIT 2026 Ticket - ${data.ticketNumber}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your iSMIT 2026 Ticket</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0D1858 0%, #1a2980 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎫 iSMIT 2026</h1>
              <p style="margin: 10px 0 0; color: #85AFFB; font-size: 16px;">Your ticket is confirmed!</p>
            </td>
          </tr>
          
          <!-- Ticket Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #0D1858; font-size: 20px;">Hello ${data.firstName}!</h2>
              <p style="margin: 0 0 20px; color: #333; line-height: 1.6;">
                Thank you for registering for iSMIT 2026. Your ticket has been confirmed and is ready to use.
              </p>
              
              <!-- Ticket Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin: 0 0 5px; color: #85AFFB; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Ticket Number</p>
                          <p style="margin: 0 0 15px; color: #0D1858; font-size: 24px; font-weight: bold;">${data.ticketNumber}</p>
                          
                          <p style="margin: 0 0 5px; color: #85AFFB; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Attendee</p>
                          <p style="margin: 0 0 15px; color: #333; font-size: 16px;">${data.firstName} ${data.lastName}</p>
                          
                          <p style="margin: 0 0 5px; color: #85AFFB; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Ticket Type</p>
                          <p style="margin: 0 0 15px; color: #333; font-size: 16px;">${data.ticketType}</p>
                          
                          ${addOnsHtml}
                          
                          <p style="margin: 15px 0 5px; color: #85AFFB; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total Paid</p>
                          <p style="margin: 0; color: #0D1858; font-size: 20px; font-weight: bold;">€${data.totalPrice.toFixed(2)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- QR Code -->
              <table width="100%" cellpadding="0" cellspacing="0" style="text-align: center; margin-bottom: 20px;">
                <tr>
                  <td align="center" style="padding: 20px;">
                    <p style="margin: 0 0 15px; color: #666; font-size: 14px;">Scan this QR code at the venue for check-in:</p>
                    <img src="${data.qrCodeImage}" alt="Ticket QR Code" width="200" height="200" style="border: 4px solid #0D1858; border-radius: 8px;">
                  </td>
                </tr>
              </table>
              
              <!-- Wallet Buttons -->
              ${walletButtonsHtml}
              
              <!-- Event Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0D1858; border-radius: 8px; margin-top: 20px;">
                <tr>
                  <td style="padding: 20px; color: #ffffff;">
                    <h3 style="margin: 0 0 15px; color: #85AFFB;">Event Details</h3>
                    <p style="margin: 0 0 10px;">📅 <strong>Date:</strong> November 18-21, 2026</p>
                    <p style="margin: 0 0 10px;">📍 <strong>Location:</strong> Nuremberg, Germany</p>
                    <p style="margin: 0;">🌐 <strong>Website:</strong> <a href="https://www.ismit2026.com" style="color: #85AFFB;">www.ismit2026.com</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #666; font-size: 12px;">
                Please bring a valid ID matching the attendee name for check-in.
              </p>
              <p style="margin: 0; color: #999; font-size: 11px;">
                Questions? Contact us at <a href="mailto:registration@ismit2026.com" style="color: #85AFFB;">registration@ismit2026.com</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })
    
    if (error) {
      console.error('[Resend] Error sending email:', error)
      return { success: false, error: error.message }
    }
    
    console.log('[Resend] Email sent successfully, ID:', result?.id)
    return { success: true, id: result?.id }
    
  } catch (error: any) {
    console.error('[Resend] Exception sending email:', error)
    return { success: false, error: error.message || 'Failed to send email' }
  }
}

/**
 * Generate wallet buttons HTML
 */
function generateWalletButtons(appleWalletUrl?: string | null, googleWalletUrl?: string | null): string {
  if (!appleWalletUrl && !googleWalletUrl) {
    return `
      <table width="100%" cellpadding="0" cellspacing="0" style="text-align: center; margin-bottom: 20px;">
        <tr>
          <td align="center">
            <p style="margin: 0; color: #666; font-size: 14px;">
              💡 Save this email or take a screenshot of the QR code for easy access at check-in.
            </p>
          </td>
        </tr>
      </table>
    `
  }
  
  let buttonsHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="text-align: center; margin-bottom: 20px;">
      <tr>
        <td align="center">
          <p style="margin: 0 0 15px; color: #666; font-size: 14px;">Add to your phone's wallet for easy access:</p>
          <table cellpadding="0" cellspacing="0">
            <tr>
  `
  
  if (appleWalletUrl) {
    buttonsHtml += `
      <td style="padding: 0 10px;">
        <a href="${appleWalletUrl}" style="display: inline-block;">
          <img src="https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/images/add-to-apple-wallet-logo.svg" 
               alt="Add to Apple Wallet" 
               height="44" 
               style="height: 44px;">
        </a>
      </td>
    `
  }
  
  if (googleWalletUrl) {
    buttonsHtml += `
      <td style="padding: 0 10px;">
        <a href="${googleWalletUrl}" style="display: inline-block;">
          <img src="https://pay.google.com/about/static_kcs/images/logos/google-pay-mark-800.png" 
               alt="Add to Google Wallet" 
               height="44" 
               style="height: 44px; border-radius: 4px;">
        </a>
      </td>
    `
  }
  
  buttonsHtml += `
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
  
  return buttonsHtml
}

/**
 * Send a test email
 */
export async function sendTestEmail(to: string): Promise<{ success: boolean; error?: string }> {
  if (!isResendConfigured()) {
    return { success: false, error: 'Resend not configured' }
  }
  
  try {
    const { error } = await resend.emails.send({
      from: `iSMIT 2026 <${FROM_EMAIL}>`,
      to,
      subject: 'Test Email from iSMIT 2026',
      html: '<h1>Test Email</h1><p>If you received this, the email system is working!</p>',
    })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
