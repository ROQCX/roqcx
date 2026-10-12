'use client'

import Image from 'next/image'
import { useEffect, useRef, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Glyph } from '../studio/illustrations'

/** The studio mark, used as the assistant's avatar. */
export function AssistantMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="grid flex-none place-items-center rounded-full border border-[var(--ink)] bg-[var(--chalk)]"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image src="/brand/mark-flat.png" alt="" width={size - 12} height={size - 12} style={{ width: size - 12, height: "auto" }} />
    </span>
  )
}

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  /** A short annotation under the bubble, such as what happened to the message. */
  note?: ReactNode
  compact?: boolean
}

export function ChatBubble({ role, content, note, compact = false }: ChatBubbleProps) {
  const text = compact ? 'text-[14px]' : 'text-[15px]'
  if (role === 'user') {
    return (
      <div className="flex flex-col items-end gap-1.5">
        <p className="sr-only">You said:</p>
        <div className={`max-w-[85%] whitespace-pre-wrap rounded-[18px] rounded-br-[6px] bg-[var(--forest)] px-4 py-2.5 leading-relaxed text-[var(--chalk)] ${text}`}>
          {content}
        </div>
        {note ? <div className="text-xs text-[var(--ink-soft)]">{note}</div> : null}
      </div>
    )
  }
  return (
    <div className="flex items-start gap-3">
      <AssistantMark size={compact ? 28 : 32} />
      <div className="min-w-0 max-w-[85%]">
        <p className="sr-only">Assistant said:</p>
        <div className={`chat-md rounded-[18px] rounded-tl-[6px] border border-[var(--rule)] bg-[var(--chalk)] px-4 py-2.5 leading-relaxed text-[var(--ink)] ${text}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ children, href }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        {note ? <div className="mt-1.5 text-xs text-[var(--ink-soft)]">{note}</div> : null}
      </div>
    </div>
  )
}

export function TypingBubble({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-start gap-3" role="status">
      <AssistantMark size={compact ? 28 : 32} />
      <div className="flex h-11 items-center gap-1.5 rounded-[18px] rounded-tl-[6px] border border-[var(--rule)] bg-[var(--chalk)] px-4">
        <span className="sr-only">The assistant is writing a reply</span>
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--forest)]" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </div>
    </div>
  )
}

interface ChatComposerProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  busy: boolean
  placeholder?: string
  /** Hide the label visually; the widget is too tight for it. */
  labelHidden?: boolean
}

/** Multi-line message box. Enter sends, Shift+Enter adds a line. */
export function ChatComposer({ id, label, value, onChange, onSubmit, busy, placeholder, labelHidden = false }: ChatComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }, [value])

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    if (!value.trim() || busy) return
    onSubmit()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-2">
      <label htmlFor={id} className={labelHidden ? 'sr-only' : 'text-sm text-[var(--ink-soft)]'}>
        {label}
      </label>
      <div className="flex items-end gap-2 rounded-[16px] border border-[var(--ink)] bg-[var(--chalk)] p-1.5 pl-4 focus-within:shadow-[0_0_0_3px_var(--signal)]">
        <textarea
          id={id}
          ref={ref}
          rows={1}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          maxLength={4000}
          className="max-h-[140px] min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-relaxed text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]"
        />
        <button
          type="submit"
          disabled={busy || !value.trim()}
          aria-label={busy ? 'Waiting for the reply' : 'Send message'}
          className="grid h-11 w-11 flex-none place-items-center rounded-[12px] border border-[var(--ink)] bg-[var(--signal)] text-[var(--ink)] transition-colors hover:bg-[#edff9c] disabled:cursor-not-allowed disabled:border-[var(--rule)] disabled:bg-[var(--paper)] disabled:text-[var(--ink-soft)]"
        >
          <Glyph name="arrow" size={20} strokeWidth={2} className="-rotate-90" />
        </button>
      </div>
    </form>
  )
}
