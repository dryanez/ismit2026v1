'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { CheckCircle2, XCircle, Camera, RefreshCw, Ticket, Building, MapPin, Gift, AlertTriangle, QrCode, Users, Smartphone, ChevronRight } from 'lucide-react'
import Link from 'next/link'

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
  const [checkedInCount, setCheckedInCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [scannerReady, setScannerReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scannerRef = useRef<any>(null)
  const html5QrcodeRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/tickets/stats')
      if (response.ok) {
        const data = await response.json()
        setCheckedInCount(data.checkedIn)
        setTotalCount(data.total)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      fetchStats()
    }
  }, [mounted, fetchStats])

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
        await fetchStats()
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
            <Link 
              href="/check-in/stats"
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center hover:bg-white/30 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white/80" />
                <span className="text-3xl font-bold text-white">{checkedInCount}</span>
                <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white/90 transition-colors" />
              </div>
              <div className="text-white/70 text-xs">{totalCount > 0 ? `of ${totalCount} checked in` : 'Checked in'}</div>
            </Link>
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
                  <p className="text-slate-400 text-sm mb-6">
                    Tap the button below to start scanning attendee QR codes
                  </p>
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
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Hold phone steady over the QR code</li>
                    <li>• Ensure good lighting</li>
                    <li>• Allow camera access when prompted</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 overflow-hidden">
                  <div id="qr-reader" className="rounded-2xl overflow-hidden" />
                </div>
                <button 
                  onClick={stopScanner}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  Stop Scanner
                </button>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-400">Validating ticket...</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4">
            {result.success && !result.alreadyCheckedIn ? (
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl p-6 border border-emerald-500/30">
                <div className="text-center mb-4">
                  <div className="bg-emerald-500 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-emerald-400">Check-In Successful!</h2>
                </div>
                
                {result.ticket && (
                  <div className="bg-slate-900/50 rounded-2xl p-4 space-y-3">
                    <div className="text-center border-b border-slate-700 pb-3">
                      <div className="text-2xl font-bold text-white">
                        {result.ticket.firstName} {result.ticket.lastName}
                      </div>
                      <div className="text-emerald-400 font-mono text-sm">{result.ticket.ticketNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-slate-400" />
                        <span className="text-white">{result.ticket.ticketType}</span>
                      </div>
                      {result.ticket.affiliation && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-slate-400" />
                          <span className="text-white truncate">{result.ticket.affiliation}</span>
                        </div>
                      )}
                      {result.ticket.country && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-white">{result.ticket.country}</span>
                        </div>
                      )}
                    </div>
                    {result.ticket.addOns && result.ticket.addOns.length > 0 && (
                      <div className="flex items-start gap-2 pt-2 border-t border-slate-700">
                        <Gift className="h-4 w-4 text-violet-400 mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                          {result.ticket.addOns.map((addon, i) => (
                            <span key={i} className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full text-xs">
                              {addon}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : result.alreadyCheckedIn ? (
              <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-3xl p-6 border border-amber-500/30">
                <div className="text-center mb-4">
                  <div className="bg-amber-500 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-amber-400">Already Checked In</h2>
                  {result.checkedInAt && (
                    <p className="text-amber-300/70 text-sm mt-1">
                      at {new Date(result.checkedInAt).toLocaleTimeString()}
                    </p>
                  )}
                </div>
                
                {result.ticket && (
                  <div className="bg-slate-900/50 rounded-2xl p-4 text-center">
                    <div className="text-xl font-bold text-white">
                      {result.ticket.firstName} {result.ticket.lastName}
                    </div>
                    <div className="text-amber-400 font-mono text-sm">{result.ticket.ticketNumber}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-3xl p-6 border border-red-500/30">
                <div className="text-center">
                  <div className="bg-red-500 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                    <XCircle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-red-400">Invalid Ticket</h2>
                  <p className="text-red-300/70 mt-2">{result.message}</p>
                </div>
              </div>
            )}

            <button 
              onClick={resetScanner}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
            >
              <RefreshCw className="h-5 w-5" />
              Scan Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
