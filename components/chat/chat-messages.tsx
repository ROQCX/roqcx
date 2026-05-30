'use client'

import { AnimatePresence } from 'framer-motion'
import { Welcome } from './welcome'
import { useEffect, useState } from 'react'
import { useScrollToBottom } from '../../app/hooks/use-scroll-to-bottom'
import { Messages } from './messages'
import type { Message } from 'ai'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  onRegenerate: () => void
  onSelectQuestion: (question: string) => void
  exampleQuestions: string[]
  welcomeMessage?: string
}

export function ChatMessages({ 
  messages, 
  isLoading, 
  onRegenerate, 
  onSelectQuestion,
  exampleQuestions,
  welcomeMessage = "Hello! How can I help you today?"
}: ChatMessagesProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>()

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false)
    }
  }, [messages.length])

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <Welcome 
            onQuestionClick={onSelectQuestion}
            exampleQuestions={exampleQuestions}
            message={welcomeMessage}
          />
        ) : (
          <>
            <Messages 
              messages={messages} 
              isLoading={isLoading} 
              onRegenerate={onRegenerate}
            />
            <div ref={endRef} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 