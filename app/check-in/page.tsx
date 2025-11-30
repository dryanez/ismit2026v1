'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { CheckCircle2, XCircle, Camera, RefreshCw, Ticket, Building, MapPin, Gift, AlertTriangle, QrCode, Users, Smartphone } from 'lucide-react'

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
  const [scannerReady, setScannerReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scannerRef = useRef<any>(null)
  const html5QrcodeRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    import('html5-qrcode').then((module) => {
      html5QrcodeRef.current = module
      setScannerReady(true)
    }).catch((err) => {
      console.error('Failed to load QR scanner:', err)
    })
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
      }
    }
  }, [mounted])

  const startScanner = useCallback(() => {
    if (!html5QrcodeRef.current) return
    
    setScanning(true)
    setResult(null)

    setTimeout(() => {
      const { Html5QrcodeScanner, Html5QrcodeScanType } = html5QrcodeRef.current
      
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
        },
        false
      )

      scanner.render(
        async (decodedText: string) => {
          await scanner.clear()
          scannerRef.current = null
          setScanning(false)
          await validateTicket(decodedText)
        },
        (error: any) => {
          console.debug('Scan error:', error)
        }
      )

      scannerRef.current = scanner
    }, 100)
  }, [])

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
      setResult({ success: false, message: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const resetScanner = () => {
    setResult(null)
    startScanner()
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">iSMIT 2026</h1>
                <p className="text-white/80 text-sm">Check-In Scanner</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white/80" />
                <span className="text-3xl font-bold text-white">{scanCount}</span>
              </div>
              <div className="text-white/70 text-xs">Checked in</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {!result && (
          <div className="space-y-6">
            {!scanning ? (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-3xl p-8 mb-6 border border-violet-500/30">
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-600 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Ready to Scan</h2>
                  <p className="text-slate-400 text-sm mb-6">Tap the button below to start scanning attendee QR codes</p>
                  <button 
                    onClick={startScanner}
                    disabled={!scannerReady}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-lg shadow-violet-500/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Camera className="h-6 w-6" />
                    {scannerReady ? 'Start Scanner' : 'Loading...'}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="h-4 w-4 text-violet-400" />
                    <span className="text-sm font-medium text-white">Tips</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1 text-left">
                    <li>• Hold phone steady over QR code</li>
                    <li>• Ensure good lighting</li>
                    <li>• QR code can be from email or wallet</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800">
                  <div id="qr-reader" className="rounded-2xl overflow-hidden" style={{ width: '100%' }} />
                </div>
                <button 
                  onClick={stopScanner}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 border border-slate-700"
                >
                  <XCircle className="h-5 w-5" />
                  Cancel Scanning
                </button>
              </div>
            )}
            {loading && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-700">
                  <RefreshCw className="h-12 w-12 animate-spin mx-auto text-violet-400" />
                  <p className="text-white mt-4 font-medium">Validating ticket...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {result.success && !result.alreadyCheckedIn ? (
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl p-6 border border-emerald-500/30 text-center">
                <div className="bg-gradient-to-br from-emerald-500 to-green-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-400">Check-In Success!</h2>
                <p className="text-emerald-300/70 text-sm mt-1">Attendee has been checked in</p>
              </div>
            ) : result.alreadyCheckedIn ? (
              <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-3xl p-6 border border-amber-500/30 text-center">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-400">Already Checked In</h2>
                <p className="text-amber-300/70 text-sm mt-1">
                  {result.checkedInAt && `At: ${new Date(result.checkedInAt).toLocaleString()}`}
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-3xl p-6 border border-red-500/30 text-center">
                <div className="bg-gradient-to-br from-red-500 to-rose-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
                  <XCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-red-400">Invalid Ticket</h2>
                <p className="text-red-300/70 text-sm mt-1">{result.message}</p>
              </div>
            )}

            {result.ticket && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 p-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {result.ticket.firstName[0]}{result.ticket.lastName[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{result.ticket.firstName} {result.ticket.lastName}</h3>
                      <p className="text-slate-400 text-sm">{result.ticket.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3">
                    <div className="bg-violet-600/20 p-2 rounded-lg"><Ticket className="h-5 w-5 text-violet-400" /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Ticket</p>
                      <p className="text-white font-medium">{result.ticket.ticketType}</p>
                      <p className="text-slate-500 text-xs">{result.ticket.ticketNumber}</p>
                    </div>
                  </div>
                  {result.ticket.affiliation && (
                    <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3">
                      <div className="bg-indigo-600/20 p-2 rounded-lg"><Building className="h-5 w-5 text-indigo-400" /></div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Affiliation</p>
                        <p className="text-white font-medium">{result.ticket.affiliation}</p>
                      </div>
                    </div>
                  )}
                  {result.ticket.country && (
                    <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3">
                      <div className="bg-cyan-600/20 p-2 rounded-lg"><MapPin className="h-5 w-5 text-cyan-400" /></div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Country</p>
                        <p className="text-white font-medium">{result.ticket.country}</p>
                      </div>
                    </div>
                  )}
                  {result.ticket.addOns && result.ticket.addOns.length > 0 && (
                    <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                      <div className="bg-pink-600/20 p-2 rounded-lg"><Gift className="h-5 w-5 text-pink-400" /></div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Add-ons</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {result.ticket.addOns.map((addon, i) => (
                            <span key={i} className="bg-pink-600/20 text-pink-300 text-xs px-2 py-1 rounded-lg">{addon}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button onClick={resetScanner} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-violet-500/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3">
                <Camera className="h-6 w-6" />
                Scan Next Attendee
              </button>
              <button onClick={() => setResult(null)} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 border border-slate-700">
                Back to Home
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 py-3">
        <p className="text-center text-slate-500 text-xs">iSMIT 2026 • Nuremberg, Germany • July 9-11</p>
      </footer>
    </div>
  )
}
