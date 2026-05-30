'use client'

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, RefreshCw } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useChat } from 'ai/react'
import { useAnalytics } from '@/app/hooks/use-analytics'
import { toast } from 'sonner'

const ROQ_CX_QUESTIONS = [
  "What happens in a 14-day prototype sprint?",
  "How much does a sprint cost?",
  "What stack do you build in?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { trackEvent } = useAnalytics()

  const { messages, input, handleInputChange, isLoading, append, setMessages } = useChat({
    api: '/api/chat/roqcx',
    headers: {
      'x-api-key': (process.env.NEXT_PUBLIC_API_KEY || '').trim().replace(/^['"](.+)['"]$/, '$1'),
    },
    initialMessages: [
      {
        id: "1",
        content: "Hi! I'm the ROQ CX assistant. Ask me anything about our prototype sprints, what we build, or how a sprint kicks off.",
        role: "assistant"
      }
    ],
    onResponse: (response) => {
      if (response.ok) {
        trackEvent('chat_message_received', {
          responseLength: response.headers.get('content-length')
        })
      } else {
        switch (response.status) {
          case 403:
            toast.error("Access denied. Please check your API key and permissions.")
            break
          case 401:
            toast.error("Unauthorized. Please check your API key.")
            break
          case 429:
            toast.error("Too many requests. Please try again later.")
            break
          default:
            toast.error("An error occurred. Please try again.")
        }
      }
    },
    onFinish: (message) => {
      trackEvent('chat_message_complete', {
        responseLength: message.content.length
      })
    },
    onError: (error) => {
      trackEvent('chat_error', {
        error: error.message
      })
      toast.error("An error occurred. Please try again.")
    }
  })

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    trackEvent('chat_message_send', {
      messageLength: input.length,
      isQuestion: input.endsWith('?')
    })

    try {
      await append({
        content: input,
        role: 'user'
      })
      handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    } catch {
      toast.error("Failed to send message. Please try again.")
    }
  }

  const handleRefresh = () => {
    trackEvent('chat_refresh')
    setMessages([
      {
        id: "1",
        content: "Hi! I'm the ROQ CX assistant. Ask me anything about our prototype sprints, what we build, or how a sprint kicks off.",
        role: "assistant"
      }
    ])
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat window */}
      <div
        className={cn(
          "mb-2 flex w-[calc(100vw-1rem)] flex-col rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out",
          "sm:w-96",
          isOpen ? "h-[calc(100vh-6rem)] sm:h-[500px] opacity-100" : "h-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Chat header */}
        <div
          className="flex items-center justify-between rounded-t-2xl p-2 sm:p-3 text-white"
          style={{ background: "var(--rqx-accent)" }}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <MessageSquare size={16} className="sm:hidden" />
            <MessageSquare size={20} className="hidden sm:block" />
            <h3 className="font-medium text-sm sm:text-base">ROQ CX Assistant</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-white hover:bg-white/10"
              onClick={handleRefresh}
              title="Reset chat"
            >
              <RefreshCw size={14} className="sm:hidden" />
              <RefreshCw size={18} className="hidden sm:block" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              title="Close chat"
            >
              <X size={14} className="sm:hidden" />
              <X size={18} className="hidden sm:block" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3">
          <div className="flex flex-col gap-2 sm:gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-[90%] sm:max-w-[85%] flex-col",
                  message.role === "user" ? "ml-auto items-end" : "mr-auto items-start",
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm",
                    message.role === "user"
                      ? "text-white"
                      : "bg-zinc-100 dark:bg-zinc-800"
                  )}
                  style={message.role === "user" ? { background: "var(--rqx-accent)" } : undefined}
                >
                  {message.role === "user" ? (
                    <span>{message.content}</span>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ children, ...props }) => (
                          <a
                            {...props}
                            target={props.href?.startsWith('http') ? '_blank' : undefined}
                            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            style={{ color: 'var(--rqx-accent)', textDecoration: 'underline' }}
                          >
                            {children}
                          </a>
                        ),
                        p: ({ children }) => <p style={{ margin: '2px 0' }}>{children}</p>,
                        ul: ({ children }) => (
                          <ul style={{ margin: '4px 0', paddingLeft: 16, listStyle: 'disc' }}>{children}</ul>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[90%] sm:max-w-[85%] flex-col mr-auto items-start">
                <div className="rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-zinc-400" />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Example questions */}
        {messages.length === 1 && (
          <div className="px-2 sm:px-3 py-1.5 sm:py-2 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {ROQ_CX_QUESTIONS.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-normal h-auto py-1 sm:py-1.5 px-2 sm:px-3"
                  onClick={() => {
                    trackEvent('chat_example_question', { question })
                    append({
                      content: question,
                      role: 'user'
                    })
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="border-t border-zinc-200 dark:border-zinc-800 p-2 sm:p-3">
          <div className="flex gap-1 sm:gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 text-xs sm:text-sm"
            />
            <Button 
              type="submit" 
              size="icon"
              className="text-white hover:opacity-90 h-8 w-8 sm:h-9 sm:w-9"
              style={{ background: "var(--rqx-accent)" }}
              disabled={isLoading}
            >
              <Send size={14} className="sm:hidden" />
              <Send size={18} className="hidden sm:block" />
            </Button>
          </div>
        </form>
      </div>

      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700" 
            : "hover:opacity-90"
        )}
        style={!isOpen ? { background: "var(--rqx-accent)" } : undefined}
      >
        {isOpen ? (
          <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10">
              <div className="flex h-full w-full items-center justify-center bg-white text-[var(--rqx-accent)]">
                <MessageSquare size={12} className="sm:hidden" />
                <MessageSquare size={16} className="hidden sm:block md:hidden" />
                <MessageSquare size={20} className="hidden md:block" />
              </div>
            </Avatar>
          </div>
        )}
      </Button>
    </div>
  )
} 