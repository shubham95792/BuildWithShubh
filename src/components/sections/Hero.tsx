'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Sparkles, TrendingUp, Zap } from 'lucide-react'

const AVATAR_BADGES = [
  { label: 'R', className: 'bg-blue-900' },
  { label: 'P', className: 'bg-blue-500' },
  { label: 'S', className: 'bg-emerald-500' },
  { label: 'M', className: 'bg-indigo-500' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 px-6 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 70% 35%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 25% 80%, rgba(16,185,129,0.10) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(30,64,175,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-100 text-blue-900 text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for new projects
            </div>

            <h1 className="font-black text-5xl lg:text-7xl leading-[1.05] tracking-tight text-slate-900 mb-5">
              Build Your
              <br />
              Business Website
              <br />
              With <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">Confidence</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl mb-10">
              Modern, fast, and affordable websites designed to help your business grow online without technical headaches.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-900/25"
              >
                <Rocket className="w-4 h-4" />
                Get Free Consultation
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-slate-200 text-blue-900 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
              <div className="flex">
                {AVATAR_BADGES.map((badge, i) => (
                  <div
                    key={badge.label}
                    className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm -ml-2 first:ml-0 ${badge.className}`}
                    style={{ zIndex: 10 - i }}
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">15+ happy clients</strong> and consistent 5-star rated service
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-500/10 blur-2xl" />
            <div className="relative bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 h-8 bg-slate-100 rounded-lg flex items-center px-3 text-xs text-slate-500">yourclientsite.com</div>
              </div>

              <div className="space-y-4">
                <div className="h-2.5 bg-slate-100 rounded-full" />
                <div className="h-2.5 bg-slate-100 rounded-full w-3/5" />
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="h-16 rounded-xl bg-blue-50 border border-blue-100" />
                  <div className="h-16 rounded-xl bg-emerald-50 border border-emerald-100" />
                  <div className="h-16 rounded-xl bg-indigo-50 border border-indigo-100" />
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full w-4/5" />
              </div>
            </div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatType: 'mirror' }}
              className="absolute -bottom-6 -left-7 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs text-slate-500">Organic Traffic</div>
                  <div className="font-bold text-emerald-600">+340%</div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -top-6 -right-7 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-xs text-slate-500">Lighthouse Score</div>
                  <div className="font-bold text-slate-900">98/100</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-9 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Performance-first builds
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
