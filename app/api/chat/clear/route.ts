import { NextResponse } from 'next/server'

import { getOrCreateSessionId } from '../../../../lib/utils/session'

export const runtime = 'edge'

export async function POST() {
  try {
    const sessionId = await getOrCreateSessionId()
    
    // Call the cleanup endpoint with the session ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/cleanup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
      throw new Error('Failed to clear session data')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing session data:', error)
    return NextResponse.json(
      { error: 'Failed to clear session data' },
      { status: 500 }
    )
  }
} 