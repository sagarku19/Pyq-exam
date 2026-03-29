import Link from 'next/link'
import { BookOpen } from 'lucide-react'

const LINKS = {
  Exams: [
    { href: '/exams/jee-main', label: 'JEE Main' },
    { href: '/exams/jee-advanced', label: 'JEE Advanced' },
    { href: '/exams/neet-ug', label: 'NEET UG' },
    { href: '/exams/gate-cse', label: 'GATE CSE' },
    { href: '/exams/upsc-cse', label: 'UPSC CSE' },
    { href: '/exams/cat', label: 'CAT' },
  ],
  Platform: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/exams', label: 'All Exams' },
    { href: '/blog', label: 'Blog' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/contact', label: 'Contact' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
                <BookOpen className="h-4 w-4 text-white" />
              </span>
              <span className="text-base font-bold text-text">
                PYQ<span className="text-accent">•</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              India&apos;s most complete previous year question platform. Built
              for serious aspirants.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-text transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} PYQ Platform. Made with ♥ for India&apos;s aspirants.
          </p>
          <p className="text-xs text-muted">
            All exam names are trademarks of their respective boards.
          </p>
        </div>
      </div>
    </footer>
  )
}
