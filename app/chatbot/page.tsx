"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from 'next/dynamic'

// Dynamically import the chat interface with no SSR
const DynamicChatInterface = dynamic(
  () => import('../../components/chat/chat-interface').then(mod => mod.ChatInterface),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-[500px]">Loading...</div>
  }
)

// Dynamically import the overlay
const ChatbotInfoOverlay = dynamic(
  () => import("../../components/chat/chatbot-info-overlay").then(mod => mod.ChatbotInfoOverlay),
  { ssr: false }
)

const DEMO_QUESTIONS = [
  "What is the difference between RPA and AI?",
  "Can you explain what machine learning is?",
  "What are the main components of a chatbot?",
  "What is CX?"
]

export default function ChatbotPage() {
  const [showOverlay, setShowOverlay] = useState(true)
  
  // Check if it's the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedChatbot')
    if (hasVisited) {
      setShowOverlay(false)
    } else {
      localStorage.setItem('hasVisitedChatbot', 'true')
    }
  }, [])

  return (
    <div className="container mx-auto h-full px-4">
      <div className="mx-auto max-w-4xl h-full bg-background/60 backdrop-blur-lg rounded-lg border shadow-lg relative">
        <DynamicChatInterface 
          initialMessages={[]} 
          exampleQuestions={DEMO_QUESTIONS}
          welcomeMessage="Hello! I'm your AI assistant. How can I help you today?"
        />

        {showOverlay && (
          <Suspense fallback={null}>
            <ChatbotInfoOverlay 
              isOpen={showOverlay}
              onClose={() => setShowOverlay(false)} 
            />
          </Suspense>
        )}
      </div>
    </div>
  )
} 