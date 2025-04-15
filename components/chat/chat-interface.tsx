'use client'

import { Message, useChat } from 'ai/react'
import { ChatHeader } from './chat-header'
import { Messages } from './messages'
import { ChatInput } from './chat-input'
import { ChatbotInfoOverlay } from './chatbot-info-overlay'
import { NewChatDialog } from './new-chat-dialog'
import { useState } from 'react'
import { useAnalytics } from '../../app/hooks/use-analytics'
import { toast } from 'sonner'

interface ChatInterfaceProps {
  initialMessages: Message[]
  isReadonly?: boolean
  exampleQuestions?: string[]
  welcomeMessage?: string
  showInfoButton?: boolean
  apiRoute?: string
}

export function ChatInterface({
  initialMessages,
  isReadonly = false,
  exampleQuestions,
  welcomeMessage,
  showInfoButton = true,
  apiRoute = '/api/chat'
}: ChatInterfaceProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const { trackEvent } = useAnalytics()

  const { messages, input, handleInputChange, isLoading, reload, append, setMessages } = useChat({
    initialMessages,
    api: apiRoute,
    headers: {
      'x-api-key': (process.env.NEXT_PUBLIC_API_KEY || '').trim().replace(/^['"](.+)['"]$/, '$1'),
    },
    onResponse: (response) => {
      if (response.ok) {
        trackEvent('chat_message_received', {
          responseLength: response.headers.get('content-length')
        })
        toast.success("Message received")
      } else {
        // Log response details for debugging
        console.error('Chat API Error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          url: response.url
        })

        // Handle specific status codes
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
            // Only try to read response if it hasn't been read
            if (response.bodyUsed) {
              toast.error(`Request failed with status: ${response.status}`)
            } else {
              response.json().then(data => {
                toast.error(`Error: ${data.message || 'Unknown error'} (Status: ${response.status})`)
              }).catch(() => {
                toast.error(`Request failed with status: ${response.status}`)
              })
            }
        }
      }
    },
    onFinish: (message) => {
      trackEvent('chat_message_complete', {
        responseLength: message.content.length
      })
      toast.success("Message complete")
    },
    onError: (error) => {
      console.error('Error in chat:', error)
      trackEvent('chat_error', {
        error: error.message
      })

      // Handle specific error types
      if (error.message?.includes('body stream already read')) {
        // This is expected in some cases, don't show error to user
        return
      }

      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}`
        : 'An unexpected error occurred. Please check your connection and API key.'
      toast.error(errorMessage)
    }
  })

  const handleSendMessage = async (message: string, isExampleQuestion = false) => {
    if (isReadonly) return

    trackEvent('chat_message_send', {
      messageLength: message.length,
      isQuestion: message.endsWith('?'),
      isExampleQuestion
    })

    setShowWelcome(false)
    try {
      await append({
        content: message,
        role: 'user'
      })
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? `Failed to send message: ${error.message}`
        : 'Failed to send message. Please check your connection and try again.'
      toast.error(errorMessage)
    }
  }

  const handleRegenerate = async () => {
    if (isReadonly) return
    trackEvent('chat_regenerate')
    try {
      await reload()
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? `Failed to regenerate response: ${error.message}`
        : 'Failed to regenerate response. Please check your connection and try again.'
      toast.error(errorMessage)
    }
  }

  const handleNewChat = () => {
    if (isReadonly) return
    setShowNewChatDialog(true)
  }

  const handleConfirmNewChat = () => {
    trackEvent('chat_new')
    setMessages([])
    setShowWelcome(true)
    toast.success("New chat started")
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        onInfoClick={!isReadonly && showInfoButton ? () => {
          setShowOverlay(true)
          trackEvent('chat_info_open')
        } : undefined}
        onNewChat={!isReadonly ? handleNewChat : undefined}
        hasMessages={messages.length > 0}
      />
      <Messages 
        messages={messages}
        isLoading={isLoading}
        onRegenerate={handleRegenerate}
        onSelectQuestion={(question) => {
          trackEvent('chat_example_question', { question })
          handleSendMessage(question, true)
        }}
        exampleQuestions={exampleQuestions}
        welcomeMessage={welcomeMessage}
        showWelcome={showWelcome}
      />
      {!isReadonly && (
        <ChatInput
          input={input}
          isLoading={isLoading}
          onChange={handleInputChange}
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(input)
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
      {!isReadonly && (
        <NewChatDialog
          open={showNewChatDialog}
          onOpenChange={setShowNewChatDialog}
          onConfirm={handleConfirmNewChat}
        />
      )}
    </div>
  )
} 