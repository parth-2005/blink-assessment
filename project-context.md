# Project Context: Blink Intelligence (v1.0.0)

## 1. Product Vision
An AI-native "Candidate Intelligence" platform. It doesn't just parse text; it evaluates professional DNA. Built for Blink Analytics to showcase high-speed data-to-insight pipelines.

## 2. Technical Architecture
- **Framework:** Next.js 15 (App Router).
- **Frontend:** React + Tailwind CSS + shadcn/ui.
- **Backend:** Next.js Server Actions (No Express needed).
- **AI Engine:** Google Gemini 1.5 Flash (via `@google/generative-ai`).
- **Parsing:** `pdf-parse` for server-side PDF-to-text extraction.
- **Validation:** Zod for runtime JSON schema validation.

## 3. The "Product" Features
- **Social ID Extraction:** Automated discovery of GitHub/LinkedIn URLs from raw text.
- **The Blink Gauge:** A calculated "Match Score" based on technical density.
- **Trajectory Mapping:** AI-driven prediction of the candidate's next 2 years.
- **Aesthetic:** Corporate SaaS. Dark Slate/Navy with Emerald (#10b981) highlights.

## 4. Key Constraints
- Must be a Single-Page Application (SPA) feel.
- High-performance MJPEG-style loading states.
- 100% Type Safety across the data pipeline.