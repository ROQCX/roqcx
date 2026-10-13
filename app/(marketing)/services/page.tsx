import type { Metadata } from "next"
import Link from "next/link"
import { services, opportunityReview } from "@/lib/site-content"
import { Glyph, ReviewArt, TriadArt, serviceArt } from "@/components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI Automation, Websites & AI Training for SMEs | ROQ CX",
  description:
    "Build websites and web apps, automate repetitive work, and train the team. Not every engagement needs all three.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <article className="pb-20">
      <header className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-[min(1240px,calc(100%-2.5rem))] items-center gap-10 py-16 md:w-[min(1240px,calc(100%-4rem))] md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
          <h1 className="font-serif-display m-0 max-w-[14ch] text-[clamp(2.6rem,5vw,4.75rem)] font-light leading-[0.95] tracking-[-0.03em] text-[var(--chalk)]">
            Three ways to help. Use the one the problem needs.
          </h1>
          <p className="mb-0 mt-5 max-w-[38rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">
            Most people call because something repetitive is slowing the team down. We also build the site or tool, and train the people who will use it. Sometimes the useful answer is to leave AI out of it.
          </p>
          </div>
          <div className="mx-auto w-full max-w-[460px] lg:col-span-5">
            <TriadArt />
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-[min(1240px,calc(100%-2.5rem))] gap-6 py-14 md:w-[min(1240px,calc(100%-4rem))] md:grid-cols-3 md:py-20">
        {services.map((service, index) => {
          const Art = serviceArt[service.path as keyof typeof serviceArt]
          return (
            <Link key={service.path} href={service.path} className="plate lift group flex flex-col bg-[var(--chalk)] text-[var(--ink)] no-underline">
              <div className="paper-grid border-b border-[var(--rule)] p-6">
                <Art />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="m-0 flex items-baseline gap-3">
                  <span className="font-serif-display text-3xl italic text-[var(--forest)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-geist-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">{service.eyebrow}</span>
                </p>
                <h2 className="font-serif-display m-0 mt-3 text-[1.75rem] leading-tight">{service.title}</h2>
                <p className="mb-0 mt-3 flex-1 leading-relaxed text-[var(--ink-soft)]">{service.lede}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[var(--forest)]">
                  {service.label} <Glyph name="arrow" size={16} />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      <section className="mx-auto grid w-[min(1240px,calc(100%-2.5rem))] items-center gap-10 rounded-[18px] bg-[var(--void)] px-6 py-12 text-[var(--chalk)] md:w-[min(1240px,calc(100%-4rem))] md:grid-cols-12 md:px-12 md:py-16">
        <div className="md:col-span-5">
          <h2 className="font-serif-display m-0 max-w-[16ch] text-4xl font-light leading-tight text-[var(--signal)]">{opportunityReview.title}</h2>
          <p className="mb-0 mt-4 max-w-[36rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">{opportunityReview.lede}</p>
          <Link href={opportunityReview.path} className="btn-signal mt-6">
            Start with one workflow
          </Link>
        </div>
        <div className="md:col-span-7">
          <ReviewArt onDark />
        </div>
      </section>
    </article>
  )
}
