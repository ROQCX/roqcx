import Link from "next/link"
import { RQX } from "./redesign/atoms"
import { BrandLockup } from "./brand/lockup"
import { SPRINTS } from "@/lib/sprints"

const COLS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Sprints",
    items: [
      ...SPRINTS.map((s) => ({ label: s.title, href: s.href })),
      { label: "Sample sprint plan", href: "/sample-sprint-plan" },
    ],
  },
  {
    title: "Studio",
    items: [
      { label: "Work", href: "/case-studies" },
      { label: "Journal", href: "/insights" },
      { label: "Chat demo", href: "/chatbot" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Get in touch",
    items: [
      { label: "hello@roqcx.com", href: "mailto:hello@roqcx.com" },
      { label: "+971 56 252 0720", href: "https://wa.me/971562520720" },
      { label: "Dubai, UAE", href: "https://maps.google.com" },
    ],
  },
]

export function Footer() {
  return (
    <footer
      style={{
        background: RQX.bgRaised,
        borderTop: `1px solid ${RQX.lineDim}`,
        padding: "56px 56px 32px",
        color: RQX.fg,
      }}
      className="rqx-fullbleed"
    >
      <div
        className="rqx-footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 56,
          marginBottom: 48,
          maxWidth: 1440,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <BrandLockup height={50} variant="3d" />
          <p
            style={{
              marginTop: 16,
              maxWidth: 320,
              fontSize: 14,
              lineHeight: 1.55,
              color: RQX.fgDim,
            }}
          >
            ROQ CX is the fractional product team for SMEs who want to build,
            test, and ship without hiring a full one.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <div
              className="font-geist-mono"
              style={{
                fontSize: 11,
                color: RQX.muted,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {col.title}
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {col.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    style={{
                      color: RQX.fgDim,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="font-geist-mono"
        style={{
          maxWidth: 1440,
          marginLeft: "auto",
          marginRight: "auto",
          borderTop: `1px solid ${RQX.lineDim}`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: RQX.muted,
          letterSpacing: "0.04em",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© {new Date().getFullYear()} ROQ CX · Built in 14-day sprints, naturally.</span>
        <span>Dubai · UAE</span>
      </div>
    </footer>
  )
}
