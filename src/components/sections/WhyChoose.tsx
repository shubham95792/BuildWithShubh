'use client'
import { motion } from 'framer-motion'
import { BadgeDollarSign, Rocket, Smartphone, Target, Headset, Gauge } from 'lucide-react'

const reasons = [
  {
    Icon: BadgeDollarSign,
    code: 'AP',
    title: 'Affordable Pricing',
    desc: 'Professional results without agency price tags. Transparent, fixed pricing with no hidden surprises or hourly billing mysteries.',
    accent: 'from-blue-500/15 to-indigo-500/10',
    iconClass: 'text-blue-700 bg-blue-50 border-blue-100',
  },
  {
    Icon: Rocket,
    code: 'FD',
    title: 'Fast Delivery',
    desc: "Most projects delivered in 7-14 days. You don't need to wait months to have your business online and generating leads.",
    accent: 'from-violet-500/15 to-blue-500/10',
    iconClass: 'text-violet-700 bg-violet-50 border-violet-100',
  },
  {
    Icon: Smartphone,
    code: 'RD',
    title: 'Fully Responsive Design',
    desc: 'Every website looks and works perfectly on phones, tablets, and desktops. Because 70% of your visitors use mobile devices.',
    accent: 'from-cyan-500/15 to-blue-500/10',
    iconClass: 'text-cyan-700 bg-cyan-50 border-cyan-100',
  },
  {
    Icon: Target,
    code: 'BS',
    title: 'Business-Focused Strategy',
    desc: "I don't just build pretty websites - I build websites that serve a business goal: more calls, more bookings, more sales.",
    accent: 'from-emerald-500/15 to-teal-500/10',
    iconClass: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  {
    Icon: Headset,
    code: 'OS',
    title: 'Ongoing Support',
    desc: "Questions after launch? Need a quick update? I'm one message away. You get real support from the person who built your site.",
    accent: 'from-amber-500/15 to-orange-500/10',
    iconClass: 'text-amber-700 bg-amber-50 border-amber-100',
  },
  {
    Icon: Gauge,
    code: 'PO',
    title: 'Performance Optimized',
    desc: 'Fast-loading sites with optimized code, compressed images, and clean architecture. Google loves fast sites - and so do your customers.',
    accent: 'from-sky-500/15 to-indigo-500/10',
    iconClass: 'text-sky-700 bg-sky-50 border-sky-100',
  },
]

export default function WhyChoose() {
  return (
    <section id="why" className="relative py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-xs font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-4">
            WHY BuildWithShubh
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            The Smarter Way to Get a Business Website
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Forget overpriced agencies with 3-month timelines. Here is what working with me looks like.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${r.accent}`} />
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${r.iconClass}`}>
                  <r.Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-slate-400">{r.code}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">{r.title}</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">{r.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
