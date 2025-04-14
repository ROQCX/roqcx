import { streamText, type CoreMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { findSimilarChunks, generateEmbedding } from '../../../../lib/ai/embedding'
import { z } from 'zod'

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
    // Parse and validate request body
    const body = await req.json()
    const { messages } = requestSchema.parse(body)
    
    // Get the last message
    const lastMessage = messages[messages.length - 1]

    // Generate embedding for the last message
    const embedding = await generateEmbedding(lastMessage.content)
    
    // Find similar chunks from Turso (only global data)
    const similarChunks = await findSimilarChunks(embedding, null)
    
    // Create the system message with context
    const systemMessage: CoreMessage = {
      role: 'system',
      content: `You are a helpful AI assistant for ROQ CX. You must ONLY respond using the provided context about ROQ CX products and services. If the context doesn't contain relevant information to answer the question, respond with "I don't have enough information about that specific ROQ CX product or service."

Context:
${similarChunks.join('\n\n')}`
    }

    const result = streamText({
      model: openai('gpt-3.5-turbo'),
      system: systemMessage.content,
      messages: messages as CoreMessage[],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 