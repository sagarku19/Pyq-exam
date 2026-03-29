import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: "PYQ Platform — Previous Year Questions for JEE, NEET, GATE & More",
    template: "%s | PYQ Platform",
  },
  description:
    "India's most complete PYQ platform. Chapter-wise practice, AI explanations, and full mock tests for JEE, NEET, GATE, UPSC, SSC CGL, IBPS PO and CAT.",
  keywords: ["JEE PYQ", "NEET previous year", "GATE questions", "UPSC question bank", "SSC CGL", "CAT preparation"],
  openGraph: {
    title: "PYQ Platform — India's Most Complete PYQ Bank",
    description: "50,000+ questions across 9 exams. Chapter-wise practice & mock tests.",
    type: "website",
    locale: "en_IN",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  )
}
