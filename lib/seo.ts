import type { Metadata } from "next"

export const siteUrl = "https://www.roqcx.com"
export const siteName = "ROQ CX"

export const defaultTitle = "AI Automation & Digital Products for SMEs | ROQ CX"
export const defaultDescription =
  "You have something worth building, work that needs simplifying, or a team putting AI to use. ROQ CX is an AI-native studio that gets you there."

export const ogImage = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "ROQ CX",
}

interface PageSeoOptions {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  /** Social title when it should differ from the document title. */
  socialTitle?: string
  /** Social description when it should differ from the document description. */
  socialDescription?: string
  /** Set false on layout defaults so a missing page does not inherit the homepage URL. */
  includeCanonical?: boolean
}

export function pageUrl(path: string): string {
  if (path === "/") return `${siteUrl}/`
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl}${normalized}`
}

export function pageSeo({
  title,
  description,
  path,
  type = "website",
  socialTitle = title,
  socialDescription = description,
  includeCanonical = true,
}: PageSeoOptions): Metadata {
  const url = pageUrl(path)

  return {
    title,
    description,
    ...(includeCanonical ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName,
      images: [ogImage],
      locale: "en_AE",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImage.url],
      creator: "@roqcx",
    },
  }
}
