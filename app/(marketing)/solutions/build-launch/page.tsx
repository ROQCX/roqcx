import type { Metadata } from "next"
import { StructuredData } from "@/components/seo/structured-data"
import { ServiceSprintPage } from "@/components/solutions/service-sprint-page"

export const metadata: Metadata = {
  title: "Build & Launch | 4-week MVP build sprint | ROQ CX",
  description:
    "A fixed-fee 4-week sprint that turns a validated prototype into a production MVP: auth, database, payments, analytics, CI/CD, staging, and handoff docs, in your stack or ours.",
  alternates: { canonical: "https://www.roqcx.com/solutions/build-launch" },
  openGraph: {
    title: "Build & Launch | 4-week MVP build sprint | ROQ CX",
    description:
      "Production MVP in 4 weeks: auth, database, payments, analytics, CI/CD, staging, in your stack or ours.",
    url: "https://www.roqcx.com/solutions/build-launch",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build & Launch | 4-week MVP build sprint | ROQ CX",
    description:
      "Production MVP in 4 weeks. Fixed-fee, fixed-scope.",
    images: ["/og"],
  },
}

const schema = {
  "@type": "Service",
  name: "Build & Launch",
  serviceType: "MVP Engineering",
  url: "https://www.roqcx.com/solutions/build-launch",
  description:
    "A fixed-fee four-week sprint that turns a validated prototype into a production MVP: authentication, database, payments, analytics, CI/CD, staging, and handoff documentation.",
  provider: { "@type": "Organization", name: "ROQ CX", url: "https://www.roqcx.com" },
  areaServed: ["AE", "GCC", "Global"],
  audience: { "@type": "Audience", audienceType: "Small and medium-sized enterprises" },
  termsOfService: "Fixed-fee, fixed-scope. 14-day post-handover warranty.",
}

export default function BuildLaunchPage() {
  return (
    <>
      <StructuredData data={schema} type="Service" />
      <ServiceSprintPage
        eyebrow="Sprint 02 · Build"
        duration="4 weeks"
        title={
          <>
            Build &amp; Launch.
            <br />
            Production MVP in four weeks.
          </>
        }
        lede="A fixed-fee four-week sprint that takes a validated prototype to a production codebase: auth, data, payments, analytics, CI/CD, staging, the lot. In your stack or ours."
        outcomes={[
          "Production codebase in your repo",
          "Auth, database, payments, integrations",
          "CI/CD, staging environment, monitoring",
          "Handoff docs + 14-day warranty",
        ]}
        weeks={[
          {
            label: "Week 1 · Scaffold",
            title: "Spin up the rails.",
            items: [
              "Stack confirmed: Next.js + Supabase (default) or yours",
              "Repo, CI/CD, staging environment, error tracking",
              "Schema + auth wired",
              "First production deploy by end of week",
            ],
          },
          {
            label: "Week 2 · Core flows",
            title: "Ship the happy path.",
            items: [
              "Primary user flow end-to-end",
              "Payments + receipts wired (Stripe by default)",
              "Email transactional + auth flows",
              "Analytics events instrumented",
            ],
          },
          {
            label: "Week 3 · Hardening",
            title: "Make it boring.",
            items: [
              "Edge cases, empty states, error states",
              "Rate limits + abuse protection",
              "Admin tools you'll actually use",
              "Internal load + smoke tests",
            ],
          },
          {
            label: "Week 4 · Handover",
            title: "Hand you the keys.",
            items: [
              "Production launch with monitoring on",
              "Walkthrough + handoff docs (architecture + runbook)",
              "14-day warranty window opens",
              "Optional: roll into Market Launch sprint",
            ],
          },
        ]}
        inputs={[
          "A signed Prototype Sprint memo (or equivalent)",
          "Domain, brand assets, payment account access",
          "Stack preference (or trust our default)",
          "A single product owner on our side",
        ]}
        artifacts={[
          "Production codebase in your repo",
          "Staging + production environments",
          "Architecture diagram + runbook",
          "Analytics dashboard with day-0 baseline",
        ]}
        decision={[
          "Launch publicly",
          "Soft-launch to a private cohort",
          "Move into Market Launch sprint",
          "Hand off to your in-house team",
        ]}
        notFor={[
          "Mid-build re-platforms with frozen requirements",
          "Pure marketing site rebuilds",
          "Compliance-heavy domains (HIPAA, PCI L1) without prior assessment",
          "Anyone who wants estimates by the hour",
        ]}
        faq={[
          {
            q: "What stacks do you build in?",
            a: "Default is Next.js + TypeScript + Supabase + Stripe + Vercel. We'll also build in your stack if you have one we're competent in. Just ask.",
          },
          {
            q: "Who owns the code?",
            a: "You. The repo lives in your GitHub org from day one. No vendor lock-in, no hostage code.",
          },
          {
            q: "What's the 14-day warranty?",
            a: "Bugs in shipped scope are fixed at no charge for 14 days after handover. New features are a new scope.",
          },
          {
            q: "Can we skip the Prototype Sprint?",
            a: "Yes, if you already have a validated design, a tight scope, and a clear success metric. We'll ask hard questions before agreeing.",
          },
        ]}
        next={{ href: "/solutions/market-launch", label: "Market Launch", sub: "Next step" }}
      />
    </>
  )
}
