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
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">Chat</h2>
      <div className="flex items-center gap-2">
        {onInfoClick && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onInfoClick}>
                  <Lightbulb className="h-4 w-4" />
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
                <Button variant="ghost" size="icon" onClick={onNewChat}>
                  <Plus className="h-4 w-4" />
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