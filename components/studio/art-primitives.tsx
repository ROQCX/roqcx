// Hand-drawn working diagrams for the marketing site. Fixed palette: the
// marketing pages only ever render the light studio theme.
import type { ReactNode, SVGProps } from "react"

export const C = {
  void: "#0c0f0d",
  paper: "#f4f1ea",
  chalk: "#fffdf8",
  ink: "#121513",
  soft: "#3e4741",
  forest: "#17362c",
  signal: "#d6ff4a",
  clay: "#c4512f",
  rule: "#ddd6c8",
}

const glyphs = {
  mail: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 7l10 7 10-7" /></>,
  chat: <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />,
  form: <><rect x="3" y="2" width="18" height="20" rx="2" /><path d="M7 8h10M7 12h10M7 16h5" /></>,
  grid: <><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M2 15h20M9 3v18M16 3v18" /></>,
  doc: <><path d="M5 2h10l5 5v15H5z" /><path d="M15 2v5h5M8 12h8M8 16h8" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 22c0-4.5 3.6-8 8-8s8 3.5 8 8" /></>,
  team: <><circle cx="8" cy="9" r="3" /><circle cx="16.5" cy="8" r="2.5" /><path d="M2 21c0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5M14 14.6c.8-.4 1.6-.6 2.5-.6 3 0 5.5 2.6 5.5 6" /></>,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  cross: <path d="M6 6l12 12M18 6L6 18" />,
  sort: <path d="M3 6h18M6 12h12M10 18h4" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></>,
  handoff: <path d="M3 8h15l-4-4M21 16H6l4 4" />,
  gauge: <><path d="M3 18a9 9 0 0 1 18 0" /><path d="M12 18l5-6" /><circle cx="12" cy="18" r="1" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  key: <><circle cx="7.5" cy="12" r="4.5" /><path d="M12 12h10M18 12v4M21 12v3" /></>,
  arrow: <path d="M4 12h15M14 6l6 6-6 6" />,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  badge: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></>,
  flag: <path d="M5 22V3M5 4h12l-2.5 4L17 12H5" />,
  browser: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20M5.5 6.5h.01M8.5 6.5h.01" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  pen: <path d="M4 20l1.5-5.5L16 4l4 4L9.5 18.5zM14 6l4 4" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  refresh: <><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></>,
}

export type GlyphName = keyof typeof glyphs

/** A glyph placed inside an SVG at (x, y), drawn on a 24-unit grid. */
export function G({ name, x, y, size = 24, color = C.ink, width = 1.75 }: { name: GlyphName; x: number; y: number; size?: number; color?: string; width?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth={width * (24 / size)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphs[name]}
    </g>
  )
}

/** Standalone glyph for use in HTML. Inherits the text colour. */
export function Glyph({ name, size = 24, className, strokeWidth = 1.75 }: { name: GlyphName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  )
}

/** A paper card with an offset shadow, like a print pinned to a board. */
export function Sheet({ x, y, w, h, r = 12, fill = C.chalk, stroke = C.ink, rotate = 0, children }: { x: number; y: number; w: number; h: number; r?: number; fill?: string; stroke?: string; rotate?: number; children?: ReactNode }) {
  return (
    <g transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}>
      <rect x={x + 4} y={y + 5} width={w} height={h} rx={r} fill={C.ink} opacity={0.1} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {children}
    </g>
  )
}

export function Bar({ x, y, w, h = 8, fill = C.rule }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
}

export function Art({ viewBox, label, className, children, ...rest }: { viewBox: string; label?: string; className?: string; children: ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={viewBox}
      className={className ?? "block h-auto w-full"}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      fontFamily="inherit"
      {...rest}
    >
      {children}
    </svg>
  )
}
