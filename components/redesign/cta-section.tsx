"use client"

import * as React from "react"
import Link from "next/link"
import { FullBleedSection, GridBg, RQX, Tag } from "./atoms"
import { currentCohortLabel } from "@/lib/sprints"

export function CtaSection() {
  return (
    <FullBleedSection
      id="cta"
      style={{
        padding: "140px 56px 120px",
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${RQX.lineDim}`,
      }}
    >
      <GridBg opacity={0.55} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          background: `radial-gradient(ellipse, color-mix(in oklab, ${RQX.accent} 20%, transparent), transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center" }}>
        <Tag>{currentCohortLabel()}</Tag>
        <h2
          className="font-serif-display rqx-cta-h2"
          style={{
            margin: "32px auto 24px",
            maxWidth: 920,
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            color: RQX.fg,
          }}
        >
          Your prototype is two
          <br />
          weeks away.{" "}
          <span style={{ fontStyle: "italic", color: RQX.accent }}>Start one.</span>
        </h2>
        <p
          style={{
            margin: "0 auto 36px",
            maxWidth: 560,
            fontSize: 17,
            lineHeight: 1.55,
            color: RQX.fgDim,
          }}
        >
          30-minute kick-off call. No deck, no SOW, no pre-engagement dance. We
          figure out together if a sprint is the right shape for the idea.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contact"
            style={{
              background: RQX.accent,
              color: RQX.accentFg,
              border: "none",
              padding: "18px 26px",
              borderRadius: 14,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 20px 40px -10px color-mix(in oklab, ${RQX.accent} 47%, transparent)`,
              textDecoration: "none",
            }}
          >
            Book the kick-off call <span>→</span>
          </Link>
          <a
            href="mailto:hello@roqcx.com"
            style={{
              background: "transparent",
              color: RQX.fg,
              border: `1px solid ${RQX.line}`,
              padding: "18px 24px",
              borderRadius: 14,
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Or email hello@roqcx.com
          </a>
        </div>
      </div>

      <style jsx>{`
        :global(.rqx-cta-h2) {
          font-size: clamp(48px, 7vw, 96px);
        }
      `}</style>
    </FullBleedSection>
  )
}
