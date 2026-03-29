export default function ExamDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2">
        <div className="h-3 w-12 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-20 rounded bg-bg3 animate-pulse" />
      </div>

      {/* Hero card */}
      <div className="rounded-2xl border border-border bg-bg2 p-6 sm:p-8 space-y-6">
        <div className="flex gap-4">
          <div className="h-14 w-14 rounded-2xl bg-bg3 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-7 w-48 rounded-xl bg-bg3 animate-pulse" />
            <div className="h-3 w-full rounded bg-bg3 animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-bg3 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 border-t border-border pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-bg p-3 space-y-2">
              <div className="h-3 w-3 mx-auto rounded bg-bg3 animate-pulse" />
              <div className="h-5 w-12 mx-auto rounded bg-bg3 animate-pulse" />
              <div className="h-3 w-16 mx-auto rounded bg-bg3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Accordion skeleton */}
      <div className="mt-8 space-y-3">
        <div className="h-7 w-40 rounded-xl bg-bg3 animate-pulse mb-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-bg2 p-4">
            <div className="h-5 w-48 rounded bg-bg3 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
