'use client'

import { MessageSquare } from 'lucide-react'

export function ThinkingMessage() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-gradient-to-br from-roq-orange via-roq-pink to-roq-blue">
        <MessageSquare className="h-5 w-5 text-white stroke-[2.5]" />
      </div>
      <div className="flex min-h-[40px] max-w-[85%] items-center rounded-lg px-3 py-2 text-sm text-roq-navy dark:text-white bg-roq-navy-80">
        <div className="flex items-center gap-2">
          <span>Thinking</span>
          <span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  )
} 