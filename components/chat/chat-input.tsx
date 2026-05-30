'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, Send } from 'lucide-react'
import { ChangeEvent, FormEvent } from 'react'

interface ChatInputProps {
  input: string
  isLoading: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ChatInput({ input, isLoading, onChange, onSubmit }: ChatInputProps) {
  return (
    <div className="w-full shrink-0 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-2 sm:p-4">
        <form onSubmit={onSubmit} className="relative">
          <div className="relative flex items-center rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
            <Input
              value={input}
              onChange={onChange}
              placeholder="Ask anything"
              disabled={isLoading}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />

            <div className="mr-1 sm:mr-2">
              {isLoading ? (
                <Button disabled variant="ghost" size="icon" className="py-1 sm:py-1.5 h-8 w-8 sm:h-9 sm:w-9">
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit" variant="ghost" size="icon" className="py-1 sm:py-1.5 h-8 w-8 sm:h-9 sm:w-9">
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 