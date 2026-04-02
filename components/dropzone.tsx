'use client'

import { Upload, FileText } from 'lucide-react'
import { useRef } from 'react'

interface DropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function Dropzone({ onFileSelect, disabled = false }: DropzoneProps) {
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
      className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
        disabled
          ? 'border-muted bg-muted/20 cursor-not-allowed opacity-50'
          : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 active:scale-95'
      }`}
    >
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Upload Your Resume</h3>
        <p className="text-muted-foreground text-center max-w-sm mb-1">
          Drag and drop your PDF resume, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">PDF format • Up to 10 MB</p>
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
