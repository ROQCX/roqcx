/* eslint-disable @next/next/no-img-element -- ImageResponse requires native img elements */
import { ImageResponse } from "next/og"

export const runtime = "edge"

// Brand spec (ROQ CX wordmark sheet):
//   text height = 0.3375 * mark height; gap = 0.1825 * mark height;
//   text aspect = 756/135. 3D mark is 1:1.
const MARK_H = 96
const GAP = Math.round(MARK_H * 0.1825)
const TEXT_H = Math.round(MARK_H * 0.3375)
const TEXT_W = Math.round(TEXT_H * (756 / 135))

export function GET(req: Request) {
  const origin = new URL(req.url).origin
  const markSrc = `${origin}/brand/mark-3d.png`
  const textSrc = `${origin}/brand/text-white.png`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#14151c",
          color: "#f2f0ea",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        {/* Brand lockup (3D mark + white wordmark) at the design's proportions */}
        <div style={{ display: "flex", alignItems: "center", gap: GAP }}>
          <img src={markSrc} width={MARK_H} height={MARK_H} alt="" />
          <img src={textSrc} width={TEXT_W} height={TEXT_H} alt="ROQ CX" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 0.98,
              letterSpacing: -2.4,
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            From idea to live prototype in two weeks.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, opacity: 0.78 }}>
            The fractional product team for SMEs. Prototype sprints, four-week
            builds, eight-week launches.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            opacity: 0.62,
          }}
        >
          <div>roqcx.com</div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#f59f23" }}>●</span>
            <span>Prototype sprints</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
