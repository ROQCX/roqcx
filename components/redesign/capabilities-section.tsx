"use client"

import * as React from "react"
import { FullBleedSection, Reveal, RQX, SectionHeader } from "./atoms"

const CAPS = [
  {
    title: "Product strategy",
    body:
      "Turn fuzzy \"we should build…\" into a brief sharp enough to test in a week. Problem framing, segment selection, success metrics.",
    items: ["Discovery sprints", "JTBD interviews", "Bet sizing"],
  },
  {
    title: "Design + prototyping",
    body:
      "High-fidelity clickable prototypes that look and feel like the real thing, because your users need to react to product, not Figma squares.",
    items: ["Hi-fi UI design", "Clickable Figma + code prototypes", "Brand-aligned systems"],
  },
  {
    title: "Build + ship",
    body:
      "When the prototype earns it, we build the production version in your stack or ours, and stay through launch.",
    items: ["Full-stack React/Node", "Supabase, Stripe, Postgres", "Launch + analytics setup"],
  },
]

export function CapabilitiesSection() {
  return (
    <FullBleedSection id="capabilities" style={{ padding: "120px 56px" }}>
      <SectionHeader
        kicker="What we do, plainly"
        title={
          <>
            One team. Strategy,
            <br />
            design, and code.
          </>
        }
        lede="We are deliberately small: three people on every engagement, not a pyramid of juniors. The same humans who scoped your sprint show up to test it with users."
      />

      <div className="rqx-cap-grid">
        {CAPS.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <div
              style={{
                background: RQX.bgRaised,
                border: `1px solid ${RQX.line}`,
                borderRadius: 18,
                padding: "32px 28px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="font-geist-mono"
                style={{ fontSize: 11, color: RQX.accent, letterSpacing: "0.08em" }}
              >
                0{i + 1} · CAPABILITY
              </div>
              <div
                className="font-serif-display"
                style={{
                  fontSize: 36,
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: RQX.fg,
                }}
              >
                {c.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: RQX.fgDim,
                }}
              >
                {c.body}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  paddingTop: 8,
                  marginTop: "auto",
                  borderTop: `1px solid ${RQX.lineDim}`,
                }}
              >
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="font-geist-mono"
                    style={{
                      fontSize: 12,
                      color: RQX.fgDim,
                      letterSpacing: "0.02em",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      paddingTop: 8,
                    }}
                  >
                    <span style={{ color: RQX.accent }}>→</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <style jsx>{`
        .rqx-cap-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        @media (max-width: 900px) {
          .rqx-cap-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
