"use client"

import dynamic from "next/dynamic"
import * as React from "react"
import { FullBleedSection, GridBg, RQX, SectionHeader, Tag } from "./atoms"

const ChatInterface = dynamic(
  () => import("../chat/chat-interface").then((m) => m.ChatInterface),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: RQX.fgDim,
          border: `1px solid ${RQX.line}`,
          borderRadius: 18,
          background: RQX.bgRaised,
        }}
      >
        Loading chat demo…
      </div>
    ),
  },
)

const DEMO_QUESTIONS = [
  "What can ROQ CX build in a 14-day sprint?",
  "How do you run user testing in week 2?",
  "What does a week-4 build include?",
  "How much does a sprint cost?",
]

export function ChatDemoSection() {
  return (
    <FullBleedSection
      id="chat-demo"
      style={{
        padding: "120px 56px",
        position: "relative",
        background: RQX.bg,
        borderTop: `1px solid ${RQX.lineDim}`,
      }}
    >
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -220,
          left: -180,
          width: 680,
          height: 680,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 18%, transparent) 0%, transparent 60%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />

      <SectionHeader
        kicker="Chat demo"
        title={
          <>
            Try the assistant.
            <br />
            Ask it about sprints.
          </>
        }
        lede={
          <>
            This is the live ROQ CX chat experience. Use the prompts, or ask your
            own question.
          </>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 28,
          alignItems: "start",
          position: "relative",
          maxWidth: 1440,
          margin: "0 auto",
        }}
        className="rqx-chat-demo-grid"
      >
        <div
          style={{
            background: RQX.bgRaised,
            border: `1px solid ${RQX.line}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <Tag>Good questions to start</Tag>
          <div style={{ height: 14 }} />
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              color: RQX.fgDim,
              fontSize: 14.5,
              lineHeight: 1.5,
            }}
          >
            {DEMO_QUESTIONS.map((q) => (
              <li
                key={q}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    marginTop: 7,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: RQX.accent,
                    flexShrink: 0,
                  }}
                />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: `color-mix(in oklab, ${RQX.bg} 65%, transparent)`,
            border: `1px solid ${RQX.line}`,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              padding: 14,
              borderBottom: `1px solid ${RQX.lineDim}`,
              background: RQX.bgCard,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              color: RQX.muted,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
            className="font-geist-mono"
          >
            <span>roqchat demo</span>
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: RQX.green,
                  boxShadow: `0 0 10px ${RQX.green}`,
                }}
              />
              live
            </span>
          </div>

          <div style={{ height: 520 }}>
            <ChatInterface
              initialMessages={[]}
              exampleQuestions={DEMO_QUESTIONS}
              welcomeMessage="Ask me about ROQ CX prototype sprints."
              apiRoute="/api/chat/roqcx"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .rqx-chat-demo-grid {
          grid-template-columns: 1fr 1.2fr;
        }
        @media (max-width: 980px) {
          .rqx-chat-demo-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          :global(#chat-demo) {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}

