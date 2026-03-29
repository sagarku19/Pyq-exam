'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Topic = { id: string; name: string }
type Chapter = { id: string; name: string; topics: Topic[]; _count: { questions: number } }
type Subject = { id: string; name: string; chapters: Chapter[] }

interface Props {
  subjects: Subject[]
  accentColor: string
}

export function SyllabusAccordion({ subjects, accentColor }: Props) {
  const [openSubject, setOpenSubject] = useState<string | null>(subjects[0]?.id ?? null)
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set())

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-3">
      {subjects.map((subject) => {
        const isOpen = openSubject === subject.id
        const totalTopics = subject.chapters.reduce((a, c) => a + c.topics.length, 0)

        return (
          <div key={subject.id} className="rounded-2xl border border-border bg-bg2 overflow-hidden">
            {/* Subject header */}
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-bg3 transition-colors"
              onClick={() => setOpenSubject(isOpen ? null : subject.id)}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-2 w-2 rounded-full"
                  style={{ background: accentColor }}
                />
                <span className="font-semibold text-text">{subject.name}</span>
                <span className="text-xs text-muted">
                  {subject.chapters.length} chapters · {totalTopics} topics
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Subject content */}
            {isOpen && (
              <div className="border-t border-border divide-y divide-border">
                {subject.chapters.map((chapter) => {
                  const chOpen = openChapters.has(chapter.id)
                  return (
                    <div key={chapter.id}>
                      {/* Chapter row */}
                      <button
                        className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-bg3 transition-colors"
                        onClick={() => toggleChapter(chapter.id)}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={cn(
                              'h-3.5 w-3.5 text-muted shrink-0 transition-transform duration-150',
                              chOpen && 'rotate-90'
                            )}
                          />
                          <span className="text-sm font-medium text-text">{chapter.name}</span>
                          <span className="text-xs text-muted">{chapter.topics.length} topics</span>
                        </div>
                        {chapter._count.questions > 0 && (
                          <span
                            className="text-xs font-semibold"
                            style={{ color: accentColor }}
                          >
                            {chapter._count.questions} Qs
                          </span>
                        )}
                      </button>

                      {/* Topics list */}
                      {chOpen && chapter.topics.length > 0 && (
                        <div className="bg-bg px-5 pb-3 pt-1">
                          <ul className="grid gap-1 sm:grid-cols-2">
                            {chapter.topics.map((topic) => (
                              <li
                                key={topic.id}
                                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted hover:bg-bg2 hover:text-text transition-colors"
                              >
                                <Circle className="h-1.5 w-1.5 shrink-0 fill-muted text-muted" />
                                {topic.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
