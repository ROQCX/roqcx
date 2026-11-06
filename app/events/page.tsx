import type { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import { BrandLockup } from "@/components/brand/lockup"
import { LteyInterestForm } from "@/components/events/ltey-interest-form"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = {
  ...pageSeo({
    title: "Register your interest | Let’s Talk Early Years",
    description:
      "Register your interest at Let’s Talk Early Years and secure your conference discount on the next practical AI training.",
    path: "/events",
    socialTitle: "Register your interest and secure your conference discount",
    socialDescription: "We’ll let you know as soon as a date is scheduled.",
    includeCanonical: false,
  }),
  // Root layout indexes the site. Set both robots and googleBot so this page does not inherit that.
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function EventsPage() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <article className="flex min-h-[calc(100svh-72px)] flex-col bg-white text-[#8f2d3a]">
        <header className="relative flex flex-1 flex-col overflow-hidden bg-white">
          <div className="mx-auto grid w-[min(1100px,calc(100%-2.5rem))] items-center gap-10 py-10 md:w-[min(1100px,calc(100%-4rem))] md:py-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="ltey-partnership">
                <div className="ltey-partnership-row">
                  <Image
                    src="/events/ltey-logo.png"
                    alt="Let’s Talk Early Years"
                    width={565}
                    height={355}
                    priority
                    className="h-auto w-52 shrink-0"
                  />
                  <span className="sr-only">in partnership with</span>
                  <span aria-hidden="true" className="shrink-0 font-[family-name:var(--font-newsreader)] text-4xl font-black leading-none">
                    ×
                  </span>
                  <BrandLockup height={56} priority className="shrink-0" />
                </div>
              </div>
              <h1 className="m-0 mt-8 max-w-[12ch] font-[family-name:var(--font-newsreader)] text-[clamp(2.5rem,4.5vw,3.75rem)] font-black leading-[0.95] tracking-tight">
                Register your interest.
              </h1>
              <p className="relative mb-0 mt-4 inline-block rotate-1 font-[family-name:var(--font-newsreader)] text-2xl font-black leading-tight md:text-3xl">
                Secure your conference discount.
                <svg
                  className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[#f5d065]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </p>
              <p className="mb-0 mt-6 max-w-[26rem] text-lg leading-relaxed">
                We’ll let you know as soon as a date is scheduled.
              </p>
            </div>
            <LteyInterestForm />
          </div>
          <svg className="mt-auto block h-28 w-full md:h-40" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 160 C250 70 500 120 760 175 C1030 230 1230 100 1440 20 L1440 220 L0 220 Z" fill="#df6f67" />
            <path d="M0 175 C250 90 500 140 760 190 C1030 245 1230 115 1440 40 L1440 220 L0 220 Z" fill="#ff9b5b" />
            <path d="M0 190 C250 110 500 160 760 205 C1030 255 1230 130 1440 65 L1440 220 L0 220 Z" fill="#f5d065" />
          </svg>
        </header>

      </article>
    </>
  )
}
