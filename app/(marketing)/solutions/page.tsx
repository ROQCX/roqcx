import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Hammer, Rocket } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { StructuredData } from "@/components/seo/structured-data"
import {
  FullBleedSection,
  GridBg,
  RQX,
  SectionHeader,
  Tag,
} from "@/components/redesign/atoms"

export const metadata: Metadata = {
  title: "Product sprints for SMEs | ROQ CX",
  description:
    "Three fixed-fee sprints to turn an idea into a live, market-ready product: a 14-day prototype sprint, a 4-week build sprint, and an 8-week launch sprint. Stop after any milestone.",
  alternates: { canonical: "https://www.roqcx.com/solutions" },
  openGraph: {
    title: "Product sprints for SMEs | ROQ CX",
    description:
      "Three fixed-fee sprints to turn an idea into a live, market-ready product: a 14-day prototype sprint, a 4-week build sprint, and an 8-week launch sprint.",
    url: "https://www.roqcx.com/solutions",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product sprints for SMEs | ROQ CX",
    description:
      "Three fixed-fee sprints to turn an idea into a live, market-ready product.",
    images: ["/og"],
  },
}

const services = [
  {
    slug: "prototype-sprint",
    icon: Compass,
    duration: "14 days",
    label: "Sprint 01 · Validate",
    title: "Prototype Sprint",
    headline: "Turn an idea into a clickable prototype you can test on real users.",
    bullets: [
      "Hi-fi clickable prototype on a public URL",
      "Five recorded user interviews",
      "Written go / no-go memo, signed",
    ],
    keyword: "prototype sprint",
  },
  {
    slug: "build-launch",
    icon: Hammer,
    duration: "4 weeks",
    label: "Sprint 02 · Build",
    title: "Build & Launch",
    headline: "Production-grade slice of the validated prototype: auth, data, payments, the lot.",
    bullets: [
      "Production codebase in your stack or ours",
      "Auth, database, payments, CI/CD, staging",
      "Handoff docs and a 14-day warranty",
    ],
    keyword: "MVP build sprint",
  },
  {
    slug: "market-launch",
    icon: Rocket,
    duration: "8 weeks",
    label: "Sprint 03 · Launch",
    title: "Market Launch",
    headline: "From shipped product to live customers: landing, onboarding, and a 30-day cohort.",
    bullets: [
      "Landing page + onboarding sequence",
      "Analytics pipeline + cohort dashboard",
      "30-day post-launch retention readout",
    ],
    keyword: "product launch sprint",
  },
] as const

const sprintItemListSchema = {
  "@type": "ItemList",
  name: "ROQ CX Product Sprints",
  description:
    "Three fixed-fee sprints (Prototype Sprint, Build & Launch, and Market Launch) take an SME idea from napkin sketch to live customers.",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      url: `https://www.roqcx.com/solutions/${s.slug}`,
      description: s.headline,
      provider: { "@type": "Organization", name: "ROQ CX" },
      areaServed: ["AE", "GCC", "Global"],
    },
  })),
}

export default function SolutionsHubPage() {
  return (
    <FullBleedSection
      style={{ background: RQX.bg, position: "relative", overflow: "hidden" }}
      className="py-[88px] pb-[120px] px-6 sm:px-10 lg:px-14"
    >
      <StructuredData data={sprintItemListSchema} type="ItemList" />
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -240,
          right: -240,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 16%, transparent) 0%, transparent 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <SectionHeader
          kicker="Solutions"
          title={
            <>
              Three sprints.
              <br />
              From sketch to live customers.
            </>
          }
          lede="A predictable two-week prototype sprint, a four-week build, and an eight-week market launch. Fixed fee, fixed scope, and you can stop after any milestone."
        />

        <div
          className="rqx-solutions-grid grid grid-cols-1 lg:grid-cols-3"
          style={{ display: "grid", gap: 20, marginTop: 8 }}
        >
          {services.map((s) => (
            <GlassCard
              key={s.slug}
              variant="gradient"
              className="p-8 flex flex-col"
            >
              <div
                className="font-geist-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--rqx-muted)",
                }}
              >
                {s.label} · {s.duration}
              </div>

              <div
                aria-hidden
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                  color: "#fff",
                }}
              >
                <s.icon size={22} />
              </div>

              <h3
                className="font-serif-display"
                style={{
                  margin: "18px 0 10px",
                  fontSize: 32,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--rqx-fg)",
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "var(--rqx-fg-dim)",
                  lineHeight: 1.55,
                  fontSize: 15,
                }}
              >
                {s.headline}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "18px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flex: 1,
                }}
              >
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      gap: 10,
                      color: "var(--rqx-fg-dim)",
                      fontSize: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        marginTop: 8,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: RQX.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/solutions/${s.slug}`}
                style={{
                  marginTop: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--rqx-fg)",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  borderBottom: `1px solid ${RQX.accent}`,
                  paddingBottom: 4,
                  alignSelf: "flex-start",
                }}
              >
                See the {s.title.toLowerCase()} <ArrowRight size={14} />
              </Link>
            </GlassCard>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            borderTop: `1px solid ${RQX.lineDim}`,
            paddingTop: 36,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: 36,
            alignItems: "start",
          }}
          className="rqx-solutions-footer grid grid-cols-1 lg:grid-cols-2"
        >
          <div>
            <Tag>Not sure where to start?</Tag>
            <h2
              className="font-serif-display"
              style={{
                margin: "16px 0 12px",
                fontSize: 44,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--rqx-fg)",
              }}
            >
              The default is a 14-day prototype sprint.
            </h2>
            <p style={{ margin: 0, color: "var(--rqx-fg-dim)", lineHeight: 1.6 }}>
              Most engagements start there. It&apos;s the cheapest way to find out
              whether an idea earns the build. After day 14 you decide: ship, iterate,
              kill, or move into the build sprint.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                color: "#fff",
                padding: "14px 18px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: `0 24px 50px -16px color-mix(in oklab, ${RQX.accent} 50%, transparent)`,
              }}
            >
              Book a kick-off call <ArrowRight size={16} />
            </Link>
            <Link
              href="/sample-sprint-plan"
              style={{
                border: `1px solid ${RQX.line}`,
                background: "transparent",
                color: "var(--rqx-fg)",
                padding: "14px 18px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              See a sample plan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </FullBleedSection>
  )
}
