import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, Zap, FlaskConical, BarChart3, Bookmark,
  Smartphone, Clock, ChevronRight, CheckCircle2, Star,
  GraduationCap, Cpu, Radio, Landmark, TrendingUp,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StatCounter } from '@/components/StatCounter'

export const metadata: Metadata = {
  title: "India's Most Complete PYQ Platform — JEE, NEET, GATE, UPSC & More",
  description:
    "Practice 50,000+ previous year questions chapter-wise. AI explanations, LaTeX rendering, mock tests and detailed analytics for JEE, NEET, GATE, UPSC, SSC, Banking and CAT.",
}

/* ── EXAM DATA ─────────────────────────────────────────────────────── */
const EXAMS = [
  { slug: 'jee-main',     name: 'JEE Main',     cat: 'Engineering', icon: FlaskConical, color: '#38bdf8', qs: '12,480', years: '2013–2024' },
  { slug: 'jee-advanced', name: 'JEE Advanced', cat: 'Engineering', icon: FlaskConical, color: '#818cf8', qs: '4,320',  years: '2013–2024' },
  { slug: 'neet-ug',      name: 'NEET UG',      cat: 'Medical',     icon: FlaskConical, color: '#22d48a', qs: '8,640',  years: '2013–2024' },
  { slug: 'gate-cse',     name: 'GATE CSE',     cat: 'Engineering', icon: Cpu,          color: '#f97316', qs: '6,600',  years: '2014–2024' },
  { slug: 'gate-ece',     name: 'GATE ECE',     cat: 'Engineering', icon: Radio,        color: '#fbbf24', qs: '5,500',  years: '2014–2024' },
  { slug: 'upsc-cse',     name: 'UPSC CSE',     cat: 'Government',  icon: Landmark,     color: '#f43f5e', qs: '9,600',  years: '2013–2024' },
  { slug: 'ssc-cgl',      name: 'SSC CGL',      cat: 'Government',  icon: GraduationCap,color: '#22d48a', qs: '7,200',  years: '2013–2024' },
  { slug: 'ibps-po',      name: 'IBPS PO',      cat: 'Banking',     icon: TrendingUp,   color: '#38bdf8', qs: '6,000',  years: '2013–2024' },
  { slug: 'cat',          name: 'CAT',           cat: 'MBA',         icon: TrendingUp,   color: '#e879f9', qs: '3,840',  years: '2003–2024' },
]

const FEATURES = [
  { icon: BookOpen,   title: 'Chapter-wise PYQ Bank',      desc: 'Every question tagged by chapter and topic for laser-focused revision.' },
  { icon: Zap,        title: 'AI-Powered Explanations',    desc: 'Get step-by-step solutions with concept links and memory tips.' },
  { icon: FlaskConical, title: 'LaTeX Math Rendering',     desc: 'Equations display pixel-perfect — just like your textbook.' },
  { icon: Clock,      title: 'Timed Mock Tests',           desc: 'Exam-pattern full mocks with live timer, auto-submit and scoring.' },
  { icon: BarChart3,  title: 'Performance Analytics',      desc: 'Track accuracy, time-per-question and weak topics across all attempts.' },
  { icon: Bookmark,   title: 'Bookmarks & Notes',          desc: 'Save tricky questions and annotate them with personal study notes.' },
]

const STEPS = [
  { n: '01', title: 'Pick Your Exam', desc: 'Choose from 9 exams. Browse the full chapter-wise syllabus in one screen.' },
  { n: '02', title: 'Practice PYQs',  desc: 'Solve questions filtered by chapter, topic, year, and difficulty level.' },
  { n: '03', title: 'Track & Improve', desc: 'Review your performance, identify weak areas, and attempt full mock tests.' },
]

const TESTIMONIALS = [
  {
    quote: "PYQ Platform helped me identify my weak chapters in just two weeks. The chapter-wise breakdown is something no coaching module offered.",
    name: 'Rahul Sharma', exam: 'JEE Main AIR 342 · 2024',
  },
  {
    quote: "The AI explanations are genuinely good. They don't just give the answer — they explain why the other options are wrong too.",
    name: 'Priya Nair', exam: 'NEET 715/720 · 2023',
  },
  {
    quote: "For GATE, subject-wise PYQs with analytics is a game changer. I could see my accuracy per topic improve week over week.",
    name: 'Arjun Mehta', exam: 'GATE CSE AIR 87 · 2023',
  },
]

/* ── MATH DISPLAY CARDS ────────────────────────────────────────────── */
const MATH_CARDS = [
  { label: 'Mechanics',        formula: 'F = ma' },
  { label: 'Thermodynamics',   formula: 'ΔG = ΔH − TΔS' },
  { label: 'Integration',      formula: '∫₀^∞ e^(−x²) dx = √π/2' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-28">
        {/* backgrounds */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 hero-glow" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border2 bg-bg2 px-4 py-1.5 text-xs font-medium text-muted mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            9 Exams · 50,000+ Questions · 15+ Years of PYQs
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-6xl lg:text-7xl">
            India&apos;s Most Complete
            <br />
            <span className="gradient-text">PYQ Platform</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Chapter-wise previous year questions with AI explanations, LaTeX
            rendering, and full mock tests — for JEE, NEET, GATE, UPSC, SSC,
            Banking &amp; CAT.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent2 transition-colors accent-glow"
            >
              Start Practicing Free <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 rounded-full border border-border2 bg-bg2 px-6 py-3 text-sm font-semibold text-text hover:border-accent transition-colors"
            >
              Browse Exams
            </Link>
          </div>

          {/* Math formula cards */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {MATH_CARDS.map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-border2 bg-bg2 px-4 py-2.5 text-left"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted mb-0.5">
                  {c.label}
                </p>
                <p className="font-mono text-sm font-semibold text-accent2">
                  {c.formula}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-bg2 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
          {[
            { value: 50000,  suffix: '+', label: 'Questions' },
            { value: 9,      suffix: '',  label: 'Exams Covered' },
            { value: 2000000,suffix: '+', label: 'Students' },
            { value: 15,     suffix: '+', label: 'Years of PYQs' },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-text sm:text-4xl">
                <StatCounter end={value} suffix={suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXAM GRID ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">
            Choose Your Exam
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Select an exam to start practicing chapter-wise.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMS.map(({ slug, name, cat, icon: Icon, color, qs, years }) => (
              <Link
                key={slug}
                href={`/exams/${slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-bg2 p-5 card-hover"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: color + '1a' }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </span>
                  <span className="rounded-full border border-border2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {cat}
                  </span>
                </div>

                <div>
                  <p className="font-bold text-text">{name}</p>
                  <p className="mt-0.5 text-xs text-muted">{years}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color }}>
                    {qs} questions
                  </span>
                  <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Start →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/exams"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent2 transition-colors"
            >
              View all exams <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="border-t border-border bg-bg2 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">
            Everything you need to ace your exam
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-bg p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-4 font-semibold text-text">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">
            How it works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="relative text-center">
                <span className="text-5xl font-extrabold text-border2">{n}</span>
                <h3 className="mt-2 font-bold text-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="border-t border-border bg-bg2 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">
            From aspirants who cracked it
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, exam }) => (
              <div
                key={name}
                className="rounded-2xl border border-border bg-bg p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow text-yellow" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted">&ldquo;{quote}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-text">{name}</p>
                  <p className="text-xs text-muted">{exam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-sm text-muted">
            Start free. Upgrade when you need more.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { plan: 'Free', price: '₹0', features: ['100 PYQs / day', '2 Mock Tests', 'Basic analytics'] },
              { plan: 'Pro', price: '₹299', features: ['Unlimited PYQs', '50 Mock Tests', 'AI Explanations', 'Advanced analytics'], highlight: true },
              { plan: 'Elite', price: '₹599', features: ['Everything in Pro', 'Video solutions', 'Priority support', 'Doubt sessions'] },
            ].map(({ plan, price, features, highlight }) => (
              <div
                key={plan}
                className={`rounded-2xl border p-6 text-left ${highlight ? 'border-accent bg-accent/5' : 'border-border bg-bg2'}`}
              >
                {highlight && (
                  <span className="mb-3 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-base font-bold text-text">{plan}</p>
                <p className="mt-1 text-2xl font-extrabold text-text">
                  {price}<span className="text-sm font-normal text-muted">/mo</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent2 transition-colors"
          >
            See full pricing &amp; comparison <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-bg2 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Ready to start practicing?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Join 2M+ aspirants. Free forever. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent2 transition-colors"
          >
            Create Free Account <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
