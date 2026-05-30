"use client"

import * as React from "react"
import { RQX } from "./atoms"

interface EditorialSprintDiagramProps {
  intensity?: 0 | 1
  size?: "default" | "compact"
}

const STAGES = [
  { id: "idea", label: "Idea", day: "D1", sub: "kick-off + brief", glyph: "spark" },
  { id: "sketch", label: "Sketch", day: "D3", sub: "wires + flows", glyph: "pencil" },
  { id: "build", label: "Build", day: "D7", sub: "clickable prototype", glyph: "block" },
  { id: "test", label: "Test", day: "D11", sub: "5 user interviews", glyph: "eye" },
  { id: "decide", label: "Decide", day: "D14", sub: "ship · iterate · kill", glyph: "flag" },
] as const

export function EditorialSprintDiagram({ intensity = 1, size = "default" }: EditorialSprintDiagramProps) {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    if (intensity === 0) return
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1800)
    return () => clearInterval(id)
  }, [intensity])

  const vbw = 1328
  const vbh = 320
  const xs = STAGES.map((_, i) => 90 + i * ((vbw - 180) / (STAGES.length - 1)))
  const ys = [200, 150, 200, 150, 200]

  const containerPadding = size === "compact" ? "22px 20px 18px" : "28px 24px 24px"
  const headerFontSize = size === "compact" ? 10.5 : 11
  // Keep diagram big, but cap height so it can sit above fold.
  const svgHeight = size === "compact" ? "clamp(260px, 30vh, 340px)" : "clamp(300px, 36vh, 420px)"

  return (
    <div
      style={{
        position: "relative",
        background: RQX.bgRaised,
        border: `1px solid ${RQX.line}`,
        borderRadius: 24,
        padding: containerPadding,
        boxShadow: "0 30px 70px -35px rgba(0,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      <div
        className="font-geist-mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
          fontSize: headerFontSize,
          color: RQX.muted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>◆ Sprint timeline: 14 days, fixed</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: RQX.accent,
              animation: intensity === 0 ? "none" : "rqxPulse 1.6s ease-in-out infinite",
            }}
          />
          active sprint · day 9
        </span>
      </div>

      <svg
        viewBox={`0 0 ${vbw} ${vbh}`}
        width="100%"
        style={{
          display: "block",
          height: svgHeight,
        }}
      >
        {/* Day axis */}
        <line
          x1={70}
          x2={vbw - 70}
          y1={vbh - 36}
          y2={vbh - 36}
          stroke={RQX.lineDim}
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {[1, 3, 7, 11, 14].map((d, i) => (
          <g key={d}>
            <line x1={xs[i]} x2={xs[i]} y1={vbh - 40} y2={vbh - 30} stroke={RQX.line} strokeWidth="1" />
            <text
              x={xs[i]}
              y={vbh - 14}
              textAnchor="middle"
              fill={RQX.muted}
              style={{
                fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 10,
                letterSpacing: "0.06em",
              }}
            >
              DAY {d.toString().padStart(2, "0")}
            </text>
          </g>
        ))}

        {/* Curved connectors */}
        {STAGES.slice(0, -1).map((_, i) => {
          const x1 = xs[i] + 42
          const y1 = ys[i]
          const x2 = xs[i + 1] - 42
          const y2 = ys[i + 1]
          const cx1 = x1 + (x2 - x1) * 0.5
          const cy1 = y1
          const cx2 = x1 + (x2 - x1) * 0.5
          const cy2 = y2
          const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`

          return (
            <g key={i}>
              <path d={d} stroke={RQX.line} strokeWidth="1.5" fill="none" />
              <path
                d={d}
                stroke={RQX.accent}
                strokeWidth="2"
                fill="none"
                strokeDasharray="600"
                strokeDashoffset="600"
                style={{
                  animation:
                    intensity === 0
                      ? "none"
                      : `rqxDrawIn 0.9s ${0.2 + i * 0.25}s cubic-bezier(.4,.1,.2,1) forwards`,
                }}
              />
              {intensity > 0 && (
                <circle
                  r="5"
                  fill={RQX.accent}
                  style={{
                    filter: `drop-shadow(0 0 6px ${RQX.accent})`,
                    offsetPath: `path('${d}')`,
                    animation: `rqxTravel 4s ${1.3 + i * 0.4}s cubic-bezier(.4,.1,.2,1) infinite`,
                  }}
                />
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {STAGES.map((s, i) => {
          const isActive = active === i
          return (
            <g key={s.id} transform={`translate(${xs[i]}, ${ys[i]})`}>
              <circle r="46" fill={RQX.accent} opacity={isActive ? 0.16 : 0} style={{ transition: "opacity 0.5s" }} />
              <circle
                r="36"
                fill={RQX.bgCard}
                stroke={isActive ? RQX.accent : RQX.line}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: "all 0.4s" }}
              />
              <NodeGlyph glyph={s.glyph} color={isActive ? RQX.accent : RQX.fgDim} />

              <text
                x="0"
                y="-64"
                textAnchor="middle"
                fill={RQX.fg}
                style={{
                  fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.label}
              </text>
              <text
                x="0"
                y="-44"
                textAnchor="middle"
                fill={RQX.muted}
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.06em",
                }}
              >
                {s.sub.toUpperCase()}
              </text>

              <g transform="translate(0, 58)" opacity={isActive ? 1 : 0.55} style={{ transition: "opacity 0.4s" }}>
                <rect
                  x="-18"
                  y="-9"
                  width="36"
                  height="18"
                  rx="9"
                  fill={isActive ? RQX.accent : RQX.bgCard}
                  stroke={isActive ? "none" : RQX.line}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill={isActive ? "#ffffff" : RQX.fgDim}
                  style={{
                    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {s.day}
                </text>
              </g>
            </g>
          )
        })}
      </svg>

      <style jsx>{`
        @keyframes rqxDrawIn {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes rqxTravel {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }
        @keyframes rqxPulse {
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
          :global(svg *) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function NodeGlyph({ glyph, color }: { glyph: string; color: string }) {
  switch (glyph) {
    case "spark":
      return (
        <g stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M0 -14 L0 14 M-14 0 L14 0 M-10 -10 L10 10 M-10 10 L10 -10" />
        </g>
      )
    case "pencil":
      return (
        <g stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M-12 12 L8 -8 L12 -4 L-8 16 Z" />
          <path d="M-12 12 L-14 18 L-8 16" />
        </g>
      )
    case "block":
      return (
        <g stroke={color} strokeWidth="1.6" fill="none">
          <rect x="-12" y="-12" width="10" height="10" rx="1.5" />
          <rect x="2" y="-12" width="10" height="10" rx="1.5" />
          <rect x="-12" y="2" width="10" height="10" rx="1.5" />
          <rect x="2" y="2" width="10" height="10" rx="1.5" fill={color} />
        </g>
      )
    case "eye":
      return (
        <g stroke={color} strokeWidth="1.6" fill="none">
          <path d="M-14 0 C -8 -10, 8 -10, 14 0 C 8 10, -8 10, -14 0 Z" />
          <circle cx="0" cy="0" r="3.5" fill={color} />
        </g>
      )
    case "flag":
      return (
        <g stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M-8 -14 L-8 14" />
          <path d="M-8 -14 L10 -10 L4 -4 L10 2 L-8 -2" fill={color} fillOpacity="0.3" />
        </g>
      )
    default:
      return <circle r="6" fill={color} />
  }
}

