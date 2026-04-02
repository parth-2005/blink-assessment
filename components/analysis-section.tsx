'use client'

import { AIAnalysis } from '@/lib/types'
import { Lightbulb, TrendingUp, Target } from 'lucide-react'

interface AnalysisSectionProps {
  analysis: AIAnalysis
}

export function AnalysisSection({ analysis }: AnalysisSectionProps) {
  return (
    <div className="space-y-6">
      {/* Career Trajectory */}
      <div className="card-elevated p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Career Trajectory</h3>
        </div>
        <p className="text-foreground/80 leading-relaxed text-balance-pretty">{analysis.careerTrajectory}</p>
      </div>

      {/* Top Strengths */}
      <div className="card-elevated p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Top Strengths</h3>
        </div>
        <ul className="space-y-3">
          {analysis.topStrengths.map((strength, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <span className="text-foreground/80">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Insights */}
      <div className="card-elevated p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-600" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {analysis.keyInsights.map((insight, idx) => (
            <div key={idx} className="rounded-lg bg-muted/40 p-3 border border-border/50">
              <p className="text-sm text-foreground/80">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-elevated p-6 space-y-4 border-l-4 border-l-emerald-500">
        <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
        <ul className="space-y-2.5">
          {analysis.recommendations.map((rec, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="flex-shrink-0 text-emerald-600 font-semibold">→</span>
              <span className="text-foreground/80">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
