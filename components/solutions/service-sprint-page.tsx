import type * as React from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import {
  FullBleedSection,
  GridBg,
  RQX,
  SectionHeader,
  Tag,
} from "@/components/redesign/atoms"

export interface SprintPageProps {
  eyebrow: string
  duration: string
  title: React.ReactNode
  lede: React.ReactNode
  outcomes: string[]
  weeks: Array<{ label: string; title: string; items: string[] }>
  inputs: string[]
  artifacts: string[]
  decision: string[]
  notFor: string[]
  faq: Array<{ q: string; a: string }>
  next?: { href: string; label: string; sub: string }
}

export function ServiceSprintPage(props: SprintPageProps) {
  const {
    eyebrow,
    duration,
    title,
    lede,
    outcomes,
    weeks,
    inputs,
    artifacts,
    decision,
    notFor,
    faq,
    next,
  } = props

  return (
    <FullBleedSection
      style={{ background: RQX.bg, position: "relative", overflow: "hidden" }}
      className="py-[80px] pb-[112px] px-6 sm:px-10 lg:px-14"
    >
      <GridBg opacity={0.45} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -240,
          left: -240,
          width: 740,
          height: 740,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent2} 16%, transparent) 0%, transparent 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <SectionHeader
          kicker={eyebrow}
          title={<>{title}</>}
          lede={lede}
        />

        <div
          className="rqx-sprint-top grid grid-cols-1 lg:grid-cols-3"
          style={{ display: "grid", gap: 18, marginTop: 4 }}
        >
          <GlassCard variant="gradient" className="p-7">
            <div
              className="font-geist-mono"
              style={{
                fontSize: 11,
                color: "var(--rqx-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Duration
            </div>
            <div
              className="font-serif-display"
              style={{
                margin: "10px 0 0",
                fontSize: 38,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--rqx-fg)",
              }}
            >
              {duration}
            </div>
          </GlassCard>

          <GlassCard variant="gradient" className="p-7 lg:col-span-2">
            <div
              className="font-geist-mono"
              style={{
                fontSize: 11,
                color: "var(--rqx-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              You walk away with
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "14px 0 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
              className="grid grid-cols-1 sm:grid-cols-2"
            >
              {outcomes.map((o) => (
                <li
                  key={o}
                  style={{
                    display: "flex",
                    gap: 10,
                    color: "var(--rqx-fg-dim)",
                    fontSize: 14.5,
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2
                    aria-hidden
                    size={18}
                    style={{ color: RQX.accent, flexShrink: 0, marginTop: 2 }}
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div style={{ marginTop: 56 }}>
          <SectionHeader
            kicker="Week by week"
            title={<>How the sprint runs.</>}
            lede="Same shape every time: checkpoints you can plan around and artifacts you can hand to a board."
          />

          <div
            className="rqx-sprint-weeks grid grid-cols-1 lg:grid-cols-2"
            style={{ display: "grid", gap: 18 }}
          >
            {weeks.map((w, i) => (
              <GlassCard key={w.label} variant="gradient" className="p-7">
                <div
                  className="font-geist-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--rqx-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} · {w.label}
                </div>
                <h3
                  className="font-serif-display"
                  style={{
                    margin: "12px 0 12px",
                    fontSize: 26,
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: "var(--rqx-fg)",
                  }}
                >
                  {w.title}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {w.items.map((it) => (
                    <li
                      key={it}
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
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        <div
          className="rqx-sprint-tri grid grid-cols-1 lg:grid-cols-3"
          style={{ display: "grid", gap: 18, marginTop: 44 }}
        >
          {(
            [
              ["Inputs", inputs],
              ["Artifacts", artifacts],
              ["Decision", decision],
            ] as const
          ).map(([k, items]) => (
            <div
              key={k}
              style={{
                background: RQX.bgRaised,
                border: `1px solid ${RQX.line}`,
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div
                className="font-geist-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: RQX.muted,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {k}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {items.map((it) => (
                  <li
                    key={it}
                    style={{
                      display: "flex",
                      gap: 10,
                      color: "var(--rqx-fg-dim)",
                      lineHeight: 1.5,
                      fontSize: 14,
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
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            background: RQX.bgRaised,
            border: `1px solid ${RQX.line}`,
            borderRadius: 18,
            padding: "22px 24px",
          }}
        >
          <div
            className="font-geist-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: RQX.muted,
              marginBottom: 12,
            }}
          >
            Not for
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {notFor.map((n) => (
              <li
                key={n}
                style={{
                  color: RQX.fgDim,
                  fontSize: 14,
                  lineHeight: 1.5,
                  display: "flex",
                  gap: 10,
                }}
              >
                <span aria-hidden style={{ color: RQX.muted }}>·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 56 }}>
          <SectionHeader
            kicker="Common questions"
            title={<>Quick answers.</>}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {faq.map((f) => (
              <div
                key={f.q}
                style={{
                  background: RQX.bgRaised,
                  border: `1px solid ${RQX.line}`,
                  borderRadius: 16,
                  padding: 22,
                }}
              >
                <div
                  className="font-serif-display"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: RQX.fg,
                    marginBottom: 10,
                  }}
                >
                  {f.q}
                </div>
                <p style={{ margin: 0, color: RQX.fgDim, fontSize: 14.5, lineHeight: 1.55 }}>
                  {f.a}
                </p>
              </div>
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
            <Tag>Ready when you are</Tag>
            <div
              className="font-serif-display"
              style={{
                margin: "14px 0 8px",
                fontSize: 40,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: RQX.fg,
              }}
            >
              Book a 30-minute kick-off call.
            </div>
            <p style={{ margin: 0, color: RQX.fgDim, lineHeight: 1.6 }}>
              We&apos;ll pressure-test the idea, agree on the success metric, and decide if a sprint is the right shape.
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
            {next && (
              <Link
                href={next.href}
                style={{
                  border: `1px solid ${RQX.line}`,
                  background: "transparent",
                  color: RQX.fg,
                  padding: "14px 18px",
                  borderRadius: 14,
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span>
                  <span style={{ display: "block", fontSize: 11, color: RQX.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {next.sub}
                  </span>
                  <span>{next.label}</span>
                </span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </FullBleedSection>
  )
}
