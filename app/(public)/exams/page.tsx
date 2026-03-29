import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Cpu, Radio, Landmark, TrendingUp, FlaskConical, GraduationCap, ChevronRight } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'All Exams',
  description:
    'Browse previous year questions for JEE Main, JEE Advanced, NEET UG, GATE CSE, GATE ECE, UPSC CSE, SSC CGL, IBPS PO and CAT.',
}

/* ── Static metadata per exam ───────────────────────────────────────── */
const EXAM_META: Record<string, {
  icon: React.ElementType
  category: 'Engineering' | 'Medical' | 'Government' | 'MBA' | 'Banking'
  color: string
  yearRange: string
  questionCount: number
}> = {
  'jee-main':     { icon: FlaskConical,  category: 'Engineering', color: '#38bdf8', yearRange: '2013–2024', questionCount: 12480 },
  'jee-advanced': { icon: FlaskConical,  category: 'Engineering', color: '#818cf8', yearRange: '2013–2024', questionCount: 4320  },
  'neet-ug':      { icon: FlaskConical,  category: 'Medical',     color: '#22d48a', yearRange: '2013–2024', questionCount: 8640  },
  'gate-cse':     { icon: Cpu,           category: 'Engineering', color: '#f97316', yearRange: '2014–2024', questionCount: 6600  },
  'gate-ece':     { icon: Radio,         category: 'Engineering', color: '#fbbf24', yearRange: '2014–2024', questionCount: 5500  },
  'upsc-cse':     { icon: Landmark,      category: 'Government',  color: '#f43f5e', yearRange: '2013–2024', questionCount: 9600  },
  'ssc-cgl':      { icon: GraduationCap, category: 'Government',  color: '#22d48a', yearRange: '2013–2024', questionCount: 7200  },
  'ibps-po':      { icon: TrendingUp,    category: 'Banking',     color: '#38bdf8', yearRange: '2013–2024', questionCount: 6000  },
  'cat':          { icon: TrendingUp,    category: 'MBA',         color: '#e879f9', yearRange: '2003–2024', questionCount: 3840  },
}

const CATEGORIES = ['All', 'Engineering', 'Medical', 'Government', 'Banking', 'MBA'] as const

/* ── Component ─────────────────────────────────────────────────────── */
export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat = 'All' } = await searchParams

  const exams = await prisma.exam.findMany({
    include: {
      subjects: {
        include: {
          _count: { select: { chapters: true } },
        },
      },
    },
    orderBy: { name: 'asc' },
  })

  const filtered = exams.filter((e) => {
    if (cat === 'All') return true
    return EXAM_META[e.slug]?.category === cat
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text sm:text-4xl">All Exams</h1>
        <p className="mt-2 text-muted">
          {exams.length} exams · 50,000+ questions · 15+ years of PYQs
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={c === 'All' ? '/exams' : `/exams?cat=${c}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === c
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-bg2 text-muted hover:border-border2 hover:text-text'
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Exam grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">No exams in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exam) => {
            const meta = EXAM_META[exam.slug]
            if (!meta) return null
            const Icon = meta.icon
            const totalChapters = exam.subjects.reduce(
              (acc, s) => acc + s._count.chapters,
              0
            )

            return (
              <div
                key={exam.slug}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-bg2 p-6 card-hover"
              >
                {/* Icon + category */}
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: meta.color + '1a' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: meta.color }} />
                  </span>
                  <span className="rounded-full border border-border2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {meta.category}
                  </span>
                </div>

                {/* Name + description */}
                <div>
                  <h2 className="text-lg font-bold text-text">{exam.name}</h2>
                  {exam.description && (
                    <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                      {exam.description}
                    </p>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3 text-xs text-muted">
                  <span>{exam.subjects.length} subjects</span>
                  <span>·</span>
                  <span>{totalChapters} chapters</span>
                  <span>·</span>
                  <span>{meta.yearRange}</span>
                </div>

                {/* Questions count */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold" style={{ color: meta.color }}>
                    {meta.questionCount.toLocaleString('en-IN')} questions
                  </span>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border2 px-3 py-1 text-xs font-semibold text-text hover:border-accent hover:text-accent transition-colors"
                  >
                    Start <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
