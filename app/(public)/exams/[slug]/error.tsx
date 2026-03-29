'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'

export default function ExamDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[ExamDetailPage]', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red/10">
        <AlertTriangle className="h-7 w-7 text-red" />
      </span>
      <h2 className="text-xl font-bold text-text">Failed to load exam</h2>
      <p className="max-w-sm text-center text-sm text-muted">
        {error.message || 'Something went wrong while loading this exam.'}
      </p>
      <div className="flex gap-3">
        <Link
          href="/exams"
          className="inline-flex items-center gap-2 rounded-full border border-border2 px-4 py-2 text-sm font-medium text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Exams
        </Link>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-border2 px-4 py-2 text-sm font-medium text-text hover:border-accent transition-colors"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    </div>
  )
}
