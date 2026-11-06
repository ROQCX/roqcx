"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { enquiryErrorMessage, eventAudiences, eventInterestSchema, shownEnquiryError, type EventInterestValues } from "@/lib/enquiry"
import { executeRecaptcha } from "@/lib/recaptcha"

const fieldClass =
  "w-full rounded-xl border-2 border-[#8f2d3a]/30 bg-white px-3 py-2 text-[#8f2d3a] outline-none"

const audiences = [
  { value: eventAudiences[0], label: "Individual" },
  { value: eventAudiences[1], label: "Group / corporate" },
] as const

function trackEvent(event: string, properties?: Record<string, unknown>) {
  window.dataLayer?.push({ event, ...properties })
}

export function LteyInterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [started, setStarted] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventInterestValues>({
    resolver: zodResolver(eventInterestSchema),
    defaultValues: { organisation: "" },
  })

  const audience = watch("audience")

  function onFocus() {
    if (started) return
    setStarted(true)
    trackEvent("form_start", { form: "ltey_ai_training" })
  }

  async function onSubmit(data: EventInterestValues) {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const token = await executeRecaptcha("event_interest")
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          organisation: data.audience === "group" ? data.organisation : "",
          token,
        }),
      })

      if (!response.ok) {
        throw new Error(enquiryErrorMessage(response.status))
      }

      trackEvent("form_submit_success", { form: "ltey_ai_training" })
      setSent(true)
    } catch (error) {
      const message = shownEnquiryError(error)
      setSubmitError(message)
      trackEvent("form_submit_error", {
        form: "ltey_ai_training",
        error: error instanceof Error ? error.message : "Unknown error",
      })
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      data-sent={sent ? "true" : "false"}
      className="group rounded-3xl border-2 border-[#8f2d3a] bg-white p-6 shadow-[6px_6px_0_0_#8f2d3a] md:p-8 lg:col-span-6"
    >
      <p className="sr-only" role="status">
        {sent ? "Thanks for registering, we will let you know as soon as a date is scheduled." : ""}
      </p>

      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[sent=true]:grid-rows-[0fr] motion-reduce:transition-none">
        <div className="min-h-0 overflow-hidden">
          <div className="transition duration-300 group-data-[sent=true]:scale-[0.98] group-data-[sent=true]:opacity-0 motion-reduce:transition-none">
            <form aria-label="Register your interest" onSubmit={handleSubmit(onSubmit)} onFocus={onFocus} className="grid gap-4" noValidate inert={sent}>
              <div>
                <label htmlFor="ltey-name" className="text-sm">
          Full name
        </label>
        <input
          id="ltey-name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "ltey-name-error" : undefined}
          className={fieldClass}
          {...register("name")}
        />
        {errors.name ? (
          <p id="ltey-name-error" className="mt-1 text-sm text-[#8f2d3a]">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="ltey-email" className="text-sm">
          Email address
        </label>
        <input
          id="ltey-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "ltey-email-error" : undefined}
          className={fieldClass}
          {...register("email")}
        />
        {errors.email ? (
          <p id="ltey-email-error" className="mt-1 text-sm text-[#8f2d3a]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2 text-sm">Training for</legend>
        <div className="grid grid-cols-2 gap-3">
          {audiences.map((option) => (
            <label
              key={option.value}
              className={`flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border-2 border-[#8f2d3a] px-3 text-center text-sm font-bold focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#8f2d3a] ${
                audience === option.value ? "bg-[#f5d065] shadow-[3px_3px_0_0_#8f2d3a]" : "bg-white"
              }`}
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                aria-invalid={errors.audience ? true : undefined}
                aria-describedby={errors.audience ? "ltey-audience-error" : undefined}
                {...register("audience", {
                  onChange: (event) => {
                    if (event.target.value !== "group") setValue("organisation", "")
                  },
                })}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.audience ? (
          <p id="ltey-audience-error" className="mt-1 text-sm text-[#8f2d3a]">
            {errors.audience.message}
          </p>
        ) : null}
      </fieldset>

      {audience === "group" ? (
        <div>
          <label htmlFor="ltey-organisation" className="text-sm">
            Organisation
          </label>
          <input
            id="ltey-organisation"
            autoComplete="organization"
            aria-invalid={errors.organisation ? true : undefined}
            aria-describedby={errors.organisation ? "ltey-organisation-error" : undefined}
            className={fieldClass}
            {...register("organisation")}
          />
          {errors.organisation ? (
            <p id="ltey-organisation-error" className="mt-1 text-sm text-[#8f2d3a]">
              {errors.organisation.message}
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-[#8f2d3a] bg-[#f5d065] px-5 font-bold text-[#8f2d3a] shadow-[3px_3px_0_0_#8f2d3a] transition-transform hover:-translate-y-0.5 hover:bg-[#f8c763] disabled:translate-y-0 disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Register your interest"}
      </button>
      {submitError ? (
        <p role="alert" className="m-0 text-sm">
          {submitError}
        </p>
      ) : null}
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[sent=true]:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="min-h-0 overflow-hidden">
          <div
            className="flex flex-col items-center px-2 py-8 text-center opacity-0 transition duration-500 delay-150 group-data-[sent=true]:opacity-100 motion-reduce:transition-none motion-reduce:delay-0"
            aria-hidden={sent ? undefined : true}
          >
            <svg className="ltey-check-badge h-16 w-16" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="28" fill="#f5d065" stroke="#8f2d3a" strokeWidth="3" />
              <path
                className="ltey-check"
                pathLength="1"
                d="M20 33 l8 8 16-18"
                fill="none"
                stroke="#8f2d3a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="m-0 mt-5 max-w-[18rem] font-[family-name:var(--font-newsreader)] text-3xl font-black leading-tight">
              Thanks for registering, we will let you know as soon as a date is scheduled.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
