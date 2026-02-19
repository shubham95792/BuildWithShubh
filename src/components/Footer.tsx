import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com/NeuralShubh', Icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neuralshubh/', Icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/neuralshubh/', Icon: Instagram },
  { label: 'GitHub', href: 'https://github.com/NeuralShubh', Icon: Github },
]

const FOOTER_LINKS = {
  Services: [
    { label: 'Business Website', href: '#services' },
    { label: 'Landing Page', href: '#services' },
    { label: 'E-commerce Setup', href: '#services' },
    { label: 'Website Redesign', href: '#services' },
    { label: 'Maintenance', href: '#services' },
  ],
  Company: [
    { label: 'About Shubham', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#18358C] via-[#1E3A8A] to-[#1A2E78] text-white px-6 pt-16 pb-8">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -left-12 h-72 w-72 rounded-full bg-blue-300/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/15 mb-8">
          <div>
            <div className="text-3xl font-black tracking-tight mb-3">
              BuildWithShubh<span className="text-emerald-400">.</span>
            </div>
            <p className="text-sm text-blue-100/90 leading-relaxed max-w-[260px] mb-6">
              Modern, fast, and affordable websites for small businesses that want to grow online.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, items]) => (
            <div key={title}>
              <div className="text-xs font-bold tracking-widest uppercase text-white/55 mb-4">{title}</div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-blue-100/85 hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/65">
          <span>© 2026 BuildWithShubh. All rights reserved. Made with care in India.</span>
          <span>
            Designed and built by{' '}
            <a href="https://www.linkedin.com/in/shubham-patil-66918b39b/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-300 transition-colors">
              Shubham Patil
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
