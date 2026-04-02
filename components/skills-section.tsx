'use client'

import { Skill } from '@/lib/types'

interface SkillsSectionProps {
  skills: Skill[]
  topSkills: string[]
}

const categoryLabels = {
  technical: 'Technical',
  soft: 'Soft Skills',
  language: 'Languages',
  tool: 'Tools & Platforms',
}

const proficiencyColors = {
  beginner: 'bg-slate-200 text-slate-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-emerald-100 text-emerald-700',
  expert: 'bg-primary/15 text-primary',
}

export function SkillsSection({ skills, topSkills }: SkillsSectionProps) {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <div className="card-elevated p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Skills & Expertise</h3>
        <p className="text-sm text-muted-foreground">Comprehensive skill breakdown by category</p>
      </div>

      {/* Top Skills Highlight */}
      {topSkills.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Top Skills</h4>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skillName, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 text-accent font-medium text-sm border border-accent/30"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                {skillName}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills by Category */}
      <div className="space-y-5">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill, idx) => {
                const isTop = topSkills.includes(skill.name)
                const profClass =
                  proficiencyColors[skill.proficiency || 'intermediate'] ||
                  proficiencyColors.intermediate

                return (
                  <div
                    key={idx}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      isTop
                        ? `${profClass} border border-current/20`
                        : 'bg-muted text-muted-foreground border border-border/50'
                    }`}
                  >
                    {skill.name}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
