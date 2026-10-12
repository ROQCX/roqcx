import Link from "next/link"
import { MemoryDemo } from "@/components/chat/memory-demo"
import { Glyph, MemoryArt } from "@/components/studio/illustrations"
import { wrap } from "@/components/studio/page-hero"

const stack = [
  ["Notes", "Kept for this session. Delete them any time. A daily job removes them once they are older than 24 hours"],
  ["Answers", "Drawn from what you have told it. If you haven’t, it says so"],
  ["Privacy", "What you type is sent so it can reply. Don’t share anything private"],
]

export default function ChatbotPage() {
  return (
    <>
      <header className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 grid gap-6 pb-28 pt-12 md:grid-cols-12 md:items-end md:pb-32 md:pt-16`}>
          <div className="md:col-span-7">
            <h1 className="font-serif-display m-0 text-[clamp(2.4rem,4.6vw,4.25rem)] font-light leading-[0.98] tracking-[-0.03em] text-[var(--chalk)]">
              Teach it. Then test its memory.
            </h1>
          </div>
          <p className="m-0 text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)] md:col-span-5">
            Tell it something about the work, then ask it back. It answers from what you gave it.
          </p>
        </div>
      </header>

      <div className={`${wrap} relative z-10 -mt-20 pb-16 md:pb-24`}>
        <MemoryDemo
          aside={
            <>
              <section aria-labelledby="how-title" className="plate bg-[var(--chalk)]">
                <h2 id="how-title" className="m-0 border-b border-[var(--rule)] px-5 py-4 text-lg font-medium">
                  How it remembers
                </h2>
                <div className="paper-grid px-5 py-6">
                  <MemoryArt />
                </div>
                <p className="m-0 border-t border-[var(--rule)] px-5 py-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                  Before it answers a question about you, it looks for the closest notes from this session. If you have not told it, it says so instead of guessing.
                </p>
              </section>

              <section className="plate bg-[var(--forest)] p-6 text-[var(--chalk)]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
                  <Glyph name="layers" size={18} />
                </span>
                <h2 className="font-serif-display m-0 mt-4 text-2xl leading-tight">The same idea, on your information</h2>
                <p className="mb-0 mt-2 leading-relaxed text-[color-mix(in_srgb,var(--chalk)_84%,transparent)]">
                  Swap these notes for information your business has approved, and the same pattern answers customer questions from sources you control. Your team decides what goes in.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/services/ai-automation" className="btn-signal">
                    AI automation
                  </Link>
                  <Link href="/contact" className="btn-line">
                    Talk to us
                  </Link>
                </div>
              </section>

              <details className="faq-item plate bg-[var(--chalk)] px-5 py-4">
                <summary className="font-medium">While you try it</summary>
                <dl className="m-0 mt-4 grid gap-3">
                  {stack.map(([term, detail]) => (
                    <div key={term} className="border-t border-[var(--rule)] pt-3">
                      <dt className="text-sm text-[var(--ink-soft)]">{term}</dt>
                      <dd className="m-0 mt-0.5 text-[15px]">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </>
          }
        />
      </div>
    </>
  )
}
