'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Scale, Stethoscope, UtensilsCrossed } from 'lucide-react'

const projects = [
  {
    title: 'CareFirst Clinic',
    category: 'Healthcare',
    desc: 'A clean, trustworthy website for a local clinic with appointment booking, doctor profiles, and service listings.',
    tech: ['Next.js', 'Tailwind', 'Supabase'],
    gradient: 'from-blue-900 via-blue-700 to-blue-500',
    Icon: Stethoscope,
  },
  {
    title: 'Spice Garden Restaurant',
    category: 'Restaurant',
    desc: 'A visually rich restaurant website with online menu, table reservation form, and Google Maps integration.',
    tech: ['React', 'Supabase', 'Vercel'],
    gradient: 'from-emerald-900 via-emerald-700 to-emerald-500',
    Icon: UtensilsCrossed,
  },
  {
    title: 'Sharma & Associates',
    category: 'Legal Services',
    desc: 'A professional law firm website with practice areas, team bios, client testimonials, and contact forms.',
    tech: ['Next.js', 'Framer Motion', 'SEO'],
    gradient: 'from-violet-900 via-violet-700 to-violet-500',
    Icon: Scale,
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 px-6 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
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
            MY WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">Projects That Deliver Results</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A selection of websites built for real small businesses. Each project is unique, purposeful, and built to perform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:border-slate-300 transition-all duration-300"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_45%)]" />
                <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <p.Icon className="w-8 h-8" />
                </div>

                <div className="absolute inset-0 bg-slate-950/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Discuss Similar Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-2 leading-tight">{p.title}</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed mb-5">{p.desc}</p>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    View
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
