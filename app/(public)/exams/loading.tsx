export default function ExamsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-9 w-40 rounded-xl bg-bg3 animate-pulse" />
        <div className="h-4 w-56 rounded-lg bg-bg3 animate-pulse" />
      </div>

      {/* Filter skeleton */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-bg3 animate-pulse" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-bg2 p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-11 w-11 rounded-xl bg-bg3 animate-pulse" />
              <div className="h-5 w-20 rounded-full bg-bg3 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-32 rounded-lg bg-bg3 animate-pulse" />
              <div className="h-3 w-full rounded bg-bg3 animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-bg3 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-3 w-16 rounded bg-bg3 animate-pulse" />
              <div className="h-3 w-16 rounded bg-bg3 animate-pulse" />
            </div>
            <div className="flex justify-between border-t border-border pt-4">
              <div className="h-4 w-24 rounded bg-bg3 animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-bg3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
