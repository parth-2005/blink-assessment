import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Blink Intelligence</h1>
              <p className="text-xs text-muted-foreground">AI Resume Parser</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground hidden sm:block">Transform resumes into insights</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
