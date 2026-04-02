/**
 * Blink Intelligence Type Definitions
 * Core data structures for candidate resume parsing and analysis
 */

export interface CandidateData {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  skills: {
    primary: string[];
    secondary: string[];
  };
  analysis: {
    matchScore: number;
    strengths: string[];
    trajectory: string;
  };
}

export interface ParseResponse {
  success: boolean;
  data?: CandidateData;
  error?: string;
  timestamp: string;
}

export type UIState = 'idle' | 'loading' | 'error' | 'success';
