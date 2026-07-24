"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { useAnalytics } from "../../app/hooks/use-analytics"
import { getStoredAttribution } from "@/lib/attribution"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot field - should always be empty
  website: z.string().max(0, "This field should be empty"),
})

type FormData = z.infer<typeof formSchema>

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface ContactFormProps {
  compact?: boolean
}

export function ContactForm({ compact = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackEvent } = useAnalytics()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    
    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "contact" }
      )

      const attribution = getStoredAttribution()

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token, attribution }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      trackEvent('contact_form_submit', {
        success: true,
        utm_source: attribution?.utm_source,
        utm_medium: attribution?.utm_medium,
        utm_campaign: attribution?.utm_campaign,
        utm_content: attribution?.utm_content,
        has_referrer: Boolean(attribution?.referrer),
      })
      
      toast.success("Message sent successfully!")
      reset()
    } catch (error) {
      trackEvent('contact_form_submit', {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldGap = compact ? "space-y-1" : "space-y-1 md:space-y-2"
  const formGap = compact ? "space-y-2.5" : "space-y-3 md:space-y-4"
  const labelClass = compact ? "text-xs font-medium" : "text-xs md:text-sm font-medium"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formGap}>
      <div className={fieldGap}>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <Input
          id="name"
          placeholder="Your name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className={fieldGap}>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className={fieldGap}>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Your message..."
          {...register("message")}
          rows={compact ? 3 : undefined}
          className={
            errors.message
              ? "border-red-500"
              : compact
                ? "min-h-[72px] resize-none"
                : "min-h-[100px] md:min-h-[120px]"
          }
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          type="text"
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
        />
        {errors.website && (
          <p className="text-xs text-red-500">{errors.website.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full mt-2"
        disabled={isSubmitting}
        onClick={() => {
          if (!isSubmitting) {
            trackEvent('contact_form_submit_click')
          }
        }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
