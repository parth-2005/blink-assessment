'use client'

interface GaugeChartProps {
  score: number
  maxScore?: number
}

export function GaugeChart({ score, maxScore = 100 }: GaugeChartProps) {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45

  // Determine color based on score
  let color = 'text-red-500'
  let bgColor = 'from-red-500 to-red-400'
  if (score >= 75) {
    color = 'text-emerald-500'
    bgColor = 'from-emerald-500 to-emerald-400'
  } else if (score >= 60) {
    color = 'text-blue-500'
    bgColor = 'from-blue-500 to-blue-400'
  }

  // Calculate stroke dash offset for animation
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes gauge-fill {
          from { stroke-dashoffset: ${circumference}; }
          to { stroke-dashoffset: ${offset}; }
        }
        .gauge-progress {
          animation: gauge-fill 1.5s ease-out forwards;
        }
      `}</style>
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            className={`gauge-progress ${color}`}
            style={{
              strokeDashoffset: offset,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold bg-gradient-to-br ${bgColor} bg-clip-text text-transparent`}>
            {score}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Match Score</p>
        </div>
      </div>

      {/* Score interpretation */}
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">
          {score >= 85 ? 'Excellent Fit' : score >= 75 ? 'Strong Match' : score >= 60 ? 'Good Fit' : 'Fair Match'}
        </p>
        <p className="text-xs text-muted-foreground">Based on experience and skills alignment</p>
      </div>
    </div>
  )
}
