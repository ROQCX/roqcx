"use client"

import * as React from "react"
import Link from "next/link"
import { FullBleedSection, GridBg, Marquee, RQX, Tag, useScrambled } from "./atoms"
import { currentCohortLabel } from "@/lib/sprints"

const CYCLE = ["2 weeks", "14 days", "10 standups", "real hands"]

export function HeroPrototype() {
  const cycling = useScrambled(CYCLE, { interval: 2600, scrambleDur: 700 })

  return (
    <FullBleedSection
      className="hero"
      style={{ background: RQX.bg, overflow: "hidden", paddingBottom: 0 }}
    >
      <GridBg opacity={0.45} />

      {/* Soft accent glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${RQX.accent} 0%, transparent 60%)`,
          opacity: 0.18,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${RQX.accent3} 0%, transparent 60%)`,
          opacity: 0.12,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="rqx-hero-grid">
        {/* LEFT — kinetic headline block */}
        <div>
          <Tag>Prototyping studio · for SMEs</Tag>

          <h1
            className="font-serif-display rqx-hero-headline"
            style={{
              margin: "22px 0 18px",
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              color: RQX.fg,
            }}
          >
            From idea to<br />
            live prototype<br />
            <span style={{ color: RQX.muted, fontStyle: "italic" }}>in </span>
            <span
              className="font-geist-mono rqx-hero-pill"
              style={{
                display: "inline-block",
                minWidth: "7ch",
                padding: "4px 18px 6px",
                background: RQX.accent,
                color: RQX.accentFg,
                borderRadius: 14,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                transform: "translateY(-8px)",
                boxShadow: `0 20px 60px -10px color-mix(in oklab, ${RQX.accent} 40%, transparent)`,
              }}
            >
              {cycling}
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              maxWidth: 520,
              color: RQX.fgDim,
              margin: "0 0 22px",
              fontWeight: 400,
            }}
          >
            ROQ CX is the fractional product team SMEs hire to turn napkin
            sketches into clickable prototypes, validate with real users, and
            ship the ones that earn their place, all on a fixed two-week
            cadence.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <Link
              href="/contact"
              style={{
                background: RQX.fg,
                color: RQX.bg,
                border: "none",
                padding: "16px 24px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.005em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              Start a prototype sprint
              <span style={{ fontSize: 16 }}>→</span>
            </Link>
            <Link
              href="/solutions"
              style={{
                background: "transparent",
                color: RQX.fg,
                border: `1px solid ${RQX.line}`,
                padding: "16px 22px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 15,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: RQX.green,
                }}
              />
              Compare the sprints
            </Link>
          </div>

          {/* Metric row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
              borderTop: `1px solid ${RQX.lineDim}`,
              paddingTop: 18,
              maxWidth: 520,
            }}
          >
            {[
              ["14d", "avg. idea → click-through"],
              ["$0", "until sprint kick-off"],
              ["20y", "product delivery DNA"],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  className="font-serif-display"
                  style={{
                    fontSize: 36,
                    lineHeight: 1,
                    color: RQX.fg,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {k}
                </div>
                <div
                  className="font-geist-mono"
                  style={{
                    fontSize: 11,
                    color: RQX.muted,
                    marginTop: 8,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — live build sandbox */}
        <div style={{ alignSelf: "center" }}>
          <SandboxBuild />
        </div>
      </div>

      <Marquee
        items={[
          "◆ Recent work · Mazadak v3 · shipped in 14 days",
          "◆ Recent work · DubaiSevens Companion · shipped",
          "◆ Recent work · ClinicQ Reception · prototype sprint",
          "◆ About 30% of sprints end in a deliberate kill",
          `◆ ${currentCohortLabel()}`,
        ]}
      />

      <style jsx>{`
        .rqx-hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 56px;
          padding: 48px 72px 48px;
          position: relative;
          align-items: start;
        }
        .rqx-hero-headline {
          font-size: clamp(44px, 6.4vw, 84px);
        }
        :global(.rqx-hero-pill) {
          font-size: clamp(32px, 4.8vw, 58px);
        }
        @media (max-height: 860px) {
          .rqx-hero-grid {
            padding: 36px 72px 36px;
            gap: 44px;
          }
        }
        @media (max-width: 960px) {
          .rqx-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 24px 56px;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}

// ──────────────────────────────────────────────────────────────────────
// SandboxBuild — animated panel showing a prototype assembling on loop.
const FULL_TITLE = "Book a fitting"
const STEP_TIMINGS = [600, 900, 1400, 1100, 1300, 1500, 2200]

function SandboxBuild() {
  const [step, setStep] = React.useState(0)
  const [typed, setTyped] = React.useState("")

  React.useEffect(() => {
    let cancelled = false
    let stepIdx = 0
    let typer: ReturnType<typeof setInterval> | null = null
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const advance = () => {
      if (cancelled) return
      const cur = stepIdx
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return
          setStep((s) => {
            const n = (s + 1) % 7
            if (n === 1) {
              let j = 0
              if (typer) clearInterval(typer)
              typer = setInterval(() => {
                j++
                setTyped(FULL_TITLE.slice(0, j))
                if (j >= FULL_TITLE.length && typer) clearInterval(typer)
              }, 50)
            }
            if (n === 0) setTyped("")
            return n
          })
          stepIdx++
          advance()
        }, STEP_TIMINGS[cur % STEP_TIMINGS.length]),
      )
    }
    advance()

    return () => {
      cancelled = true
      timeouts.forEach((t) => clearTimeout(t))
      if (typer) clearInterval(typer)
    }
  }, [])

  return (
    <div
      style={{
        position: "relative",
        background: RQX.bgRaised,
        border: `1px solid ${RQX.line}`,
        borderRadius: 20,
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: `1px solid ${RQX.lineDim}`,
          background: RQX.bgCard,
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.62 0.18 25)" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.78 0.15 90)" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.72 0.16 145)" }} />
        </div>
        <div
          className="font-geist-mono"
          style={{ fontSize: 11, color: RQX.muted, letterSpacing: "0.04em" }}
        >
          prototype.roqcx.com / sprint-042
        </div>
        <div
          className="font-geist-mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10.5,
            color: RQX.fgDim,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: RQX.green,
              boxShadow: `0 0 8px ${RQX.green}`,
              animation: "rqx-pulse 1.6s ease-in-out infinite",
            }}
          />
          LIVE
        </div>
      </div>

      {/* Status bar */}
      <div
        className="font-geist-mono"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          borderBottom: `1px solid ${RQX.lineDim}`,
          fontSize: 11,
          color: RQX.muted,
          letterSpacing: "0.02em",
        }}
      >
        <span>BookingFlow / step 2 of 4</span>
        <span>
          {step === 6 ? "◆ shipped → " : "◆ building → "}
          {Math.min(100, step * 16 + 4)}%
        </span>
      </div>

      {/* Preview canvas */}
      <div
        style={{
          padding: "36px 32px",
          minHeight: 380,
          position: "relative",
          background: `
            radial-gradient(circle at 20% 20%, color-mix(in oklab, ${RQX.accent} 10%, transparent) 0%, transparent 50%),
            ${RQX.bgRaised}
          `,
        }}
      >
        {/* Mock card */}
        <div
          style={{
            background: RQX.bg,
            border: `1px solid ${RQX.line}`,
            borderRadius: 16,
            padding: 24,
            maxWidth: 360,
            margin: "0 auto",
            boxShadow: "0 24px 40px -12px rgba(0,0,0,0.25)",
            position: "relative",
          }}
        >
          {step >= 1 && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                border: `1px dashed ${RQX.accent}`,
                borderRadius: 16,
                pointerEvents: "none",
                opacity: 0.35,
                animation: "rqx-fade 0.4s ease both",
              }}
            />
          )}

          {/* Step 1 — title */}
          <div style={{ minHeight: 28 }}>
            {step >= 1 ? (
              <div
                className="font-serif-display"
                style={{
                  fontSize: 26,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  animation: "rqx-slideIn 0.5s ease both",
                  color: RQX.fg,
                }}
              >
                {typed}
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 22,
                    background: RQX.accent,
                    marginLeft: 2,
                    verticalAlign: "-2px",
                    animation: "rqx-blink 1s infinite",
                    opacity: step === 1 ? 1 : 0,
                  }}
                />
              </div>
            ) : (
              <div style={{ height: 24, width: "70%", background: RQX.lineDim, borderRadius: 6 }} />
            )}
          </div>

          {/* Step 2 — subhead */}
          <div style={{ marginTop: 10, minHeight: 18 }}>
            {step >= 2 ? (
              <div
                style={{
                  fontSize: 13,
                  color: RQX.fgDim,
                  animation: "rqx-slideIn 0.5s ease both",
                }}
              >
                Choose a time that works. We&apos;ll text the details.
              </div>
            ) : (
              <div style={{ height: 12, width: "90%", background: RQX.lineDim, borderRadius: 4, opacity: 0.5 }} />
            )}
          </div>

          {/* Step 3 — date chips */}
          <div style={{ display: "flex", gap: 8, marginTop: 18, minHeight: 50 }}>
            {["Thu 12", "Fri 13", "Sat 14", "Mon 16"].map((d, i) => (
              <div
                key={d}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  background: i === 1 ? RQX.accent : RQX.bgRaised,
                  color: i === 1 ? RQX.accentFg : RQX.fgDim,
                  border: `1px solid ${i === 1 ? RQX.accent : RQX.line}`,
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 12,
                  opacity: step >= 3 ? 1 : 0,
                  transform: step >= 3 ? "translateY(0)" : "translateY(8px)",
                  transition: `all 0.4s ${i * 80}ms ease`,
                }}
              >
                <div
                  className="font-geist-mono"
                  style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}
                >
                  {d.split(" ")[0]}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{d.split(" ")[1]}</div>
              </div>
            ))}
          </div>

          {/* Step 4 — time slot input */}
          <div style={{ marginTop: 14, minHeight: 44 }}>
            <div
              style={{
                padding: "12px 14px",
                background: RQX.bgRaised,
                borderRadius: 10,
                border: `1px solid ${RQX.line}`,
                fontSize: 13,
                color: RQX.fgDim,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: step >= 4 ? 1 : 0,
                transform: step >= 4 ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.4s ease",
              }}
            >
              <span>2:30 PM · 60 min fitting</span>
              <span style={{ color: RQX.muted, fontSize: 11 }}>tailor: Aisha</span>
            </div>
          </div>

          {/* Step 5 — CTA */}
          <div style={{ marginTop: 14, minHeight: 44 }}>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: step >= 5 ? RQX.accent : RQX.bgRaised,
                color: step >= 5 ? RQX.accentFg : RQX.muted,
                border: step >= 5 ? "none" : `1px solid ${RQX.line}`,
                fontWeight: 600,
                fontSize: 13.5,
                textAlign: "center",
                transition: "all 0.4s ease",
                opacity: step >= 5 ? 1 : 0.4,
                transform: step >= 5 ? "scale(1)" : "scale(0.98)",
                boxShadow:
                  step >= 5
                    ? `0 12px 24px -8px color-mix(in oklab, ${RQX.accent} 50%, transparent)`
                    : "none",
              }}
            >
              {step >= 5 ? "Confirm booking →" : "…"}
            </div>
          </div>

          {/* Step 6 — shipped badge */}
          {step >= 6 && (
            <div
              className="font-geist-mono"
              style={{
                position: "absolute",
                top: -14,
                right: -14,
                background: RQX.fg,
                color: RQX.bg,
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 10,
                letterSpacing: "0.08em",
                animation: "rqx-pop 0.4s cubic-bezier(.2,1.4,.4,1) both",
              }}
            >
              SHIPPED ✓
            </div>
          )}
        </div>

        {/* Animated cursor */}
        <div
          style={{
            position: "absolute",
            left: cursorPos(step).x,
            top: cursorPos(step).y,
            transition: "all 0.7s cubic-bezier(.4,.1,.2,1)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 3 L4 19 L9 14 L12 21 L15 20 L11.5 13 L18 13 Z"
              fill={RQX.fg}
              stroke={RQX.bg}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-geist-mono"
            style={{
              position: "absolute",
              top: 22,
              left: 14,
              background: RQX.accent,
              color: RQX.accentFg,
              padding: "3px 8px",
              borderRadius: 6,
              fontSize: 10,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              opacity: step > 0 && step < 6 ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          >
            {cursorLabel(step)}
          </span>
        </div>
      </div>
    </div>
  )
}

function cursorPos(step: number) {
  const positions = [
    { x: 60, y: 110 }, // 0 idle
    { x: 130, y: 76 }, // 1 title
    { x: 140, y: 118 }, // 2 subhead
    { x: 250, y: 164 }, // 3 chips
    { x: 220, y: 232 }, // 4 time
    { x: 250, y: 280 }, // 5 button
    { x: 320, y: 50 }, // 6 ship
  ]
  return positions[step] ?? positions[0]
}

function cursorLabel(step: number) {
  return ["", "add title", "subhead", "date chips", "time slot", "CTA", ""][step] ?? ""
}
