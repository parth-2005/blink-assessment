'use client'

import { CandidateData } from '@/lib/types'
import { Copy, RotateCcw, Github, Linkedin, CheckCircle2, Zap, BrainCircuit, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface DashboardLayoutProps {
  candidate: CandidateData
  onReset: () => void
}

export function DashboardLayout({ candidate, onReset }: DashboardLayoutProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(candidate.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Radial chart math
  const matchScore = candidate.analysis?.matchScore || 0
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (matchScore / 100) * circumference

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
              {candidate.name || 'Unknown Candidate'}
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span>{candidate.email !== 'Not Provided' ? candidate.email : 'No email provided'}</span>
              {candidate.email !== 'Not Provided' && (
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Email'}
                </button>
              )}
            </div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Scan New Resume
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* Main Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            
            {/* Social Hub */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Verified Profiles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Github', url: candidate.github, icon: <Github className="w-6 h-6" /> },
                  { name: 'LinkedIn', url: candidate.linkedin, icon: <Linkedin className="w-6 h-6" /> }
                ].map((social, idx) => {
                  const isProvided = social.url && social.url !== 'Not Provided'
                  return (
                    <a
                      key={idx}
                      href={isProvided ? social.url : '#'}
                      target={isProvided ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`relative overflow-hidden group flex items-center justify-between p-5 rounded-2xl border ${isProvided ? 'border-primary/20 bg-card hover:border-primary/50 hover:shadow-md' : 'border-border/50 bg-muted/20 opacity-60 cursor-not-allowed'} transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isProvided ? 'bg-primary/10 text-primary group-hover:scale-110 transition-transform' : 'bg-muted text-muted-foreground'}`}>
                          {social.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{social.name}</h3>
                          {isProvided && (
                            <span className="flex items-center gap-1.5 text-xs text-accent mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                            </span>
                          )}
                        </div>
                      </div>
                      {isProvided && <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />}
                    </a>
                  )
                })}
              </div>
            </section>

            {/* Technical Matrix */}
            <section className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" /> Technical Matrix
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Primary Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills?.primary?.length ? candidate.skills.primary.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                        {skill}
                      </span>
                    )) : <span className="text-sm text-muted-foreground">Not provided</span>}
                  </div>
                </div>
                
                <div className="w-full h-px bg-border/50" />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Secondary Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills?.secondary?.length ? candidate.skills.secondary.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                        {skill}
                      </span>
                    )) : <span className="text-sm text-muted-foreground">Not provided</span>}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Intelligence Panel (Wow Factor) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <section className="bg-card rounded-3xl border border-border/50 p-8 shadow-md relative overflow-hidden h-full flex flex-col">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

              <h2 className="text-lg font-semibold text-foreground border-b border-border/50 pb-4 mb-6">Blink Intelligence</h2>

              {/* Match Score Radial */}
              <div className="flex flex-col items-center justify-center mb-8 relative">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    {/* Background circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      className="stroke-muted"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      className="stroke-accent transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-foreground">{matchScore}%</span>
                    <span className="text-xs text-muted-foreground uppercase font-medium tracking-wide mt-1">Match Score</span>
                  </div>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Key Strengths</h3>
                <ul className="space-y-3">
                  {candidate.analysis?.strengths?.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-accent/20 p-1 rounded-full text-accent shrink-0">
                        <Zap className="w-3.5 h-3.5 fill-accent" />
                      </div>
                      <span className="text-sm font-medium leading-tight">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth Prediction / Trajectory */}
              <div className="mt-auto pt-6 border-t border-border/50">
                <div className="backdrop-blur-md bg-secondary/30 border border-secondary/50 rounded-2xl p-5 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 relative z-10">Growth Prediction</h3>
                   <p className="text-sm text-foreground/90 leading-relaxed relative z-10 italic">
                     "{candidate.analysis?.trajectory || 'No trajectory analysis provided.'}"
                   </p>
                </div>
              </div>

            </section>
          </div>

        </div>
      </div>
    </div>
  )
}
