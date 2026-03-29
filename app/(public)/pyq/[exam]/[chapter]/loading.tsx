export default function ChapterPYQLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2">
        <div className="h-3 w-12 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-16 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-8 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-24 rounded bg-bg3 animate-pulse" />
      </div>

      {/* Header card */}
      <div className="mb-8 rounded-2xl border border-border bg-bg2 p-6 space-y-4 animate-pulse">
        <div className="h-3 w-32 rounded bg-bg3" />
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-bg3 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-7 w-56 rounded-xl bg-bg3" />
            <div className="h-3 w-40 rounded bg-bg3" />
          </div>
        </div>
      </div>

      {/* Topic section */}
      <div className="mb-6 h-5 w-40 rounded bg-bg3 animate-pulse" />

      {/* Questions */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-bg2 p-6 space-y-4 animate-pulse">
            <div className="flex gap-2">
              <div className="h-4 w-14 rounded-full bg-bg3" />
              <div className="h-4 w-10 rounded-full bg-bg3" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-bg3" />
              <div className="h-4 w-3/4 rounded bg-bg3" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-10 w-full rounded-xl bg-bg3" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
