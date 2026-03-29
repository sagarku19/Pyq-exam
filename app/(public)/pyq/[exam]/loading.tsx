export default function PYQBrowserLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2">
        <div className="h-3 w-12 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-16 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-3 rounded bg-bg3 animate-pulse" />
        <div className="h-3 w-10 rounded bg-bg3 animate-pulse" />
      </div>

      <div className="mb-6 h-8 w-64 rounded-xl bg-bg3 animate-pulse" />

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden w-56 shrink-0 lg:block xl:w-64">
          <div className="rounded-2xl border border-border bg-bg2 p-4 space-y-4">
            <div className="h-4 w-16 rounded bg-bg3 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-full rounded-lg bg-bg3 animate-pulse" />
              ))}
            </div>
            <div className="h-4 w-20 rounded bg-bg3 animate-pulse mt-4" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-6 w-14 rounded-full bg-bg3 animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Questions skeleton */}
        <div className="min-w-0 flex-1 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-bg2 p-6 space-y-4 animate-pulse">
              <div className="flex gap-2">
                <div className="h-4 w-14 rounded-full bg-bg3" />
                <div className="h-4 w-10 rounded-full bg-bg3" />
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
    </div>
  )
}
