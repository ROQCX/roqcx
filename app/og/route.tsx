/* eslint-disable @next/next/no-img-element -- ImageResponse requires native img elements */
import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

// Brand spec (ROQ CX wordmark sheet):
//   text height = 0.3375 * mark height; gap = 0.1825 * mark height;
//   text aspect = 756/135. 3D mark is 1:1.
// Kept small on the 1200×630 canvas so the lockup stays a logo, not a banner.
const MARK_H = 128
const GAP = Math.round(MARK_H * 0.1825)
const TEXT_H = Math.round(MARK_H * 0.3375)
const TEXT_W = Math.round(TEXT_H * (756 / 135))

function dataUrl(bytes: Buffer) {
  return `data:image/png;base64,${bytes.toString("base64")}`
}

export async function GET() {
  const [mark, wordmark] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/mark-3d.png")),
    readFile(path.join(process.cwd(), "public/brand/text-dark.png")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f1ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: GAP }}>
          <img src={dataUrl(mark)} width={MARK_H} height={MARK_H} alt="" />
          <img src={dataUrl(wordmark)} width={TEXT_W} height={TEXT_H} alt="ROQ CX" />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
