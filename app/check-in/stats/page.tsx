'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, Clock, Users, UserCheck, ArrowLeft, RefreshCw, Search, X, Ticket, Building, Gift, ChevronDown, ChevronUp } from 'lucide-react'
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
  status: string
  checkedInAt?: string
  issuedAt: string
}

interface AttendeeStats {
  total: number
  checkedIn: number
  pending: number
  checkedInList: TicketInfo[]
  pendingList: TicketInfo[]
}

type ViewMode = 'checked-in' | 'pending'

export default function CheckInStatsPage() {
  const [stats, setStats] = useState<AttendeeStats>({ total: 0, checkedIn: 0, pending: 0, checkedInList: [], pendingList: [] })
  const [viewMode, setViewMode] = useState<ViewMode>('checked-in')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tickets/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [fetchStats])

  const filteredCheckedIn = stats.checkedInList.filter(t => 
    searchQuery === '' || 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPending = stats.pendingList.filter(t => 
    searchQuery === '' || 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentList = viewMode === 'checked-in' ? filteredCheckedIn : filteredPending

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/check-in"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Attendee Stats</h1>
                <p className="text-white/80 text-xs">iSMIT 2026 Check-In</p>
              </div>
            </div>
            <button 
              onClick={fetchStats}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
              title="Refresh stats"
            >
              <RefreshCw className={`h-5 w-5 text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Total */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-400">Total</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          
          {/* Checked In */}
          <button 
            onClick={() => { setViewMode('checked-in'); setSearchQuery(''); }}
            className={`rounded-2xl p-4 border transition-all text-left ${
              viewMode === 'checked-in' 
                ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' 
                : 'bg-slate-900 border-slate-800 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-emerald-400">Checked In</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">{stats.checkedIn}</div>
          </button>
          
          {/* Pending */}
          <button 
            onClick={() => { setViewMode('pending'); setSearchQuery(''); }}
            className={`rounded-2xl p-4 border transition-all text-left ${
              viewMode === 'pending' 
                ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30' 
                : 'bg-slate-900 border-slate-800 hover:border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-amber-400">Pending</span>
            </div>
            <div className="text-3xl font-bold text-amber-400">{stats.pending}</div>
          </button>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="mt-4 bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Check-in Progress</span>
              <span className="text-white font-medium">{Math.round((stats.checkedIn / stats.total) * 100)}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-emerald-400">{stats.checkedIn} checked in</span>
              <span className="text-amber-400">{stats.pending} remaining</span>
            </div>
          </div>
        )}
      </div>

      {/* List Section */}
      <div className="container mx-auto px-4 pb-8">
        {/* Tab Header */}
        <div className={`rounded-t-2xl px-4 py-3 ${
          viewMode === 'checked-in' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {viewMode === 'checked-in' ? (
                <UserCheck className="h-5 w-5 text-emerald-400" />
              ) : (
                <Clock className="h-5 w-5 text-amber-400" />
              )}
              <span className={`font-medium ${viewMode === 'checked-in' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {viewMode === 'checked-in' ? 'Checked In' : 'Pending'} ({currentList.length})
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-900 border-x border-slate-800 px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, email, or ticket number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-slate-500 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="bg-slate-900 rounded-b-2xl border border-slate-800 border-t-0 overflow-hidden">
          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw className="h-8 w-8 text-slate-500 animate-spin mx-auto mb-2" />
              <p className="text-slate-500">Loading...</p>
            </div>
          ) : currentList.length === 0 ? (
            <div className="py-12 text-center">
              {searchQuery ? (
                <>
                  <Search className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">No matching attendees found</p>
                </>
              ) : viewMode === 'checked-in' ? (
                <>
                  <UserCheck className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">No one checked in yet</p>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-400">Everyone has checked in! 🎉</p>
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {currentList.map((ticket, index) => (
                <div key={ticket.ticketId}>
                  <button
                    onClick={() => setExpandedTicket(expandedTicket === ticket.ticketId ? null : ticket.ticketId)}
                    className="w-full px-4 py-3 hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          viewMode === 'checked-in' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white truncate">
                            {ticket.firstName} {ticket.lastName}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{ticket.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {viewMode === 'checked-in' && ticket.checkedInAt && (
                          <span className="text-xs text-slate-500">
                            {new Date(ticket.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                        {expandedTicket === ticket.ticketId ? (
                          <ChevronUp className="h-4 w-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* Expanded Details */}
                  {expandedTicket === ticket.ticketId && (
                    <div className="px-4 pb-4 bg-slate-800/30">
                      <div className="ml-11 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-violet-400" />
                          <span className="text-slate-400">Ticket:</span>
                          <span className="text-white font-mono">{ticket.ticketNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 ml-6">Type:</span>
                          <span className="text-white">{ticket.ticketType}</span>
                        </div>
                        {ticket.affiliation && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-slate-400" />
                            <span className="text-white">{ticket.affiliation}</span>
                          </div>
                        )}
                        {ticket.addOns && ticket.addOns.length > 0 && (
                          <div className="flex items-start gap-2">
                            <Gift className="h-4 w-4 text-violet-400 mt-0.5" />
                            <div className="flex flex-wrap gap-1">
                              {ticket.addOns.map((addon, i) => (
                                <span key={i} className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full text-xs">
                                  {addon}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {viewMode === 'checked-in' && ticket.checkedInAt && (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Checked in at {new Date(ticket.checkedInAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
