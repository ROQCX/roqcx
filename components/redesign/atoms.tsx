"use client"

import * as React from "react"

// ──────────────────────────────────────────────────────────────────────
// Design tokens — exposed as inline styles, sourced from CSS variables.
// CSS vars are defined in app/globals.css under :root and .dark.
export const RQX = {
  bg: "var(--rqx-bg)",
  bgRaised: "var(--rqx-bg-raised)",
  bgCard: "var(--rqx-bg-card)",
  line: "var(--rqx-line)",
  lineDim: "var(--rqx-line-dim)",
  fg: "var(--rqx-fg)",
  fgDim: "var(--rqx-fg-dim)",
  muted: "var(--rqx-muted)",
  accent: "var(--rqx-accent)",
  accentSoft: "var(--rqx-accent-soft)",
  accentFg: "var(--rqx-accent-fg)",
  accent2: "var(--rqx-accent2)",
  accent3: "var(--rqx-accent3)",
  green: "var(--rqx-green)",
} as const

// ──────────────────────────────────────────────────────────────────────
// Section wrapper — pulls the section out of the layout container so it
// spans the full viewport width and applies the redesign palette.
export function FullBleedSection({
  children,
  style,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...rest}
      className={`rqx-fullbleed ${className ?? ""}`}
      style={{
        background: RQX.bg,
        color: RQX.fg,
        ...style,
      }}
    >
      {children}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Tag pill — small label, optional accent dot.
export function Tag({
  children,
  dot = true,
}: {
  children: React.ReactNode
  dot?: boolean
}) {
  return (
    <span
      className="font-geist-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: RQX.fgDim,
        padding: "6px 12px",
        border: `1px solid ${RQX.line}`,
        borderRadius: 999,
        background: RQX.bgRaised,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: RQX.accent,
            boxShadow: `0 0 12px ${RQX.accent}`,
          }}
        />
      )}
      {children}
    </span>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Section header — kicker + serif title + lede in 2-col grid (collapses on mobile).
export function SectionHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string
  title: React.ReactNode
  lede?: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
        gap: 56,
        marginBottom: 48,
      }}
      className="rqx-section-header"
    >
      <div>
        <Tag>{kicker}</Tag>
      </div>
      <div>
        <h2
          className="font-serif-display"
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            color: RQX.fg,
          }}
        >
          {title}
        </h2>
        {lede && (
          <p
            style={{
              margin: 0,
              maxWidth: 620,
              fontSize: 16.5,
              lineHeight: 1.55,
              color: RQX.fgDim,
            }}
          >
            {lede}
          </p>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Marquee — horizontal autoscrolling pill of strings.
export function Marquee({
  items,
  speed = 40,
}: {
  items: string[]
  speed?: number
}) {
  const text = items.join("   ·   ")
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: `1px solid ${RQX.lineDim}`,
        borderBottom: `1px solid ${RQX.lineDim}`,
        padding: "14px 0",
        background: RQX.bgRaised,
        fontSize: 12,
        color: RQX.fgDim,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
      className="font-geist-mono"
    >
      <div
        style={{
          display: "flex",
          gap: 64,
          whiteSpace: "nowrap",
          animation: `rqx-marquee ${speed}s linear infinite`,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// useScrambled — crypto-style flicker through a list of words.
export function useScrambled(
  words: string[],
  { interval = 2400, scrambleDur = 700 }: { interval?: number; scrambleDur?: number } = {},
) {
  const [idx, setIdx] = React.useState(0)
  const [display, setDisplay] = React.useState(words[0])

  React.useEffect(() => {
    let frame: number | null = null
    let timeout: ReturnType<typeof setTimeout> | null = null
    const next = (idx + 1) % words.length
    const target = words[next]
    const start = performance.now()
    const len = Math.max(words[idx].length, target.length)
    const chars = "!<>-_\\/[]{}—=+*^?#________"

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / scrambleDur)
      let out = ""
      for (let i = 0; i < len; i++) {
        const reveal = t * len > i
        if (reveal) out += target[i] ?? ""
        else out += chars[Math.floor(Math.random() * chars.length)]
      }
      setDisplay(out.trimEnd())
      if (t < 1) frame = requestAnimationFrame(tick)
      else {
        setDisplay(target)
        timeout = setTimeout(() => setIdx(next), interval - scrambleDur)
      }
    }
    timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, interval - scrambleDur)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      if (timeout !== null) clearTimeout(timeout)
    }
  }, [idx, words, interval, scrambleDur])

  return display
}

// ──────────────────────────────────────────────────────────────────────
// useReveal + Reveal — fade/translate-up children when scrolled into view.
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T | null>(null)
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown] as const
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const [ref, shown] = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s ${delay}ms cubic-bezier(.2,.7,.2,1), transform 0.7s ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// GridBg — decorative grid lines, masked to a radial vignette.
export function GridBg({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        backgroundImage: `
          linear-gradient(${RQX.line} 1px, transparent 1px),
          linear-gradient(90deg, ${RQX.line} 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 80%)",
      }}
    />
  )
}
