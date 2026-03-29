export default function PricingLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header skeleton */}
      <div className="text-center space-y-3">
        <div className="mx-auto h-9 w-72 rounded-xl bg-bg3 animate-pulse" />
        <div className="mx-auto h-4 w-56 rounded-lg bg-bg3 animate-pulse" />
      </div>

      {/* Toggle skeleton */}
      <div className="mt-8 flex justify-center gap-3">
        <div className="h-5 w-16 rounded bg-bg3 animate-pulse" />
        <div className="h-6 w-11 rounded-full bg-bg3 animate-pulse" />
        <div className="h-5 w-20 rounded bg-bg3 animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-bg2 p-6 space-y-4">
            <div className="h-5 w-16 rounded bg-bg3 animate-pulse" />
            <div className="h-4 w-40 rounded bg-bg3 animate-pulse" />
            <div className="h-9 w-24 rounded bg-bg3 animate-pulse" />
            <div className="h-10 w-full rounded-full bg-bg3 animate-pulse" />
            <div className="space-y-2.5 pt-2">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="flex gap-2">
                  <div className="h-4 w-4 rounded-full bg-bg3 animate-pulse shrink-0" />
                  <div className="h-4 flex-1 rounded bg-bg3 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
