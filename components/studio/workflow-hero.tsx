"use client"

import type { MotionValue } from "framer-motion"
import { useEffect, useRef, useState, type ComponentType } from "react"
import type { SceneState, WorkflowSceneProps } from "./workflow-scene"

function hasWebGL() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl"))
  } catch {
    return false
  }
}

/**
 * Decorative 3D backdrop for the homepage hero. It loads only on wide
 * screens with WebGL and without a reduced-motion preference; otherwise the
 * hero shows its copy alone. The scene sits over `[data-hero-anchor]`;
 * `progress` comes from the hero's native-scroll story.
 */
export function WorkflowHero({ progress }: { progress: MotionValue<number> }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const state = useRef<SceneState>({
    progress: 0,
    visible: true,
    pointer: { x: 0, y: 0 },
    anchor: { x: 0, y: 0, width: 0, height: 0 },
    font: "sans-serif",
    wake: () => {},
  })
  const [enabled, setEnabled] = useState(false)
  const [Scene, setScene] = useState<ComponentType<WorkflowSceneProps> | null>(null)
  const [failed, setFailed] = useState(false)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const wide = window.matchMedia("(min-width: 1024px)")
    const webgl = hasWebGL()
    const update = () => setEnabled(webgl && wide.matches && !motion.matches)
    update()
    motion.addEventListener("change", update)
    wide.addEventListener("change", update)
    return () => {
      motion.removeEventListener("change", update)
      wide.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled || Scene || failed) return
    let cancelled = false
    Promise.all([import("./workflow-scene"), document.fonts.ready])
      .then(([mod]) => {
        if (cancelled) return
        state.current.font = getComputedStyle(document.body).fontFamily
        setScene(() => mod.WorkflowScene)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [enabled, Scene, failed])

  const mounted = enabled && Boolean(Scene) && !failed

  useEffect(() => {
    const host = hostRef.current
    const section = host?.closest<HTMLElement>(".hero-stage")
    const anchor = section?.querySelector<HTMLElement>("[data-hero-anchor]")
    if (!mounted || !section || !anchor) return

    let visible = true
    const wake = () => {
      if (visible) state.current.wake()
    }

    const measure = () => {
      const outer = section.getBoundingClientRect()
      const inner = anchor.getBoundingClientRect()
      state.current.anchor = {
        x: inner.left - outer.left,
        y: inner.top - outer.top,
        width: inner.width,
        height: inner.height,
      }
    }

    const onProgress = (value: number) => {
      state.current.progress = value
      wake()
    }

    const onPointer = (event: PointerEvent) => {
      state.current.pointer = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      }
      wake()
    }

    const resize = new ResizeObserver(() => {
      measure()
      wake()
    })
    resize.observe(section)
    resize.observe(anchor)

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      state.current.visible = visible
      wake()
    })
    intersection.observe(section)

    const finePointer = window.matchMedia("(pointer: fine)").matches
    measure()
    onProgress(progress.get())
    const unsubscribe = progress.on("change", onProgress)
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true })

    return () => {
      resize.disconnect()
      intersection.disconnect()
      unsubscribe()
      window.removeEventListener("pointermove", onPointer)
    }
  }, [mounted, progress])

  const showing = mounted && live

  useEffect(() => {
    const section = hostRef.current?.closest<HTMLElement>(".hero-stage")
    if (!section) return
    if (showing) section.dataset.scene = "live"
    else delete section.dataset.scene
  }, [showing])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="hero-scene pointer-events-none absolute inset-0 z-[1]"
      data-live={showing ? "" : undefined}
    >
      {mounted && Scene ? (
        <Scene
          state={state}
          onReady={() => setLive(true)}
          onLost={() => {
            setLive(false)
            setFailed(true)
          }}
        />
      ) : null}
    </div>
  )
}
