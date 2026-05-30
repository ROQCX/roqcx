import type { Metadata } from "next"
import { StructuredData } from "@/components/seo/structured-data"
import { ServiceSprintPage } from "@/components/solutions/service-sprint-page"

export const metadata: Metadata = {
  title: "Market Launch | 8-week product launch sprint | ROQ CX",
  description:
    "A fixed-fee 8-week sprint that takes a built product to live customers: landing page, onboarding sequence, lifecycle email, and a 30-day cohort dashboard tracking real retention.",
  alternates: { canonical: "https://www.roqcx.com/solutions/market-launch" },
  openGraph: {
    title: "Market Launch | 8-week product launch sprint | ROQ CX",
    description:
      "From shipped product to live customers in 8 weeks. Landing, onboarding, lifecycle, and a 30-day cohort dashboard.",
    url: "https://www.roqcx.com/solutions/market-launch",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Launch | 8-week product launch sprint | ROQ CX",
    description:
      "Landing, onboarding, lifecycle, and a 30-day retention dashboard.",
    images: ["/og"],
  },
}

const schema = {
  "@type": "Service",
  name: "Market Launch",
  serviceType: "Product Launch",
  url: "https://www.roqcx.com/solutions/market-launch",
  description:
    "An eight-week sprint that takes a shipped product to live customers: landing page, onboarding sequence, lifecycle email, and a 30-day cohort dashboard tracking real retention.",
  provider: { "@type": "Organization", name: "ROQ CX", url: "https://www.roqcx.com" },
  areaServed: ["AE", "GCC", "Global"],
  audience: { "@type": "Audience", audienceType: "Small and medium-sized enterprises" },
  termsOfService: "Fixed-fee, fixed-scope. 30-day post-launch readout included.",
}

export default function MarketLaunchPage() {
  return (
    <>
      <StructuredData data={schema} type="Service" />
      <ServiceSprintPage
        eyebrow="Sprint 03 · Launch"
        duration="8 weeks"
        title={
          <>
            Market Launch.
            <br />
            From shipped to live customers.
          </>
        }
        lede="An eight-week sprint that takes a built product to live customers: landing page, onboarding sequence, lifecycle email, and a 30-day cohort dashboard measuring real outcomes."
        outcomes={[
          "High-converting landing page + assets",
          "Onboarding flow + lifecycle email",
          "Paid + organic acquisition baseline",
          "30-day cohort dashboard with retention curve",
        ]}
        weeks={[
          {
            label: "Weeks 1-2 · Positioning",
            title: "Get the story straight.",
            items: [
              "Positioning + messaging tightened against real users",
              "Landing page wireframe + copy",
              "Brand assets audited / produced",
              "Channels chosen: paid, organic, partnership",
            ],
          },
          {
            label: "Weeks 3-4 · Funnel",
            title: "Build the path in.",
            items: [
              "Landing page shipped + A/B test ready",
              "Onboarding sequence in-product",
              "Lifecycle email (welcome, activation, win-back)",
              "Analytics events for activation + retention",
            ],
          },
          {
            label: "Weeks 5-6 · Launch",
            title: "Open the doors.",
            items: [
              "Soft launch to private cohort",
              "Paid acquisition campaigns live",
              "Daily standup on funnel health",
              "Iteration on the highest-leverage step",
            ],
          },
          {
            label: "Weeks 7-8 · Read the data",
            title: "Tell you what worked.",
            items: [
              "Cohort retention dashboard live",
              "30-day readout: what scaled, what didn't",
              "Recommendation on next investment",
              "Handover to in-house team or roll-on retainer",
            ],
          },
        ]}
        inputs={[
          "A production-ready product (Build & Launch complete or equivalent)",
          "A target CAC / payback period you'd defend",
          "Brand or willingness to evolve it",
          "Budget for paid acquisition (separate from sprint fee)",
        ]}
        artifacts={[
          "Landing page (analytics-ready)",
          "Onboarding flow + email sequence",
          "Channel playbook + ad creative",
          "Cohort dashboard + 30-day readout",
        ]}
        decision={[
          "Scale the channel that worked",
          "Roll-on retainer for ongoing growth",
          "Hand off to in-house marketing",
          "Pause and rethink positioning",
        ]}
        notFor={[
          "Enterprise-only products with long procurement cycles",
          "Anyone without a working product in market",
          "Brand-only refreshes without a funnel",
          "Teams unwilling to look at the data on launch day",
        ]}
        faq={[
          {
            q: "Do you run the ad spend?",
            a: "We set up the campaigns and creative; you fund the spend directly. We tune for the first 30 days, then hand the keys over.",
          },
          {
            q: "What channels do you usually pick?",
            a: "Whatever the cohort actually lives in. For most SME launches we end up with one paid channel (Meta or Google) and one organic motion (SEO content or partnerships).",
          },
          {
            q: "What does the 30-day readout cover?",
            a: "Activation rate, day-7/day-30 retention, CAC per channel, the funnel step that's leaking, and our recommendation on next investment.",
          },
          {
            q: "Can we extend past 8 weeks?",
            a: "Yes. Most teams move into a monthly retainer once we've found a channel that converts. Optional, not assumed.",
          },
        ]}
        next={{ href: "/case-studies", label: "See live launches", sub: "Proof" }}
      />
    </>
  )
}
