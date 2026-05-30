"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { FullBleedSection, Reveal, RQX, SectionHeader } from "./atoms"

type Metric = [string, string]
type Case = {
  href: string
  label: string
  year: string
  tagline: string
  metrics: Metric[]
  img: string
  browserFrame?: {
    url: string
  }
}

const CASES: Case[] = [
  {
    href: "/case-studies/syntheve",
    label: "Syntheve · ATS resume checker",
    year: "2026",
    tagline: "Know why you're not getting interviews, then fix it fast.",
    metrics: [
      ["30s", "ATS match score"],
      ["0", "signup required"],
      ["PDF", "processed in memory"],
    ],
    img: "syntheve-fullpage-cover",
    browserFrame: {
      url: "https://www.syntheve.com/",
    },
  },
  {
    href: "/case-studies/dubai-7s-ticketing",
    label: "Dubai 7s · event ticketing",
    year: "2021",
    tagline: "Built a ticketing platform between two rugby seasons.",
    metrics: [
      ["80k+", "tickets scanned"],
      ["2M+", "app interactions"],
      ["3k/h", "peak scan rate"],
    ],
    img: "dubai-7s-cover",
  },
]

function getCaseStudyImageSrc(caseImageId: string) {
  return `/case-studies/${caseImageId}.webp`
}

function BrowserFramedImage({ url }: { url: string }) {
  return (
    <div
      style={{
        height: 40,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 12px",
        background: RQX.bgCard,
        borderBottom: `1px solid ${RQX.lineDim}`,
      }}
    >
      <div style={{ display: "flex", gap: 7 }}>
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "oklch(0.62 0.18 25)",
            opacity: 0.9,
          }}
        />
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "oklch(0.78 0.15 90)",
            opacity: 0.9,
          }}
        />
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "oklch(0.72 0.16 145)",
            opacity: 0.9,
          }}
        />
      </div>
      <div
        className="font-geist-mono"
        style={{
          flex: 1,
          fontSize: 10.5,
          color: RQX.muted,
          letterSpacing: "0.02em",
          padding: "5px 10px",
          borderRadius: 10,
          border: `1px solid ${RQX.lineDim}`,
          background: RQX.bg,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {url}
      </div>
    </div>
  )
}

function CaseStudyMedia({
  label,
  caseImageId,
  browserFrame,
}: {
  label: string
  caseImageId: string
  browserFrame?: Case["browserFrame"]
}) {
  const [hasError, setHasError] = React.useState(false)
  const src = getCaseStudyImageSrc(caseImageId)

  return (
    <div
      style={{
        aspectRatio: "16 / 9",
        background: `repeating-linear-gradient(135deg, ${RQX.bgCard} 0 12px, ${RQX.bg} 12px 24px)`,
        borderBottom: `1px solid ${RQX.lineDim}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {browserFrame ? (
        <div
          style={{
            width: "92%",
            height: "84%",
            borderRadius: 16,
            border: `1px solid ${RQX.line}`,
            background: RQX.bgRaised,
            overflow: "hidden",
            boxShadow: "0 26px 50px -24px rgba(0,0,0,0.55)",
          }}
        >
          <BrowserFramedImage url={browserFrame.url} />
          <div style={{ position: "relative", height: "calc(100% - 40px)" }}>
            {!hasError && (
              <Image
                src={src}
                alt={`${label} case study screenshot`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
                onError={() => setHasError(true)}
              />
            )}
          </div>
        </div>
      ) : (
        !hasError && (
          <Image
            src={src}
            alt={`${label} case study screenshot`}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-contain"
            loading="lazy"
            onError={() => setHasError(true)}
            style={{
              paddingLeft: 18,
              paddingRight: 18,
              paddingBottom: 18,
              paddingTop: 18,
            }}
          />
        )
      )}

      {hasError && (
        <div
          className="font-geist-mono"
          style={{
            fontSize: 11,
            color: RQX.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: `1px dashed ${RQX.line}`,
            padding: "8px 14px",
            borderRadius: 8,
            background: RQX.bgRaised,
          }}
        >
          case shot
        </div>
      )}
    </div>
  )
}

export function CasesSection() {
  return (
    <FullBleedSection
      id="work"
      style={{ padding: "120px 56px", borderTop: `1px solid ${RQX.lineDim}` }}
    >
      <SectionHeader
        kicker="Selected work"
        title={
          <>
            Things we built
            <br />
            in a hurry, on purpose.
          </>
        }
        lede="Two examples of SMEs we've worked with at full sprint pace. Both went from blank page to live customers in under 90 days."
      />

      <div className="rqx-cases-grid">
        {CASES.map((c, i) => (
          <Reveal key={c.label} delay={i * 140}>
            <Link
              href={c.href}
              style={{
                background: RQX.bgRaised,
                border: `1px solid ${RQX.line}`,
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ position: "relative" }}>
                <CaseStudyMedia
                  label={c.label}
                  caseImageId={c.img}
                  browserFrame={c.browserFrame}
                />
                <span
                  className="font-geist-mono"
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: RQX.fgDim,
                  }}
                >
                  ◆ CASE / {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-geist-mono"
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: RQX.fgDim,
                  }}
                >
                  {c.year}
                </span>
              </div>

              <div style={{ padding: "28px 28px 32px" }}>
                <div
                  className="font-geist-mono"
                  style={{
                    fontSize: 11,
                    color: RQX.accent,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {c.label}
                </div>
                <div
                  className="font-serif-display"
                  style={{
                    fontSize: 34,
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: RQX.fg,
                    marginBottom: 22,
                  }}
                >
                  {c.tagline}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 16,
                    paddingTop: 18,
                    borderTop: `1px solid ${RQX.lineDim}`,
                  }}
                >
                  {c.metrics.map(([k, v]) => (
                    <div key={k}>
                      <div
                        className="font-serif-display"
                        style={{
                          fontSize: 32,
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
                          fontSize: 10,
                          color: RQX.muted,
                          marginTop: 6,
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
            </Link>
          </Reveal>
        ))}
      </div>

      <style jsx>{`
        .rqx-cases-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }
        @media (max-width: 900px) {
          .rqx-cases-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
