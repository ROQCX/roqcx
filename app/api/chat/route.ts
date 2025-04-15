import { Message, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { findSimilarChunks, generateEmbedding, storeEmbedding } from '../../../lib/ai/embedding'
import { z } from 'zod'
import { getOrCreateSessionId } from '../../../lib/utils/session'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Message schema for validation
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(10000),
})

// Request schema for validation
const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100),
})

export async function POST(req: Request) {
  try {
    // Check API key
    const apiKey = req.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      console.log('API key validation failed:', {
        received: apiKey,
        expected: process.env.NEXT_PUBLIC_API_KEY
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const sessionId = await getOrCreateSessionId()
    const body = await req.json()
    const { messages } = requestSchema.parse(body)
    const lastMessage = messages[messages.length - 1]

    // Run cleanup asynchronously in the background
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/cleanup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    }).catch(error => {
      console.error('Cleanup error:', error)
      // Silently handle any cleanup errors
    })

    const embedding = await generateEmbedding(lastMessage.content)
    const similarChunks = await findSimilarChunks(embedding, sessionId)
    
    // Store the embedding for future reference
    await storeEmbedding(lastMessage.content, embedding, sessionId)
    
    const systemMessage: Omit<Message, 'id'> = {
      role: 'system',
      content: `You are a helpful AI assistant. You can respond to questions in two ways:

1. For questions about information in the knowledge base:
   - Use ONLY the provided context to answer
   - If the context doesn't contain relevant information, say "I don't have enough information to answer that question."

2. For general questions:
   - Provide helpful, accurate information
   - Be concise and clear
   - If you're unsure, say so

Context from knowledge base:
${similarChunks.map(chunk => chunk.content).join('\n\n')}`
    }

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      messages: [systemMessage, ...messages],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat endpoint:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 