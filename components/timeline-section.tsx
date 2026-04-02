'use client'

import { Experience } from '@/lib/types'
import { Briefcase, CheckCircle2 } from 'lucide-react'

interface TimelineSectionProps {
  experience: Experience[]
}

export function TimelineSection({ experience }: TimelineSectionProps) {
  return (
    <div className="card-elevated p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
          <p className="text-xs text-muted-foreground">{experience.length} positions</p>
        </div>
      </div>

      <div className="relative space-y-6 pt-2">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative">
            {/* Timeline line */}
            {idx < experience.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent" />
            )}

            {/* Timeline dot */}
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center pt-1">
                {exp.isCurrent ? (
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="pb-4 flex-1 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                  {exp.isCurrent && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-accent text-white">Current</span>}
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                </p>

                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
