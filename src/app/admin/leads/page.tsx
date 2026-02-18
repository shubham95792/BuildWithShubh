'use client'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  business_type: string
  message: string
  created_at: string
  status: string
  notes: string
}

const STATUSES = ['New', 'Contacted', 'Converted', 'Closed']
const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Converted: 'bg-emerald-100 text-emerald-700',
  Closed: 'bg-slate-100 text-slate-600',
}

const PAGE_SIZE = 10

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    let query = supabase
      .from('contact_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    if (statusFilter) query = query.eq('status', statusFilter)

    const { data, count } = await query
    setLeads(data || [])
    setTotal(count || 0)
    setLoading(false)
  }, [page, search, statusFilter])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      fetchLeads()
    })
    return () => cancelAnimationFrame(frame)
  }, [fetchLeads])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status } : null))
    showToast('Status updated')
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('contact_submissions').delete().eq('id', id)
    setLeads((prev) => prev.filter((l) => l.id !== id))
    setSelected(null)
    showToast('Lead deleted')
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showToast(`${label} copied`)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-5">
      {toast && <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl">{toast}</div>}

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leads</h1>
          <p className="text-slate-500 text-sm mt-1">{total} total submissions</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(0)
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Name', 'Email', 'Phone', 'Business Type', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No leads found.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{lead.name}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.email}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.phone || '-'}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.business_type}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status || 'New'}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[lead.status] || STATUS_COLORS.New}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(lead)}
                        className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Lead Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <select
                  value={selected.status || 'New'}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[selected.status] || STATUS_COLORS.New}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {[
                { label: 'Name', value: selected.name },
                { label: 'Business Type', value: selected.business_type },
                { label: 'Date', value: new Date(selected.created_at).toLocaleString('en-IN') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-sm font-medium text-slate-900">{value}</div>
                </div>
              ))}

              <div>
                <div className="text-xs text-slate-500 mb-1">Email</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-slate-900 break-all">{selected.email}</div>
                  <button
                    onClick={() => copyToClipboard(selected.email, 'Email')}
                    className="text-xs font-medium text-slate-700 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {selected.phone && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Phone</div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-slate-900">{selected.phone}</div>
                    <button
                      onClick={() => copyToClipboard(selected.phone, 'Phone')}
                      className="text-xs font-medium text-slate-700 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs text-slate-500 mb-1">Message</div>
                <div className="text-sm text-slate-700 bg-slate-50 rounded-xl p-4 leading-relaxed">{selected.message}</div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl text-center hover:bg-blue-500 transition-colors"
              >
                Send Email
              </a>
              <button
                onClick={() => deleteLead(selected.id)}
                className="px-4 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
