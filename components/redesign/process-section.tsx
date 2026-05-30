"use client"

import * as React from "react"
import { FullBleedSection, Reveal, RQX, SectionHeader } from "./atoms"

const STEPS = [
  {
    n: "01",
    title: "Idea capture",
    day: "Day 1",
    body:
      "A 90-minute working session to translate \"I think we should…\" into a sharp problem statement, a target user, and a success metric.",
    tag: "Workshop · Miro · Notion",
  },
  {
    n: "02",
    title: "Sketch + flow",
    day: "Days 2–3",
    body:
      "Low-fi screens and clickable flows. We keep it ugly on purpose so feedback is honest. You see two divergent directions, not one.",
    tag: "Figma · paper · Loom",
  },
  {
    n: "03",
    title: "Build prototype",
    day: "Days 4–7",
    body:
      "A hi-fi clickable prototype on real-feeling data. Hosted at a URL. Works on phones. Looks shippable. Often is.",
    tag: "React · Supabase · Vercel",
  },
  {
    n: "04",
    title: "Test with humans",
    day: "Days 8–11",
    body:
      "Five moderated sessions with people from your target segment. We bring the recruits. You watch every minute, live.",
    tag: "UserInterviews · Tella",
  },
  {
    n: "05",
    title: "Decide",
    day: "Day 14",
    body:
      "Ship, iterate, or kill: written, on paper, no maybes. ~30% of sprints end in a clean kill. That is the point.",
    tag: "Memo · go/no-go",
  },
]

export function ProcessSection() {
  return (
    <FullBleedSection id="process" style={{ padding: "120px 56px", position: "relative" }}>
      <SectionHeader
        kicker="The sprint, step by step"
        title={
          <>
            Five stages.
            <br />
            One predictable rhythm.
          </>
        }
        lede="Every ROQ engagement runs on the same 14-day sprint. Same shape, same checkpoints, same deliverables. Predictability is a feature."
      />

      <div className="rqx-process-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div
              style={{
                padding: "24px 20px",
                background: RQX.bgRaised,
                border: `1px solid ${RQX.line}`,
                borderRadius: 16,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="font-serif-display"
                aria-hidden
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  fontSize: 96,
                  lineHeight: 1,
                  color: RQX.lineDim,
                  opacity: 0.6,
                  pointerEvents: "none",
                }}
              >
                {s.n}
              </div>
              <div
                className="font-geist-mono"
                style={{
                  fontSize: 11,
                  color: RQX.accent,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.day}
              </div>
              <div
                className="font-serif-display"
                style={{
                  fontSize: 26,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                  color: RQX.fg,
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: RQX.fgDim,
                  flex: 1,
                }}
              >
                {s.body}
              </p>
              <div
                className="font-geist-mono"
                style={{
                  fontSize: 10,
                  color: RQX.muted,
                  letterSpacing: "0.04em",
                  paddingTop: 12,
                  borderTop: `1px solid ${RQX.lineDim}`,
                }}
              >
                {s.tag}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style jsx>{`
        .rqx-process-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          border-top: 1px solid ${RQX.lineDim};
          padding-top: 24px;
        }
        @media (max-width: 1080px) {
          .rqx-process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .rqx-process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
