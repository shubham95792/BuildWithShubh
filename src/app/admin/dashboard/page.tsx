'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellRing, CalendarDays, Clock3, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

interface Submission {
  id: string
  name: string
  email: string
  business_type: string
  created_at: string
  status: string
}

interface Stats {
  total: number
  thisMonth: number
  thisWeek: number
  newLeads: number
}

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Converted: 'bg-emerald-100 text-emerald-700',
  Closed: 'bg-slate-100 text-slate-600',
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, thisMonth: 0, thisWeek: 0, newLeads: 0 })
  const [recent, setRecent] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString()

      const [{ count: total }, { count: thisMonth }, { count: thisWeek }, { count: newLeads }, { data: recent }] =
        await Promise.all([
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeek),
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'New'),
          supabase
            .from('contact_submissions')
            .select('id,name,email,business_type,created_at,status')
            .order('created_at', { ascending: false })
            .limit(6),
        ])

      setStats({ total: total || 0, thisMonth: thisMonth || 0, thisWeek: thisWeek || 0, newLeads: newLeads || 0 })
      setRecent(recent || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const metricCards = [
    {
      label: 'Total Leads',
      value: stats.total,
      icon: Users,
      accent: 'from-blue-600 to-blue-500',
      chip: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'This Month',
      value: stats.thisMonth,
      icon: CalendarDays,
      accent: 'from-emerald-600 to-emerald-500',
      chip: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'This Week',
      value: stats.thisWeek,
      icon: Clock3,
      accent: 'from-violet-600 to-violet-500',
      chip: 'bg-violet-50 text-violet-700 border-violet-100',
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      icon: BellRing,
      accent: 'from-amber-600 to-amber-500',
      chip: 'bg-amber-50 text-amber-700 border-amber-100',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-32 rounded-2xl bg-white border border-slate-200 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of your lead pipeline and recent activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map(({ label, value, icon: Icon, accent, chip }) => (
          <div key={label} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`} />
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${chip}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="mt-4 text-3xl font-black text-slate-900 tracking-tight">{value}</div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-blue-700 hover:text-blue-600">
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recent.length === 0 && <div className="px-6 py-10 text-center text-slate-400 text-sm">No leads yet.</div>}
          {recent.map((s) => (
            <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {s.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">{s.name}</div>
                  <div className="text-xs text-slate-500 truncate">{s.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-4">
                <span className="text-xs text-slate-500 hidden sm:block">{s.business_type}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[s.status] || STATUS_COLORS.New}`}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
