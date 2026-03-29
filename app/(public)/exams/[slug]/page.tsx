import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, Layers, FileText, Calendar,
  Cpu, Radio, Landmark, TrendingUp, FlaskConical, GraduationCap, Play,
} from 'lucide-react'
import prisma from '@/lib/db'
import { SyllabusAccordion } from './SyllabusAccordion'

/* ── Static metadata per exam ───────────────────────────────────────── */
const EXAM_META: Record<string, {
  icon: React.ElementType
  category: string
  color: string
  yearRange: string
  questionCount: number
  conductedBy: string
}> = {
  'jee-main':     { icon: FlaskConical,  category: 'Engineering', color: '#38bdf8', yearRange: '2013–2024', questionCount: 12480, conductedBy: 'NTA' },
  'jee-advanced': { icon: FlaskConical,  category: 'Engineering', color: '#818cf8', yearRange: '2013–2024', questionCount: 4320,  conductedBy: 'IIT (joint)' },
  'neet-ug':      { icon: FlaskConical,  category: 'Medical',     color: '#22d48a', yearRange: '2013–2024', questionCount: 8640,  conductedBy: 'NTA' },
  'gate-cse':     { icon: Cpu,           category: 'Engineering', color: '#f97316', yearRange: '2014–2024', questionCount: 6600,  conductedBy: 'IIT / IISc' },
  'gate-ece':     { icon: Radio,         category: 'Engineering', color: '#fbbf24', yearRange: '2014–2024', questionCount: 5500,  conductedBy: 'IIT / IISc' },
  'upsc-cse':     { icon: Landmark,      category: 'Government',  color: '#f43f5e', yearRange: '2013–2024', questionCount: 9600,  conductedBy: 'UPSC' },
  'ssc-cgl':      { icon: GraduationCap, category: 'Government',  color: '#22d48a', yearRange: '2013–2024', questionCount: 7200,  conductedBy: 'SSC' },
  'ibps-po':      { icon: TrendingUp,    category: 'Banking',     color: '#38bdf8', yearRange: '2013–2024', questionCount: 6000,  conductedBy: 'IBPS' },
  'cat':          { icon: TrendingUp,    category: 'MBA',         color: '#e879f9', yearRange: '2003–2024', questionCount: 3840,  conductedBy: 'IIMs' },
}

/* ── generateStaticParams ───────────────────────────────────────────── */
export async function generateStaticParams() {
  const exams = await prisma.exam.findMany({ select: { slug: true } })
  return exams.map((e) => ({ slug: e.slug }))
}

/* ── generateMetadata ───────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const exam = await prisma.exam.findUnique({ where: { slug }, select: { name: true, description: true } })
  if (!exam) return { title: 'Exam Not Found' }
  const meta = EXAM_META[slug]
  return {
    title: `${exam.name} PYQ — Previous Year Questions`,
    description:
      exam.description ??
      `Practice ${meta?.questionCount?.toLocaleString('en-IN') ?? ''} previous year questions for ${exam.name}. Chapter-wise, with AI explanations and mock tests.`,
    openGraph: {
      title: `${exam.name} PYQ Bank`,
      description: `Chapter-wise PYQs for ${exam.name} · ${meta?.yearRange ?? ''}`,
    },
  }
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const exam = await prisma.exam.findUnique({
    where: { slug },
    include: {
      subjects: {
        orderBy: { name: 'asc' },
        include: {
          chapters: {
            orderBy: { name: 'asc' },
            include: {
              topics: { orderBy: { name: 'asc' } },
              _count: { select: { questions: true } },
            },
          },
        },
      },
    },
  })

  if (!exam) notFound()

  const meta = EXAM_META[slug]
  const Icon = meta?.icon ?? BookOpen
  const color = meta?.color ?? '#6d56fa'

  const totalChapters = exam.subjects.reduce((a, s) => a + s.chapters.length, 0)
  const totalTopics = exam.subjects.reduce(
    (a, s) => a + s.chapters.reduce((b, c) => b + c.topics.length, 0),
    0
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/exams" className="hover:text-text transition-colors">Exams</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text">{exam.name}</span>
      </nav>

      {/* Hero card */}
      <div className="rounded-2xl border border-border bg-bg2 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: color + '1a' }}
            >
              <Icon className="h-7 w-7" style={{ color }} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{exam.name}</h1>
                <span className="rounded-full border border-border2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {meta?.category}
                </span>
              </div>
              {exam.description && (
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                  {exam.description}
                </p>
              )}
              {meta?.conductedBy && (
                <p className="mt-1 text-xs text-muted">
                  Conducted by: <span className="text-text">{meta.conductedBy}</span>
                </p>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <Link
              href={`/practice/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent2 transition-colors"
            >
              <Play className="h-4 w-4" /> Attempt Free Test
            </Link>
            <Link
              href={`/practice/${slug}/pyqs`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border2 px-5 py-2.5 text-sm font-semibold text-text hover:border-accent transition-colors"
            >
              <BookOpen className="h-4 w-4" /> Browse PYQs
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-4">
          {[
            { icon: FileText,  value: meta?.questionCount?.toLocaleString('en-IN') ?? '—', label: 'Questions' },
            { icon: Layers,    value: totalChapters,  label: 'Chapters' },
            { icon: BookOpen,  value: exam.subjects.length, label: 'Subjects' },
            { icon: Calendar,  value: meta?.yearRange ?? '—', label: 'Years covered' },
          ].map(({ icon: SIcon, value, label }) => (
            <div key={label} className="rounded-xl border border-border bg-bg p-3 text-center">
              <SIcon className="mx-auto h-4 w-4 text-muted mb-1" />
              <p className="text-base font-bold text-text">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus accordion */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-text">Complete Syllabus</h2>
        <p className="mb-6 text-sm text-muted">
          {exam.subjects.length} subjects · {totalChapters} chapters · {totalTopics} topics
        </p>
        <SyllabusAccordion subjects={exam.subjects} accentColor={color} />
      </div>
    </div>
  )
}
