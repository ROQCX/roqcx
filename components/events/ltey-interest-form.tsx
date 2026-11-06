"use client"

import { useState } from "react"
import { useForm, type UseFormRegisterReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { enquiryErrorMessage, eventAudiences, eventInterestSchema, shownEnquiryError, type EventInterestValues } from "@/lib/enquiry"
import { executeRecaptcha } from "@/lib/recaptcha"

const fieldClass =
  "peer min-h-14 w-full rounded-xl border-2 border-[#8f2d3a]/30 bg-white px-3 text-[#8f2d3a] outline-none transition-[border-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-[#8f2d3a] focus-visible:outline-none focus-visible:shadow-none aria-[invalid=true]:border-[#8f2d3a] motion-reduce:transition-none"

const labelClass =
  "pointer-events-none absolute left-2 top-1/2 z-10 origin-left -translate-y-1/2 bg-white px-1 text-sm text-[#8f2d3a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] peer-focus:top-0 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75 peer-autofill:top-0 peer-autofill:scale-75 motion-reduce:transition-none"

interface TextFieldProps {
  id: string
  label: string
  error?: string
  type?: "text" | "email"
  autoComplete?: string
  inputMode?: "email" | "text"
  registration: UseFormRegisterReturn
}

function TextField({ id, label, error, type = "text", autoComplete, inputMode, registration }: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={fieldClass}
          {...registration}
        />
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-[#8f2d3a]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

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
        {sent ? "Thanks for registering, we will let you know as soon as an AI training date is scheduled." : ""}
      </p>

      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[sent=true]:grid-rows-[0fr] motion-reduce:transition-none">
        <div className="min-h-0 overflow-hidden">
          <div className="transition duration-300 group-data-[sent=true]:scale-[0.98] group-data-[sent=true]:opacity-0 motion-reduce:transition-none">
            <h2 id="ltey-form-title" className="m-0 mb-6 font-[family-name:var(--font-newsreader)] text-3xl font-black leading-none">
              AI training
            </h2>
            <form aria-labelledby="ltey-form-title" onSubmit={handleSubmit(onSubmit)} onFocus={onFocus} className="grid gap-4 pb-1.5 pr-1.5" noValidate inert={sent}>
              <TextField id="ltey-name" label="Full name" autoComplete="name" error={errors.name?.message} registration={register("name")} />
              <TextField
                id="ltey-email"
                label="Email address"
                type="email"
                autoComplete="email"
                inputMode="email"
                error={errors.email?.message}
                registration={register("email")}
              />

              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 text-sm">AI training for</legend>
                <div className="grid grid-cols-2 gap-3">
                  {audiences.map((option) => (
                    <label
                      key={option.value}
                      className={`flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border-2 border-[#8f2d3a] px-3 text-center text-sm font-bold ${
                        audience === option.value ? "bg-[#f5d065] shadow-[3px_3px_0_0_#8f2d3a]" : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        className="sr-only focus-visible:outline-none focus-visible:shadow-none"
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
                <TextField
                  id="ltey-organisation"
                  label="Organisation"
                  autoComplete="organization"
                  error={errors.organisation?.message}
                  registration={register("organisation")}
                />
              ) : null}

              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-[#8f2d3a] bg-[#f5d065] px-5 font-bold text-[#8f2d3a] shadow-[3px_3px_0_0_#8f2d3a] transition-transform hover:-translate-y-0.5 hover:bg-[#f8c763] focus-visible:outline-none disabled:translate-y-0 disabled:opacity-60"
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
              Thanks for registering, we will let you know as soon as an AI training date is scheduled.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
