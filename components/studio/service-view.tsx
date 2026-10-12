import Image from "next/image"
import Link from "next/link"
import type { Faq, ProofLink } from "@/lib/site-content"
import { Glyph, ReviewArt, TangleLine, serviceArt } from "./illustrations"

interface ServiceViewProps {
  path: string
  title: string
  lede: string
  situation: string
  problems: string[]
  deliverables: string[]
  process: { title: string; body: string }[]
  boundaries: string[]
  proof: ProofLink[]
  founderNote?: string
  faqs: Faq[]
}

const wrap = "mx-auto w-[min(1240px,calc(100%-2.5rem))] md:w-[min(1240px,calc(100%-4rem))]"
const sectionTitle = "font-serif-display m-0 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.02em]"

export function ServiceView(props: ServiceViewProps) {
  const Art = serviceArt[props.path as keyof typeof serviceArt] ?? ReviewArt

  return (
    <article>
      <header className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20`}>
          <div className="lg:col-span-6">
            <h1 className="font-serif-display m-0 max-w-[16ch] text-[clamp(2.6rem,5vw,4.75rem)] font-light leading-[0.95] tracking-[-0.03em] text-[var(--chalk)]">
              {props.title}
            </h1>
            <p className="mb-0 mt-5 max-w-[38rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">{props.lede}</p>
            <Link href="/contact" className="btn-signal mt-8">
              Talk to us
            </Link>
          </div>
          <div className="lg:col-span-6">
            <div className="plate paper-grid border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] md:p-8">
              <Art />
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-8 py-14 md:grid-cols-12 md:py-20`}>
          <h2 className="m-0 font-geist-mono text-xs font-normal uppercase tracking-[0.18em] text-[var(--forest)] md:col-span-3">Who it’s for</h2>
          <p className="font-serif-display m-0 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug md:col-span-9">
            <span className="text-[var(--clay)]">“</span>
            {props.situation}
          </p>
        </div>
      </section>

      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={sectionTitle}>If this sounds familiar</h2>
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
          {props.problems.map((problem, index) => (
            <li key={problem} className="plate flex gap-4 bg-[var(--chalk)] p-6">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[var(--clay)] font-serif-display text-lg italic text-[var(--clay)]">
                {index + 1}
              </span>
              <span className="pt-1.5 text-lg leading-snug">{problem}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--forest)] text-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-4">
            <h2 className={`${sectionTitle} text-[var(--chalk)]`}>What you get</h2>
          </div>
          <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 md:col-span-8">
            {props.deliverables.map((item) => (
              <li key={item} className="flex gap-4 rounded-[18px] border border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] bg-[color-mix(in_srgb,var(--chalk)_6%,transparent)] p-6">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
                  <Glyph name="check" size={18} strokeWidth={2.25} />
                </span>
                <span className="pt-1 text-lg leading-snug">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={sectionTitle}>How an engagement runs</h2>
        <ol className="relative m-0 mt-12 grid list-none gap-10 p-0 md:gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 220px), 1fr))` }}>
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px border-t-2 border-dashed border-[var(--rule)] md:block" />
          {props.process.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                className={`relative grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--ink)] font-serif-display text-xl ${
                  index === props.process.length - 1 ? "bg-[var(--signal)]" : "bg-[var(--chalk)]"
                }`}
              >
                {index + 1}
              </span>
              <h3 className="m-0 mt-5 text-xl font-medium">{step.title}</h3>
              <p className="mb-0 mt-2 leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-4">
            <h2 className={sectionTitle}>What we agree up front</h2>
          </div>
          <ul className="m-0 grid list-none gap-3 rounded-[24px] border-2 border-dashed border-[var(--forest)] bg-[color-mix(in_srgb,var(--forest)_4%,transparent)] p-4 md:col-span-8 md:p-6">
            {props.boundaries.map((item) => (
              <li key={item} className="flex gap-4 rounded-[14px] bg-[var(--chalk)] p-4 leading-relaxed shadow-[0_1px_0_var(--rule)]">
                <span className="mt-0.5 flex-none text-[var(--forest)]">
                  <Glyph name="lock" size={20} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {props.proof.length > 0 || props.founderNote ? (
        <section className={`${wrap} py-14 md:py-20`}>
          <h2 className={sectionTitle}>Related work</h2>
          {props.proof.length > 0 ? (
            <ul className="m-0 mt-10 grid list-none gap-6 p-0 md:grid-cols-3">
              {props.proof.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="plate lift group flex h-full flex-col bg-[var(--chalk)] text-[var(--ink)] no-underline">
                    {item.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--rule)] bg-[var(--paper)]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xl font-medium">{item.title}</span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{item.note}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-[var(--forest)]">
                        Read the study <Glyph name="arrow" size={16} />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {props.founderNote ? (
            <p className="mb-0 mt-8 flex max-w-[44rem] gap-3 border-l-2 border-[var(--clay)] pl-4 leading-relaxed text-[var(--ink-soft)]">
              {props.founderNote}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
          <h2 className={`${sectionTitle} md:col-span-4`}>Questions</h2>
          <div className="border-t border-[var(--rule)] md:col-span-8">
            {props.faqs.map((faq) => (
              <details key={faq.question} className="faq-item border-b border-[var(--rule)] py-5">
                <summary className="text-lg">{faq.question}</summary>
                <p className="mb-0 mt-3 max-w-[40rem] leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 py-16 md:py-24`}>
          <TangleLine className="mb-10 block h-auto w-full max-w-[720px]" />
          <h2 className="font-serif-display m-0 max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.75rem)] font-light leading-[1] text-[var(--chalk)]">
            What’s taking too much time?
          </h2>
          <p className="mb-0 mt-4 max-w-[36rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">
            Tell us where things get stuck. We’ll say whether a build, an automation or a training session makes sense.
          </p>
          <Link href="/contact" className="btn-signal mt-8">
            Talk to us
          </Link>
        </div>
      </section>
    </article>
  )
}
