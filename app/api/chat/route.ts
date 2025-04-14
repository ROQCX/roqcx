import { streamText, tool, type CoreMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { findSimilarChunks, generateEmbedding, storeEmbedding } from '../../../lib/ai/embedding'
import { z } from 'zod'
import { getOrCreateSessionId } from '../../../lib/utils/session'

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
    const sessionId = await getOrCreateSessionId()
    const body = await req.json()
    const { messages } = requestSchema.parse(body)
    const lastMessage = messages[messages.length - 1]

    // Clean up expired session data before processing the request
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/cleanup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Cleanup error:', error)
      // Don't fail the request if cleanup fails
    }

    const embedding = await generateEmbedding(lastMessage.content)
    const similarChunks = await findSimilarChunks(embedding, sessionId)
    
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant. You can respond to questions in two ways:

1. For questions about information in the knowledge base:
   - Use ONLY the provided context to answer
   - If the context doesn't contain relevant information, say "I don't have enough information to answer that question."

2. For general questions:
   - You can provide helpful, factual responses
   - Keep responses concise and focused
   - If you're unsure about something, say so
   - Avoid making up information or speculating
   - Stay within the boundaries of your training data
   - For common business concepts (like CX, RPA, AI, etc.), feel free to provide general explanations
   - You can combine general knowledge with specific knowledge from the context when relevant

Context from knowledge base:
${similarChunks.map(chunk => chunk.content).join('\n\n')}`
    }

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: systemMessage.content,
      messages: messages as CoreMessage[],
      tools: {
        addKnowledge: tool({
          description: 'Add new information to the knowledge base',
          parameters: z.object({
            content: z.string().describe('The information to add to the knowledge base'),
          }),
          execute: async ({ content }) => {
            const embedding = await generateEmbedding(content)
            await storeEmbedding(content, embedding, sessionId)
            return {
              type: 'text',
              text: "I've added this information to my knowledge base. You can now ask me questions about it."
            }
          },
        }),
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 