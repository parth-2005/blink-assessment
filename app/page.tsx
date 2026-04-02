'use client'

import { useState } from 'react'
import { CandidateData, UIState } from '@/lib/types'
import { processPDFResume } from '@/lib/pdf-processor'
import { Navbar } from '@/components/navbar'
import { Dropzone } from '@/components/dropzone'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { DashboardLayout } from '@/components/dashboard-layout'

export default function Home() {
  const [state, setState] = useState<UIState>('idle')
  const [candidate, setCandidate] = useState<CandidateData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (file: File) => {
    try {
      setError(null)
      setState('loading')

      // Use FormData to allow server action support for files easily
      const formData = new FormData()
      formData.append('resume', file)

      const result = await processPDFResume(formData)
      
      setCandidate(result)
      setState('success')
    } catch (err) {
      console.error('[Page] Error processing file:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setState('error')
    }
  }

  const handleReset = () => {
    setCandidate(null)
    setState('idle')
    setError(null)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col text-foreground">
      <Navbar />

      {/* Idle & Loading State - Top Section */}
      {(state === 'idle' || state === 'loading') && !candidate && (
        <div className={`transition-all duration-700 ease-in-out ${state === 'loading' ? 'py-8 scale-95 opacity-80' : 'py-16 sm:py-24'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Hero Header hides during loading */}
            <div className={`space-y-4 text-center transition-all duration-500 overflow-hidden ${state === 'loading' ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-balance text-foreground">
                Hire Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Blink Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Upload a PDF resume. Our AI instantly extracts skills, verifies profiles, and calculates a match score and career trajectory.
              </p>
            </div>

            {/* Dropzone is the main interactive piece */}
            <Dropzone onFileSelect={handleFileSelect} disabled={state === 'loading'} />

          </div>
        </div>
      )}

      {/* Loading State - Skeleton Section */}
      {state === 'loading' && (
        <div className="flex-1 animate-in slide-in-from-bottom-8 fade-in-0 duration-700">
          <SkeletonLoader />
        </div>
      )}

      {/* Error State */}
      {state === 'error' && error && (
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-xl font-bold text-destructive">Error Parsing Resume</div>
            <p className="text-sm text-foreground/80">{error}</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Success State - Dashboard */}
      {state === 'success' && candidate && (
        <div className="flex-1 animate-in fade-in zoom-in-95 duration-500">
          <DashboardLayout candidate={candidate} onReset={handleReset} />
        </div>
      )}
    </main>
  )
}
