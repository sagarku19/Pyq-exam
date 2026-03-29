import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import prisma from '@/lib/db'
import { FilterSidebar } from '@/components/exam/FilterSidebar'
import { QuestionList, QuestionListSkeleton } from './QuestionList'

type Props = {
  params: Promise<{ exam: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam: slug } = await params
  const exam = await prisma.exam.findUnique({ where: { slug }, select: { name: true } })
  if (!exam) return {}
  return {
    title: `${exam.name} PYQs`,
    description: `Browse and practice previous year questions for ${exam.name}. Filter by chapter, topic, year, difficulty, and type.`,
  }
}

export const revalidate = 3600

export default async function PYQBrowserPage({ params, searchParams }: Props) {
  const [{ exam: slug }, sp] = await Promise.all([params, searchParams])

  const exam = await prisma.exam.findUnique({
    where: { slug },
    include: {
      subjects: {
        orderBy: { name: 'asc' },
        include: {
          chapters: {
            orderBy: { name: 'asc' },
            include: {
              topics: { orderBy: { name: 'asc' }, select: { slug: true, name: true } },
            },
          },
        },
      },
    },
  })

  if (!exam) notFound()

  // Fetch distinct years for this exam
  const yearRows = await prisma.question.findMany({
    where: { chapter: { subject: { examId: exam.id } }, examYear: { not: null } },
    select: { examYear: true },
    distinct: ['examYear'],
    orderBy: { examYear: 'desc' },
  })
  const years = yearRows.map((r) => r.examYear as number)

  // Build a stable key so Suspense remounts when filters change
  const spKey = new URLSearchParams(
    Object.entries(sp).filter(([, v]) => v !== undefined) as [string, string][]
  ).toString()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/exams" className="hover:text-text transition-colors">Exams</Link>
        <span>/</span>
        <Link href={`/exams/${slug}`} className="hover:text-text transition-colors">{exam.name}</Link>
        <span>/</span>
        <span className="text-text">PYQs</span>
      </nav>

      <div className="mb-6 flex items-center gap-4">
        <Link
          href={`/exams/${slug}`}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to exam
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text">{exam.name} — PYQs</h1>
          <p className="text-sm text-muted">Chapter-wise previous year questions</p>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar */}
        <div className="hidden w-56 shrink-0 lg:block xl:w-64">
          <div className="sticky top-20 rounded-2xl border border-border bg-bg2 p-4">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-bg3" />}>
              <FilterSidebar
                subjects={exam.subjects.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                  chapters: s.chapters.map((c) => ({
                    slug: c.slug,
                    name: c.name,
                    topics: c.topics,
                  })),
                }))}
                years={years}
              />
            </Suspense>
          </div>
        </div>

        {/* Question list */}
        <div className="min-w-0 flex-1">
          <Suspense key={spKey} fallback={<QuestionListSkeleton />}>
            <QuestionList examId={exam.id} examSlug={slug} searchParams={sp} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
