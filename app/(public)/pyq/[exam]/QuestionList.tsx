import prisma from '@/lib/db'
import { QuestionCard } from '@/components/exam/QuestionCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const PAGE_SIZE = 20

type SearchParams = {
  subject?: string
  chapter?: string
  topic?: string
  difficulty?: string
  year?: string
  type?: string
  page?: string
}

export async function QuestionList({
  examId,
  examSlug,
  searchParams,
}: {
  examId: string
  examSlug: string
  searchParams: SearchParams
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))

  // Build where clause by traversing taxonomy
  const where: Record<string, unknown> = {
    chapter: {
      subject: {
        examId,
        ...(searchParams.subject ? { slug: searchParams.subject } : {}),
      },
      ...(searchParams.chapter ? { slug: searchParams.chapter } : {}),
    },
    ...(searchParams.topic ? { topic: { slug: searchParams.topic } } : {}),
    ...(searchParams.difficulty ? { difficulty: searchParams.difficulty } : {}),
    ...(searchParams.year ? { examYear: parseInt(searchParams.year, 10) } : {}),
    ...(searchParams.type ? { type: searchParams.type as never } : {}),
  }

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      include: {
        options: { orderBy: { id: 'asc' } },
        explanation: true,
        chapter: { include: { subject: { select: { name: true } } } },
        topic: { select: { name: true } },
      },
      orderBy: [{ examYear: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.question.count({ where }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  function buildPageHref(p: number) {
    const sp = new URLSearchParams(
      Object.entries(searchParams).filter(([, v]) => v !== undefined) as [string, string][]
    )
    sp.set('page', String(p))
    return `/pyq/${examSlug}?${sp.toString()}`
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-text">No questions found</p>
        <p className="mt-1 text-sm text-muted">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-xs text-muted">
        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} questions
      </p>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={{
              id: q.id,
              text: q.text,
              type: q.type as 'MCQ' | 'INTEGER' | 'MULTI_CORRECT' | 'MATRIX_MATCH' | 'SUBJECTIVE',
              difficulty: q.difficulty,
              examYear: q.examYear,
              chapter: { name: q.chapter.name, subject: { name: q.chapter.subject.name } },
              topic: q.topic,
              options: q.options,
              explanation: q.explanation,
            }}
            number={(page - 1) * PAGE_SIZE + i + 1}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={buildPageHref(page - 1)}
              className="flex items-center gap-1 rounded-full border border-border2 px-4 py-2 text-sm text-muted hover:text-text hover:border-accent/60 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Link>
          )}
          <span className="text-sm text-muted px-2">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={buildPageHref(page + 1)}
              className="flex items-center gap-1 rounded-full border border-border2 px-4 py-2 text-sm text-muted hover:text-text hover:border-accent/60 transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export function QuestionListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-bg2 p-6 space-y-4 animate-pulse">
          <div className="flex gap-2">
            <div className="h-4 w-14 rounded-full bg-bg3" />
            <div className="h-4 w-10 rounded-full bg-bg3" />
            <div className="h-4 w-10 rounded-full bg-bg3" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-bg3" />
            <div className="h-4 w-4/5 rounded bg-bg3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-10 w-full rounded-xl bg-bg3" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
