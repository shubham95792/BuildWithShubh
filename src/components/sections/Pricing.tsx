'use client'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '4,999',
    period: 'one-time • ready in 5-7 days',
    bestFor: 'Best for first-time business websites',
    features: [
      '3 custom-designed pages',
      'Mobile-responsive layout',
      'Contact form',
      'Google Maps integration',
      '1 month free support',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    price: '9,999',
    period: 'one-time • ready in 10-14 days',
    bestFor: 'Best for growing local businesses',
    features: [
      '5 custom-designed pages',
      'Basic SEO optimization',
      'Speed optimization',
      'Google Search Console setup',
      'WhatsApp chat button',
      '3 months free support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '19,999',
    period: 'one-time • ready in 14-21 days',
    bestFor: 'Best for scale-focused businesses',
    features: [
      'Fully custom design',
      'Advanced SEO setup',
      'Google Analytics setup',
      'Performance optimization',
      'Blog / CMS setup',
      '6 months free support',
    ],
    popular: false,
  },
]

const cardClass = (popular: boolean) =>
  popular
    ? 'relative rounded-3xl p-8 md:p-9 border border-blue-900 bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-2xl md:scale-[1.04]'
    : 'relative rounded-3xl p-8 md:p-9 border border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
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
            PRICING
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">Simple, Honest Pricing</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            No hourly billing. No surprise invoices. Pick a plan and know exactly what you are getting.
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Fixed pricing</span>
            <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">No hidden fees</span>
            <span className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">Direct founder support</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={cardClass(plan.popular)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${plan.popular ? 'text-blue-200' : 'text-slate-400'}`}>
                {plan.name}
              </p>
              <p className={`text-xs font-semibold mb-3 ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>{plan.bestFor}</p>

              <div className="flex items-start gap-1 mb-1">
                <span className={`text-2xl font-bold mt-1 ${plan.popular ? 'text-blue-100' : 'text-slate-800'}`}>₹</span>
                <span className={`text-5xl md:text-6xl font-black tracking-tight leading-none ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
              </div>

              <p className={`text-sm mb-7 ${plan.popular ? 'text-blue-200' : 'text-slate-500'}`}>{plan.period}</p>

              <div className={`h-px mb-6 ${plan.popular ? 'bg-white/15' : 'bg-slate-200'}`} />

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className={`leading-relaxed ${plan.popular ? 'text-blue-100' : 'text-slate-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-900/25'
                    : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'
                }`}
              >
                Get Started
              </a>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Need a custom scope? <a href="#contact" className="font-semibold text-blue-700 hover:text-blue-600">Request a custom quote</a>.
        </p>
      </div>
    </section>
  )
}
