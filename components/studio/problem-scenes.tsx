"use client"

// Four small looping scenes for "Start with a problem worth solving". Each one
// steps through a timeline while it is on screen. Under reduced motion, or
// before hydration, every scene rests on its finished state.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react"
import { Bar, C, G, Sheet } from "./illustrations"

/** Advances through `durations` while the scene is visible; otherwise rests on `final`. */
function useTimeline(durations: readonly number[], final: number) {
  const ref = useRef<SVGSVGElement>(null)
  const [step, setStep] = useState(final)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer: number | undefined
    let current = 0
    let running = false
    const tick = () => {
      setStep(current)
      timer = window.setTimeout(() => {
        current = (current + 1) % durations.length
        tick()
      }, durations[current])
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          tick()
        } else if (!entry.isIntersecting && running) {
          running = false
          window.clearTimeout(timer)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [durations])

  return [ref, step] as const
}

const fade = (on: boolean, delay = 0): CSSProperties => ({ opacity: on ? 1 : 0, transitionDelay: `${delay}ms` })
const grow = (on: boolean, delay = 0): CSSProperties => ({ transform: `scaleX(${on ? 1 : 0})`, transitionDelay: `${delay}ms` })
const pop = (on: boolean, delay = 0): CSSProperties => ({ opacity: on ? 1 : 0, transform: `scale(${on ? 1 : 0.5})`, transitionDelay: `${delay}ms` })
const shift = (x: number, y: number, delay = 0): CSSProperties => ({ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${delay}ms` })

function Scene({ label, svgRef, children }: { label: string; svgRef: Ref<SVGSVGElement>; children: ReactNode }) {
  return (
    <svg ref={svgRef} viewBox="0 0 480 280" className="ps block h-auto w-full" role="img" aria-label={label} fontFamily="inherit">
      {children}
    </svg>
  )
}

function Check({ cx, cy, r = 14, style }: { cx: number; cy: number; r?: number; style?: CSSProperties }) {
  return (
    <g className="ps-pop" style={style}>
      <circle cx={cx} cy={cy} r={r} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
      <G name="check" x={cx - r * 0.6} y={cy - r * 0.6} size={r * 1.2} color={C.ink} width={2.25} />
    </g>
  )
}

function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 0 L0 20 L5.5 14.5 L9.5 23.5 L13 22 L9 13 L16 13 Z"
      fill={C.ink}
      stroke={C.chalk}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  )
}

/* ───────────── 1. Enquiries from everywhere → one drafted reply ───────────── */

const replyTimeline = [600, 250, 900, 450, 1100, 750, 2800] as const

export function ReplyScene() {
  const [ref, step] = useTimeline(replyTimeline, 6)
  const sources = [
    { icon: "mail", label: "Email", cy: 67 },
    { icon: "chat", label: "Chat", cy: 140 },
    { icon: "form", label: "Web form", cy: 213 },
  ] as const
  const lines = [
    { w: 120, fill: C.ink },
    { w: 132, fill: C.rule },
    { w: 96, fill: C.rule },
  ]
  return (
    <Scene svgRef={ref} label="Enquiries from email, chat and a web form are sorted into one drafted reply, which a person sends.">
      {sources.map((s) => (
        <line key={s.label} x1={136} y1={s.cy} x2={238} y2={140} stroke={C.soft} strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="3 5" />
      ))}
      {sources.map((s) => (
        <Sheet key={s.label} x={18} y={s.cy - 21} w={118} h={42} r={12}>
          <G name={s.icon} x={30} y={s.cy - 10} size={20} />
          <text x={60} y={s.cy + 5} fontSize="14" fill={C.ink}>{s.label}</text>
        </Sheet>
      ))}
      {sources.map((s, i) => (
        <g key={`t-${s.label}`} className="ps-t" style={{ ...fade(step >= 1 && step < 3), ...shift(step >= 2 && step < 6 ? 102 : 0, step >= 2 && step < 6 ? 140 - s.cy : 0, step === 2 ? i * 120 : 0) }}>
          <circle cx={136} cy={s.cy} r={6} fill={C.clay} stroke={C.chalk} strokeWidth={2} />
        </g>
      ))}

      <circle cx={238} cy={140} r={46} fill={C.signal} className="ps-pop" style={{ ...pop(step >= 3), opacity: step >= 3 ? 0.35 : 0 }} />
      <circle cx={238} cy={140} r={30} fill={C.forest} />
      <G name="sort" x={226} y={128} size={24} color={C.signal} width={2} />
      <path d="M268 140 H300" stroke={C.forest} strokeWidth={2} className="ill-march" />

      <Sheet x={300} y={42} w={162} h={200} r={14}>
        <G name="doc" x={314} y={56} size={18} />
        <text x={340} y={70} fontSize="13" fontWeight="600" fill={C.ink}>Draft reply</text>
        <path d="M300 86 H462" stroke={C.rule} strokeWidth={1.5} />
        {lines.map((l, i) => (
          <g key={l.w} className="ps-grow" style={grow(step >= 4, i * 180)}>
            <Bar x={316} y={102 + i * 16} w={l.w} h={7} fill={l.fill} />
          </g>
        ))}
        <g className="ps-t" style={fade(step >= 4, 600)}>
          <rect x={316} y={156} width={100} height={20} rx={10} fill={C.forest} fillOpacity={0.1} />
          <text x={366} y={170} textAnchor="middle" fontSize="11" fill={C.forest}>approved info</text>
        </g>
        <rect x={316} y={196} width={64} height={30} rx={8} className="ps-fill" style={{ fill: step >= 6 ? C.signal : C.forest, stroke: C.ink, strokeWidth: step >= 6 ? 1.5 : 0 }} />
        <text x={348} y={215} textAnchor="middle" fontSize="13" className="ps-fill" style={{ fill: step >= 6 ? C.ink : C.chalk }}>Send</text>
        <rect x={386} y={196} width={62} height={30} rx={8} fill="none" stroke={C.ink} strokeWidth={1.25} />
        <text x={417} y={215} textAnchor="middle" fontSize="13" fill={C.ink}>Edit</text>
      </Sheet>
      <g className="ps-t" style={shift(step >= 5 ? -66 : 0, step >= 5 ? -34 : 0)}>
        <Cursor x={440} y={252} />
      </g>
      <Check cx={460} cy={44} style={pop(step >= 6, 150)} />
    </Scene>
  )
}

/* ───────────── 2. Fields retyped by hand → pulled across ───────────── */

const retypeTimeline = [600, 250, 1100, 300, 900, 800, 2800] as const

export function RetypeScene() {
  const [ref, step] = useTimeline(retypeTimeline, 6)
  const fields = [110, 86, 120, 70]
  return (
    <Scene svgRef={ref} label="The agreed fields are read from a document and filled into the system you already use, and a person checks them.">
      <Sheet x={20} y={28} w={168} h={224} r={10}>
        <G name="doc" x={34} y={42} size={18} />
        <text x={60} y={56} fontSize="13" fontWeight="600" fill={C.ink}>Invoice.pdf</text>
        <path d="M20 70 H188" stroke={C.rule} strokeWidth={1.5} />
        {fields.map((w, i) => {
          const y = 88 + i * 40
          return (
            <g key={w}>
              <rect x={30} y={y + 8} width={w + 8} height={18} rx={4} fill={C.signal} className="ps-t" style={fade(step >= 2, i * 220)} />
              <Bar x={34} y={y} w={44} h={6} />
              <Bar x={34} y={y + 12} w={w} h={10} fill={C.ink} />
            </g>
          )
        })}
      </Sheet>
      <g className="ps-scan" style={{ ...fade(step >= 1 && step < 3), ...shift(0, step >= 2 && step < 6 ? 160 : 0) }}>
        <rect x={24} y={80} width={160} height={3} rx={1.5} fill={C.forest} />
        <rect x={24} y={72} width={160} height={10} fill={C.forest} opacity={0.08} />
      </g>

      <path d="M198 140 H262" stroke={C.forest} strokeWidth={2} className="ill-march" />

      <Sheet x={272} y={48} w={190} h={184} r={12}>
        <path d="M284 48 H450 a12 12 0 0 1 12 12 V82 H272 V60 a12 12 0 0 1 12 -12 z" fill={C.forest} />
        <text x={288} y={70} fontSize="13" fill={C.chalk}>Your system</text>
        {fields.map((w, i) => {
          const y = 94 + i * 34
          return (
            <g key={w}>
              <Bar x={286} y={y + 9} w={40} h={6} />
              <rect x={338} y={y} width={112} height={24} rx={6} fill={C.paper} stroke={C.rule} strokeWidth={1.25} />
              <g className="ps-grow" style={grow(step >= 5, i * 160)}>
                <Bar x={346} y={y + 8} w={w * 0.62} h={8} fill={C.ink} />
              </g>
              <g className="ps-pop" style={pop(step >= 6, i * 140)}>
                <G name="check" x={428} y={y + 4} size={16} color={C.forest} width={2.25} />
              </g>
            </g>
          )
        })}
      </Sheet>
      {fields.map((w, i) => {
        const dx = 346 - 34
        const dy = 94 + i * 34 + 5 - (88 + i * 40 + 10)
        const moved = step >= 4 && step < 6
        return (
          <g key={`chip-${w}`} className="ps-t" style={{ ...fade(step >= 3 && step < 5), ...shift(moved ? dx : 0, moved ? dy : 0, step === 4 ? i * 140 : 0) }}>
            <rect x={34} y={88 + i * 40 + 10} width={58} height={14} rx={7} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
          </g>
        )
      })}
      <g className="ps-pop" style={pop(step >= 6, 650)}>
        <circle cx={448} cy={238} r={20} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
        <G name="person" x={438} y={228} size={20} color={C.ink} />
      </g>
    </Scene>
  )
}

/* ───────────── 3. The answer only one person knows → search approved sources ───────────── */

const searchTimeline = [600, 1100, 200, 1150, 700, 2800] as const

export function SearchScene() {
  const [ref, step] = useTimeline(searchTimeline, 5)
  const match = 3
  return (
    <Scene svgRef={ref} label="A question is searched across the documents the team approved, and the answer is found with its source.">
      <Sheet x={24} y={22} w={432} h={48} r={24}>
        <G name="search" x={42} y={36} size={20} />
        <text x={74} y={51} fontSize="14" fill={C.ink}>How do we handle a late refund?</text>
        <rect x={70} y={32} width={236} height={28} fill={C.chalk} className="ps-type" style={{ transform: `scaleX(${step >= 1 ? 0 : 1})` }} />
        <rect x={376} y={30} width={70} height={32} rx={16} fill={C.forest} />
        <text x={411} y={51} textAnchor="middle" fontSize="13" fill={C.chalk}>Ask</text>
      </Sheet>

      {[0, 1, 2, 3, 4].map((i) => {
        const x = 30 + i * 86
        const isMatch = i === match
        const settled = step >= 4
        return (
          <g key={i} className="ps-t" style={{ ...shift(0, settled && isMatch ? -8 : 0), opacity: settled && !isMatch ? 0.4 : 1 }}>
            <Sheet x={x} y={100} w={72} h={94} r={8} stroke={settled && isMatch ? C.forest : C.ink}>
              <rect x={x + 10} y={112} width={30} height={6} rx={3} fill={isMatch ? C.forest : C.clay} opacity={isMatch ? 1 : 0.6} />
              <Bar x={x + 10} y={128} w={52} h={5} />
              <Bar x={x + 10} y={140} w={44} h={5} />
              <Bar x={x + 10} y={152} w={50} h={5} />
              <Bar x={x + 10} y={164} w={30} h={5} />
            </Sheet>
          </g>
        )
      })}
      <g className="ps-sweep" style={{ ...fade(step >= 2 && step < 4), ...shift(step >= 3 && step < 5 ? 344 : 0, 0) }}>
        <rect x={22} y={92} width={88} height={112} rx={12} fill={C.signal} opacity={0.4} />
      </g>

      <path d="M324 196 V218" stroke={C.forest} strokeWidth={2} className="ps-t" style={fade(step >= 5)} />
      <g className="ps-pop" style={pop(step >= 5)}>
        <Sheet x={150} y={218} w={300} h={46} r={14} fill={C.forest} stroke={C.forest}>
          <G name="check" x={166} y={232} size={18} color={C.signal} width={2.25} />
          <text x={194} y={246} fontSize="13" fill={C.chalk}>Refund policy · approved source</text>
        </Sheet>
      </g>
    </Scene>
  )
}

/* ───────────── 4. Requests that stall → routed with context ───────────── */

const routeTimeline = [600, 300, 700, 900, 600, 2800] as const
const RING = 2 * Math.PI * 20

export function RouteScene() {
  const [ref, step] = useTimeline(routeTimeline, 5)
  const lanes = [
    { label: "Sales", cy: 62, queued: true },
    { label: "Support", cy: 142, queued: false },
    { label: "Finance", cy: 222, queued: true },
  ]
  const target = 1
  const lit = step >= 3
  return (
    <Scene svgRef={ref} label="A request is routed to the right queue with its context attached, and the owner approves it.">
      <Sheet x={18} y={112} w={110} h={60} r={10}>
        <G name="mail" x={30} y={124} size={18} />
        <text x={56} y={137} fontSize="13" fontWeight="600" fill={C.ink}>Request</text>
        <Bar x={30} y={150} w={78} h={6} />
      </Sheet>

      {lanes.map((lane, i) => (
        <path
          key={lane.label}
          d={`M266 142 C 284 142, 282 ${lane.cy}, 300 ${lane.cy}`}
          fill="none"
          stroke={lit && i === target ? C.forest : C.soft}
          strokeOpacity={lit && i === target ? 1 : 0.35}
          strokeWidth={lit && i === target ? 2.5 : 1.5}
          strokeDasharray={lit && i === target ? undefined : "3 5"}
        />
      ))}
      <path d="M128 142 H210" stroke={C.soft} strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="3 5" />

      <circle cx={238} cy={142} r={28} fill={C.forest} />
      <G name="handoff" x={226} y={130} size={24} color={C.signal} width={2} />

      {lanes.map((lane, i) => {
        const active = step >= 4 && i === target
        return (
          <g key={lane.label}>
            <rect x={300} y={lane.cy - 28} width={164} height={56} rx={12} stroke={C.ink} strokeWidth={1.5} className="ps-fill" style={{ fill: active ? C.signal : C.chalk }} />
            <G name="person" x={314} y={lane.cy - 9} size={18} />
            <text x={340} y={lane.cy + 5} fontSize="14" fill={C.ink}>{lane.label}</text>
            {lane.queued && <rect x={420} y={lane.cy - 10} width={30} height={20} rx={5} fill={C.paper} stroke={C.rule} strokeWidth={1.25} />}
          </g>
        )
      })}

      <g className="ps-t" style={{ opacity: step >= 1 ? 1 : 0, transform: `translateX(${step >= 3 ? 290 : step >= 2 ? 92 : 0}px)`, transition: step === 0 ? "opacity 300ms ease, transform 0ms 320ms" : step === 3 ? "opacity 450ms ease, transform 850ms cubic-bezier(0.65, 0, 0.35, 1)" : undefined }}>
        <rect x={130} y={132} width={30} height={20} rx={5} fill={C.chalk} stroke={C.ink} strokeWidth={1.25} />
        <path d="M152 128 v8 a3 3 0 0 1 -6 0 v-6" fill="none" stroke={C.clay} strokeWidth={1.5} strokeLinecap="round" />
        <Bar x={135} y={140} w={14} h={4} fill={C.ink} />
      </g>
      <Check cx={462} cy={114} r={12} style={pop(step >= 5)} />

      <circle cx={52} cy={232} r={20} fill="none" stroke={C.rule} strokeWidth={5} />
      <circle
        cx={52}
        cy={232}
        r={20}
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={RING}
        transform="rotate(-90 52 232)"
        className="ps-ring"
        style={{ strokeDashoffset: step >= 1 ? RING * 0.72 : RING, stroke: step >= 5 ? C.forest : C.clay }}
      />
      <text x={82} y={237} fontSize="13" fill={C.soft}>time to act</text>
    </Scene>
  )
}
