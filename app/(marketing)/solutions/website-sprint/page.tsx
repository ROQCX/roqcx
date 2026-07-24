import type { Metadata } from "next"
import { StructuredData } from "@/components/seo/structured-data"
import { ServiceSprintPage } from "@/components/solutions/service-sprint-page"
import {
  formatAed,
  formatUsd,
  WEBSITE_SPRINT_FROM_AED,
  WEBSITE_SPRINT_FROM_USD,
  websiteSprintPriceLabel,
} from "@/lib/sprints"

const price = websiteSprintPriceLabel()

export const metadata: Metadata = {
  title: "Website Sprint | 4-week business website sprint | ROQ CX",
  description:
    "A fixed-fee 4-week Website Sprint for SMEs: paid business diagnostic first, then a production Next.js site instrumented against one success metric. From AED 18,000 ($5,000 USD).",
  alternates: { canonical: "https://www.roqcx.com/solutions/website-sprint" },
  openGraph: {
    title: "Website Sprint | 4-week business website sprint | ROQ CX",
    description:
      "A website built from what actually makes you money. Paid diagnostic first. From AED 18,000 ($5,000 USD).",
    url: "https://www.roqcx.com/solutions/website-sprint",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Sprint | 4-week business website sprint | ROQ CX",
    description:
      "Paid diagnostic, then a production site. From AED 18,000 ($5,000 USD).",
    images: ["/og"],
  },
}

const schema = {
  "@type": "Service",
  name: "Website Sprint",
  serviceType: "Website Design and Development",
  url: "https://www.roqcx.com/solutions/website-sprint",
  description:
    "A fixed-fee four-week website sprint that opens with a paid business diagnostic, then ships a production Next.js site instrumented against a single success metric.",
  provider: { "@type": "Organization", name: "ROQ CX", url: "https://www.roqcx.com" },
  areaServed: ["AE", "GCC", "Global"],
  audience: { "@type": "Audience", audienceType: "Small and medium-sized enterprises" },
  termsOfService: "Fixed-fee, fixed-scope. Diagnostic is part of the engagement; engagement can stop after the diagnostic.",
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: String(WEBSITE_SPRINT_FROM_AED),
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "AED",
      minPrice: WEBSITE_SPRINT_FROM_AED,
      description: `From ${formatAed(WEBSITE_SPRINT_FROM_AED)} (${formatUsd(WEBSITE_SPRINT_FROM_USD)})`,
    },
  },
}

export default function WebsiteSprintPage() {
  return (
    <>
      <StructuredData data={schema} type="Service" />
      <ServiceSprintPage
        eyebrow="Sprint · Website"
        duration="4 weeks"
        price={price}
        title={
          <>
            Website Sprint.
            <br />
            Built from what makes you money.
          </>
        }
        lede="A website built from what actually makes you money, not from a template and a wishlist. Four weeks. Fixed fee. Starts with a paid diagnostic you keep either way."
        outcomes={[
          "Written business diagnostic + one success metric",
          "Sitemap, narrative, and copy direction in Figma",
          "Production Next.js site on Vercel with real content",
          "Analytics, tokens, and a written handover",
        ]}
        deliverableChips="DIAGNOSTIC.PDF · FIGMA · GITHUB · HANDOVER.MD"
        whoFor={[
          "An SME whose site should move enquiries, bookings, or sales",
          "Founders who will sit in a diagnostic before any wireframe",
          "Teams that want the repo, Figma, and tokens in their name from day one",
          "Buyers who will stop if the diagnostic says the site is not the constraint",
        ]}
        notFor={[
          "You need five pages by Friday",
          "A template skin with stock copy and a contact form",
          "SEO ranking promises or traffic guarantees",
          "Anyone who wants estimates by the hour",
        ]}
        phaseKicker="Four phases"
        phaseTitle={<>How the Website Sprint runs.</>}
        phaseLede="Same rhythm as every ROQ CX sprint: paid checkpoints, named artefacts, a clean stop between phases if the evidence says stop."
        weeks={[
          {
            label: "Days 1–3 · Diagnostic",
            title: "Pressure-test the business model.",
            items: [
              "Working session: what a customer is worth, where enquiries come from, what happens in the ten minutes after a form submit",
              "What the site is actually supposed to move",
              "Written diagnostic + a single success metric, signed",
              "Phase 01 is paid work with a deliverable whether or not the build follows",
            ],
          },
          {
            label: "Days 4–8 · Structure",
            title: "Argument before pixels.",
            items: [
              "Sitemap and page-by-page argument derived from the diagnostic",
              "Copy direction, not final polish",
              "Two divergent directions, kept low-fi on purpose so feedback stays honest",
              "Artefacts: Figma + copy doc",
            ],
          },
          {
            label: "Days 9–16 · Build",
            title: "Ship the production site.",
            items: [
              "Next.js, TypeScript, Tailwind, shadcn/ui on Vercel",
              "Supabase where there is data",
              "Real content, not lorem",
              "Artefacts: GitHub repo + staging URL",
            ],
          },
          {
            label: "Days 17–20 · Hand over",
            title: "Instrument and leave you the keys.",
            items: [
              "Analytics and event tracking against the success metric",
              "Error tracking, CI/CD, design tokens",
              "Written handover",
              "Artefacts: HANDOVER.MD · tokens · dashboard",
            ],
          },
        ]}
        inputs={[
          "Access to whoever owns the commercial model",
          "Existing analytics, CRM, or enquiry logs if you have them",
          "Brand assets and domain access",
          "A decision-maker available between phases",
        ]}
        artifacts={[
          "DIAGNOSTIC.PDF + signed success metric",
          "Figma + copy doc",
          "GitHub repo + staging URL",
          "HANDOVER.MD · tokens · analytics dashboard",
        ]}
        decision={[
          "Proceed into structure + build after the diagnostic",
          "Stop after the diagnostic if the site is not the constraint",
          "Narrow scope and rebuild the success metric",
          "Hand the artefacts to an in-house team",
        ]}
        killRate={{
          title: (
            <>
              Roughly 30% of our sprints end in a deliberate kill.
            </>
          ),
          body: (
            <>
              If the diagnostic says the site is not the constraint, we say so and
              the engagement can stop there. Phase 01 is paid work with a
              deliverable either way. That kill rate is the system working, not a
              failure mode.
            </>
          ),
        }}
        pricing={{
          lede: (
            <>
              Starts at {formatAed(WEBSITE_SPRINT_FROM_AED)} (
              {formatUsd(WEBSITE_SPRINT_FROM_USD)}). Fixed fee. No retainers, no
              T&amp;M, no scope-creep invoices. You own the repo, Figma, tokens,
              and content from minute one.
            </>
          ),
          movesUp: [
            "Multi-locale or multi-brand sites",
            "Complex CMS or authenticated customer portals",
            "Integrations beyond the default stack (custom CRM, ERP, booking engines)",
            "Content production volume beyond agreed page set",
          ],
        }}
        faq={[
          {
            q: "Is the diagnostic sellable on its own?",
            a: "Not as a separate SKU today. It is phase 01 of the Website Sprint. If we stop after it, you still keep the written diagnostic and the signed success metric.",
          },
          {
            q: "What if you tell us not to build?",
            a: "Then the engagement ends after phase 01. You keep the diagnostic. About 30% of ROQ CX sprints end in a deliberate kill. We would rather stop than ship a site that cannot move the metric.",
          },
          {
            q: "Who owns the code and design?",
            a: "You. Repo, Figma, tokens, and content sit under your accounts from minute one. No lock-in.",
          },
          {
            q: "Do you promise rankings or conversion lifts?",
            a: "No. We instrument one success metric and hand you the dashboard. Rankings, traffic volume, and conversion percentages are outside the fixed fee.",
          },
          {
            q: "What stack do you ship on?",
            a: "Next.js, TypeScript, Tailwind, shadcn/ui on Vercel. Supabase where there is data. Same default as our product sprints.",
          },
          {
            q: "Can we stop between phases?",
            a: "Yes. Fixed fee per engagement, cancellable between milestones. Everything built so far stays yours.",
          },
        ]}
        next={{ href: "/solutions", label: "Compare all sprints", sub: "Overview" }}
      />
    </>
  )
}
