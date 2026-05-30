'use client'

import { Button } from '../ui/button'
import { RQX } from '../redesign/atoms'

interface WelcomeProps {
  message: string
  exampleQuestions?: string[]
  onQuestionClick?: (question: string) => void
}

export function Welcome({ 
  message, 
  exampleQuestions = [], 
  onQuestionClick 
}: WelcomeProps) {
  return (
    <div className="space-y-8">
      <p
        className="text-2xl font-semibold text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${RQX.accent} 0%, ${RQX.accent3} 50%, ${RQX.accent2} 100%)`,
        }}
      >
        {message}
      </p>
      {exampleQuestions.length > 0 && onQuestionClick && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto min-h-[5rem] justify-center text-center bg-background/20 backdrop-blur-sm border-border hover:bg-background transition-colors whitespace-normal flex items-center shadow-lg"
              style={{ borderColor: `color-mix(in oklab, ${RQX.accent} 35%, transparent)` }}
              onClick={() => onQuestionClick(question)}
            >
              <span className="line-clamp-3 font-medium py-4 px-2">{question}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
} 