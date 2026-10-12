"use client"

import { useEffect, useRef, useState } from "react"

// Before and after a single checkpoint: five inputs arrive as knotted,
// out-of-step threads; a person checks the work; it leaves as calm parallel
// lines with a steady rhythm into one finished step. Native SVG animation
// (SMIL), paused offscreen; reduced motion shows the same picture, still.

const C = {
  void: "#0c0f0d",
  chalk: "#fffdf8",
  signal: "#d6ff4a",
  clay: "#c4512f",
  forest: "#17362c",
}

const icons = {
  mail: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M2 7l10 7 10-7",
  chat: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  form: "M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M7 8h10 M7 12h10 M7 16h5",
  grid: "M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M2 9h20 M2 15h20 M9 3v18 M16 3v18",
  doc: "M5 2h10l5 5v15H5z M15 2v5h5 M8 12h8 M8 16h8",
  person: "M16 8a4 4 0 1 1-8 0a4 4 0 1 1 8 0z M4 22c0-4.5 3.6-8 8-8s8 3.5 8 8",
}

const W = 640
const H = 480
const MID = 240

const SOURCE_X = 44
const GATE = { x: 316, y: 130, w: 52, h: 220 }
const NODE = { x: 586, r: 34 }

const inputs = [
  { icon: "mail", y: 64, seed: 5, offset: 0 },
  { icon: "chat", y: 152, seed: 17, offset: 2.6 },
  { icon: "form", y: 240, seed: 31, offset: 4.3 },
  { icon: "grid", y: 328, seed: 43, offset: 1.3 },
  { icon: "doc", y: 416, seed: 59, offset: 3.5 },
] as const

const ports = inputs.map((_, index) => MID + (index - 2) * 30)

function random(seed: number) {
  let t = seed
  return () => {
    t = (t * 16807) % 2147483647
    return t / 2147483647
  }
}

const n = (value: number) => Math.round(value * 10) / 10

/** A knotted thread from an input to its port on the checkpoint. */
function tangle(fromY: number, toY: number, seed: number) {
  const rand = random(seed)
  const x0 = SOURCE_X + 26
  const x3 = GATE.x
  const xa = x0 + (x3 - x0) * 0.36
  const xb = x0 + (x3 - x0) * 0.7
  const ya = 140 + rand() * 200
  const yb = 160 + rand() * 160
  const s = rand() > 0.5 ? 1 : -1
  const loop = () => 55 + rand() * 55
  return [
    `M${x0} ${fromY}`,
    `C${n(x0 + 70)} ${n(fromY + s * loop())}, ${n(xa + 70)} ${n(ya - s * loop())}, ${n(xa)} ${n(ya)}`,
    `C${n(xa - 80)} ${n(ya + s * loop())}, ${n(xb - 120)} ${n(yb + s * loop())}, ${n(xb)} ${n(yb)}`,
    `C${n(xb + 90)} ${n(yb - s * loop())}, ${n(x3 - 60)} ${n(toY)}, ${x3} ${toY}`,
  ].join(" ")
}

/** A calm line from the checkpoint into the finished step. */
function settled(fromY: number) {
  const x0 = GATE.x + GATE.w
  const x1 = NODE.x - NODE.r - 2
  return `M${x0} ${fromY} C${x0 + 70} ${fromY}, ${x1 - 90} ${MID}, ${x1} ${MID}`
}

const threads = inputs.map((input, index) => ({
  ...input,
  before: tangle(input.y, ports[index], input.seed),
  after: settled(ports[index]),
}))

// One journey per thread: along the knot, through the checkpoint, along the
// calm line, land, then the trail fades before the next run.
const CYCLE = 6
const T = { knotted: 0.52, through: 0.6, landed: 0.86 }
const timing = { dur: `${CYCLE}s`, repeatCount: "indefinite" } as const

function Icon({ d, x, y, size, color, width = 1.75 }: { d: string; x: number; y: number; size: number; color: string; width?: number }) {
  return (
    <path
      d={d}
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      stroke={color}
      strokeWidth={(width * 24) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  )
}

export function UntangleArt({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setStill(motion.matches)
    update()
    motion.addEventListener("change", update)
    return () => motion.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || still) return
    svg.pauseAnimations()
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [still])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={className ?? "block h-auto w-full"}
      aria-hidden="true"
      fill="none"
      overflow="visible"
    >
      <defs>
        <radialGradient id="untangle-glow">
          <stop offset="0" stopColor={C.signal} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.signal} stopOpacity="0" />
        </radialGradient>
        <pattern id="untangle-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={C.chalk} opacity="0.1" />
        </pattern>
      </defs>

      {/* After: an ordered field behind the calm side only. */}
      <rect x={GATE.x + GATE.w / 2} y="40" width={W - GATE.x - GATE.w / 2} height={H - 80} fill="url(#untangle-dots)" />

      {/* Ghost routes keep the structure readable between runs. */}
      {threads.map((thread) => (
        <g key={`ghost-${thread.icon}`}>
          <path d={thread.before} stroke={C.clay} strokeOpacity={still ? 0.85 : 0.14} strokeWidth="1.5" strokeLinecap="round" />
          <path d={thread.after} stroke={C.signal} strokeOpacity={still ? 0.9 : 0.12} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Each signal drags its line along behind it, orange then lime. */}
      {still
        ? null
        : threads.map((thread) => {
            const begin = `-${thread.offset}s`
            const fade = `0;${T.landed};${T.landed + 0.08};1`
            return (
              <g key={`run-${thread.icon}`}>
                <path d={thread.before} pathLength={1} stroke={C.clay} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 1">
                  <animate attributeName="stroke-dashoffset" {...timing} begin={begin} keyTimes={`0;${T.knotted};1`} values="1;0;0" />
                  {/* The knot lets go once its signal is through the checkpoint. */}
                  <animate attributeName="opacity" {...timing} begin={begin} keyTimes={`0;${T.knotted};${T.through + 0.06};1`} values="1;1;0;0" />
                </path>
                <path d={thread.after} pathLength={1} stroke={C.signal} strokeWidth="2.75" strokeLinecap="round" strokeDasharray="1 1">
                  <animate
                    attributeName="stroke-dashoffset"
                    {...timing}
                    begin={begin}
                    keyTimes={`0;${T.through};${T.landed};1`}
                    values="1;1;0;0"
                    calcMode="spline"
                    keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
                  />
                  <animate attributeName="opacity" {...timing} begin={begin} keyTimes={fade} values="1;1;0;0" />
                </path>
                <g>
                  <animateMotion {...timing} begin={begin} path={thread.before} keyPoints="0;1;1" keyTimes={`0;${T.knotted};1`} calcMode="linear" />
                  <animate attributeName="opacity" {...timing} begin={begin} keyTimes={`0;${T.knotted};${T.knotted + 0.001};1`} values="1;1;0;0" />
                  <circle r="11" fill={C.clay} opacity="0.25" />
                  <circle r="5" fill={C.clay} />
                </g>
                <g opacity="0">
                  <animateMotion
                    {...timing}
                    begin={begin}
                    path={thread.after}
                    keyPoints="0;0;1;1"
                    keyTimes={`0;${T.through};${T.landed};1`}
                    calcMode="spline"
                    keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
                  />
                  <animate
                    attributeName="opacity"
                    {...timing}
                    begin={begin}
                    keyTimes={`0;${T.through};${T.through + 0.001};${T.landed};${T.landed + 0.001};1`}
                    values="0;0;1;1;0;0"
                  />
                  <circle r="12" fill={C.signal} opacity="0.25" />
                  <circle r="5.5" fill={C.signal} />
                </g>
              </g>
            )
          })}

      {/* Inputs. */}
      {inputs.map((input) => (
        <g key={input.icon}>
          <circle cx={SOURCE_X} cy={input.y} r="26" fill={C.void} stroke={C.chalk} strokeOpacity="0.3" />
          <Icon d={icons[input.icon]} x={SOURCE_X} y={input.y} size={22} color={C.chalk} />
        </g>
      ))}

      {/* The checkpoint: a person looks before anything moves on. */}
      <rect x={GATE.x} y={GATE.y} width={GATE.w} height={GATE.h} rx={GATE.w / 2} fill={C.chalk} />
      {ports.map((y) => (
        <circle key={y} cx={GATE.x + GATE.w / 2} cy={y} r="3" fill={C.forest} opacity="0.35" />
      ))}
      <circle cx={GATE.x + GATE.w / 2} cy={GATE.y + 34} r="17" fill={C.forest} />
      <Icon d={icons.person} x={GATE.x + GATE.w / 2} y={GATE.y + 34} size={18} color={C.chalk} width={2} />

      {/* The finished step. */}
      <circle cx={NODE.x} cy={MID} r={NODE.r * 2.6} fill="url(#untangle-glow)" />
      {/* A ring each time a signal lands. */}
      {still
        ? null
        : threads.map((thread) => (
            <circle key={`ring-${thread.icon}`} cx={NODE.x} cy={MID} r={NODE.r} stroke={C.signal} strokeWidth="2" opacity="0">
              <animate attributeName="r" {...timing} begin={`-${thread.offset}s`} keyTimes={`0;${T.landed};1`} values={`${NODE.r};${NODE.r};${NODE.r + 34}`} />
              <animate attributeName="opacity" {...timing} begin={`-${thread.offset}s`} keyTimes={`0;${T.landed};${T.landed + 0.001};1`} values="0;0;0.7;0" />
            </circle>
          ))}
      <circle cx={NODE.x} cy={MID} r={NODE.r} fill={C.signal} />
      <Icon d="M4 12.5l5 5L20 6.5" x={NODE.x} y={MID} size={30} color={C.void} width={3} />
    </svg>
  )
}
