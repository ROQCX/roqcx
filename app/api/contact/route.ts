import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  token: z.string(),
})

async function verifyRecaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  const data = await response.json()
  return data.success && data.score >= 0.5
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, token } = schema.parse(body)

    // Verify reCAPTCHA token
    const isHuman = await verifyRecaptcha(token)
    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: 'ROQ CX <hello@updates.roqcx.com>',
      to: ['hello@roqcx.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    })

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Failed to send message:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 