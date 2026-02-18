'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl shadow-md border-b border-slate-200/80'
          : 'bg-white/75 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="text-[1.75rem] leading-none font-black tracking-tight text-blue-900">
          BuildWithShubh<span className="text-emerald-500">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur px-2.5 py-1.5 shadow-sm">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-1 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white text-sm font-bold rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all shadow-md shadow-blue-900/25"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </li>
        </ul>

        <button
          className="md:hidden p-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-2 shadow-lg">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white text-sm font-bold text-center rounded-xl"
          >
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  )
}
