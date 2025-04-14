import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

const SESSION_COOKIE_NAME = 'chat-session-id'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies()
  const existingSession = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (existingSession?.value) {
    return existingSession.value
  }
  
  // Create new session ID
  const newSessionId = uuidv4()
  
  // Set cookie with session ID
  cookieStore.set(SESSION_COOKIE_NAME, newSessionId, {
    maxAge: SESSION_DURATION,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  return newSessionId
}

export async function clearSession(): Promise<string> {
  const cookieStore = await cookies()
  const existingSession = cookieStore.get(SESSION_COOKIE_NAME)
  const sessionId = existingSession?.value || ''
  
  cookieStore.delete(SESSION_COOKIE_NAME)
  
  return sessionId
} 