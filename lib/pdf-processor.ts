'use server'

import { CandidateData } from './types'
// @ts-expect-error skipping index.js bug
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { GoogleGenAI } from '@google/genai'

function getPrompt(role: string) {
  return `Act as a Senior Technical Recruiter. Your task is to evaluate this candidate specifically for the role of **${role}**.
  
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
   "trajectory": string (max 200 characters),
   "gapAnalysis": string[] (2-3 missing skills)
 }
}

Calculate the **matchScore** using this 100-point weighting:
- **Technical Alignment (40 pts):** Direct match of languages/frameworks required for a ${role}.
- **Experience Density (40 pts):** Complexity and relevance of past projects to a ${role}'s responsibilities.
- **Growth Potential (20 pts):** Based on the Career Trajectory and skill acquisition speed.`
}

// Custom pagerender to extract links natively via PDF.js Annotations layer
async function customRenderPage(pageData: any) {
  const render_options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false
  }

  const textContent = await pageData.getTextContent(render_options)
  let lastY, text = ''
  
  for (const item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
          text += item.str
      } else {
          text += '\n' + item.str
      }    
      lastY = item.transform[5]
  }

  try {
      const annotations = await pageData.getAnnotations()
      const links = annotations
          .filter((a: any) => a.subtype === 'Link' && a.url)
          .map((a: any) => a.url)
          
      if (links.length > 0) {
          text += '\n\n[Embedded Links from Page: ' + links.join(', ') + ']\n'
      }
  } catch (e) {
      console.warn("Could not extract pdf annotations", e)
  }

  return text
}

export async function processPDFResume(data: FormData | File): Promise<CandidateData> {
  try {
    let file: File
    let targetRole = ''
    
    if (data instanceof FormData) {
      const f = data.get('resume')
      const role = data.get('targetRole')
      
      if (!f || !(f instanceof File)) throw new Error('No resume file found')
      file = f
      if (role && typeof role === 'string') {
        targetRole = role
      }
    } else {
      file = data
    }
    
    if (!targetRole) {
      targetRole = 'General Engineering Role'
    }

    // Parse PDF with custom link extraction
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdfParse(buffer, { pagerender: customRenderPage })
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
          trajectory: "Rapid progression to senior engineer positions candidate well for architect or tech lead roles.",
          gapAnalysis: ["Kubernates Experience", "GoLang"]
        },
        targetRole: targetRole
      } as CandidateData
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) 
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
      contents: getPrompt(targetRole) + '\n\nResume Text:\n' + pdfText,
      config: {
        // Enforcing JSON output to align with the prompt requirements
        responseMimeType: 'application/json'
      }
    })

    const textPayload = response.text || ""
    const cleaned = textPayload.replace(/```json/g, '').replace(/```/g, '').trim()
    
    const parsedData = JSON.parse(cleaned) as CandidateData
    parsedData.targetRole = targetRole // Ensure UI can display exactly what was targeted
    
    return parsedData

  } catch (error) {
    console.error('[PDF Processor] Error processing resume:', error)
    throw new Error(`Failed to process resume: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
