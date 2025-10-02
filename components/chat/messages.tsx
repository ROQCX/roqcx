'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Message } from './message'
import { ThinkingMessage } from './thinking-message'
import { Welcome } from './welcome'
import { useEffect, useState } from 'react'
import { useScrollToBottom } from '../../app/hooks/use-scroll-to-bottom'
import type { Message as AIMessage } from 'ai'

interface MessagesProps {
  messages: AIMessage[]
  isLoading: boolean
  onRegenerate: () => void
  onSelectQuestion?: (question: string) => void
  exampleQuestions?: string[]
  welcomeMessage?: string
  showWelcome?: boolean
}

export function Messages({ 
  messages, 
  isLoading, 
  onRegenerate,
  onSelectQuestion,
  exampleQuestions,
  welcomeMessage = "Hello! How can I help you today?",
  showWelcome: controlledShowWelcome
}: MessagesProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>()

  // Scroll to bottom when messages change or welcome state changes
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, showWelcome, endRef])

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false)
    }
  }, [messages.length])

  const handleQuestionClick = (question: string) => {
    setShowWelcome(false)
    onSelectQuestion?.(question)
  }

  const shouldShowWelcome = controlledShowWelcome !== undefined ? controlledShowWelcome : showWelcome

  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto h-full scroll-smooth"
    >
      <AnimatePresence mode="wait">
        {shouldShowWelcome ? (
          <div className="h-full w-full flex items-center justify-center p-2 sm:p-4">
            <div className="max-w-2xl w-full">
              <Welcome 
                onQuestionClick={handleQuestionClick}
                exampleQuestions={exampleQuestions}
                message={welcomeMessage}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 p-2 sm:p-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <Message
                    message={message}
                    isLast={index === messages.length - 1}
                    isLoading={false}
                    onRegenerate={onRegenerate}
                  />
                </motion.div>
              ))}
              {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ThinkingMessage />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} className="h-4" />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 