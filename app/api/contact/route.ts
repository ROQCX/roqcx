import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import {
  formatAttributionForEmail,
  sanitizeAttributionValue,
} from '@/lib/attribution'
import { enquiryRequestSchema } from '@/lib/enquiry'
import { rejectOffsiteContact } from '@/lib/ai/chat-request'
import { budgetResponse, takeContactSlot } from '@/lib/rate-limit'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const trainingLabels = {
  public: 'Public masterclass',
  corporate: 'Training for their organisation',
} as const

function plainText(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
}

function singleLine(value: string) {
  return plainText(value).replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim()
}

function cleanAttribution(attribution: z.infer<typeof enquiryRequestSchema>['attribution']) {
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
    capturedAt: sanitizeAttributionValue(attribution.capturedAt) || new Date().toISOString(),
  }
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return false

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })

  const data = await response.json()
  const action = data.action
  const knownAction = action === 'contact' || action === 'training_interest'
  return data.success === true && knownAction && typeof data.score === 'number' && data.score >= 0.5
}

export async function POST(req: Request) {
  try {
    const denied = rejectOffsiteContact(req)
    if (denied) return denied

    const body = await req.json()
    const parsed = enquiryRequestSchema.parse(body)

    if (parsed.companyUrlHp) {
      return NextResponse.json({ message: 'Message sent successfully' })
    }

    const limited = budgetResponse(await takeContactSlot(req))
    if (limited) return limited

    const name = singleLine(parsed.name)
    const email = singleLine(parsed.email)
    const businessName = parsed.businessName ? singleLine(parsed.businessName) : parsed.businessName
    const improvement = parsed.improvement ? plainText(parsed.improvement) : parsed.improvement
    const { interest, timing, trainingTrack, token } = parsed
    const attribution = cleanAttribution(parsed.attribution)

    const isHuman = await verifyRecaptcha(token)
    if (!isHuman) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 })
    }

    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const text = trainingTrack
      ? `
Name: ${name}
Email: ${email}
Interested in: ${trainingLabels[trainingTrack]}
Organisation: ${businessName || 'Not specified'}
Notes:
${improvement || 'None'}

${formatAttributionForEmail(attribution)}
      `
      : `
Name: ${name}
Email: ${email}
Business: ${businessName}
Interest: ${interest || 'Not specified'}
Timing: ${timing || 'Not specified'}
What they want to improve:
${improvement}

${formatAttributionForEmail(attribution)}
      `

    await resend.emails.send({
      from: 'ROQ CX <hello@updates.roqcx.com>',
      to: ['hello@roqcx.com'],
      subject: trainingTrack
        ? `AI in Practice: ${trainingLabels[trainingTrack]} from ${name.slice(0, 80) || 'a visitor'}`
        : `New Contact Form Submission from ${name.slice(0, 80) || 'a visitor'}`,
      text: text.trim(),
    })

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Failed to send message:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
