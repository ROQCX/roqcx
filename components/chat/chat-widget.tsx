'use client'

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Message, useChat } from 'ai/react'
import { useAnalytics } from '@/app/hooks/use-analytics'
import { toast } from 'sonner'

const ROQ_CX_QUESTIONS = [
  "How does ROQ CX's AI technology work?",
  "Can ROQ CX help reduce my customer support costs?",
  "How can ROQ CX help me understand my customers better?"
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
        content: "👋 Welcome to ROQ CX Assistant! How can I help you learn about our products and services?",
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
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    }
  }

  const handleRefresh = () => {
    trackEvent('chat_refresh')
    setMessages([
      {
        id: "1",
        content: "👋 Welcome to ROQ CX Assistant! How can I help you learn about our products and services?",
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
          "mb-2 flex w-[calc(100vw-2rem)] flex-col rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out",
          "sm:w-96",
          isOpen ? "h-[calc(100vh-8rem)] sm:h-[500px] opacity-100" : "h-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-roq-orange to-roq-pink p-3 text-white">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <h3 className="font-medium">ROQ CX Assistant</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-white/10"
              onClick={handleRefresh}
              title="Reset chat"
            >
              <RefreshCw size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              title="Close chat"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-[85%] sm:max-w-[80%] flex-col",
                  message.role === "user" ? "ml-auto items-end" : "mr-auto items-start",
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm sm:text-base",
                    message.role === "user" 
                      ? "bg-gradient-to-r from-roq-orange to-roq-pink text-white" 
                      : "bg-zinc-100 dark:bg-zinc-800"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[85%] sm:max-w-[80%] flex-col mr-auto items-start">
                <div className="rounded-lg px-3 py-2 bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Example questions */}
        {messages.length === 1 && (
          <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {ROQ_CX_QUESTIONS.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-normal h-auto py-1.5"
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
        <form onSubmit={handleSendMessage} className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 text-sm sm:text-base"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-gradient-to-r from-roq-orange to-roq-pink text-white hover:opacity-90"
              disabled={isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </div>

      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700" 
            : "bg-gradient-to-r from-roq-orange to-roq-pink hover:opacity-90"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <div className="flex h-full w-full items-center justify-center bg-white text-roq-orange">
                <MessageSquare size={16} className="sm:hidden" />
                <MessageSquare size={20} className="hidden sm:block" />
              </div>
            </Avatar>
          </div>
        )}
      </Button>
    </div>
  )
} 