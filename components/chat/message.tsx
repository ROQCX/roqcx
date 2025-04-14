'use client'

import { MessageSquare, Users, RotateCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Message as AIMessage } from 'ai'
import { Button } from '../ui/button'

interface MessageProps {
  message: AIMessage
  isLast: boolean
  isLoading: boolean
  onRegenerate?: () => void
}

export function Message({ message, isLast, isLoading, onRegenerate }: MessageProps) {
  const showLoading = isLoading && isLast && message.role === 'assistant'
  const isKnowledgeAdded = message.content?.includes('added this information to my knowledge base')

  return (
    <div className={cn(
      "group flex items-start gap-3",
      message.role === 'user' ? "justify-end" : "justify-start"
    )}>
      {message.role === 'assistant' && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-gradient-to-br from-roq-orange via-roq-pink to-roq-blue">
          <MessageSquare className="h-5 w-5 text-white stroke-[2.5]" />
        </div>
      )}
      <div className={cn(
        "flex min-h-[40px] max-w-[85%] items-center rounded-lg px-3 py-2 text-sm",
        message.role === 'user' 
          ? "bg-gradient-to-br from-roq-orange to-roq-pink text-white" 
          : isKnowledgeAdded
            ? "bg-green-600 text-white"
            : "bg-roq-navy-80 text-roq-navy dark:text-white"
      )}>
        <div className="whitespace-pre-wrap">
          {showLoading ? (
            <div className="flex items-center gap-2">
              <span>Thinking</span>
              <span className="animate-pulse">...</span>
            </div>
          ) : (
            <>
              {message.content || ''}
              {isLast && message.role === 'assistant' && onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="ml-2 text-white hover:text-white/80"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {message.role === 'user' && (
        <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md bg-gradient-to-br from-roq-orange to-roq-pink">
          <Users className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  )
}