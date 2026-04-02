'use client'

import { CandidateData } from '@/lib/types'
import { Download, RotateCcw } from 'lucide-react'
import { GaugeChart } from './gauge-chart'
import { SocialCardsGrid } from './social-cards-grid'
import { SkillsSection } from './skills-section'
import { TimelineSection } from './timeline-section'
import { AnalysisSection } from './analysis-section'

interface DashboardLayoutProps {
  candidate: CandidateData
  onReset: () => void
}

export function DashboardLayout({ candidate, onReset }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance-pretty">{candidate.fullName}</h1>
            <p className="text-muted-foreground mt-1">
              Parsed from <span className="font-medium text-foreground">{candidate.fileName}</span>
            </p>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2} />
            Upload Another
          </button>
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-4">
          {candidate.email && (
            <div className="text-sm">
              <span className="text-muted-foreground">Email:</span>{' '}
              <a href={`mailto:${candidate.email}`} className="text-primary font-medium hover:underline">
                {candidate.email}
              </a>
            </div>
          )}
          {candidate.location && (
            <div className="text-sm">
              <span className="text-muted-foreground">Location:</span>{' '}
              <span className="text-foreground font-medium">{candidate.location}</span>
            </div>
          )}
          {candidate.phone && (
            <div className="text-sm">
              <span className="text-muted-foreground">Phone:</span>{' '}
              <a href={`tel:${candidate.phone}`} className="text-primary font-medium hover:underline">
                {candidate.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Summary */}
            {candidate.summary && (
              <div className="card-elevated p-6 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Professional Summary</h3>
                <p className="text-foreground/80 leading-relaxed text-balance-pretty">{candidate.summary}</p>
              </div>
            )}

            {/* Social Profiles */}
            {candidate.socialProfiles.length > 0 && (
              <div className="card-elevated p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">Connect</h3>
                <SocialCardsGrid profiles={candidate.socialProfiles} email={candidate.email} />
              </div>
            )}

            {/* Experience Timeline */}
            <TimelineSection experience={candidate.experience} />

            {/* AI Analysis Section */}
            <AnalysisSection analysis={candidate.analysis} />
          </div>

          {/* Sidebar - right side */}
          <div className="space-y-6">
            {/* Match Score */}
            <div className="card-elevated p-6">
              <GaugeChart score={candidate.analysis.matchScore} />
            </div>

            {/* Skills */}
            <SkillsSection skills={candidate.skills} topSkills={candidate.topSkills} />

            {/* Education */}
            {candidate.education.length > 0 && (
              <div className="card-elevated p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
                <div className="space-y-4">
                  {candidate.education.map((edu, idx) => (
                    <div key={idx} className="pb-4 border-b border-border last:border-b-0">
                      <h4 className="font-semibold text-foreground">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-primary font-medium">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Class of {edu.graduationYear}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="card-elevated p-4 space-y-2 bg-muted/30">
              <div className="text-xs">
                <p className="text-muted-foreground">Parsed in {candidate.parseTime}ms</p>
                <p className="text-muted-foreground">
                  {new Date(candidate.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
