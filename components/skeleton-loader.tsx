export function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/50">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-muted animate-pulse rounded-lg" />
            <div className="h-4 w-40 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="h-10 w-40 bg-muted animate-pulse rounded-xl" />
        </div>

        {/* Dashboard Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* Main Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <section>
              <div className="h-4 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-20 bg-muted animate-pulse rounded-2xl" />
                <div className="h-20 bg-muted animate-pulse rounded-2xl" />
              </div>
            </section>

            <section className="bg-card rounded-3xl border border-border/50 p-8">
              <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
              <div className="space-y-6">
                <div>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
                    <div className="h-8 w-24 bg-muted animate-pulse rounded-full" />
                    <div className="h-8 w-16 bg-muted animate-pulse rounded-full" />
                  </div>
                </div>
                <div className="w-full h-px bg-border/50" />
                <div>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                    <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Intelligence Panel Skeleton */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <section className="bg-card rounded-3xl border border-border/50 p-8 h-full">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-6" />
              
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40 rounded-full border-8 border-muted animate-pulse" />
              </div>

              <div className="mb-6 space-y-4">
                <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
              </div>

              <div className="mt-auto pt-6 border-t border-border/50">
                <div className="h-24 bg-muted animate-pulse rounded-2xl" />
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  )
}
