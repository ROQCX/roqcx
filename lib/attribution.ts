/**
 * First-touch session attribution for inbound traffic (esp. zaynenair.com → roqcx.com).
 * Captures UTMs + referrer once per session and reuses them on contact submit.
 */

export const ATTRIBUTION_STORAGE_KEY = "roq_attribution"

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

export type UtmKey = (typeof UTM_KEYS)[number]

export interface Attribution {
  referrer: string
  landingPath: string
  landingUrl: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  capturedAt: string
}

const MAX_FIELD_LEN = 500

export function sanitizeAttributionValue(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_FIELD_LEN)
}

function readStored(): Attribution | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Attribution>
    if (!parsed || typeof parsed !== "object") return null
    return {
      referrer: sanitizeAttributionValue(parsed.referrer),
      landingPath: sanitizeAttributionValue(parsed.landingPath),
      landingUrl: sanitizeAttributionValue(parsed.landingUrl),
      utm_source: sanitizeAttributionValue(parsed.utm_source) || undefined,
      utm_medium: sanitizeAttributionValue(parsed.utm_medium) || undefined,
      utm_campaign: sanitizeAttributionValue(parsed.utm_campaign) || undefined,
      utm_content: sanitizeAttributionValue(parsed.utm_content) || undefined,
      utm_term: sanitizeAttributionValue(parsed.utm_term) || undefined,
      capturedAt:
        sanitizeAttributionValue(parsed.capturedAt) || new Date().toISOString(),
    }
  } catch {
    return null
  }
}

function writeStored(attribution: Attribution) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // Ignore quota / private-mode failures
  }
}

function utmsFromSearch(search: string): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(search)
  const utms: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const value = sanitizeAttributionValue(params.get(key) ?? "")
    if (value) utms[key] = value
  }
  return utms
}

function hasAnyUtm(attribution: Partial<Attribution>): boolean {
  return UTM_KEYS.some((key) => Boolean(attribution[key]))
}

/** Capture first-touch attribution for this browser session. Idempotent. */
export function captureSessionAttribution(): Attribution | null {
  if (typeof window === "undefined") return null

  const existing = readStored()
  const pageUtms = utmsFromSearch(window.location.search)
  const referrer = sanitizeAttributionValue(document.referrer)
  const landingPath = sanitizeAttributionValue(
    `${window.location.pathname}${window.location.search}`,
  )
  const landingUrl = sanitizeAttributionValue(window.location.href)

  if (existing) {
    // First-touch UTMs win; fill empty referrer if we now have one.
    const merged: Attribution = {
      ...existing,
      referrer: existing.referrer || referrer,
    }
    if (!hasAnyUtm(existing) && hasAnyUtm(pageUtms)) {
      Object.assign(merged, pageUtms)
    }
    writeStored(merged)
    return merged
  }

  const attribution: Attribution = {
    referrer,
    landingPath,
    landingUrl,
    ...pageUtms,
    capturedAt: new Date().toISOString(),
  }
  writeStored(attribution)
  return attribution
}

export function getStoredAttribution(): Attribution | null {
  return readStored() ?? captureSessionAttribution()
}

export function formatAttributionForEmail(
  attribution: Attribution | null | undefined,
): string {
  if (!attribution) return "Attribution: (none captured)"

  const lines = [
    `Referrer: ${attribution.referrer || "(direct / none)"}`,
    `Landing: ${attribution.landingUrl || attribution.landingPath || "(unknown)"}`,
    `utm_source: ${attribution.utm_source || "-"}`,
    `utm_medium: ${attribution.utm_medium || "-"}`,
    `utm_campaign: ${attribution.utm_campaign || "-"}`,
    `utm_content: ${attribution.utm_content || "-"}`,
    `utm_term: ${attribution.utm_term || "-"}`,
    `Captured: ${attribution.capturedAt || "-"}`,
  ]
  return lines.join("\n")
}
