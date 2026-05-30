'use client'

import { MessageSquare } from 'lucide-react'
import { RQX } from '../redesign/atoms'

export function ThinkingMessage() {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md"
        style={{
          background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
        }}
      >
        <MessageSquare className="h-5 w-5 text-white stroke-[2.5]" />
      </div>
      <div
        className="flex min-h-[40px] max-w-[85%] items-center rounded-lg px-3 py-2 text-sm"
        style={{
          background: RQX.bgRaised,
          color: RQX.fg,
          border: `1px solid ${RQX.lineDim}`,
        }}
      >
        <div className="flex items-center gap-2">
          <span>Thinking</span>
          <span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  )
} 