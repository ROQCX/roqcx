"use client"

import * as React from "react"
import Link from "next/link"
import { FullBleedSection, Reveal, RQX, SectionHeader } from "./atoms"

const MILESTONES = [
  {
    week: "02",
    label: "Validated prototype",
    headline: "A clickable thing your users actually clicked.",
    bullets: [
      "Hi-fi prototype on a public URL",
      "5 user interviews, recorded",
      "Go / no-go memo, signed",
    ],
    deliverable: "PROTOTYPE.ZIP · FIGMA · MEMO.PDF",
    href: "/solutions/prototype-sprint",
  },
  {
    week: "04",
    label: "Production-ready slice",
    headline: "One real feature, end-to-end, in your stack.",
    bullets: [
      "Auth + database + payments wired",
      "Analytics + error tracking on day one",
      "CI/CD, staging, handoff docs",
    ],
    deliverable: "GITHUB REPO · STAGING ENV · RUNBOOK",
    href: "/solutions/build-launch",
  },
  {
    week: "08",
    label: "Market launch",
    headline: "Live with real customers, measured.",
    bullets: [
      "Landing page + paid trial flow",
      "Onboarding email sequence",
      "30-day cohort dashboard",
    ],
    deliverable: "LAUNCH POST · COHORT METRICS",
    href: "/solutions/market-launch",
  },
]

export function TimelineSection() {
  const stepColors = [RQX.accent, RQX.accent3, RQX.accent2] as const

  return (
    <FullBleedSection
      id="timeline"
      style={{
        padding: "104px 56px",
        background: RQX.bgRaised,
        borderTop: `1px solid ${RQX.lineDim}`,
        borderBottom: `1px solid ${RQX.lineDim}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 11%, transparent), transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <SectionHeader
        kicker="From prototype to market"
        title={
          <>
            Two weeks to validate.
            <br />
            Eight weeks to live.
          </>
        }
        lede="Most agencies sell you the whole house up front. We sell you progress, measured in weeks, not retainers. Stop after any milestone, keep everything you've built."
      />

      <div style={{ position: "relative", paddingTop: 40 }}>
        {/* Track line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 60,
            left: "8.33%",
            right: "8.33%",
            height: 2,
            background: `linear-gradient(90deg, ${RQX.accent} 0%, ${RQX.accent3} 50%, ${RQX.accent2} 100%)`,
            borderRadius: 999,
          }}
        />
        {/* Track ticks */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {MILESTONES.map((m, i) => (
            <div key={m.week} style={{ display: "flex", justifyContent: "center" }}>
              {/** 02 → 04 → 08 reads warm-to-cool (red → amber → cyan) */}
              {/** Matches the redesign handoff timeline progression */}
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: stepColors[i] ?? RQX.accent,
                  border: `4px solid ${RQX.bgRaised}`,
                  boxShadow: `0 0 0 1px ${stepColors[i] ?? RQX.accent}, 0 0 20px color-mix(in oklab, ${stepColors[i] ?? RQX.accent} 53%, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="rqx-timeline-cards">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.week} delay={i * 120}>
              {(() => {
                const stepColor = stepColors[i] ?? RQX.accent
                return (
              <Link
                href={m.href}
                className="rqx-timeline-card"
                style={{
                  display: "block",
                  background: RQX.bg,
                  border: `1px solid ${RQX.line}`,
                  borderRadius: 18,
                  padding: "24px 24px",
                  position: "relative",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span
                    className="font-serif-display"
                    style={{
                      fontSize: 64,
                      lineHeight: 1,
                      color: stepColor,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {m.week}
                  </span>
                  <span
                    className="font-geist-mono"
                    style={{
                      fontSize: 11,
                      color: RQX.muted,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    weeks
                  </span>
                </div>
                <div
                  className="font-geist-mono"
                  style={{
                    fontSize: 11,
                    color: RQX.fgDim,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {m.label}
                </div>
                <div
                  className="font-serif-display"
                  style={{
                    fontSize: 24,
                    lineHeight: 1.12,
                    letterSpacing: "-0.015em",
                    color: RQX.fg,
                    marginBottom: 16,
                  }}
                >
                  {m.headline}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {m.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: RQX.fgDim,
                      }}
                    >
                      <span
                        style={{
                          marginTop: 7,
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: stepColor,
                          flexShrink: 0,
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <div
                  className="font-geist-mono"
                  style={{
                    marginTop: 22,
                    paddingTop: 16,
                    borderTop: `1px solid ${RQX.lineDim}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 10.5,
                    color: RQX.muted,
                    letterSpacing: "0.06em",
                  }}
                >
                  <span>{m.deliverable}</span>
                  <span style={{ color: stepColor, fontSize: 12 }}>See sprint →</span>
                </div>
              </Link>
                )
              })()}
            </Reveal>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 28,
            borderTop: `1px dashed ${RQX.line}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 14, color: RQX.fgDim, maxWidth: 600 }}>
            Fixed-fee per milestone. Cancel between any two. We&apos;ve never had a
            client stop after Week 2 without something they were proud to show
            their board.
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="/solutions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: RQX.fg,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                borderBottom: `1px solid ${RQX.accent}`,
                paddingBottom: 2,
              }}
            >
              Compare all sprints →
            </Link>
            <Link
              href="/sample-sprint-plan"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: RQX.fgDim,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              See sample sprint plan →
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.rqx-timeline-card:hover) {
          border-color: color-mix(in oklab, ${RQX.accent} 50%, ${RQX.line}) !important;
          transform: translateY(-2px);
          box-shadow: 0 24px 50px -24px color-mix(in oklab, ${RQX.accent} 40%, transparent);
        }
        .rqx-timeline-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 84px;
        }
        @media (max-height: 860px) {
          :global(#timeline) {
            padding-top: 88px !important;
            padding-bottom: 88px !important;
          }
          .rqx-timeline-cards {
            margin-top: 64px;
            gap: 18px;
          }
        }
        @media (max-width: 900px) {
          .rqx-timeline-cards {
            grid-template-columns: 1fr;
            margin-top: 60px;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
