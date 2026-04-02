'use server'

import { CandidateData } from './types'

/**
 * Extract text from PDF file
 * @param file - The PDF file to process
 * @returns Extracted text content
 */
export async function extractPDFText(file: File): Promise<string> {
  // Placeholder for PDF.js implementation
  // In production: use pdfjs-dist to parse PDF and extract text
  console.log('[PDF Processor] Extracting text from:', file.name)

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800))

  return `Resume for John Smith\nSoftware Engineer with 5 years experience`
}

/**
 * Parse resume text with LLM
 * @param text - Raw resume text
 * @returns Structured candidate data
 */
export async function parseResumeWithLLM(text: string): Promise<CandidateData> {
  // Placeholder for OpenAI/Anthropic API call
  // In production: use Vercel AI SDK to call LLM with structured output
  console.log('[PDF Processor] Parsing resume with LLM...')

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))

  // Return mock data for MVP
  return await generateMockCandidateData()
}

/**
 * Generate mock candidate data for MVP
 * Used for testing UI without LLM integration
 */
export async function generateMockCandidateData(): Promise<CandidateData> {
  const now = new Date()

  return {
    fullName: 'Alexandra Chen',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary:
      'Full-stack engineer passionate about building scalable cloud infrastructure and mentoring junior developers.',

    socialProfiles: [
      {
        platform: 'github',
        url: 'https://github.com/alexchen',
        label: 'GitHub',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/alexandrachen',
        label: 'LinkedIn',
      },
      {
        platform: 'portfolio',
        url: 'https://alexchen.dev',
        label: 'Portfolio',
      },
    ],

    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        startDate: 'Jan 2022',
        endDate: null,
        isCurrent: true,
        description:
          'Led development of microservices architecture handling 10M+ daily requests. Mentored team of 5 engineers. Implemented CI/CD pipelines reducing deployment time by 60%.',
      },
      {
        title: 'Full-Stack Engineer',
        company: 'CloudStart Solutions',
        startDate: 'Jun 2020',
        endDate: 'Dec 2021',
        isCurrent: false,
        description:
          'Built real-time data processing platform using Node.js and PostgreSQL. Optimized database queries improving performance by 40%. Collaborated with product team on feature prioritization.',
      },
      {
        title: 'Junior Developer',
        company: 'StartupXYZ',
        startDate: 'Feb 2019',
        endDate: 'May 2020',
        isCurrent: false,
        description:
          'Developed React components for customer-facing dashboard. Fixed 200+ bugs across codebase. Participated in code reviews and technical documentation.',
      },
    ],

    skills: [
      { name: 'TypeScript', category: 'technical', proficiency: 'expert' },
      { name: 'React', category: 'technical', proficiency: 'expert' },
      { name: 'Node.js', category: 'technical', proficiency: 'expert' },
      { name: 'PostgreSQL', category: 'technical', proficiency: 'advanced' },
      { name: 'AWS', category: 'technical', proficiency: 'advanced' },
      { name: 'Docker', category: 'tool', proficiency: 'advanced' },
      { name: 'System Design', category: 'technical', proficiency: 'advanced' },
      { name: 'Leadership', category: 'soft', proficiency: 'advanced' },
      { name: 'Communication', category: 'soft', proficiency: 'advanced' },
      { name: 'Python', category: 'technical', proficiency: 'intermediate' },
      { name: 'GraphQL', category: 'technical', proficiency: 'intermediate' },
      { name: 'Git', category: 'tool', proficiency: 'expert' },
    ],

    topSkills: ['TypeScript', 'React', 'Node.js'],

    education: [
      {
        degree: 'B.S.',
        institution: 'University of California',
        field: 'Computer Science',
        graduationYear: '2019',
        gpa: '3.8',
      },
    ],

    analysis: {
      matchScore: 92,
      topStrengths: [
        'Expert-level full-stack development with 5+ years experience',
        'Strong system design and scalability mindset',
        'Proven leadership capabilities with team mentoring experience',
      ],
      careerTrajectory:
        'Rapid career progression from junior developer to senior engineer in 5 years demonstrates strong technical growth and leadership potential. Clear focus on both technical excellence and team development positions candidate well for architect or tech lead roles.',
      keyInsights: [
        'Consistent impact at each role level',
        'Strong portfolio of shipped products',
        'Emerging leadership skills',
        'Cloud infrastructure expertise',
      ],
      recommendations: [
        'Consider Senior Staff Engineer or Tech Lead Manager path',
        'Explore opportunities in architecture or platform teams',
        'Strong candidate for technical interviews at FAANG companies',
      ],
    },

    parseTime: 2100,
    fileName: 'alexandra_chen_resume.pdf',
    uploadedAt: now.toISOString(),
  }
}

/**
 * Main processing function (Server Action)
 * Orchestrates: PDF extraction -> LLM parsing -> Response
 */
export async function processPDFResume(file: File): Promise<CandidateData> {
  try {
    const startTime = performance.now()

    // Step 1: Extract text from PDF
    // const pdfText = await extractPDFText(file)

    // Step 2: Parse with LLM
    // const candidateData = await parseResumeWithLLM(pdfText)

    // MVP: Use mock data directly
    const candidateData = await generateMockCandidateData()

    // Update metadata
    candidateData.fileName = file.name
    candidateData.uploadedAt = new Date().toISOString()
    candidateData.parseTime = Math.round(performance.now() - startTime)

    return candidateData
  } catch (error) {
    console.error('[PDF Processor] Error processing resume:', error)
    throw new Error(`Failed to process resume: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
