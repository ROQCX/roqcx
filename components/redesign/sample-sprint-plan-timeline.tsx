"use client"

import * as React from "react"
import { Reveal, RQX } from "./atoms"

const DAYS = [
  { day: 1, label: "Kick‑off", detail: "Brief, success metric, segment. Align constraints." },
  { day: 3, label: "Sketches", detail: "Two directions. Ugly on purpose for honest feedback." },
  { day: 7, label: "Prototype", detail: "Hi‑fi clickable prototype on real-feeling data." },
  { day: 11, label: "User tests", detail: "5 moderated interviews. You watch live." },
  { day: 14, label: "Decide", detail: "Ship · iterate · kill. Written memo, signed." },
]

export function SampleSprintPlanTimeline() {
  return (
    <div
      style={{
        background: RQX.bgRaised,
        border: `1px solid ${RQX.line}`,
        borderRadius: 24,
        padding: 28,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 70px -35px rgba(0,0,0,0.55)",
      }}
    >
      <div
        className="font-geist-mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          color: RQX.muted,
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        <span>◆ Sprint timeline: 14 days</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: RQX.accent,
              boxShadow: `0 0 10px ${RQX.accent}`,
              animation: "rqx-spp-pulse 1.6s ease-in-out infinite",
            }}
          />
          sample cadence
        </span>
      </div>

      {/* Track */}
      <div style={{ position: "relative", padding: "18px 0 8px" }}>
        <div
          aria-hidden
          className="rqx-spp-track"
          style={{
            position: "absolute",
            top: 22,
            left: 12,
            right: 12,
            height: 2,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${RQX.accent} 0%, ${RQX.accent3} 50%, ${RQX.accent2} 100%)`,
            opacity: 0.9,
            transformOrigin: "0 50%",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 16,
            left: 12,
            right: 12,
            height: 14,
            pointerEvents: "none",
          }}
        >
          <div
            className="rqx-spp-dot"
            style={{
              position: "absolute",
              top: 2,
              left: 0,
              width: 10,
              height: 10,
              borderRadius: 999,
              background: RQX.accent2,
              filter: `drop-shadow(0 0 8px ${RQX.accent2})`,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${DAYS.length}, minmax(0, 1fr))`,
            gap: 10,
            position: "relative",
          }}
        >
          {DAYS.map((d, i) => (
            <Reveal key={d.day} delay={i * 90} y={14}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    margin: "0 auto",
                    background: [RQX.accent, RQX.accent, RQX.accent3, RQX.accent2, RQX.accent2][i] ?? RQX.accent,
                    border: `4px solid ${RQX.bgRaised}`,
                    boxShadow: `0 0 0 1px ${RQX.lineDim}`,
                  }}
                />
                <div style={{ height: 10 }} />
                <div
                  className="font-geist-mono"
                  style={{
                    fontSize: 10.5,
                    color: RQX.muted,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Day {String(d.day).padStart(2, "0")}
                </div>
                <div
                  className="font-serif-display"
                  style={{
                    marginTop: 8,
                    fontSize: 22,
                    lineHeight: 1.12,
                    letterSpacing: "-0.012em",
                    color: RQX.fg,
                  }}
                >
                  {d.label}
                </div>
                <div style={{ marginTop: 10, color: RQX.fgDim, fontSize: 13.5, lineHeight: 1.5 }}>
                  {d.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          paddingTop: 16,
          borderTop: `1px solid ${RQX.lineDim}`,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          color: RQX.fgDim,
          fontSize: 13.5,
        }}
      >
        <span>Deliverables by day 14: prototype URL · interviews · memo</span>
        <span className="font-geist-mono" style={{ color: RQX.muted, fontSize: 11, letterSpacing: "0.06em" }}>
          fixed cadence · fixed checkpoints
        </span>
      </div>

      <style jsx>{`
        .rqx-spp-track {
          animation: rqx-spp-draw 900ms 120ms cubic-bezier(.4,.1,.2,1) both;
        }
        .rqx-spp-dot {
          animation: rqx-spp-travel 5.2s 900ms cubic-bezier(.4,.1,.2,1) infinite;
        }
        @keyframes rqx-spp-travel {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 10px);
            opacity: 0;
          }
        }
        @keyframes rqx-spp-draw {
          from {
            transform: scaleX(0.2);
            opacity: 0.2;
          }
          to {
            transform: scaleX(1);
            opacity: 0.9;
          }
        }
        @keyframes rqx-spp-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rqx-spp-track,
          .rqx-spp-dot {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

