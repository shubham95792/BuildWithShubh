'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, LayoutDashboard, LineChart, LogOut, Menu, Settings, X } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: BarChart3 },
  { label: 'Analytics', href: '/admin/analytics', icon: LineChart },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  const currentPage = pathname.split('/').pop()?.replace('-', ' ') || 'dashboard'

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-100 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}
      >
        <div className="px-6 py-5 border-b border-slate-800/80">
          <div className="text-xl font-extrabold tracking-tight">
            BuildWithShubh<span className="text-emerald-400">.</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Admin Console</div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-800/80">
          <div className="px-3 py-2.5 mb-2 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Signed in as</div>
            <div className="text-sm text-slate-100 font-medium truncate">{user?.email || 'Admin User'}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm sm:text-base font-semibold text-slate-700 capitalize">{currentPage}</div>
          <Link href="/" target="_blank" className="text-xs sm:text-sm text-blue-700 font-medium hover:underline">
            View site
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
