import Image from "next/image"

// Lockup proportions from the ROQ CX brand sheet:
// text height = 0.3375 * mark height, gap = 0.1825 * mark height.
const TEXT_RATIO = 135 / 400
const GAP_RATIO = 73 / 400
const TEXT_AR = 756 / 135
const FLAT_AR = 388 / 400

type Variant = "flat" | "3d"

interface BrandLockupProps {
  /** Mark pixel height — text and gap scale off this. Default 32 (nav). */
  height?: number
  /** Use the flat 2D mark (default) or the 3D ribbon mark. */
  variant?: Variant
  /** Render priority for above-the-fold placements like nav. */
  priority?: boolean
  className?: string
}

export function BrandLockup({
  height = 32,
  variant = "flat",
  priority = false,
  className,
}: BrandLockupProps) {
  const markAR = variant === "flat" ? FLAT_AR : 1
  const markW = Math.round(height * markAR)
  const textH = Math.round(height * TEXT_RATIO)
  const textW = Math.round(textH * TEXT_AR)
  const gap = Math.round(height * GAP_RATIO)
  const markSrc = variant === "flat" ? "/brand/mark-flat.png" : "/brand/mark-3d.png"

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap, lineHeight: 0 }}
    >
      <Image
        src={markSrc}
        alt=""
        width={markW}
        height={height}
        priority={priority}
        style={{ display: "block", height, width: markW }}
      />
      {/* Theme-aware wordmark: stack both PNGs, hide one with Tailwind dark: */}
      <Image
        src="/brand/text-dark.png"
        alt="ROQ CX"
        width={textW}
        height={textH}
        priority={priority}
        className="block dark:hidden"
        style={{ height: textH, width: textW }}
      />
      <Image
        src="/brand/text-white.png"
        alt="ROQ CX"
        width={textW}
        height={textH}
        priority={priority}
        className="hidden dark:block"
        style={{ height: textH, width: textW }}
      />
    </span>
  )
}
