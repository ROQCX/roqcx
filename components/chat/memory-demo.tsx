'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { useAnalytics } from '../../app/hooks/use-analytics'
import { chatApiKey } from '@/lib/chat-api-key'
import { Glyph } from '../studio/illustrations'
import { ChatBubble, ChatComposer, TypingBubble } from './chat-parts'

const TEACH = ["My favourite ice cream is pistachio.", "I run a small bookshop in Dubai."]
const TEST = ["What's my favourite ice cream?", "What kind of business do I run?"]

function errorMessage(status: number) {
  if (status === 429) return 'Too many messages in a short time. Try again in a minute.'
  if (status === 503) return 'The assistant is unavailable right now. Please try again shortly.'
  if (status === 401 || status === 403) return 'The demo could not verify this request. Refresh the page and try again.'
  return 'Something went wrong. Please try again.'
}

/** Public memory demo: a chat workbench beside the notes it keeps for this session. */
export function MemoryDemo({ aside }: { aside?: ReactNode }) {
  const { trackEvent } = useAnalytics()
  const logRef = useRef<HTMLDivElement>(null)
  // Notes outlive the visible conversation, as they do on the server.
  const [notes, setNotes] = useState<string[]>([])
  const [forgetting, setForgetting] = useState(false)

  const { messages, input, setInput, append, status, setMessages } = useChat({
    api: '/api/chat/demo',
    headers: { 'x-api-key': chatApiKey },
    onResponse: (response) => {
      if (response.ok) {
        trackEvent('chat_message_received', { responseLength: response.headers.get('content-length') })
      } else {
        toast.error(errorMessage(response.status))
      }
    },
    onFinish: (message) => trackEvent('chat_message_complete', { responseLength: message.content.length }),
    onError: (error) => {
      trackEvent('chat_error', { error: error.message })
      toast.error(errorMessage(0))
    },
  })

  const busy = status === 'submitted' || status === 'streaming'
  const sent = new Set(messages.filter((message) => message.role === 'user').map((message) => message.content))
  const remaining = [...TEACH, ...TEST].filter((prompt) => !sent.has(prompt))

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const send = async (content: string, example = false) => {
    if (busy || !content.trim()) return
    trackEvent('chat_message_send', { messageLength: content.length, isQuestion: content.endsWith('?'), isExampleQuestion: example })
    if (example) trackEvent('chat_example_question', { question: content })
    setInput('')
    setNotes((current) => [...current, content])
    try {
      await append({ role: 'user', content })
    } catch {
      toast.error('That message did not send. Please try again.')
    }
  }

  const clear = () => {
    trackEvent('chat_new')
    setMessages([])
  }

  const forget = async () => {
    if (forgetting) return
    setForgetting(true)
    trackEvent('chat_forget')
    try {
      const response = await fetch('/api/chat/demo', {
        method: 'DELETE',
        headers: { 'x-api-key': chatApiKey },
      })
      if (!response.ok) throw new Error('delete failed')
      setNotes([])
      setMessages([])
      toast.success('Notes deleted.')
    } catch {
      toast.error('The notes could not be deleted. Please try again.')
    } finally {
      setForgetting(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <section aria-label="Memory demo" className="plate flex min-h-[560px] flex-col bg-[var(--paper)] shadow-[0_30px_60px_-36px_rgba(18,21,19,0.45)] lg:col-span-7 lg:h-[680px]">
        <header className="flex items-center justify-between gap-4 border-b border-[var(--rule)] bg-[var(--chalk)] px-5 py-3">
          <p className="m-0 flex items-center gap-2 text-sm text-[var(--ink-soft)]">
            <Glyph name="clock" size={16} />
            This session’s notes are removed once they are older than 24 hours
          </p>
          {messages.length > 0 ? (
            <button type="button" onClick={clear} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm text-[var(--ink)] hover:bg-[var(--paper)]">
              <Glyph name="cross" size={14} />
              Clear screen
            </button>
          ) : null}
        </header>

        <div ref={logRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-5 py-6 [scrollbar-gutter:stable]">
          {messages.length === 0 ? (
            <div className="mx-auto grid max-w-[34rem] gap-8 py-2">
              <div>
                <p className="font-serif-display m-0 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight">Try it in two steps.</p>
                <p className="mb-0 mt-2 leading-relaxed text-[var(--ink-soft)]">
                  Tell it something about you. Then ask for it back, in your own words.
                </p>
              </div>
              {[
                { step: 1, title: 'Teach it', prompts: TEACH, icon: 'pen' as const },
                { step: 2, title: 'Test it', prompts: TEST, icon: 'search' as const },
              ].map((group) => (
                <div key={group.title}>
                  <p className="m-0 flex items-center gap-3 text-sm font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--ink)] text-xs text-[var(--chalk)]">{group.step}</span>
                    {group.title}
                  </p>
                  <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
                    {group.prompts.map((prompt) => (
                      <li key={prompt}>
                        <button
                          type="button"
                          onClick={() => send(prompt, true)}
                          className="lift flex min-h-14 w-full items-center gap-3 rounded-[14px] border border-[var(--rule)] bg-[var(--chalk)] px-4 py-3 text-left text-[15px] leading-snug text-[var(--ink)] hover:border-[var(--forest)]"
                        >
                          <span className="flex-none text-[var(--forest)]">
                            <Glyph name={group.icon} size={18} />
                          </span>
                          {prompt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-5">
              {messages.map((message) =>
                message.role === 'user' ? (
                  <ChatBubble
                    key={message.id}
                    role="user"
                    content={message.content}
                    note={
                      <span className="inline-flex items-center gap-1.5">
                        <Glyph name="check" size={13} strokeWidth={2.25} />
                        Saved to this session’s notes
                      </span>
                    }
                  />
                ) : message.role === 'assistant' ? (
                  <ChatBubble key={message.id} role="assistant" content={message.content} />
                ) : null,
              )}
              {status === 'submitted' ? <TypingBubble /> : null}
            </div>
          )}
        </div>

        <div className="border-t border-[var(--rule)] bg-[var(--chalk)] px-4 pb-4 pt-3">
          {messages.length > 0 && remaining.length > 0 ? (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {remaining.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={busy}
                  onClick={() => send(prompt, true)}
                  className="min-h-10 flex-none rounded-full border border-[var(--rule)] bg-[var(--paper)] px-3.5 text-sm text-[var(--ink)] hover:border-[var(--forest)] disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}
          <ChatComposer
            id="memory-demo-message"
            label="Tell it something, or ask it something"
            value={input}
            onChange={setInput}
            onSubmit={() => send(input)}
            busy={busy}
            placeholder="For example: I open the shop at nine."
          />
          <p className="mb-0 mt-2 text-xs text-[var(--ink-soft)]">Please don’t share anything private. This is a public demo.</p>
        </div>
      </section>

      <div className="grid content-start gap-6 lg:col-span-5">
        <section aria-labelledby="notebook-title" className="plate bg-[var(--chalk)]">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--rule)] px-5 py-4">
            <h2 id="notebook-title" className="m-0 flex items-center gap-2 text-lg font-medium">
              <Glyph name="doc" size={18} />
              Session notes
            </h2>
            <span className="rounded-full bg-[var(--paper)] px-3 py-1 text-sm text-[var(--ink-soft)]">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </header>
          {notes.length === 0 ? (
            <div className="px-5 py-6">
              <div className="grid gap-3" aria-hidden>
                {[78, 62, 70].map((width) => (
                  <span key={width} className="block h-2 rounded-full bg-[var(--paper)]" style={{ width: `${width}%` }} />
                ))}
              </div>
              <p className="mb-0 mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                Nothing yet. Everything you type is kept here for this session, and the assistant looks back through it before it answers.
              </p>
            </div>
          ) : (
            <ol className="m-0 grid max-h-[260px] list-none gap-0 overflow-y-auto p-0">
              {notes.map((note, index) => (
                <li key={`${index}-${note}`} className="flex gap-3 border-b border-[var(--rule)] px-5 py-3 last:border-b-0">
                  <span className="font-serif-display w-6 flex-none text-lg italic leading-6 text-[var(--clay)]">{index + 1}</span>
                  <span className="min-w-0 break-words text-[15px] leading-6">{note}</span>
                </li>
              ))}
            </ol>
          )}
          <p className="m-0 border-t border-[var(--rule)] px-5 py-3 text-xs leading-relaxed text-[var(--ink-soft)]">
            Clearing the screen does not clear the notes. Delete notes removes them now. A daily cleanup removes anything older than 24 hours.
          </p>
          <div className="border-t border-[var(--rule)] px-5 py-3">
            <button
              type="button"
              onClick={forget}
              disabled={forgetting}
              className="inline-flex min-h-10 items-center gap-1.5 text-sm text-[var(--ink)] underline disabled:opacity-50"
            >
              <Glyph name="cross" size={14} />
              {forgetting ? 'Deleting notes' : 'Delete notes'}
            </button>
          </div>
        </section>
        {aside}
      </div>
    </div>
  )
}
