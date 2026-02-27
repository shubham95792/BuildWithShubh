'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const FOUNDER_IMAGE =
  'https://res.cloudinary.com/dl1jueuj3/image/upload/v1772213832/Image_ky1fkg.png'

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-500/20 via-blue-300/10 to-emerald-400/20 blur-2xl" />
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-blue-100 bg-white shadow-2xl">
              {!imgError ? (
                <img
                  src={FOUNDER_IMAGE}
                  alt="Shubham Patil"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center text-5xl font-bold text-white">
                  SP
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            <div className="absolute -bottom-5 -right-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-3xl font-extrabold text-blue-900 leading-none">15+</div>
              <div className="text-xs text-gray-500 font-semibold mt-1 tracking-wide">Projects Delivered</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-3 block">About Me</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">Shubham Patil</h2>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-6">Web Developer & Digital Growth Partner</p>

            <p className="text-gray-600 leading-relaxed mb-4">
              I&apos;m an MCA student with a genuine passion for helping small businesses get online with a website they&apos;re proud of. I believe every business - no matter how small - deserves a fast, beautiful, professional web presence.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Unlike agencies that treat you like a ticket number, I provide personal, reliable service with direct communication at every step. You&apos;ll always know what&apos;s happening with your project.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              My focus is simple: build clean, performance-driven websites that actually bring in customers - not just something that looks good on paper.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { label: 'MCA Student', green: false },
                { label: 'Performance First', green: false },
                { label: '100% Client Satisfaction', green: true },
                { label: 'Mobile-First Design', green: false },
                { label: 'SEO Aware', green: false },
              ].map(({ label, green }) => (
                <span
                  key={label}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    green
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-900 border-blue-100'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
