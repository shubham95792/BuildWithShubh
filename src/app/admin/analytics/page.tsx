'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface MonthData {
  month: string
  count: number
}

interface TypeData {
  business_type: string
  count: number
}

const COLORS = ['#2563EB', '#16A34A', '#7C3AED', '#D97706', '#DC2626', '#0891B2']

export default function AnalyticsPage() {
  const [monthData, setMonthData] = useState<MonthData[]>([])
  const [typeData, setTypeData] = useState<TypeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('contact_submissions').select('created_at, business_type').order('created_at', { ascending: true })

      if (!data) {
        setLoading(false)
        return
      }

      const monthMap: Record<string, number> = {}
      const typeMap: Record<string, number> = {}

      data.forEach((row) => {
        const d = new Date(row.created_at)
        const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
        monthMap[label] = (monthMap[label] || 0) + 1
        typeMap[row.business_type] = (typeMap[row.business_type] || 0) + 1
      })

      setMonthData(Object.entries(monthMap).map(([month, count]) => ({ month, count })))
      setTypeData(
        Object.entries(typeMap)
          .map(([business_type, count]) => ({ business_type, count }))
          .sort((a, b) => b.count - a.count)
      )
      setLoading(false)
    }
    fetch()
  }, [])

  const maxMonth = Math.max(...monthData.map((d) => d.count), 1)
  const maxType = Math.max(...typeData.map((d) => d.count), 1)
  const total = typeData.reduce((s, d) => s + d.count, 0)

  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[1, 2].map((n) => (
          <div key={n} className="h-72 rounded-2xl bg-white border border-slate-200 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Lead trends and business-type distribution.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-6">Leads Per Month</h2>
        {monthData.length === 0 ? (
          <div className="text-center text-slate-400 text-sm py-8">No data yet.</div>
        ) : (
          <div className="flex items-end gap-3 h-52 overflow-x-auto pb-2">
            {monthData.map(({ month, count }) => (
              <div key={month} className="flex flex-col items-center gap-2 min-w-[52px] flex-1">
                <span className="text-xs font-bold text-slate-700">{count}</span>
                <div
                  className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-500"
                  style={{ height: `${(count / maxMonth) * 170}px`, minHeight: '6px' }}
                />
                <span className="text-xs text-slate-500 whitespace-nowrap">{month}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-6">Leads by Business Type</h2>
        {typeData.length === 0 ? (
          <div className="text-center text-slate-400 text-sm py-8">No data yet.</div>
        ) : (
          <div className="space-y-4">
            {typeData.map(({ business_type, count }, i) => (
              <div key={business_type}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-sm font-medium text-slate-700 truncate">{business_type}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className="text-sm font-bold text-slate-900">{count}</span>
                    <span className="text-xs text-slate-500">({Math.round((count / total) * 100)}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(count / maxType) * 100}%`, background: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
