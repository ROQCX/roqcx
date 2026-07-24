import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Globe, Hammer, Rocket } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { StructuredData } from "@/components/seo/structured-data"
import {
  FullBleedSection,
  GridBg,
  RQX,
  SectionHeader,
  Tag,
} from "@/components/redesign/atoms"
import { formatAed, formatUsd, SPRINTS, WEBSITE_SPRINT_FROM_AED, WEBSITE_SPRINT_FROM_USD } from "@/lib/sprints"

export const metadata: Metadata = {
  title: "Product and website sprints for SMEs | ROQ CX",
  description:
    "Four fixed-fee sprints for SMEs: Prototype Sprint, Build & Launch, Website Sprint (from AED 18,000), and Market Launch. Stop after any milestone.",
  alternates: { canonical: "https://www.roqcx.com/solutions" },
  openGraph: {
    title: "Product and website sprints for SMEs | ROQ CX",
    description:
      "Four fixed-fee sprints: prototype, build, website, and market launch. Website Sprint from AED 18,000 ($5,000 USD).",
    url: "https://www.roqcx.com/solutions",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product and website sprints for SMEs | ROQ CX",
    description:
      "Four fixed-fee sprints. Website Sprint from AED 18,000 ($5,000 USD).",
    images: ["/og"],
  },
}

const ICONS = {
  "prototype-sprint": Compass,
  "build-launch": Hammer,
  "website-sprint": Globe,
  "market-launch": Rocket,
} as const

const sprintItemListSchema = {
  "@type": "ItemList",
  name: "ROQ CX Sprints",
  description:
    "Four fixed-fee sprints (Prototype Sprint, Build & Launch, Website Sprint, and Market Launch) for SMEs who need a validated product or a website built from a business diagnostic.",
  itemListElement: SPRINTS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      url: `https://www.roqcx.com/solutions/${s.slug}`,
      description: s.hubHeadline,
      provider: { "@type": "Organization", name: "ROQ CX" },
      areaServed: ["AE", "GCC", "Global"],
      ...(s.priceFrom
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "AED",
              price: String(s.priceFrom.aed),
            },
          }
        : {}),
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
              Four sprints.
              <br />
              Product or website.
            </>
          }
          lede={`Prototype, build, and launch for product ideas. Website Sprint when the site is the job. Fixed fee, fixed scope, stop after any milestone. Website Sprint starts from ${formatAed(WEBSITE_SPRINT_FROM_AED)} (${formatUsd(WEBSITE_SPRINT_FROM_USD)}).`}
        />

        <div
          className="rqx-solutions-grid grid grid-cols-1 md:grid-cols-2"
          style={{ display: "grid", gap: 20, marginTop: 8 }}
        >
          {SPRINTS.map((s) => {
            const Icon = ICONS[s.slug as keyof typeof ICONS]
            return (
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
                  {s.hubLabel} · {s.duration}
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
                  <Icon size={22} />
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

                {s.priceFrom ? (
                  <div
                    className="font-geist-mono"
                    style={{
                      marginBottom: 10,
                      fontSize: 12,
                      letterSpacing: "0.04em",
                      color: RQX.accent,
                    }}
                  >
                    from {formatAed(s.priceFrom.aed)} · {formatUsd(s.priceFrom.usd)}
                  </div>
                ) : null}

                <p
                  style={{
                    margin: 0,
                    color: "var(--rqx-fg-dim)",
                    lineHeight: 1.55,
                    fontSize: 15,
                  }}
                >
                  {s.hubHeadline}
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
                  {s.hubBullets.map((b) => (
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
                  href={s.href}
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
            )
          })}
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
              Product idea? Prototype Sprint. Need a site? Website Sprint.
            </h2>
            <p style={{ margin: 0, color: "var(--rqx-fg-dim)", lineHeight: 1.6 }}>
              Most product engagements start with the 14-day Prototype Sprint.
              Website buyers start with the diagnostic in Website Sprint. After
              the first milestone you decide: continue, narrow, or stop.
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
              href="/solutions/website-sprint"
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
              See Website Sprint <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </FullBleedSection>
  )
}
