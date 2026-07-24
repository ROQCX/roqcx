"use client"

import * as React from "react"
import Link from "next/link"
import { FullBleedSection, Reveal, RQX, SectionHeader } from "./atoms"
import { formatAed, formatUsd, SPRINTS, WEBSITE_SPRINT_FROM_AED } from "@/lib/sprints"

export function TimelineSection() {
  const stepColors = [RQX.accent, RQX.accent3, RQX.green, RQX.accent2] as const

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
        kicker="Fixed-fee sprints"
        title={
          <>
            Four sprints.
            <br />
            Pick the shape that matches the job.
          </>
        }
        lede="Prototype, build, and launch for product ideas. Website Sprint when the site is the product. Stop after any milestone, keep everything you've built."
      />

      <div style={{ position: "relative", paddingTop: 24 }}>
        <div className="rqx-timeline-cards">
          {SPRINTS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 100} className="rqx-timeline-reveal">
              {(() => {
                const stepColor = stepColors[i] ?? RQX.accent
                return (
                  <Link
                    href={m.href}
                    className="rqx-timeline-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      background: RQX.bg,
                      border: `1px solid ${RQX.line}`,
                      borderRadius: 18,
                      padding: "24px 24px",
                      position: "relative",
                      textDecoration: "none",
                      color: "inherit",
                      transition:
                        "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
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
                          fontSize: 56,
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
                        minHeight: "1.2em",
                      }}
                    >
                      {m.ladderLabel}
                    </div>
                    <div
                      className="font-serif-display"
                      style={{
                        fontSize: 22,
                        lineHeight: 1.12,
                        letterSpacing: "-0.015em",
                        color: RQX.fg,
                        marginBottom: 16,
                        minHeight: "2.24em",
                      }}
                    >
                      {m.ladderHeadline}
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        flex: 1,
                      }}
                    >
                      {m.ladderBullets.map((b) => (
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

                    <div style={{ marginTop: "auto", paddingTop: 16 }}>
                      <div
                        className="font-geist-mono"
                        style={{
                          minHeight: 18,
                          marginBottom: 12,
                          fontSize: 11,
                          letterSpacing: "0.04em",
                          color: stepColor,
                        }}
                      >
                        {m.priceFrom
                          ? `from ${formatAed(m.priceFrom.aed)} · ${formatUsd(m.priceFrom.usd)}`
                          : "\u00a0"}
                      </div>
                      <div
                        className="font-geist-mono"
                        style={{
                          paddingTop: 16,
                          borderTop: `1px solid ${RQX.lineDim}`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 10.5,
                          color: RQX.muted,
                          letterSpacing: "0.06em",
                          gap: 8,
                          minHeight: 36,
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            minWidth: 0,
                          }}
                        >
                          {m.deliverable}
                        </span>
                        <span style={{ color: stepColor, fontSize: 12, flexShrink: 0 }}>
                          See sprint →
                        </span>
                      </div>
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
            Fixed-fee per milestone. Cancel between any two. Website Sprint starts
            from {formatAed(WEBSITE_SPRINT_FROM_AED)}. Product sprints are quoted on the
            kick-off call.
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          margin-top: 48px;
          align-items: stretch;
        }
        :global(.rqx-timeline-reveal) {
          height: 100%;
          display: flex;
          min-width: 0;
        }
        :global(.rqx-timeline-reveal > *) {
          flex: 1;
          min-width: 0;
          width: 100%;
        }
        @media (max-height: 860px) {
          :global(#timeline) {
            padding-top: 88px !important;
            padding-bottom: 88px !important;
          }
          .rqx-timeline-cards {
            margin-top: 36px;
            gap: 18px;
          }
        }
        @media (min-width: 1100px) {
          .rqx-timeline-cards {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 700px) {
          .rqx-timeline-cards {
            grid-template-columns: 1fr;
            margin-top: 40px;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
