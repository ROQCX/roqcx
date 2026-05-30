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
  welcomeMessage = 'Hello! How can I help you today?',
  showWelcome: controlledShowWelcome,
}: MessagesProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>()

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false)
    }
  }, [messages.length])

  const handleQuestionClick = (question: string) => {
    setShowWelcome(false)
    onSelectQuestion?.(question)
  }

  const shouldShowWelcome =
    controlledShowWelcome !== undefined ? controlledShowWelcome : showWelcome
  const hasMessages = messages.length > 0

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-y-auto scroll-smooth [scrollbar-gutter:stable]"
    >
      <div className="space-y-3 sm:space-y-4 p-2 sm:p-4">
        <AnimatePresence initial={false}>
          {shouldShowWelcome && !hasMessages && (
            <motion.div
              key="welcome"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Welcome
                onQuestionClick={handleQuestionClick}
                exampleQuestions={exampleQuestions}
                message={welcomeMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
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
        </AnimatePresence>

        {isLoading && hasMessages && messages[messages.length - 1].role === 'user' && (
          <ThinkingMessage />
        )}

        <div ref={endRef} className="h-px shrink-0" aria-hidden />
      </div>
    </div>
  )
}
