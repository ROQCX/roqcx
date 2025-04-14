'use client'

import { Message } from 'ai'
import { ChatHeader } from './chat-header'
import { Messages } from './messages'
import { ChatInput } from './chat-input'
import { ChatbotInfoOverlay } from './chatbot-info-overlay'
import { useState } from 'react'
import { useAnalytics } from '../../app/hooks/use-analytics'

interface ChatInterfaceProps {
  initialMessages: Message[]
  selectedChatModel?: string
  selectedVisibilityType?: string
  isReadonly?: boolean
  exampleQuestions?: string[]
  welcomeMessage?: string
}

export function ChatInterface({
  initialMessages,
  isReadonly = false,
  exampleQuestions,
  welcomeMessage
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const { trackEvent } = useAnalytics()

  const handleSendMessage = async (message: string) => {
    if (isReadonly) return

    trackEvent('chat_message_send', {
      messageLength: message.length,
      isQuestion: message.endsWith('?')
    })

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      setMessages(prev => [...prev, data])
      
      trackEvent('chat_message_received', {
        responseLength: data.content.length
      })
    } catch (error) {
      console.error('Error sending message:', error)
      trackEvent('chat_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (isReadonly) return

    trackEvent('chat_regenerate')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.slice(0, -1),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate message')
      }

      const data = await response.json()
      setMessages(prev => [...prev.slice(0, -1), data])
      
      trackEvent('chat_regenerate_success', {
        responseLength: data.content.length
      })
    } catch (error) {
      console.error('Error regenerating message:', error)
      trackEvent('chat_regenerate_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        onInfoClick={!isReadonly ? () => {
          setShowOverlay(true)
          trackEvent('chat_info_open')
        } : undefined}
        onNewChat={!isReadonly ? () => {
          setMessages([])
          trackEvent('chat_new')
        } : undefined}
        hasMessages={messages.length > 0}
      />
      <Messages 
        messages={messages}
        isLoading={isLoading}
        onRegenerate={handleRegenerate}
        onSelectQuestion={(question) => {
          trackEvent('chat_example_question', { question })
          handleSendMessage(question)
        }}
        exampleQuestions={exampleQuestions}
        welcomeMessage={welcomeMessage}
      />
      {!isReadonly && (
        <ChatInput
          input=""
          isLoading={isLoading}
          onChange={() => {}}
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement
            if (input?.value) {
              handleSendMessage(input.value)
              input.value = ''
            }
          }}
        />
      )}
      {!isReadonly && showOverlay && (
        <ChatbotInfoOverlay 
          isOpen={showOverlay}
          onClose={() => {
            setShowOverlay(false)
            trackEvent('chat_info_close')
          }} 
        />
      )}
    </div>
  )
} 