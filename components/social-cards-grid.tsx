'use client'

import { SocialProfile } from '@/lib/types'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

interface SocialCardsGridProps {
  profiles: SocialProfile[]
  email: string
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
    </svg>
  ),
  portfolio: ExternalLink,
  other: ExternalLink,
}

export function SocialCardsGrid({ profiles, email }: SocialCardsGridProps) {
  const allLinks = [
    {
      platform: 'email' as const,
      url: `mailto:${email}`,
      label: 'Email',
    },
    ...profiles,
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {allLinks.map((link, idx) => {
        const isEmail = link.platform === 'email'
        const Icon = isEmail ? Mail : iconMap[link.platform as keyof typeof iconMap] || ExternalLink
        const label = isEmail ? 'Email' : link.label || link.platform

        return (
          <a
            key={idx}
            href={link.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-3.5 hover:shadow-md hover:border-primary/40 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col items-center text-center gap-2">
              <Icon className="w-5 h-5 text-primary transition-transform group-hover:scale-110" strokeWidth={2} />
              <span className="text-xs font-medium text-foreground truncate">{label}</span>
            </div>
          </a>
        )
      })}
    </div>
  )
}
