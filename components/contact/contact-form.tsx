"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useAnalytics } from "../../app/hooks/use-analytics"
import { getStoredAttribution } from "@/lib/attribution"
import { contactFormSchema, enquiryErrorMessage, shownEnquiryError, type ContactFormValues } from "@/lib/enquiry"
import { executeRecaptcha } from "@/lib/recaptcha"

type FormData = ContactFormValues

const fieldClass =
  "w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-[var(--ink)] outline-none"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [started, setStarted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const { trackEvent } = useAnalytics()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { interest: "", timing: "", companyUrlHp: "" },
  })

  function onFocus() {
    if (started) return
    setStarted(true)
    trackEvent("form_start")
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const token = await executeRecaptcha("contact")

      const attribution = getStoredAttribution()

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token, attribution }),
      })

      if (!response.ok) {
        throw new Error(enquiryErrorMessage(response.status))
      }

      trackEvent("form_submit_success", {
        interest: data.interest || "unset",
        utm_source: attribution?.utm_source,
        utm_medium: attribution?.utm_medium,
        utm_campaign: attribution?.utm_campaign,
      })

      toast.success("Message sent. We’ll reply by email.")
      reset()
    } catch (error) {
      const message = shownEnquiryError(error)
      setSubmitError(message)
      trackEvent("form_submit_error", {
        error: error instanceof Error ? error.message : "Unknown error",
      })
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={onFocus} className="grid gap-4" noValidate>
      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="businessName" className="text-sm">
          Business name
        </label>
        <input
          id="businessName"
          autoComplete="organization"
          aria-invalid={errors.businessName ? true : undefined}
          aria-describedby={errors.businessName ? "business-error" : undefined}
          className={fieldClass}
          {...register("businessName")}
        />
        {errors.businessName ? (
          <p id="business-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.businessName.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="improvement" className="text-sm">
          What would you like to improve?
        </label>
        <textarea
          id="improvement"
          rows={5}
          aria-invalid={errors.improvement ? true : undefined}
          aria-describedby={errors.improvement ? "improvement-error" : undefined}
          className={fieldClass}
          {...register("improvement")}
        />
        {errors.improvement ? (
          <p id="improvement-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.improvement.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="interest" className="text-sm">
          Area of interest <span className="text-[var(--ink-soft)]">(optional)</span>
        </label>
        <select id="interest" className={fieldClass} {...register("interest")}>
          <option value="">Select</option>
          <option value="build">Build</option>
          <option value="automate">Automate</option>
          <option value="train">Train</option>
          <option value="unsure">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="timing" className="text-sm">
          Timing <span className="text-[var(--ink-soft)]">(optional)</span>
        </label>
        <input id="timing" className={fieldClass} {...register("timing")} />
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyUrlHp">Company URL</label>
        <input
          id="companyUrlHp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyUrlHp")}
        />
      </div>

      <p className="m-0 text-sm leading-relaxed text-[var(--ink-soft)]">
        Please don’t include passwords, customer records or confidential documents.
      </p>

      <button
        type="submit"
        className="btn-signal justify-center disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
      <p role="status" className="m-0 text-sm text-[var(--clay)]" aria-live="polite">
        {submitError}
      </p>
    </form>
  )
}
