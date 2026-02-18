'use client'
import { useEffect, useState } from 'react'
import { Download, ShieldAlert } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ''))
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const newPassword = (form.elements.namedItem('password') as HTMLInputElement).value
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) showToast('Error: ' + error.message)
    else {
      showToast('Password updated')
      form.reset()
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl">{toast}</div>}

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your admin account and exports.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-4">Account</h2>
        <div>
          <label className="text-xs text-slate-500 font-semibold block mb-1.5">Email Address</label>
          <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">{email}</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 font-semibold block mb-1.5">New Password</label>
            <input
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              minLength={6}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <h2 className="font-bold text-red-600">Danger Zone</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">These actions are permanent and should be used carefully.</p>
        <button
          onClick={async () => {
            if (!confirm('Export all leads as CSV?')) return
            const supabase = createClient()
            const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
            if (!data) return
            const headers = ['Name', 'Email', 'Phone', 'Business Type', 'Message', 'Status', 'Date']
            const rows = data.map((r) => [
              r.name,
              r.email,
              r.phone,
              r.business_type,
              r.message?.replace(/,/g, ';'),
              r.status,
              new Date(r.created_at).toLocaleDateString(),
            ])
            const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'leads.csv'
            a.click()
            showToast('Leads exported')
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export All Leads as CSV
        </button>
      </div>
    </div>
  )
}
