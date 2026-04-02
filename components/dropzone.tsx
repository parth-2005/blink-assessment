'use client'

import { Upload } from 'lucide-react'
import { useRef } from 'react'

interface DropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
  missingRole?: boolean
}

export function Dropzone({ onFileSelect, disabled = false, missingRole = false }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        onFileSelect(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`relative w-full max-w-3xl mx-auto rounded-3xl border-2 border-dashed transition-all overflow-hidden ${
        missingRole
          ? 'border-muted/50 bg-muted/10 cursor-not-allowed opacity-50'
          : disabled
            ? 'border-accent bg-accent/5 cursor-not-allowed'
            : 'border-primary/40 bg-primary/5 hover:border-primary/80 hover:bg-primary/10 cursor-pointer active:scale-[0.99]'
      }`}
      style={{ minHeight: '300px' }}
    >
      {/* The Horizontal Scanner Light Bar */}
      {disabled && !missingRole && (
        <div className="absolute left-0 w-full h-[4px] bg-accent blur-[2px] shadow-[0_0_15px_3px_rgba(16,185,129,0.5)] animate-scan z-10" />
      )}

      {/* Background glow if disabled (scanning) */}
      {disabled && !missingRole && (
        <div className="absolute inset-0 bg-accent/5 animate-pulse rounded-3xl" />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-0">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors ${missingRole ? 'bg-muted/50 text-muted-foreground' : disabled ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'}`}>
          <Upload className={`w-10 h-10 ${disabled && !missingRole ? 'animate-bounce' : ''}`} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-semibold mb-3 tracking-tight">
          {missingRole ? 'Awaiting Target Role' : disabled ? 'Analyzing Intelligence...' : 'Upload Resume'}
        </h3>
        <p className="text-muted-foreground text-center max-w-md text-lg">
          {missingRole 
            ? 'Please specify the Target Role above to unlock semantic gap analysis.'
            : disabled 
            ? 'Extracting skills, verifying trajectory, and calculating match score.' 
            : 'Drag and drop your PDF resume here, or click to browse.'}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        disabled={disabled}
        className="hidden"
      />
    </div>
  )
}
