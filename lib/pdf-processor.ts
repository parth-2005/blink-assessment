'use server'

import { CandidateData } from './types'
// @ts-expect-error skipping index.js bug
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { GoogleGenAI } from '@google/genai'

const GEMINI_PROMPT = `You are a world-class recruitment AI. Extract data from the following resume text. 

**STRICT RULES:**
1. Return ONLY a valid JSON object. No markdown, no '\`\`\`json' tags.
2. If a field is missing, return 'Not Provided'—do not leave it null.
3. Extract the FULL URL for LinkedIn and GitHub.

**JSON SCHEMA:**
{
 "name": string,
 "email": string,
 "github": string (URL),
 "linkedin": string (URL),
 "skills": { "primary": string[], "secondary": string[] },
 "analysis": {
   "matchScore": number (1-100),
   "strengths": string[] (max 3),
   "trajectory": string (max 200 characters)
 }
}`

export async function processPDFResume(data: FormData | File): Promise<CandidateData> {
  try {
    let file: File
    if (data instanceof FormData) {
      const f = data.get('resume')
      if (!f || !(f instanceof File)) throw new Error('No resume file found')
      file = f
    } else {
      file = data
    }

    // Parse PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdfParse(buffer)
    const pdfText = pdfData.text

    // If key exists, use real Gemini API, otherwise provide a fallback JSON so UI works.
    if (!process.env.GEMINI_API_KEY) {
      console.warn('No GEMINI_API_KEY found, using mock data.')
      await new Promise(r => setTimeout(r, 1500))
      return {
        name: "Alexandra Chen",
        email: "alex.chen@example.com",
        github: "https://github.com/alexchen",
        linkedin: "https://linkedin.com/in/alexandrachen",
        skills: {
          primary: ["TypeScript", "React", "Node.js", "PostgreSQL"],
          secondary: ["AWS", "Docker", "Python", "GraphQL"]
        },
        analysis: {
          matchScore: 92,
          strengths: ["Expert-level full-stack development", "Strong system design", "Proven leadership"],
          trajectory: "Rapid progression to senior engineer positions candidate well for architect or tech lead roles."
        }
      } as CandidateData
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) 
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
      contents: GEMINI_PROMPT + '\n\nResume Text:\n' + pdfText,
      config: {
        // Enforcing JSON output to align with the prompt requirements
        responseMimeType: 'application/json'
      }
    })

    const textPayload = response.text || ""
    // Strip just in case Gemini ignored the rule about markdown blocks
    const cleaned = textPayload.replace(/```json/g, '').replace(/```/g, '').trim()
    
    const parsedData = JSON.parse(cleaned)
    return parsedData as CandidateData

  } catch (error) {
    console.error('[PDF Processor] Error processing resume:', error)
    throw new Error(`Failed to process resume: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
