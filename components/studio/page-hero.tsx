import Link from "next/link"
import type { ReactNode } from "react"

export const wrap = "mx-auto w-[min(1240px,calc(100%-2.5rem))] md:w-[min(1240px,calc(100%-4rem))]"
export const sectionTitle = "font-serif-display m-0 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.02em]"

interface PageHeroProps {
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
  /** Wayfinding above the title, such as a breadcrumb. */
  nav?: ReactNode
  /** Illustration or image shown beside the copy on wide screens. */
  art?: ReactNode
  /** Put the art on a drafting-paper plate. Off for art drawn for dark backgrounds. */
  plate?: boolean
}

export function PageHero({ title, lede, children, nav, art, plate = true }: PageHeroProps) {
  return (
    <header className="hero-stage">
      <div className="aurora" aria-hidden="true" />
      <div className={`${wrap} relative z-10 grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20`}>
        <div className={art ? "lg:col-span-6" : "lg:col-span-9"}>
          {nav}
          <h1 className={`font-serif-display m-0 max-w-[18ch] text-[clamp(2.4rem,4.6vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-[var(--chalk)] ${nav ? "mt-4" : ""}`}>
            {title}
          </h1>
          {lede ? (
            <p className="mb-0 mt-5 max-w-[38rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">{lede}</p>
          ) : null}
          {children}
        </div>
        {art ? (
          <div className="lg:col-span-6">
            {plate ? (
              <div className="plate paper-grid border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] md:p-8">
                {art}
              </div>
            ) : (
              art
            )}
          </div>
        ) : null}
      </div>
    </header>
  )
}

/** Closing call to action shared by long-form pages. */
export function ClosingCta({ title, body, art }: { title: string; body: string; art?: ReactNode }) {
  return (
    <section className="hero-stage">
      <div className="aurora" aria-hidden="true" />
      <div className={`${wrap} relative z-10 py-16 md:py-24`}>
        {art}
        <h2 className="font-serif-display m-0 max-w-[16ch] text-[clamp(2.2rem,4.4vw,3.75rem)] font-light leading-[1] text-[var(--chalk)]">{title}</h2>
        <p className="mb-0 mt-4 max-w-[36rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">{body}</p>
        <Link href="/contact" className="btn-signal mt-8">
          Talk to us
        </Link>
      </div>
    </section>
  )
}
