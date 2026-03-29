import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import prisma from '@/lib/db'
import { QuestionCard } from '@/components/exam/QuestionCard'

type Props = {
  params: Promise<{ exam: string; chapter: string }>
}

export const revalidate = 3600 // ISR: revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam: examSlug, chapter: chapterSlug } = await params
  const chapter = await prisma.chapter.findFirst({
    where: {
      slug: chapterSlug,
      subject: { exam: { slug: examSlug } },
    },
    include: { subject: { include: { exam: { select: { name: true } } } } },
  })
  if (!chapter) return {}
  return {
    title: `${chapter.name} PYQs — ${chapter.subject.exam.name}`,
    description: `All previous year questions from ${chapter.name} (${chapter.subject.name}) for ${chapter.subject.exam.name}. Organised by topic.`,
  }
}

export default async function ChapterPYQPage({ params }: Props) {
  const { exam: examSlug, chapter: chapterSlug } = await params

  const chapter = await prisma.chapter.findFirst({
    where: {
      slug: chapterSlug,
      subject: { exam: { slug: examSlug } },
    },
    include: {
      subject: {
        include: { exam: { select: { id: true, name: true, slug: true } } },
      },
      topics: { orderBy: { name: 'asc' } },
    },
  })

  if (!chapter) notFound()

  const questions = await prisma.question.findMany({
    where: { chapterId: chapter.id },
    include: {
      options: { orderBy: { id: 'asc' } },
      explanation: true,
      chapter: { include: { subject: { select: { name: true } } } },
      topic: { select: { name: true } },
    },
    orderBy: [{ examYear: 'desc' }, { createdAt: 'desc' }],
  })

  // Group by topic
  const byTopic = new Map<string, typeof questions>()
  const noTopic: typeof questions = []

  for (const q of questions) {
    if (q.topic) {
      const key = q.topic.name
      if (!byTopic.has(key)) byTopic.set(key, [])
      byTopic.get(key)!.push(q)
    } else {
      noTopic.push(q)
    }
  }

  const exam = chapter.subject.exam

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/exams" className="hover:text-text transition-colors">Exams</Link>
        <span>/</span>
        <Link href={`/exams/${exam.slug}`} className="hover:text-text transition-colors">{exam.name}</Link>
        <span>/</span>
        <Link href={`/pyq/${exam.slug}`} className="hover:text-text transition-colors">PYQs</Link>
        <span>/</span>
        <span className="text-text">{chapter.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 rounded-2xl border border-border bg-bg2 p-6">
        <Link
          href={`/pyq/${exam.slug}`}
          className="mb-4 flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All {exam.name} PYQs
        </Link>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
            <BookOpen className="h-6 w-6 text-accent" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-text">{chapter.name}</h1>
            <p className="text-sm text-muted">
              {chapter.subject.name} · {exam.name} · {questions.length} question{questions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {questions.length === 0 && (
        <div className="rounded-2xl border border-border bg-bg2 py-16 text-center">
          <p className="text-text font-semibold">No questions yet</p>
          <p className="mt-1 text-sm text-muted">Questions for this chapter will appear here once added.</p>
        </div>
      )}

      {/* Questions grouped by topic */}
      {Array.from(byTopic.entries()).map(([topicName, qs], groupIdx) => (
        <section key={topicName} className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {topicName}
            <span className="ml-1 text-xs font-normal text-muted">({qs.length})</span>
          </h2>
          <div className="space-y-4">
            {qs.map((q, i) => (
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
                number={i + 1}
              />
            ))}
          </div>
        </section>
      ))}

      {noTopic.length > 0 && (
        <section className="mb-10">
          {byTopic.size > 0 && (
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-text">
              <span className="h-1.5 w-1.5 rounded-full bg-border2" />
              Other Questions
            </h2>
          )}
          <div className="space-y-4">
            {noTopic.map((q, i) => (
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
                number={i + 1}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
