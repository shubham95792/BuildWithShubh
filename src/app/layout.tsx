// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BuildWithShubh — Modern Websites for Small Businesses',
  description:
    'Helping small businesses build modern, fast, and affordable websites that convert visitors into customers. Based in Pune, India.',
  keywords: [
    'website development', 'small business website', 'affordable web design',
    'freelance web developer pune', 'Next.js developer india', 'BuildWithShubh',
  ],
  authors: [{ name: 'Shubham Patil', url: 'https://buildwithshubh.com' }],
  creator: 'Shubham Patil',
  openGraph: {
    type: 'website',
    url: 'https://buildwithshubh.com',
    title: 'BuildWithShubh — Modern Websites for Small Businesses',
    description: 'Modern, fast and affordable websites designed to help your business grow online.',
    siteName: 'BuildWithShubh',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildWithShubh — Modern Websites for Small Businesses',
    description: 'Modern, fast and affordable websites designed to help your business grow online.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3A8A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}