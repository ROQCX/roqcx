"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, Database, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { FullBleedSection, GridBg, RQX, Tag } from "@/components/redesign/atoms"

const DynamicChatInterface = dynamic(
  () => import("../../components/chat/chat-interface").then((mod) => mod.ChatInterface),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center" style={{ color: RQX.fgDim }}>
        Loading…
      </div>
    ),
  },
)

const DEMO_QUESTIONS = [
  "My favourite ice cream is pistachio.",
  "I run a small bookshop in Dubai.",
  "What's my favourite ice cream?",
  "What kind of business do I run?",
]

const STACK = [
  { icon: Database, label: "Vector store", value: "Turso · libSQL · session-scoped" },
  { icon: Sparkles, label: "Model", value: "gpt-4o-mini" },
  { icon: Zap, label: "Streaming", value: "Vercel AI SDK · edge" },
  { icon: ShieldCheck, label: "Guardrails", value: "moderation · 24h GC · capped output" },
]

export default function ChatbotPage() {
  return (
    <FullBleedSection
      className="rqx-chatbot-section"
      style={{
        background: RQX.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GridBg opacity={0.4} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -240,
          right: -240,
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 14%, transparent) 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      <div className="rqx-chatbot-shell">
        <div className="rqx-chat-grid">
          {/* Chat panel — left */}
          <div
            style={{
              background: `color-mix(in oklab, ${RQX.bgRaised} 75%, transparent)`,
              border: `1px solid ${RQX.line}`,
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 50px 110px -45px rgba(0,0,0,0.55)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              className="font-geist-mono"
              style={{
                padding: "10px 14px",
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
                flexShrink: 0,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: RQX.green,
                    boxShadow: `0 0 8px ${RQX.green}`,
                  }}
                />
                public demo · live
              </span>
              <span>session-scoped · 24h memory</span>
            </div>

            <div className="flex flex-1 min-h-0">
              <DynamicChatInterface
                initialMessages={[]}
                exampleQuestions={DEMO_QUESTIONS}
                welcomeMessage="Teach me something, then ask me about it. I'll remember anything you tell me for 24 hours."
                apiRoute="/api/chat/demo"
                hideHeader
              />
            </div>
          </div>

          {/* Meta sidebar — right */}
          <aside className="rqx-chat-meta">
            <Tag>Sprint output</Tag>
            <h1
              className="font-serif-display rqx-meta-title"
              style={{
                margin: "14px 0 10px",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: RQX.fg,
              }}
            >
              Teach it. Then test its memory.
            </h1>
            <p
              className="rqx-meta-lede"
              style={{
                margin: 0,
                color: RQX.fgDim,
                lineHeight: 1.5,
                fontSize: 14.5,
              }}
            >
              Anything you tell this assistant becomes a session-scoped embedding in our vector store. This is a live RAG
              (retrieval-augmented generation) demo, same stack we&apos;d ship for you in a Prototype Sprint.
            </p>

            <div className="rqx-meta-stack">
              {STACK.map((s) => (
                <div
                  key={s.label}
                  style={{
                    border: `1px solid ${RQX.lineDim}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    background: `color-mix(in oklab, ${RQX.bgRaised} 60%, transparent)`,
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                      color: "#fff",
                      marginBottom: 12,
                    }}
                  >
                    <s.icon size={18} />
                  </div>
                  <div
                    className="font-geist-mono"
                    style={{
                      fontSize: 11,
                      color: RQX.muted,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 15, color: RQX.fg, fontWeight: 500, lineHeight: 1.4 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rqx-meta-cta">
              <Link
                href="/solutions/prototype-sprint"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                  color: "#fff",
                  padding: "11px 16px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 13.5,
                  boxShadow: `0 18px 40px -16px color-mix(in oklab, ${RQX.accent} 50%, transparent)`,
                }}
              >
                Ship one like this <ArrowRight size={14} />
              </Link>
              <span style={{ fontSize: 12, color: RQX.muted }}>
                Fixed fee · stop after day 14 · keep everything.
              </span>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        :global(.rqx-chatbot-section) {
          /* Lock the section to exactly the viewport minus the fixed nav so the
             chat panel + sidebar render above the fold without scroll. */
          height: calc(100dvh - 72px);
          padding: 56px 40px;
        }
        .rqx-chatbot-shell {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
        }
        .rqx-chat-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: 24px;
          height: 100%;
          align-items: stretch;
        }
        .rqx-chat-meta {
          padding: 6px 6px 6px 4px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
        }
        .rqx-meta-title {
          font-size: clamp(28px, 2.6vw, 38px);
        }
        .rqx-meta-lede {
          max-width: 480px;
        }
        .rqx-meta-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .rqx-meta-cta {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid ${RQX.lineDim};
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        @media (max-height: 820px) {
          :global(.rqx-chatbot-section) {
            padding: 32px 32px;
          }
          .rqx-meta-title {
            font-size: clamp(24px, 2.4vw, 32px);
          }
        }
        @media (max-width: 1080px) {
          .rqx-chat-grid {
            grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 920px) {
          :global(.rqx-chatbot-section) {
            height: auto;
            min-height: calc(100dvh - 72px);
            padding: 24px 24px 32px;
          }
          .rqx-chat-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            height: auto;
          }
          .rqx-chat-meta {
            overflow: visible;
          }
        }
      `}</style>
    </FullBleedSection>
  )
}
