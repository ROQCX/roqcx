import { ContactForm } from "../../../components/contact/contact-form"
import { Metadata } from "next"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import Script from "next/script"
import { Suspense } from "react"
import { GlassCard } from "../../../components/ui/glass-card"
import { FullBleedSection, GridBg, RQX, SectionHeader } from "../../../components/redesign/atoms"

export const metadata: Metadata = {
  title: "Contact ROQ CX | Book a prototype sprint",
  description:
    "Book a 30-minute kick-off call. We’ll pressure-test the idea, define a sprint scope, and decide if a 14-day prototype sprint is the right shape.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@roqcx.com",
    href: "mailto:hello@roqcx.com"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/971562520720"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dubai, UAE",
    href: "https://maps.google.com"
  }
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
        }}
        className="py-[88px] pb-[120px] px-6 sm:px-10 lg:px-14"
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

        <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
          <SectionHeader
            kicker="Contact"
            title={
              <>
                Book a kick-off call.
                <br />
                Leave with a sprint plan.
              </>
            }
            lede="No deck. No pre-engagement dance. We’ll define the problem, the user segment, and what we’ll test in week 2."
          />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-start">
              <div style={{ maxWidth: 560, color: RQX.fgDim, lineHeight: 1.6 }}>
                Prefer async? Email is fastest. If you’re in the UAE, WhatsApp works too.
              </div>

              <div className="mt-8 space-y-4">
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
                      padding: 14,
                      borderRadius: 16,
                      background: RQX.bgRaised,
                      border: `1px solid ${RQX.line}`,
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${RQX.accent} 0%, ${RQX.accent2} 100%)`,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className="font-geist-mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: RQX.muted, textTransform: "uppercase" }}>
                        {item.title}
                      </div>
                      <div style={{ color: RQX.fgDim }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <GlassCard variant="gradient" className="mt-8 p-6">
                <div className="font-geist-mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: RQX.muted }}>
                  WHAT TO SEND
                </div>
                <div style={{ height: 12 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, color: RQX.fgDim }}>
                  {[
                    "One sentence on the idea",
                    "Who it’s for (segment)",
                    "What success looks like in 30 days",
                  ].map((t) => (
                    <li key={t} style={{ display: "flex", gap: 10 }}>
                      <span aria-hidden style={{ marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: RQX.accent }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            <div className="lg:pl-2 xl:pl-8">
              <div
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
                    padding: "12px 14px",
                    borderBottom: `1px solid ${RQX.lineDim}`,
                    background: RQX.bgCard,
                    color: RQX.muted,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>contact</span>
                  <span>reply within 1 business day</span>
                </div>
                <div className="p-8">
                  <Suspense fallback={<div style={{ color: RQX.fgDim }}>Loading form...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullBleedSection>
    </>
  )
} 