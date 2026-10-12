"use client"

import { useRef, type ReactNode } from "react"

// Push straight to the data layer. useAnalytics() also records a pageview on
// mount, which would repeat once per CTA and module on this page.
export function trackTrainingEvent(event: string, properties?: Record<string, unknown>) {
  window.dataLayer?.push({ event, ...properties })
}

/** In-page CTA that records a click event before following its anchor. */
export function TrackedLink({
  href,
  event,
  location,
  className,
  children,
}: {
  href: string
  event: "registration_interest" | "corporate_enquiry"
  location: string
  className?: string
  children: ReactNode
}) {
  return (
    <a href={href} className={className} onClick={() => trackTrainingEvent(event, { location })}>
      {children}
    </a>
  )
}

/** A curriculum module that records when it is opened. Content stays server-rendered. */
export function CurriculumItem({
  index,
  title,
  defaultOpen,
  children,
}: {
  index: number
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  // Browsers fire a toggle event for modules that render open; only count real opens.
  const skipInitial = useRef(Boolean(defaultOpen))
  return (
    <details
      className="faq-item border-b border-[var(--rule)] py-5"
      open={defaultOpen}
      onToggle={(event) => {
        if (skipInitial.current) {
          skipInitial.current = false
          return
        }
        if (event.currentTarget.open) trackTrainingEvent("curriculum_expand", { module: index, title })
      }}
    >
      <summary className="text-lg">
        <span>
          <span className="mr-4 font-geist-mono text-sm text-[var(--forest)]">{String(index).padStart(2, "0")}</span>
          {title}
        </span>
      </summary>
      {children}
    </details>
  )
}
