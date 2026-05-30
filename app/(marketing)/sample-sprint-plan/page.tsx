import Link from "next/link"
import { FullBleedSection, GridBg, RQX, SectionHeader } from "@/components/redesign/atoms"
import { EditorialSprintDiagram } from "@/components/redesign/editorial-sprint-diagram"

export const metadata = {
  title: "Sample sprint plan | ROQ CX",
  description:
    "A sample 14-day prototype sprint plan: checkpoints, deliverables, and what happens on each day.",
}

export default function SampleSprintPlanPage() {
  return (
    <FullBleedSection
      style={{
        background: RQX.bg,
        position: "relative",
        overflow: "hidden",
      }}
      className="py-[80px] pb-[112px] px-6 sm:px-10 lg:px-14"
    >
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -260,
          right: -240,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent2} 16%, transparent) 0%, transparent 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <SectionHeader
          kicker="Sample sprint plan"
          title={
            <>
              A 14‑day prototype sprint
              <br />
              you can actually run.
            </>
          }
          lede="This is the default cadence we use. Same checkpoints, same artifacts, same decision on day 14."
        />

        <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: RQX.fg,
              fontWeight: 500,
              fontSize: 14,
              borderBottom: `1px solid ${RQX.accent}`,
              paddingBottom: 2,
            }}
          >
            Book the kick‑off call →
          </Link>
        </div>

        <div style={{ marginTop: 28 }}>
          <EditorialSprintDiagram />
        </div>

        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
          }}
          className="grid grid-cols-1 lg:grid-cols-3"
        >
          {[
            {
              k: "Inputs",
              items: ["Problem statement", "Target segment", "One success metric", "Access to stakeholders"],
            },
            {
              k: "Artifacts",
              items: ["Clickable prototype URL", "Interview recordings", "Sprint memo", "Backlog for week 4 (optional)"],
            },
            {
              k: "Decision",
              items: ["Ship", "Iterate", "Kill (cleanly)", "Or start the build milestone"],
            },
          ].map((card) => (
            <div
              key={card.k}
              style={{
                background: RQX.bgRaised,
                border: `1px solid ${RQX.line}`,
                borderRadius: 18,
                padding: 20,
              }}
            >
              <div
                className="font-geist-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: RQX.muted,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {card.k}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {card.items.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 10, color: RQX.fgDim, lineHeight: 1.5 }}>
                    <span aria-hidden style={{ marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: RQX.accent }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </FullBleedSection>
  )
}

