"use client"

import * as React from "react"
import { FullBleedSection, RQX, SectionHeader } from "./atoms"
import { formatAed, formatUsd, WEBSITE_SPRINT_FROM_AED, WEBSITE_SPRINT_FROM_USD } from "@/lib/sprints"

const QS = [
  {
    q: "How quickly can we start a sprint?",
    a: "We onboard one new SME per cohort, every two weeks. Most engagements start within 10 business days of the kick-off call.",
  },
  {
    q: "Do we need an internal tech team?",
    a: "No. Most of our SME clients have zero engineers. We act as the temporary product team: you bring the domain expertise, we bring the prototype.",
  },
  {
    q: "What if the prototype tells us \"no\"?",
    a: "Then you saved 8 months and a six-figure dev budget. About 30% of our sprints end in a clean kill. We consider that the system working.",
  },
  {
    q: "Who owns the code, designs, and data?",
    a: "You do, from minute one. Every repo, Figma file, and recording is handed over under your name. No vendor lock-in, ever.",
  },
  {
    q: "How is pricing structured?",
    a: `Fixed fee per sprint. Website Sprint starts from ${formatAed(WEBSITE_SPRINT_FROM_AED)} (${formatUsd(WEBSITE_SPRINT_FROM_USD)}). Product sprints are quoted on the kick-off call. No retainers, no T&M, no scope-creep invoices. You can stop after any sprint without penalty.`,
  },
  {
    q: "Do you do ongoing development after launch?",
    a: "Yes. About half our clients keep us on a one-sprint-per-month rhythm for iteration. The other half graduate to their own team. Both are fine.",
  },
]

export function FAQSection() {
  const [open, setOpen] = React.useState<number>(0)

  return (
    <FullBleedSection
      id="faq"
      style={{
        padding: "120px 56px",
        background: RQX.bgRaised,
        borderTop: `1px solid ${RQX.lineDim}`,
      }}
    >
      <SectionHeader
        kicker="Things you'll ask"
        title={
          <>
            Short answers to
            <br />
            reasonable questions.
          </>
        }
      />

      <div
        style={{
          border: `1px solid ${RQX.line}`,
          borderRadius: 18,
          overflow: "hidden",
          background: RQX.bg,
        }}
      >
        {QS.map((item, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              style={{
                borderBottom: i < QS.length - 1 ? `1px solid ${RQX.lineDim}` : "none",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  padding: "24px 28px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  color: RQX.fg,
                }}
              >
                <span
                  className="font-serif-display"
                  style={{
                    fontSize: 24,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `1px solid ${RQX.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOpen ? RQX.accent : RQX.fgDim,
                    transition: "transform 0.3s, color 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 320 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(.2,.7,.2,1)",
                }}
              >
                <div
                  style={{
                    padding: "0 28px 28px",
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: RQX.fgDim,
                    maxWidth: 720,
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </FullBleedSection>
  )
}
