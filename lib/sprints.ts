/** Shared sprint catalog — hub, footer, ladder, sitemap, schema, chat. */

export const USD_AED_RATE = 3.6

export const WEBSITE_SPRINT_FROM_USD = 5_000
export const WEBSITE_SPRINT_FROM_AED = Math.round(WEBSITE_SPRINT_FROM_USD * USD_AED_RATE)

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-US")}`
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")} USD`
}

/** Primary AED floor with USD secondary, for hero / cards / FAQ. */
export function websiteSprintPriceLabel(): { primary: string; secondary: string } {
  return {
    primary: `from ${formatAed(WEBSITE_SPRINT_FROM_AED)}`,
    secondary: formatUsd(WEBSITE_SPRINT_FROM_USD),
  }
}

/** Cohort tag from the current calendar month (e.g. "Now booking · July cohort"). */
export function currentCohortLabel(date: Date = new Date()): string {
  const month = date.toLocaleString("en-US", { month: "long" })
  return `Now booking · ${month} cohort`
}

export interface SprintCatalogEntry {
  slug: string
  title: string
  href: string
  duration: string
  /** Monospace ladder week marker, e.g. "02" / "04" / "08" */
  week: string
  hubLabel: string
  hubHeadline: string
  hubBullets: readonly string[]
  ladderLabel: string
  ladderHeadline: string
  ladderBullets: readonly string[]
  deliverable: string
  schemaDescription: string
  serviceType: string
  /** Published floor; only Website Sprint has one today. */
  priceFrom?: { aed: number; usd: number }
}

export const SPRINTS: readonly SprintCatalogEntry[] = [
  {
    slug: "prototype-sprint",
    title: "Prototype Sprint",
    href: "/solutions/prototype-sprint",
    duration: "14 days",
    week: "02",
    hubLabel: "Sprint 01 · Validate",
    hubHeadline: "Turn an idea into a clickable prototype you can test on real users.",
    hubBullets: [
      "Hi-fi clickable prototype on a public URL",
      "Five recorded user interviews",
      "Written go / no-go memo, signed",
    ],
    ladderLabel: "Validated prototype",
    ladderHeadline: "A clickable thing your users actually clicked.",
    ladderBullets: [
      "Hi-fi prototype on a public URL",
      "5 user interviews, recorded",
      "Go / no-go memo, signed",
    ],
    deliverable: "PROTOTYPE.ZIP · FIGMA · MEMO.PDF",
    schemaDescription:
      "A fixed two-week sprint that turns a fuzzy idea into a hi-fi clickable prototype, validated with five real-user interviews, with a written go/no-go decision at day 14.",
    serviceType: "Product Prototyping",
  },
  {
    slug: "build-launch",
    title: "Build & Launch",
    href: "/solutions/build-launch",
    duration: "4 weeks",
    week: "04",
    hubLabel: "Sprint 02 · Build",
    hubHeadline:
      "Production-grade slice of the validated prototype: auth, data, payments, the lot.",
    hubBullets: [
      "Production codebase in your stack or ours",
      "Auth, database, payments, CI/CD, staging",
      "Handoff docs and a 14-day warranty",
    ],
    ladderLabel: "Production-ready slice",
    ladderHeadline: "One real feature, end-to-end, in your stack.",
    ladderBullets: [
      "Auth + database + payments wired",
      "Analytics + error tracking on day one",
      "CI/CD, staging, handoff docs",
    ],
    deliverable: "GITHUB REPO · STAGING ENV · RUNBOOK",
    schemaDescription:
      "Four-week production build of a validated prototype: auth, database, payments, analytics, CI/CD, staging, and handoff docs, in your stack or ours.",
    serviceType: "MVP Engineering",
  },
  {
    slug: "website-sprint",
    title: "Website Sprint",
    href: "/solutions/website-sprint",
    duration: "4 weeks",
    week: "04",
    hubLabel: "Sprint · Website",
    hubHeadline:
      "A website built from what actually makes you money, not from a template and a wishlist.",
    hubBullets: [
      "Paid business diagnostic before any design",
      "Production Next.js site on Vercel",
      "Analytics against one success metric",
    ],
    ladderLabel: "Website that earns",
    ladderHeadline: "Built from the diagnostic, not a wishlist.",
    ladderBullets: [
      "Business diagnostic before design",
      "Production site + real content",
      "Tracking against one success metric",
    ],
    deliverable: "DIAGNOSTIC.PDF · SITE · HANDOVER.MD",
    schemaDescription:
      "A fixed-fee four-week website sprint that opens with a paid business diagnostic, then ships a production Next.js site instrumented against a single success metric. Starts from AED 18,000 ($5,000 USD).",
    serviceType: "Website Design and Development",
    priceFrom: { aed: WEBSITE_SPRINT_FROM_AED, usd: WEBSITE_SPRINT_FROM_USD },
  },
  {
    slug: "market-launch",
    title: "Market Launch",
    href: "/solutions/market-launch",
    duration: "8 weeks",
    week: "08",
    hubLabel: "Sprint 03 · Launch",
    hubHeadline:
      "From shipped product to live customers: landing, onboarding, and a 30-day cohort.",
    hubBullets: [
      "Landing page + onboarding sequence",
      "Analytics pipeline + cohort dashboard",
      "30-day post-launch retention readout",
    ],
    ladderLabel: "Market launch",
    ladderHeadline: "Live with real customers, measured.",
    ladderBullets: [
      "Landing page + paid trial flow",
      "Onboarding email sequence",
      "30-day cohort dashboard",
    ],
    deliverable: "LAUNCH POST · COHORT METRICS",
    schemaDescription:
      "Eight-week journey from shipped product to live customers: landing page, onboarding sequence, and a 30-day cohort dashboard measuring real outcomes.",
    serviceType: "Product Launch",
  },
] as const

export function sprintBySlug(slug: string): SprintCatalogEntry | undefined {
  return SPRINTS.find((s) => s.slug === slug)
}
