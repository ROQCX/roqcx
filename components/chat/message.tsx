'use client'

import { MessageSquare, Users, RotateCw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../../lib/utils'
import type { Message as AIMessage } from 'ai'
import { Button } from '../ui/button'
import { RQX } from '../redesign/atoms'

interface MessageProps {
  message: AIMessage
  isLast: boolean
  isLoading: boolean
  onRegenerate?: () => void
}

export function Message({ message, isLast, isLoading, onRegenerate }: MessageProps) {
  const showLoading = isLoading && isLast && message.role === 'assistant'
  const isKnowledgeAdded = message.content?.includes('added this information to my knowledge base')
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      "group flex items-start gap-3",
      message.role === 'user' ? "justify-end" : "justify-start"
    )}>
      {message.role === 'assistant' && (
        <div
          className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md"
          style={{
            background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
          }}
        >
          <MessageSquare className="h-5 w-5 text-white stroke-[2.5]" />
        </div>
      )}
      <div className={cn(
        "flex min-h-[40px] max-w-[85%] items-center rounded-lg px-3 py-2 text-sm",
        message.role === 'user' 
          ? "text-white" 
          : isKnowledgeAdded
            ? "bg-green-600 text-white"
            : ""
      )}
      style={{
        background:
          message.role === 'user'
            ? RQX.accent
            : isKnowledgeAdded
              ? "oklch(0.78 0.13 145)"
              : RQX.bgRaised,
        color:
          message.role === 'user'
            ? "#fff"
            : isKnowledgeAdded
              ? "#fff"
              : RQX.fg,
        border: message.role === 'assistant' && !isKnowledgeAdded ? `1px solid ${RQX.lineDim}` : undefined,
      }}
      >
        <div className="w-full">
          {showLoading ? (
            <div className="flex items-center gap-2">
              <span>Thinking</span>
              <span className="animate-pulse">...</span>
            </div>
          ) : isUser ? (
            <div className="whitespace-pre-wrap">{message.content || ''}</div>
          ) : (
            <div className="rqx-chat-md text-sm leading-snug">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, ...props }) => (
                    <a
                      {...props}
                      target={props.href?.startsWith('http') ? '_blank' : undefined}
                      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ color: RQX.accent, textDecoration: 'underline' }}
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul style={{ margin: '6px 0 6px 0', paddingLeft: 18, listStyle: 'disc' }}>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol style={{ margin: '6px 0 6px 0', paddingLeft: 20, listStyle: 'decimal' }}>{children}</ol>
                  ),
                  li: ({ children }) => <li style={{ marginBottom: 2 }}>{children}</li>,
                  code: ({ children }) => (
                    <code style={{ background: RQX.bg, padding: '1px 5px', borderRadius: 4, fontSize: '0.92em' }}>
                      {children}
                    </code>
                  ),
                  p: ({ children }) => <p style={{ margin: '4px 0' }}>{children}</p>,
                  strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
                }}
              >
                {message.content || ''}
              </ReactMarkdown>
              {isLast && onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="ml-1 mt-1"
                  style={{ color: RQX.fgDim }}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {message.role === 'user' && (
        <div
          className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md"
          style={{ background: RQX.accent }}
        >
          <Users className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  )
}