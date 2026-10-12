"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

/** Screen aperture of public/case-studies/handset.webp, as fractions of the frame. */
const SCREEN = { left: "18.89%", top: "12.42%", width: "62.08%", height: "74.53%" }

interface PhoneLoopProps {
  src: string
  poster: string
  className?: string
}

interface LoopVideoProps {
  src: string
  poster: string
  className?: string
}

/** Muted loop. Stays on the poster when the visitor prefers reduced motion. */
export function LoopVideo({ src, poster, className }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      if (motion.matches) {
        video.pause()
        video.currentTime = 0
        return
      }
      void video.play().catch(() => {})
    }

    apply()
    motion.addEventListener("change", apply)
    return () => motion.removeEventListener("change", apply)
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      poster={poster}
      preload="metadata"
      tabIndex={-1}
      aria-hidden
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export function PhoneLoop({ src, poster, className }: PhoneLoopProps) {
  return (
    <div className={`relative mx-auto aspect-[720/1280] ${className ?? ""}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[97%] z-0 h-[7%] w-[68%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-md"
      />
      <div className="absolute z-0 overflow-hidden bg-black" style={SCREEN}>
        <LoopVideo src={src} poster={poster} className="h-full w-full object-cover" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.18)_48%,transparent_56%)]"
        />
      </div>
      {/* The frame sits above the video so the camera island and bezel cover the recording. */}
      <Image
        src="/case-studies/handset.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 70vw, 320px"
        className="pointer-events-none z-10"
      />
    </div>
  )
}
