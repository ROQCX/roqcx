"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/footer"
import { FullBleedSection, GridBg, RQX, Tag } from "@/components/redesign/atoms"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="relative z-10 pt-[72px]">
        <FullBleedSection
          style={{ background: RQX.bg, position: "relative", overflow: "hidden" }}
          className="px-6 sm:px-10 lg:px-14 py-[120px]"
        >
          <GridBg opacity={0.45} />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -260,
              right: -260,
              width: 720,
              height: 720,
              borderRadius: "50%",
              background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 16%, transparent) 0%, transparent 60%)`,
              filter: "blur(80px)",
              pointerEvents: "none",
              opacity: 0.75,
            }}
          />

          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Tag>404 · sprint not found</Tag>
            <h1
              className="font-serif-display"
              style={{
                margin: "20px 0 12px",
                fontSize: "clamp(56px, 8vw, 96px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: RQX.fg,
              }}
            >
              This page got cut from scope.
            </h1>
            <p
              style={{
                margin: "0 auto 28px",
                maxWidth: 480,
                color: RQX.fgDim,
                fontSize: 17,
                lineHeight: 1.55,
              }}
            >
              Either we shipped without it or it never made the backlog. Head back home and we&apos;ll start a real one.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: RQX.fg,
                color: RQX.bg,
                padding: "14px 22px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </FullBleedSection>
      </main>
      <Footer />
    </div>
  )
}
