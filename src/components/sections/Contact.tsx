'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock3, Mail, MapPin, MessageCircle, PartyPopper, Rocket } from 'lucide-react'
import { validateContactForm, isValidForm } from '@/utils/validation'

const BUSINESS_TYPES = [
  'Retail / Shop',
  'Restaurant / Food',
  'Healthcare / Clinic',
  'Professional Services',
  'Consulting / Coaching',
  'E-commerce',
  'Other',
]

const contactItems = [
  { Icon: Mail, label: 'Email', value: 'shubham95792@gmail.com' },
  { Icon: MessageCircle, label: 'WhatsApp', value: '+91 9579266234' },
  { Icon: MapPin, label: 'Location', value: 'Miraj, Maharashtra' },
  { Icon: Clock3, label: 'Response Time', value: 'Within 24 hours' },
]

const trustPoints = ['Free consultation', 'Transparent pricing', 'No agency middlemen']

export default function Contact() {
  const formLoadedAt = useRef(Date.now())
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [serverErrorDetails, setServerErrorDetails] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    setServerErrorDetails('')

    const validationErrors = validateContactForm(form)
    if (!isValidForm(validationErrors)) {
      setErrors(validationErrors as Record<string, string>)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _honeypot: honeypot,
          _submitted_at: formLoadedAt.current,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        if (data.details) setServerErrorDetails(String(data.details))
        return
      }
      setSuccess(true)
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
      errors[field] ? 'border-red-400' : 'border-slate-200'
    }`

  return (
    <section id="contact" className="relative py-22 px-6 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 xl:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center text-xs font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-3">
              CONTACT
            </span>

            <h2 className="text-4xl xl:text-[54px] font-black text-slate-900 tracking-tight leading-[1.06] mb-4 max-w-xl">
              Let&apos;s Build Your Website Together
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6 text-[1.18rem] max-w-lg">
              Tell me about your business. I will reply within 24 hours with a clear plan and quote.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {trustPoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {point}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactItems.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm shadow-slate-100/60">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-semibold text-slate-800 leading-snug">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/55"
          >
            {success ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Request Sent</h4>
                <p className="text-slate-600">Thanks. I will get back to you within 24 hours with a plan.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="_honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Email <span className="text-blue-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@business.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 9579266234"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Business Type <span className="text-blue-500">*</span>
                    </label>
                    <select
                      name="business_type"
                      value={form.business_type}
                      onChange={handleChange}
                      className={inputClass('business_type')}
                    >
                      <option value="">Select type...</option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errors.business_type && <p className="text-red-500 text-xs mt-1">{errors.business_type}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Tell me about your project <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Hi Shubham, I need a website for my business..."
                    className={inputClass('message')}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {serverError && (
                  <div className="text-red-700 text-sm mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p>{serverError}</p>
                    {serverErrorDetails && <p className="text-xs mt-1 text-red-600">{serverErrorDetails}</p>}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 shadow-lg shadow-blue-900/25"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Send My Request
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
