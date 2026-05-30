import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FlaskConical, Users, Zap } from "lucide-react"
import { GlassCard } from "../../../components/ui/glass-card"
import { FullBleedSection, GridBg, RQX, SectionHeader, Tag } from "../../../components/redesign/atoms"

export const metadata: Metadata = {
  title: "About ROQ CX | Prototype sprints for SMEs",
  description:
    "ROQ CX is the fractional product team for SMEs. We run 14-day prototype sprints to validate ideas fast, then build and launch the ones that earn it.",
}

const values = [
  {
    icon: FlaskConical,
    title: "Evidence over opinions",
    description:
      "We don’t “believe” features into existence. We prototype, test with humans, and decide based on what happened."
  },
  {
    icon: Users,
    title: "Small team, senior humans",
    description:
      "You work with the people doing the work. No handoffs, no layers, no junior pyramid."
  },
  {
    icon: Zap,
    title: "Speed with a system",
    description:
      "Two-week cycles, predictable deliverables, fixed checkpoints. Fast doesn’t mean chaotic."
  }
]

export default function AboutPage() {
  return (
    <FullBleedSection
      style={{
        background: RQX.bg,
        position: "relative",
        overflow: "hidden",
      }}
      className="py-[88px] pb-[120px] px-6 sm:px-10 lg:px-14"
    >
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -260,
          left: -260,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent2} 16%, transparent) 0%, transparent 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <SectionHeader
          kicker="About"
          title={
            <>
              A fractional product team
              <br />
              built for SMEs.
            </>
          }
          lede="We run 14-day prototype sprints to help you validate ideas fast, then build and launch the ones that earn it."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 20,
            alignItems: "start",
            marginTop: 24,
          }}
          className="rqx-about-top grid grid-cols-1 lg:grid-cols-2"
        >
          <GlassCard variant="gradient" className="p-8">
            <div className="font-geist-mono" style={{ color: "var(--rqx-muted)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              What we are
            </div>
            <h2 className="font-serif-display" style={{ margin: "14px 0 10px", fontSize: 34, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--rqx-fg)" }}>
              A sprint machine.
            </h2>
            <p style={{ margin: 0, color: "var(--rqx-fg-dim)", lineHeight: 1.6 }}>
              ROQ CX is a small senior team that ships prototypes and production slices on a predictable cadence.
              You get a repeatable method, not an open-ended “project.”
            </p>
            <div style={{ height: 18 }} />
            <Tag>Fixed milestones · clear handoffs · no lock‑in</Tag>
          </GlassCard>

          <GlassCard variant="gradient" className="p-8">
            <div className="font-geist-mono" style={{ color: "var(--rqx-muted)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              What you get in 14 days
            </div>
            <h2 className="font-serif-display" style={{ margin: "14px 0 10px", fontSize: 34, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--rqx-fg)" }}>
              A real decision.
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Hi‑fi clickable prototype on a public URL",
                "Five user interviews, recorded",
                "Written go / no‑go memo, signed",
              ].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, color: "var(--rqx-fg-dim)", lineHeight: 1.55 }}>
                  <CheckCircle2 aria-hidden size={18} style={{ color: "var(--rqx-accent)", marginTop: 3, flexShrink: 0 }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div style={{ marginTop: 44 }}>
          <SectionHeader
            kicker="How we work"
            title={
              <>
                Tight loops.
                <br />
                Visible progress.
              </>
            }
            lede="A sprint is a sequence of checkpoints. You see work early, react fast, and we converge without surprises."
          />

          <div
            style={{
              display: "grid",
              gap: 20,
            }}
            className="rqx-about-values grid grid-cols-1 lg:grid-cols-3"
          >
            {values.map((v, i) => (
              <GlassCard key={v.title} variant="gradient" className="p-8">
                <div className="font-geist-mono" style={{ fontSize: 11, color: "var(--rqx-muted)", letterSpacing: "0.08em" }}>
                  0{i + 1} · PRINCIPLE
                </div>
                <div style={{ height: 14 }} />
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    aria-hidden
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <v.icon size={20} />
                  </div>
                  <div>
                    <div className="font-serif-display" style={{ fontSize: 26, lineHeight: 1.1, color: "var(--rqx-fg)", letterSpacing: "-0.015em" }}>
                      {v.title}
                    </div>
                    <p style={{ margin: "10px 0 0", color: "var(--rqx-fg-dim)", lineHeight: 1.6 }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            borderTop: `1px solid ${RQX.lineDim}`,
            paddingTop: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div className="font-serif-display" style={{ fontSize: 44, lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--rqx-fg)" }}>
              Want to see what a sprint looks like?
            </div>
            <p style={{ margin: "10px 0 0", color: "var(--rqx-fg-dim)", lineHeight: 1.6 }}>
              Book a 30‑minute call. We’ll pressure-test the idea, define a week‑2 test plan, and decide if a sprint is the right shape.
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
              Book the kick-off call <ArrowRight size={16} />
            </Link>
            <Link
              href="/#chat-demo"
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
              Try the chat demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </FullBleedSection>
  )
} 