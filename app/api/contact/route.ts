import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import {
  formatAttributionForEmail,
  sanitizeAttributionValue,
} from '@/lib/attribution'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const attributionSchema = z
  .object({
    referrer: z.string().max(500).optional(),
    landingPath: z.string().max(500).optional(),
    landingUrl: z.string().max(500).optional(),
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    capturedAt: z.string().max(100).optional(),
  })
  .optional()

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(5000),
  token: z.string().min(1).max(4000),
  website: z.string().max(0).optional(),
  attribution: attributionSchema,
})

function cleanAttribution(
  attribution: z.infer<typeof attributionSchema>,
) {
  if (!attribution) return null
  return {
    referrer: sanitizeAttributionValue(attribution.referrer),
    landingPath: sanitizeAttributionValue(attribution.landingPath),
    landingUrl: sanitizeAttributionValue(attribution.landingUrl),
    utm_source: sanitizeAttributionValue(attribution.utm_source) || undefined,
    utm_medium: sanitizeAttributionValue(attribution.utm_medium) || undefined,
    utm_campaign: sanitizeAttributionValue(attribution.utm_campaign) || undefined,
    utm_content: sanitizeAttributionValue(attribution.utm_content) || undefined,
    utm_term: sanitizeAttributionValue(attribution.utm_term) || undefined,
    capturedAt:
      sanitizeAttributionValue(attribution.capturedAt) || new Date().toISOString(),
  }
}

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
    const parsed = schema.parse(body)

    // Honeypot: reject if filled
    if (parsed.website) {
      return NextResponse.json({ message: 'Message sent successfully' })
    }

    const { name, email, message, token } = parsed
    const attribution = cleanAttribution(parsed.attribution)

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

${formatAttributionForEmail(attribution)}
      `.trim(),
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
