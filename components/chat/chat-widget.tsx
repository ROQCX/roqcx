'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import { useAnalytics } from '@/app/hooks/use-analytics'
import { chatApiKey } from '@/lib/chat-api-key'
import { Glyph } from '@/components/studio/illustrations'
import { AssistantMark, ChatBubble, ChatComposer, TypingBubble } from './chat-parts'

const ROQ_CX_QUESTIONS = [
  "Where should we start with AI?",
  "Can you work with the tools we already use?",
  "Do we need a solution in mind?",
]

const GREETING = {
  id: "1",
  role: "assistant" as const,
  content: "Hi. Ask about websites, automation, training, or where to start. For a project enquiry, the contact page is the better place.",
}

export function ChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const { trackEvent } = useAnalytics()

  const { messages, input, setInput, append, status, setMessages } = useChat({
    api: '/api/chat/roqcx',
    headers: { 'x-api-key': chatApiKey },
    initialMessages: [GREETING],
    onResponse: (response) => {
      if (response.ok) {
        trackEvent('chat_message_received', { responseLength: response.headers.get('content-length') })
      } else {
        toast.error(response.status === 429 ? "Too many messages in a short time. Try again in a minute." : response.status === 503 ? "The assistant is unavailable right now. Please try again shortly." : "Something went wrong. Please try again.")
      }
    },
    onFinish: (message) => trackEvent('chat_message_complete', { responseLength: message.content.length }),
    onError: (error) => {
      trackEvent('chat_error', { error: error.message })
      toast.error("Something went wrong. Please try again.")
    },
  })

  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, status, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // The demo page has its own, larger chat.
  if (pathname === '/chatbot') return null

  const send = async (content: string, example = false) => {
    if (busy || !content.trim()) return
    trackEvent('chat_message_send', { messageLength: content.length, isQuestion: content.endsWith('?') })
    if (example) trackEvent('chat_example_question', { question: content })
    setInput('')
    try {
      await append({ role: 'user', content })
    } catch {
      toast.error("That message did not send. Please try again.")
    }
  }

  const reset = () => {
    trackEvent('chat_refresh')
    setMessages([GREETING])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <section
          id="studio-chat"
          aria-label="Ask ROQ CX"
          className="flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[20px] border border-[var(--ink)] bg-[var(--paper)] shadow-[0_30px_60px_-24px_rgba(18,21,19,0.55)]"
        >
          <header className="flex items-center gap-3 bg-[var(--void)] px-4 py-3 text-[var(--chalk)]">
            <AssistantMark size={32} />
            <div className="min-w-0 flex-1">
              <p className="m-0 font-medium leading-tight">Ask ROQ CX</p>
              <p className="m-0 text-xs text-[color-mix(in_srgb,var(--chalk)_70%,transparent)]">Websites, automation and training</p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Start a new conversation"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-[color-mix(in_srgb,var(--chalk)_12%,transparent)]"
            >
              <Glyph name="refresh" size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-[color-mix(in_srgb,var(--chalk)_12%,transparent)]"
            >
              <Glyph name="cross" size={18} />
            </button>
          </header>

          <div ref={logRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-4">
              {messages.map((message) =>
                message.role === 'user' || message.role === 'assistant' ? (
                  <ChatBubble key={message.id} role={message.role} content={message.content} compact />
                ) : null,
              )}
              {status === 'submitted' ? <TypingBubble compact /> : null}
            </div>
            {messages.length === 1 ? (
              <ul className="m-0 mt-4 grid list-none gap-2 p-0 pl-10">
                {ROQ_CX_QUESTIONS.map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => send(question, true)}
                      className="min-h-10 w-full rounded-[12px] border border-[var(--rule)] bg-[var(--chalk)] px-3 py-2 text-left text-sm text-[var(--ink)] hover:border-[var(--forest)]"
                    >
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="border-t border-[var(--rule)] bg-[var(--chalk)] p-3">
            <ChatComposer
              id="studio-chat-message"
              label="Your question"
              labelHidden
              value={input}
              onChange={setInput}
              onSubmit={() => send(input)}
              busy={busy}
              placeholder="Ask about a problem you’re stuck on"
            />
          </div>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="studio-chat"
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--void)] py-1.5 pl-1.5 pr-4 text-sm text-[var(--chalk)] shadow-[0_14px_30px_-14px_rgba(18,21,19,0.7)] hover:bg-[var(--forest)]"
      >
        {isOpen ? (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--chalk)] text-[var(--ink)]">
            <Glyph name="cross" size={16} />
          </span>
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
            <Glyph name="chat" size={18} />
          </span>
        )}
        {isOpen ? 'Close' : 'Ask ROQ CX'}
      </button>
    </div>
  )
}
