export function SkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded-lg w-48 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-20 animate-pulse" />
          <div className="h-6 bg-muted rounded w-20 animate-pulse" />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile card skeleton */}
          <div className="card-elevated p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-muted rounded w-32 animate-pulse" />
                <div className="h-4 bg-muted rounded w-40 animate-pulse" />
              </div>
            </div>
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
          </div>

          {/* Experience section skeleton */}
          <div className="card-elevated p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="pb-4 border-b border-border last:border-b-0 space-y-2">
                  <div className="h-5 bg-muted rounded w-40 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-48 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-32 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Match score skeleton */}
          <div className="card-elevated p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
            </div>
          </div>

          {/* Skills skeleton */}
          <div className="card-elevated p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-8 bg-muted rounded-full w-20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading message */}
      <div className="flex justify-center items-center gap-2 text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100" />
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200" />
        <span className="ml-2">Analyzing your resume...</span>
      </div>
    </div>
  )
}
