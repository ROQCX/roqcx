import Link from "next/link"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/footer"
import { Glyph, LostArt } from "@/components/studio/illustrations"
import { wrap } from "@/components/studio/page-hero"
import { serviceNav } from "@/lib/site-content"
import type { Metadata } from "next"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = {
  ...pageSeo({
    title: "Page not found | ROQ CX",
    description: "That page isn’t on roqcx.com. Start from home, or get in touch.",
    path: "/",
    includeCanonical: false,
  }),
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="relative z-10 flex-1 pt-[72px]">
        <section className={`${wrap} grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h1 className="font-serif-display m-0 text-[clamp(2.6rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.03em]">
              That page isn’t here.
            </h1>
            <p className="mb-0 mt-5 max-w-[30rem] text-lg leading-relaxed text-[var(--ink-soft)]">
              The link may be old, or the page may have moved. Start from home, or tell us what you were looking for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn-forest">
                <Glyph name="arrow" size={18} className="rotate-180" />
                Back to home
              </Link>
              <Link href="/contact" className="btn-signal">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="plate paper-grid p-6 md:p-10 lg:col-span-6">
            <LostArt />
          </div>
        </section>
        <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
          <div className={`${wrap} py-12`}>
            <h2 className="m-0 text-sm text-[var(--ink-soft)]">Services</h2>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {serviceNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="plate lift flex min-h-14 items-center justify-between gap-3 bg-[var(--paper)] px-5 py-4 text-[var(--ink)] no-underline">
                    {item.label}
                    <Glyph name="arrow" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
