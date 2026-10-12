const STATIC_ORIGINS = [
  "https://www.roqcx.com",
  "https://roqcx.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]

function hostOrigin(host: string | undefined) {
  if (!host) return ""
  return `https://${host.replace(/\/$/, "")}`
}

export function normalizeOrigin(origin: string | null) {
  if (!origin) return null
  return origin.replace(/www\.www\./, "www.").replace(/\/$/, "")
}

/** Origins allowed to call the chat and enquiry routes from a browser. */
export function allowedOrigins() {
  const dynamic = [
    process.env.NEXT_PUBLIC_SITE_URL,
    hostOrigin(process.env.VERCEL_URL),
    hostOrigin(process.env.VERCEL_BRANCH_URL),
    hostOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
  ].filter((value): value is string => Boolean(value))

  return [...new Set([...STATIC_ORIGINS, ...dynamic.map((value) => value.replace(/\/$/, ""))])]
}

export function isAllowedOrigin(origin: string | null) {
  const normalized = normalizeOrigin(origin)
  if (!normalized) return false
  return allowedOrigins().includes(normalized)
}
