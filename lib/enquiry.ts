import { z } from "zod"

export const enquiryInterests = ["build", "automate", "train", "unsure", ""] as const
export const trainingTracks = ["public", "corporate"] as const

const MIN_NAME = 2
const MIN_BUSINESS = 2
const MIN_IMPROVEMENT = 10

export const nameField = z.string().trim().min(MIN_NAME, "Name must be at least 2 characters").max(200)

export const emailField = z.string().trim().email("Please enter a valid email address").max(320)

export const honeypotField = z.string().max(0, "This field should be empty")

export const businessNameField = z
  .string()
  .trim()
  .min(MIN_BUSINESS, "Business name must be at least 2 characters")
  .max(200)

export const improvementField = z
  .string()
  .trim()
  .min(MIN_IMPROVEMENT, "Tell us a little more about what you would like to improve")
  .max(5000)

export const interestField = z.enum(enquiryInterests).optional()

export const timingField = z.string().trim().max(200).optional()

export const contactFormSchema = z.object({
  name: nameField,
  email: emailField,
  businessName: businessNameField,
  improvement: improvementField,
  interest: interestField,
  timing: timingField,
  companyUrlHp: honeypotField,
})

export const trainingFormSchema = z
  .object({
    trainingTrack: z.enum(trainingTracks),
    name: nameField,
    email: emailField,
    businessName: z.string().trim().max(200).optional(),
    improvement: z.string().trim().max(5000).optional(),
    companyUrlHp: honeypotField,
  })
  .superRefine((data, ctx) => {
    if (data.trainingTrack === "corporate" && (data.businessName?.trim().length ?? 0) < MIN_BUSINESS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message: "Tell us which organisation the training is for",
      })
    }
  })

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

export const enquiryRequestSchema = z
  .object({
    name: nameField,
    email: emailField,
    businessName: z.string().trim().max(200).optional(),
    improvement: z.string().trim().max(5000).optional(),
    interest: interestField,
    timing: timingField,
    trainingTrack: z.enum(trainingTracks).optional(),
    token: z.string().min(1).max(4000),
    // Any value is accepted so a filled honeypot can be dropped quietly.
    companyUrlHp: z.string().max(200).optional(),
    attribution: attributionSchema,
  })
  .superRefine((data, ctx) => {
    const needsBusiness = !data.trainingTrack || data.trainingTrack === "corporate"
    if (needsBusiness && (data.businessName?.trim().length ?? 0) < MIN_BUSINESS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message:
          data.trainingTrack === "corporate"
            ? "Tell us which organisation the training is for"
            : "Business name must be at least 2 characters",
      })
    }
    if (!data.trainingTrack && (data.improvement?.trim().length ?? 0) < MIN_IMPROVEMENT) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["improvement"],
        message: "Tell us a little more about what you would like to improve",
      })
    }
  })

export function enquiryErrorMessage(status: number) {
  if (status === 429) {
    return "Too many enquiries from this connection. Wait a while, or email hello@roqcx.com."
  }
  if (status === 503) return "The form is unavailable right now. Email hello@roqcx.com."
  return "We couldn’t send that. Try again, or email hello@roqcx.com."
}

export function shownEnquiryError(error: unknown) {
  const specific = error instanceof Error ? error.message : ""
  if (specific === enquiryErrorMessage(429) || specific === enquiryErrorMessage(503)) return specific
  return enquiryErrorMessage(0)
}

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type TrainingFormValues = z.infer<typeof trainingFormSchema>
export type EnquiryRequest = z.infer<typeof enquiryRequestSchema>
