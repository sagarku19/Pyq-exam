'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Topic = { slug: string; name: string }
type Chapter = { slug: string; name: string; topics: Topic[] }
type Subject = { slug: string; name: string; chapters: Chapter[] }

const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD']
const TYPES = ['MCQ', 'INTEGER', 'MULTI_CORRECT']

export function FilterSidebar({
  subjects,
  years,
}: {
  subjects: Subject[]
  years: number[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const activeSubject = sp.get('subject') ?? ''
  const activeChapter = sp.get('chapter') ?? ''
  const activeTopic = sp.get('topic') ?? ''
  const activeDiff = sp.get('difficulty') ?? ''
  const activeYear = sp.get('year') ?? ''
  const activeType = sp.get('type') ?? ''

  const [openSubjects, setOpenSubjects] = useState<Set<string>>(
    () => new Set(activeSubject ? [activeSubject] : [subjects[0]?.slug ?? ''])
  )

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(sp.toString())
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    next.delete('page')
    // Clear dependent filters
    if (key === 'subject') { next.delete('chapter'); next.delete('topic') }
    if (key === 'chapter') { next.delete('topic') }
    router.push(`${pathname}?${next.toString()}`)
  }

  function clearAll() {
    router.push(pathname)
  }

  const hasFilters = !!(activeSubject || activeChapter || activeTopic || activeDiff || activeYear || activeType)

  return (
    <aside className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Filters</span>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-muted hover:text-text transition-colors"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Subject / Chapter / Topic tree */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Subject</p>
        <div className="space-y-1">
          {subjects.map((subj) => {
            const isOpen = openSubjects.has(subj.slug)
            const isActive = activeSubject === subj.slug
            return (
              <div key={subj.slug}>
                <button
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-muted hover:text-text hover:bg-bg3'
                  )}
                  onClick={() => {
                    setOpenSubjects((prev) => {
                      const next = new Set(prev)
                      isOpen ? next.delete(subj.slug) : next.add(subj.slug)
                      return next
                    })
                    setParam('subject', isActive ? '' : subj.slug)
                  }}
                >
                  <span>{subj.name}</span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
                    {subj.chapters.map((ch) => {
                      const chActive = activeChapter === ch.slug
                      const chOpen = chActive || (activeChapter === '' && activeTopic === '')
                      return (
                        <div key={ch.slug}>
                          <button
                            className={cn(
                              'w-full rounded-lg px-2 py-1.5 text-left text-xs transition-colors',
                              chActive
                                ? 'bg-accent/10 text-accent font-medium'
                                : 'text-muted hover:text-text hover:bg-bg3'
                            )}
                            onClick={() => setParam('chapter', chActive ? '' : ch.slug)}
                          >
                            {ch.name}
                          </button>
                          {chActive && ch.topics.length > 0 && (
                            <div className="ml-2 mt-1 space-y-0.5 border-l border-border pl-2">
                              {ch.topics.map((tp) => (
                                <button
                                  key={tp.slug}
                                  onClick={() => setParam('topic', activeTopic === tp.slug ? '' : tp.slug)}
                                  className={cn(
                                    'w-full rounded px-2 py-1 text-left text-[11px] transition-colors',
                                    activeTopic === tp.slug
                                      ? 'text-accent font-medium'
                                      : 'text-muted hover:text-text'
                                  )}
                                >
                                  {tp.name}
                                </button>
                              ))}
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
      </div>

      {/* Difficulty */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setParam('difficulty', activeDiff === d ? '' : d)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                activeDiff === d
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border2 text-muted hover:border-accent/60 hover:text-text'
              )}
            >
              {d.charAt(0) + d.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setParam('type', activeType === t ? '' : t)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                activeType === t
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border2 text-muted hover:border-accent/60 hover:text-text'
              )}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Year */}
      {years.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Year</p>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setParam('year', activeYear === String(y) ? '' : String(y))}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  activeYear === String(y)
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border2 text-muted hover:border-accent/60 hover:text-text'
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
