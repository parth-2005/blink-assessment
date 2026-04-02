/**
 * Blink Intelligence Type Definitions
 * Core data structures for candidate resume parsing and analysis
 */

export interface SocialProfile {
  platform: 'github' | 'linkedin' | 'twitter' | 'portfolio' | 'other';
  url: string;
  label?: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Education {
  degree: string;
  institution: string;
  field: string;
  graduationYear: string;
  gpa?: string;
}

export interface AIAnalysis {
  matchScore: number;
  topStrengths: string[];
  careerTrajectory: string;
  keyInsights: string[];
  recommendations: string[];
}

export interface CandidateData {
  // Personal Info
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;

  // Social & Professional
  socialProfiles: SocialProfile[];

  // Work Experience
  experience: Experience[];

  // Skills
  skills: Skill[];
  topSkills: string[]; // Top 3-5 skills

  // Education
  education: Education[];

  // AI Analysis
  analysis: AIAnalysis;

  // Metadata
  parseTime: number; // milliseconds
  fileName: string;
  uploadedAt: string;
}

export interface ParseResponse {
  success: boolean;
  data?: CandidateData;
  error?: string;
  timestamp: string;
}

export type UIState = 'idle' | 'loading' | 'error' | 'success';
