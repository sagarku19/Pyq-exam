'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, BookmarkPlus, BookmarkCheck, Copy, Check, ChevronDown, Sparkles, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LatexRenderer } from './LatexRenderer'

type Option = {
  id: string
  text: string
  isCorrect: boolean
}

type Question = {
  id: string
  text: string
  type: 'MCQ' | 'INTEGER' | 'MULTI_CORRECT' | 'MATRIX_MATCH' | 'SUBJECTIVE'
  difficulty: string
  examYear: number | null
  chapter: { name: string; subject: { name: string } }
  topic: { name: string } | null
  options: Option[]
  explanation: { text: string; videoUrl: string | null } | null
}

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY: 'text-green bg-green/10',
  MEDIUM: 'text-yellow bg-yellow/10',
  HARD: 'text-red bg-red/10',
}

export function QuestionCard({
  question,
  number,
  isLoggedIn = false,
  isPro = false,
}: {
  question: Question
  number?: number
  isLoggedIn?: boolean
  isPro?: boolean
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedMulti, setSelectedMulti] = useState<Set<string>>(new Set())
  const [integerAnswer, setIntegerAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [authWall, setAuthWall] = useState<'bookmark' | 'ai' | null>(null)

  const isCorrectOption = (opt: Option) => opt.isCorrect
  const correctIds = new Set(question.options.filter((o) => o.isCorrect).map((o) => o.id))

  function handleOption(optId: string) {
    if (revealed) return
    if (question.type === 'MULTI_CORRECT') {
      setSelectedMulti((prev) => {
        const next = new Set(prev)
        next.has(optId) ? next.delete(optId) : next.add(optId)
        return next
      })
    } else {
      setSelected(optId)
      setRevealed(true)
    }
  }

  function handleCheckMulti() {
    setRevealed(true)
  }

  function handleBookmark() {
    if (!isLoggedIn) { setAuthWall('bookmark'); return }
    setBookmarked((v) => !v)
  }

  function handleCopy() {
    navigator.clipboard.writeText(
      `${window.location.origin}/pyq/q/${question.id}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function getOptionClass(opt: Option): string {
    const base = 'flex items-start gap-3 w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors'
    if (!revealed) {
      const isSelMCQ = question.type === 'MCQ' && selected === opt.id
      const isSelMulti = question.type === 'MULTI_CORRECT' && selectedMulti.has(opt.id)
      if (isSelMCQ || isSelMulti) return cn(base, 'border-accent bg-accent/10 text-text')
      return cn(base, 'border-border2 bg-bg2 text-muted hover:border-accent/60 hover:text-text')
    }
    if (isCorrectOption(opt)) return cn(base, 'border-green/50 bg-green/10 text-green')
    if (
      (question.type === 'MCQ' && selected === opt.id) ||
      (question.type === 'MULTI_CORRECT' && selectedMulti.has(opt.id))
    )
      return cn(base, 'border-red/50 bg-red/10 text-red')
    return cn(base, 'border-border bg-bg2 text-muted/60')
  }

  const diffClass = DIFFICULTY_COLOR[question.difficulty] ?? 'text-muted bg-bg3'

  return (
    <div className="rounded-2xl border border-border bg-bg2 p-5 sm:p-6 space-y-4">
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {number !== undefined && (
          <span className="font-mono text-muted">Q{number}.</span>
        )}
        <span className={cn('rounded-full px-2 py-0.5 font-medium', diffClass)}>
          {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
        </span>
        <span className="rounded-full bg-bg3 px-2 py-0.5 text-muted">
          {question.type.replace('_', ' ')}
        </span>
        {question.examYear && (
          <span className="rounded-full bg-bg3 px-2 py-0.5 text-muted">{question.examYear}</span>
        )}
        <span className="ml-auto text-muted truncate max-w-[160px]">
          {question.chapter.subject.name} › {question.chapter.name}
          {question.topic ? ` › ${question.topic.name}` : ''}
        </span>
      </div>

      {/* Question text */}
      <p className="text-[15px] leading-relaxed text-text">
        <LatexRenderer text={question.text} />
      </p>

      {/* Options */}
      {(question.type === 'MCQ' || question.type === 'MULTI_CORRECT') && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button key={opt.id} onClick={() => handleOption(opt.id)} className={getOptionClass(opt)}>
              <span className="mt-0.5 shrink-0 font-semibold text-muted/70">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="flex-1">
                <LatexRenderer text={opt.text} />
              </span>
              {revealed && isCorrectOption(opt) && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green mt-0.5" />
              )}
              {revealed && !isCorrectOption(opt) &&
                ((question.type === 'MCQ' && selected === opt.id) ||
                  (question.type === 'MULTI_CORRECT' && selectedMulti.has(opt.id))) && (
                  <XCircle className="h-4 w-4 shrink-0 text-red mt-0.5" />
                )}
            </button>
          ))}
          {question.type === 'MULTI_CORRECT' && !revealed && (
            <button
              onClick={handleCheckMulti}
              disabled={selectedMulti.size === 0}
              className="mt-1 rounded-full border border-accent/60 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10 disabled:opacity-40 transition-colors"
            >
              Check Answer
            </button>
          )}
        </div>
      )}

      {/* Integer answer */}
      {question.type === 'INTEGER' && (
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={integerAnswer}
            onChange={(e) => setIntegerAnswer(e.target.value)}
            disabled={revealed}
            placeholder="Enter integer answer"
            className="w-44 rounded-xl border border-border2 bg-bg px-4 py-2 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60"
          />
          {!revealed && (
            <button
              onClick={() => setRevealed(true)}
              disabled={!integerAnswer.trim()}
              className="rounded-full border border-accent/60 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/10 disabled:opacity-40 transition-colors"
            >
              Submit
            </button>
          )}
          {revealed && (
            <span className="text-xs text-muted">
              Correct:{' '}
              <span className="font-semibold text-green">
                {question.options.find((o) => o.isCorrect)?.text ?? '—'}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-2 pt-1 border-t border-border">
        {/* Explanation */}
        {question.explanation && (
          <button
            onClick={() => setShowExplanation((v) => !v)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:text-text hover:bg-bg3 transition-colors"
          >
            <ChevronDown
              className={cn('h-3.5 w-3.5 transition-transform', showExplanation && 'rotate-180')}
            />
            Explanation
          </button>
        )}

        {/* AI explain (Pro gated) */}
        <button
          onClick={() => {
            if (!isPro) setAuthWall('ai')
          }}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
            isPro
              ? 'text-accent hover:bg-accent/10'
              : 'text-muted hover:text-text hover:bg-bg3'
          )}
        >
          {isPro ? <Sparkles className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
          AI Explain
        </button>

        <div className="ml-auto flex items-center gap-1">
          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
            className="rounded-full p-2 text-muted hover:text-accent hover:bg-accent/10 transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-accent" />
            ) : (
              <BookmarkPlus className="h-4 w-4" />
            )}
          </button>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            title="Copy link"
            className="rounded-full p-2 text-muted hover:text-text hover:bg-bg3 transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-green" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Explanation panel */}
      {showExplanation && question.explanation && (
        <div className="rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed text-muted">
          <LatexRenderer text={question.explanation.text} />
          {question.explanation.videoUrl && (
            <a
              href={question.explanation.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-accent hover:underline text-xs"
            >
              Watch video solution →
            </a>
          )}
        </div>
      )}

      {/* Auth wall toast */}
      {authWall && (
        <div className="rounded-xl border border-border2 bg-bg3 px-4 py-3 text-sm flex items-center gap-3">
          <Lock className="h-4 w-4 shrink-0 text-accent" />
          <span className="text-muted">
            {authWall === 'bookmark'
              ? 'Sign in to save bookmarks.'
              : 'Upgrade to Pro for AI-powered explanations.'}
          </span>
          <button
            onClick={() => setAuthWall(null)}
            className="ml-auto text-xs text-muted hover:text-text"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
