"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion"
import { STAGE_COUNT, copyOnRight, sideAt } from "./hero-timeline"
import { WorkflowHero } from "./workflow-hero"

const HEADER = 72

const STAGES = ["Experimenting", "Find the fit", "Put it to work", "Start small"] as const
const SCRIM = "color-mix(in_srgb,var(--void)_88%,transparent)_0%,color-mix(in_srgb,var(--void)_62%,transparent)_34%,transparent_56%"

const wrap = "mx-auto w-[min(1240px,calc(100%-2.5rem))] md:w-[min(1240px,calc(100%-4rem))]"
const muted = "text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]"

/**
 * The homepage hero. On wide screens without a reduced-motion preference the
 * hero pins while the copy steps through four stages and the workflow scene
 * follows the same scroll. Otherwise it is an ordinary static hero.
 */
export function HeroStory() {
  const track = useRef<HTMLElement>(null)
  const progress = useMotionValue(0)
  // The scene and the copy swap sides at each stage; the scrim follows the copy.
  const side = useTransform(progress, sideAt)
  const leftScrim = useTransform(side, (value) => 1 - value)
  const [pinned, setPinned] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)")
    const update = () => setPinned(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!pinned || !el) {
      progress.set(0)
      return
    }
    const onScroll = () => {
      const range = el.offsetHeight - (window.innerHeight - HEADER)
      const travelled = HEADER - el.getBoundingClientRect().top
      progress.set(Math.min(1, Math.max(0, travelled / Math.max(range, 1))))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pinned, progress])

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(STAGES.length - 1, Math.floor(value * STAGES.length))
    if (next !== stage) setStage(next)
  })

  function scrollToStage(index: number) {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER
    const range = el.offsetHeight - (window.innerHeight - HEADER)
    // Land where that stage's animation has finished.
    window.scrollTo({ top: top + range * ((index + 0.8) / STAGES.length), behavior: "smooth" })
  }

  return (
    <section
      ref={track}
      aria-label="Introduction"
      className="relative bg-[var(--void)] lg:motion-safe:h-[400svh]"
    >
      <div className="hero-stage lg:motion-safe:sticky lg:motion-safe:top-[72px] lg:motion-safe:h-[calc(100svh-72px)]">
        <div className="aurora" aria-hidden="true" />
        <WorkflowHero progress={progress} />
        {/* Keeps the copy legible while pieces of the scene pass behind it. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: leftScrim }}
          className={`pointer-events-none absolute inset-0 z-[2] hidden bg-[linear-gradient(90deg,${SCRIM})] lg:block`}
        />
        <motion.div
          aria-hidden="true"
          style={{ opacity: side }}
          className={`hero-scrim-right pointer-events-none absolute inset-0 z-[2] hidden bg-[linear-gradient(270deg,${SCRIM})] lg:block`}
        />
        <div
          className={`${wrap} relative z-10 grid items-center gap-12 pb-16 pt-14 lg:grid-cols-12 lg:pb-24 lg:pt-20 lg:motion-safe:h-full lg:motion-safe:py-0`}
        >
          <div className="grid lg:col-span-6">
            <StageCopy index={0} stage={stage} progress={progress} pinned={pinned}>
              <IntroCopy />
            </StageCopy>
            <StageCopy index={1} stage={stage} progress={progress} pinned={pinned}>
              <StageBlock
                title={<>Find where it <Accent>fits.</Accent></>}
                body="Most teams already have AI in a few places. We look at the work people repeat (enquiries, documents, records) and choose the one connection worth making first."
              />
            </StageCopy>
            <StageCopy index={2} stage={stage} progress={progress} pinned={pinned}>
              <StageBlock
                title={<>Put it to work, <Accent>with control.</Accent></>}
                body="An enquiry arrives, a draft is prepared from approved information, and a person on your team checks it before anything reaches the customer."
              />
            </StageCopy>
            <StageCopy index={3} stage={stage} progress={progress} pinned={pinned}>
              <StageBlock
                title={<>A practical place to <Accent>start.</Accent></>}
                body="One workflow, one approver, one measure. Then decide together what earns the next step."
              >
                <CallsToAction />
              </StageBlock>
            </StageCopy>
          </div>
          {/* Empty column the 3D scene measures to place the settled workflow. */}
          <div className="hidden self-stretch lg:col-span-6 lg:block" data-hero-anchor aria-hidden="true" />
        </div>
        {pinned ? <StageRail stage={stage} progress={progress} onSelect={scrollToStage} /> : null}
      </div>
    </section>
  )
}

function StageCopy({
  index,
  stage,
  progress,
  pinned,
  children,
}: {
  index: number
  stage: number
  progress: MotionValue<number>
  pinned: boolean
  children: ReactNode
}) {
  // Each block fades in at the start of its slice and out at the end. The
  // first starts visible; the last one stays.
  const n = STAGE_COUNT
  const start = index / n
  const end = (index + 1) / n
  const first = index === 0
  const last = index === n - 1
  const input = first ? [0, end - 0.05, end] : last ? [start, start + 0.08, 1] : [start, start + 0.08, end - 0.05, end]
  const opacity = useTransform(progress, input, first ? [1, 0.9, 0] : last ? [0, 1, 1] : [0, 1, 1, 0])
  const y = useTransform(progress, input, first ? [0, -28, -56] : last ? [40, 8, 0] : [40, 8, -8, -40])

  if (!pinned && !first) return null

  const active = !pinned || index === stage
  // Copy on the right shifts across one column plus the gap, once the scene is live.
  return (
    <div className="hero-copy [grid-area:1/1] self-center" data-side={copyOnRight(index) ? "right" : "left"}>
      <motion.div
        inert={!active}
        style={pinned ? { opacity, y } : undefined}
        className={active ? "" : "pointer-events-none"}
      >
        {children}
      </motion.div>
    </div>
  )
}

function IntroCopy() {
  return (
    <div>
      <h1 className="font-serif-display m-0 text-[clamp(2.8rem,5.6vw,5.6rem)] font-light leading-[0.94] tracking-[-0.03em] text-[var(--chalk)]">
        <span className="block">Better customer</span>
        <Accent className="block">experiences.</Accent>
        <span className="block">Less repetitive work.</span>
      </h1>
      <p className={`mb-0 mt-7 max-w-[34rem] text-lg leading-relaxed ${muted}`}>
        We help SMEs turn scattered AI experimentation into practical improvements: finding the right opportunities, building useful solutions and helping teams adopt them.
      </p>
      <div className="mt-8">
        <CallsToAction />
      </div>
    </div>
  )
}

function Accent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`italic text-[var(--signal)] ${className}`}>{children}</span>
}

function StageBlock({ title, body, children }: { title: ReactNode; body: string; children?: ReactNode }) {
  return (
    <div>
      <h2 className="font-serif-display m-0 max-w-[13ch] text-[clamp(2.6rem,4.8vw,4.9rem)] font-light leading-[0.96] tracking-[-0.03em] text-[var(--chalk)]">
        {title}
      </h2>
      <p className={`mb-0 mt-7 max-w-[34rem] text-lg leading-relaxed ${muted}`}>{body}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  )
}

function CallsToAction() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/ai-opportunity-review" className="btn-signal">
        Talk through the problem
      </Link>
      <Link href="/case-studies" className="btn-line">
        Explore our work
      </Link>
    </div>
  )
}

function StageRail({
  stage,
  progress,
  onSelect,
}: {
  stage: number
  progress: MotionValue<number>
  onSelect: (index: number) => void
}) {
  return (
    <nav aria-label="Hero progress" className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
      <ol className="m-0 grid w-56 list-none grid-cols-4 gap-2 p-0">
        {STAGES.map((label, index) => (
          <li key={label} className="min-w-0">
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={index === stage ? "step" : undefined}
              aria-label={label}
              className="flex min-h-11 w-full cursor-pointer flex-col justify-center bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
            >
              <RailFill index={index} progress={progress} />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function RailFill({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const n = STAGES.length
  // Stage one starts full so the first segment never reads as empty.
  const scaleX = useTransform(progress, [index / n, (index + 0.75) / n], [index === 0 ? 1 : 0, 1])
  return (
    <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--chalk)_14%,transparent)]">
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-[var(--signal)]" />
    </span>
  )
}
