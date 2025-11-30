'use client'

import { useState, useEffect, useRef } from 'react'
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Camera, RefreshCw, User, Ticket, Building, MapPin, Calendar, AlertTriangle } from 'lucide-react'

interface TicketInfo {
  ticketId: string
  ticketNumber: string
  firstName: string
  lastName: string
  email: string
  ticketType: string
  affiliation?: string
  country?: string
  addOns?: string[]
  status: 'valid' | 'used' | 'checked_in'
  checkedInAt?: string
  issuedAt: string
}

interface ScanResult {
  success: boolean
  message: string
  ticket?: TicketInfo
  alreadyCheckedIn?: boolean
  checkedInAt?: string
}

export default function CheckInPage() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [scanCount, setScanCount] = useState(0)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    // Cleanup scanner on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
      }
    }
  }, [])

  const startScanner = () => {
    setScanning(true)
    setResult(null)

    // Wait for DOM to render the scanner element
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
        },
        false
      )

      scanner.render(
        async (decodedText) => {
          // Stop scanner after successful scan
          await scanner.clear()
          scannerRef.current = null
          setScanning(false)
          
          // Validate the QR code
          await validateTicket(decodedText)
        },
        (error) => {
          // Ignore scan errors (happens while searching for QR)
          console.debug('Scan error:', error)
        }
      )

      scannerRef.current = scanner
    }, 100)
  }

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.clear()
      scannerRef.current = null
    }
    setScanning(false)
  }

  const validateTicket = async (qrData: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/tickets/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrData }),
      })

      const data = await response.json()
      setResult(data)
      
      if (data.success && !data.alreadyCheckedIn) {
        setScanCount(prev => prev + 1)
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const resetScanner = () => {
    setResult(null)
    startScanner()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">iSMIT 2026 Check-In</h1>
              <p className="text-white/60 text-sm">Scan attendee QR codes</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{scanCount}</div>
              <div className="text-white/60 text-xs">Checked in</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        {/* Scanner Section */}
        {!result && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Camera className="h-6 w-6" />
                QR Scanner
              </CardTitle>
              <CardDescription className="text-white/60">
                Point camera at attendee&apos;s QR code
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanning ? (
                <div className="text-center py-12">
                  <Button 
                    onClick={startScanner} 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Start Scanner
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    id="qr-reader" 
                    className="rounded-lg overflow-hidden"
                    style={{ width: '100%' }}
                  />
                  <Button 
                    onClick={stopScanner} 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              
              {loading && (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-purple-400" />
                  <p className="text-white/60 mt-2">Validating ticket...</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {result && (
          <div className="space-y-4">
            {/* Status Card */}
            <Card className={`${
              result.success && !result.alreadyCheckedIn
                ? 'bg-green-500/20 border-green-500/50'
                : result.alreadyCheckedIn
                ? 'bg-yellow-500/20 border-yellow-500/50'
                : 'bg-red-500/20 border-red-500/50'
            } backdrop-blur-sm`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  {result.success && !result.alreadyCheckedIn ? (
                    <>
                      <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto" />
                      <h2 className="text-2xl font-bold text-green-400 mt-4">Check-In Success!</h2>
                    </>
                  ) : result.alreadyCheckedIn ? (
                    <>
                      <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto" />
                      <h2 className="text-2xl font-bold text-yellow-400 mt-4">Already Checked In</h2>
                      <p className="text-yellow-200/80 mt-2">
                        {result.checkedInAt && `At: ${new Date(result.checkedInAt).toLocaleString()}`}
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                      <h2 className="text-2xl font-bold text-red-400 mt-4">Invalid Ticket</h2>
                      <p className="text-red-200/80 mt-2">{result.message}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ticket Details */}
            {result.ticket && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Ticket Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Attendee Name */}
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {result.ticket.firstName} {result.ticket.lastName}
                      </p>
                      <p className="text-white/60 text-sm">{result.ticket.email}</p>
                    </div>
                  </div>

                  {/* Ticket Type */}
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-purple-400" />
                    <div>
                      <Badge className="bg-purple-600">{result.ticket.ticketType}</Badge>
                      <p className="text-white/60 text-xs mt-1">{result.ticket.ticketNumber}</p>
                    </div>
                  </div>

                  {/* Affiliation */}
                  {result.ticket.affiliation && (
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-purple-400" />
                      <p className="text-white/80">{result.ticket.affiliation}</p>
                    </div>
                  )}

                  {/* Country */}
                  {result.ticket.country && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      <p className="text-white/80">{result.ticket.country}</p>
                    </div>
                  )}

                  {/* Add-ons */}
                  {result.ticket.addOns && result.ticket.addOns.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div className="flex flex-wrap gap-2">
                        {result.ticket.addOns.map((addon, i) => (
                          <Badge key={i} variant="outline" className="border-white/30 text-white/80">
                            {addon}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={resetScanner}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Camera className="mr-2 h-5 w-5" />
                Scan Next
              </Button>
              <Button 
                onClick={() => setResult(null)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>Scan the QR code from the attendee&apos;s email or mobile wallet.</p>
          <p className="mt-1">Each ticket can only be checked in once.</p>
        </div>
      </main>
    </div>
  )
}
