"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { getStoredAttribution } from "@/lib/attribution"
import { enquiryErrorMessage, shownEnquiryError, trainingFormSchema, type TrainingFormValues } from "@/lib/enquiry"
import { executeRecaptcha } from "@/lib/recaptcha"
import { CORPORATE_HASH } from "@/lib/training-content"
import { trackTrainingEvent as trackEvent } from "./tracked"

type FormData = TrainingFormValues

const fieldClass =
  "w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-[var(--ink)] outline-none"

const tracks = [
  { value: "public", label: "Attending a public masterclass" },
  { value: "corporate", label: "Training for my organisation" },
] as const

export function TrainingInterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [started, setStarted] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: { trainingTrack: "public", businessName: "", improvement: "", companyUrlHp: "" },
  })

  const track = watch("trainingTrack")

  // Corporate CTAs link to #register-corporate so the form opens on that track.
  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === CORPORATE_HASH) setValue("trainingTrack", "corporate")
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [setValue])

  function onFocus() {
    if (started) return
    setStarted(true)
    trackEvent("form_start", { form: "ai_training" })
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const token = await executeRecaptcha("training_interest")

      const attribution = getStoredAttribution()

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest: "train", token, attribution }),
      })

      if (!response.ok) {
        throw new Error(enquiryErrorMessage(response.status))
      }

      trackEvent("form_submit_success", {
        form: "ai_training",
        interest: "train",
        training_track: data.trainingTrack,
        utm_source: attribution?.utm_source,
        utm_medium: attribution?.utm_medium,
        utm_campaign: attribution?.utm_campaign,
      })

      toast.success("Thanks. We’ll be in touch by email.")
      setSent(true)
      reset({ trainingTrack: data.trainingTrack, name: "", email: "", businessName: "", improvement: "", companyUrlHp: "" })
    } catch (error) {
      const message = shownEnquiryError(error)
      setSubmitError(message)
      trackEvent("form_submit_error", {
        form: "ai_training",
        error: error instanceof Error ? error.message : "Unknown error",
      })
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={onFocus} className="grid gap-4" noValidate>
      <fieldset className="m-0 grid gap-2 border-0 p-0">
        <legend className="mb-2 text-sm">I’m interested in</legend>
        {tracks.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 border px-3 py-3 ${
              track === option.value ? "border-[var(--forest)] bg-[color-mix(in_srgb,var(--forest)_6%,transparent)]" : "border-[var(--rule)] bg-[var(--paper)]"
            }`}
          >
            <input type="radio" value={option.value} className="accent-[var(--forest)]" {...register("trainingTrack")} />
            {option.label}
          </label>
        ))}
      </fieldset>

      <div>
        <label htmlFor="training-name" className="text-sm">
          Full name
        </label>
        <input
          id="training-name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "training-name-error" : undefined}
          className={fieldClass}
          {...register("name")}
        />
        {errors.name ? (
          <p id="training-name-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="training-email" className="text-sm">
          Email address
        </label>
        <input
          id="training-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "training-email-error" : undefined}
          className={fieldClass}
          {...register("email")}
        />
        {errors.email ? (
          <p id="training-email-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="training-business" className="text-sm">
          Organisation{" "}
          {track === "corporate" ? null : <span className="text-[var(--ink-soft)]">(optional)</span>}
        </label>
        <input
          id="training-business"
          autoComplete="organization"
          aria-invalid={errors.businessName ? true : undefined}
          aria-describedby={errors.businessName ? "training-business-error" : undefined}
          className={fieldClass}
          {...register("businessName")}
        />
        {errors.businessName ? (
          <p id="training-business-error" className="mt-1 text-sm text-[var(--clay)]">
            {errors.businessName.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="training-notes" className="text-sm">
          {track === "corporate" ? "Team size, roles or anything you’d like covered" : "Anything you’d like us to know?"}{" "}
          <span className="text-[var(--ink-soft)]">(optional)</span>
        </label>
        <textarea id="training-notes" rows={4} className={fieldClass} {...register("improvement")} />
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="training-companyUrlHp">Company URL</label>
        <input
          id="training-companyUrlHp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyUrlHp")}
        />
      </div>

      <p className="m-0 text-sm leading-relaxed text-[var(--ink-soft)]">
        Please don’t include passwords, customer records or confidential documents.
      </p>

      <button type="submit" className="btn-signal justify-center disabled:opacity-60" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : track === "corporate" ? "Enquire about corporate training" : "Register your interest"}
      </button>
      <p role="status" className="m-0 text-sm" aria-live="polite">
        {submitError ? (
          <span className="text-[var(--clay)]">{submitError}</span>
        ) : sent ? (
          <span className="text-[var(--forest)]">Thanks. We’ll reply by email.</span>
        ) : null}
      </p>
    </form>
  )
}
