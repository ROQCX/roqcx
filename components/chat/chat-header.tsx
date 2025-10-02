'use client'

import { Button } from '../ui/button'
import { Lightbulb, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface ChatHeaderProps {
  onInfoClick?: () => void
  onNewChat?: () => void
  hasMessages?: boolean
}

export function ChatHeader({ onInfoClick, onNewChat, hasMessages }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b">
      <h2 className="text-base sm:text-lg font-semibold">Chat</h2>
      <div className="flex items-center gap-1 sm:gap-2">
        {onInfoClick && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onInfoClick}>
                  <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="sr-only">Show help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Show help and information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {hasMessages && onNewChat && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onNewChat}>
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="sr-only">New chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Start a new chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
} 