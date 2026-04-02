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

      // Process the PDF resume
      const result = await processPDFResume(file)
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
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Idle State - Upload */}
      {state === 'idle' && !candidate && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance-pretty">
                Transform Resumes into Insights
              </h1>
              <p className="text-lg text-muted-foreground text-balance-pretty">
                Upload a PDF resume and let our AI analyze candidate potential, skills, and career trajectory in seconds.
              </p>
            </div>

            {/* Upload area */}
            <Dropzone onFileSelect={handleFileSelect} disabled={state === 'loading'} />

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                {
                  title: 'Match Score',
                  desc: 'AI-powered candidate scoring',
                },
                {
                  title: 'Career Analysis',
                  desc: 'Trajectory & growth insights',
                },
                {
                  title: 'Skill Mapping',
                  desc: 'Comprehensive skill breakdown',
                },
              ].map((feature, idx) => (
                <div key={idx} className="rounded-lg bg-card border border-border p-4 text-center">
                  <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {state === 'loading' && (
        <div className="flex-1 overflow-auto">
          <SkeletonLoader />
        </div>
      )}

      {/* Error State */}
      {state === 'error' && error && (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-6 text-center space-y-4">
            <div className="text-lg font-semibold text-red-900 dark:text-red-200">Error Processing Resume</div>
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors w-full justify-center"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Success State - Dashboard */}
      {state === 'success' && candidate && <DashboardLayout candidate={candidate} onReset={handleReset} />}
    </main>
  )
}
