import { ContactForm } from "../../../components/contact/contact-form"
import { Metadata } from "next"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import Script from "next/script"
import { Suspense } from "react"
import { GlassCard } from "../../../components/ui/glass-card"
import { FullBleedSection, GridBg, RQX, Tag } from "../../../components/redesign/atoms"

export const metadata: Metadata = {
  title: "Contact ROQ CX | Book a prototype sprint",
  description:
    "Book a 30-minute kick-off call. We'll pressure-test the idea, define a sprint scope, and decide if a 14-day prototype sprint is the right shape.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@roqcx.com",
    href: "mailto:hello@roqcx.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/971562520720",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dubai, UAE",
    href: "https://maps.google.com",
  },
]

export default function ContactPage() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <FullBleedSection
        style={{
          background: RQX.bg,
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(100dvh - 72px)",
        }}
        className="contact-page px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-11"
      >
        <GridBg opacity={0.45} />

        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -240,
            right: -220,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 16%, transparent) 0%, transparent 60%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
            opacity: 0.75,
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] items-start gap-8 lg:min-h-[calc(100dvh-72px-5.5rem)] lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
          <div className="flex flex-col gap-5 lg:gap-6">
            <header className="space-y-3">
              <Tag>Contact</Tag>
              <h1
                className="font-serif-display m-0 text-[clamp(1.75rem,3.2vw,2.625rem)] leading-[1.05] tracking-[-0.025em]"
                style={{ color: RQX.fg, fontWeight: 400 }}
              >
                Book a kick-off call. Leave with a sprint plan.
              </h1>
              <p className="m-0 max-w-lg text-[15px] leading-relaxed" style={{ color: RQX.fgDim }}>
                No deck. No pre-engagement dance. We'll define the problem, the user segment, and what we'll test in week 2.
              </p>
            </header>

            <p className="m-0 text-[15px] leading-relaxed" style={{ color: RQX.fgDim }}>
              Prefer async? Email is fastest. If you're in the UAE, WhatsApp works too.
            </p>

            <div className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.title === "WhatsApp" ? "_blank" : undefined}
                  rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    color: RQX.fg,
                    padding: "12px 14px",
                    borderRadius: 16,
                    background: RQX.bgRaised,
                    border: `1px solid ${RQX.line}`,
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      className="font-geist-mono"
                      style={{ fontSize: 11, letterSpacing: "0.08em", color: RQX.muted, textTransform: "uppercase" }}
                    >
                      {item.title}
                    </div>
                    <div className="text-sm" style={{ color: RQX.fgDim }}>
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <GlassCard variant="gradient" className="p-4 sm:p-5">
              <div className="font-geist-mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: RQX.muted }}>
                WHAT TO SEND
              </div>
              <ul
                className="mt-3 flex flex-col gap-2"
                style={{ listStyle: "none", padding: 0, margin: 0, color: RQX.fgDim }}
              >
                {[
                  "One sentence on the idea",
                  "Who it's for (segment)",
                  "What success looks like in 30 days",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-snug">
                    <span
                      aria-hidden
                      className="mt-1.5 shrink-0"
                      style={{ width: 5, height: 5, borderRadius: "50%", background: RQX.accent }}
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="flex w-full justify-center lg:pl-2 xl:pl-6">
            <div
              className="w-full max-w-[440px]"
              style={{
                overflow: "hidden",
                borderRadius: 18,
                background: `color-mix(in oklab, ${RQX.bgRaised} 75%, transparent)`,
                border: `1px solid ${RQX.line}`,
                boxShadow: "0 50px 110px -45px rgba(0,0,0,0.55)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="font-geist-mono"
                style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${RQX.lineDim}`,
                  background: RQX.bgCard,
                  color: RQX.muted,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>contact</span>
                <span className="hidden shrink-0 sm:inline">1 business day reply</span>
              </div>
              <div className="p-5 sm:p-6">
                <Suspense fallback={<div style={{ color: RQX.fgDim }}>Loading form...</div>}>
                  <ContactForm compact />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </FullBleedSection>
    </>
  )
}
