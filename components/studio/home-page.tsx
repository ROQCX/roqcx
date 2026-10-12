import Link from "next/link"
import type { CaseStudy } from "@/lib/case-studies"
import { WorkCover } from "@/components/case-studies/work-cover"
import { homeFaqs, services } from "@/lib/site-content"
import {
  BoundaryArt,
  Glyph,
  IdeasSpot,
  RetypeSpot,
  ReviewArt,
  ToolsSpot,
  WaitSpot,
  boundaryItems,
  serviceArt,
} from "./illustrations"
import { HeroStory } from "./hero-story"
import { UntangleArt } from "./untangle-art"
import { ReplyScene, RetypeScene, RouteScene, SearchScene } from "./problem-scenes"

const scenarios = [
  { text: "People use different tools, and there is no shared approach.", Art: ToolsSpot },
  { text: "Customers wait while the team searches for the answer.", Art: WaitSpot },
  { text: "Routine work still means copying, chasing and re-entering.", Art: RetypeSpot },
  { text: "There are plenty of ideas, and no clear starting point.", Art: IdeasSpot },
]

const workflows = [
  {
    title: "Slow first replies",
    change: "Sort each enquiry and draft a reply from approved information.",
    human: "A person sends it",
    measure: "Time to a useful reply",
    Scene: ReplyScene,
  },
  {
    title: "Details retyped by hand",
    change: "Pull the agreed fields into the system you already use.",
    human: "Someone checks the fields",
    measure: "Items still retyped",
    Scene: RetypeScene,
  },
  {
    title: "Answers only one person knows",
    change: "Search across the documents you have approved.",
    human: "You choose the sources",
    measure: "Answers found without asking",
    Scene: SearchScene,
  },
  {
    title: "Requests that stall",
    change: "Route each request to the right queue, with its context attached.",
    human: "The owner still approves",
    measure: "Time before someone acts",
    Scene: RouteScene,
  },
]


const wrap = "mx-auto w-[min(1240px,calc(100%-2.5rem))] md:w-[min(1240px,calc(100%-4rem))]"
const sectionTitle = "font-serif-display m-0 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em]"

interface HomePageProps {
  studies: CaseStudy[]
}

export function HomePage({ studies }: HomePageProps) {
  return (
    <div>
      <HeroStory />

      <section className="border-b border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} py-16 md:py-24`}>
          <h2 className={`${sectionTitle} max-w-[18ch]`}>Already using AI. Not sure what comes next?</h2>
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {scenarios.map(({ text, Art }) => (
              <li key={text} className="plate lift flex flex-col bg-[var(--chalk)]">
                <div className="paper-grid border-b border-[var(--rule)] px-6 py-5">
                  <Art />
                </div>
                <p className="m-0 p-6 text-lg leading-snug">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} py-16 md:py-24`}>
        <h2 className={`${sectionTitle} max-w-[16ch]`}>Start with a problem worth solving.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {workflows.map(({ title, change, human, measure, Scene }) => (
            <article key={title} className="plate lift flex flex-col bg-[var(--chalk)]">
              <div className="paper-grid border-b border-[var(--rule)] px-4 pt-5 md:px-8 md:pt-7">
                <Scene />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="m-0 text-2xl font-medium leading-snug">{title}</h3>
                <p className="mb-0 mt-2 text-lg leading-snug text-[var(--ink-soft)]">{change}</p>
                <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-6 text-sm">
                  <li className="inline-flex items-center gap-2 rounded-full bg-[var(--signal)] px-3 py-1.5 text-[var(--ink)]">
                    <Glyph name="person" size={15} />
                    <span className="sr-only">A person still: </span>
                    {human}
                  </li>
                  <li className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-1.5">
                    <Glyph name="gauge" size={15} />
                    <span className="sr-only">What we’d measure: </span>
                    {measure}
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} py-16 md:py-24`}>
          <h2 className={`${sectionTitle} max-w-[22ch]`}>
            Build what’s needed. Automate what’s repetitive. Train the people using it.
          </h2>
          <div className="mt-14 grid gap-16 md:gap-24">
            {services.map((service, index) => {
              const Art = serviceArt[service.path as keyof typeof serviceArt]
              const flip = index % 2 === 1
              return (
                <article key={service.path} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <div className={`plate paper-grid p-6 md:col-span-7 md:p-10 ${flip ? "md:order-2" : ""}`}>
                    <Art />
                  </div>
                  <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <h3 className="font-serif-display m-0 text-4xl">{service.eyebrow}</h3>
                    <p className="mb-0 mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">{service.lede}</p>
                    <ul className="m-0 mt-6 grid list-none gap-2 p-0">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-3 leading-snug">
                          <span className="mt-0.5 text-[var(--forest)]">
                            <Glyph name="check" size={18} strokeWidth={2.25} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.path} className="btn-forest mt-7">
                      {service.label}
                      <Glyph name="arrow" size={18} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--void)] text-[var(--chalk)]">
        <div className={`${wrap} grid items-center gap-12 py-16 md:grid-cols-12 md:py-24`}>
          <div className="md:col-span-5">
            <h2 className={`${sectionTitle} text-[var(--chalk)]`}>Find a sensible place to start.</h2>
            <p className="mb-0 mt-5 text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_84%,transparent)]">
              The AI Opportunity Review looks at one workflow and how AI is already being used. You get a short list of opportunities, a recommended pilot, and what to measure. It may also recommend that you do not use AI for this.
            </p>
            <Link href="/ai-opportunity-review" className="btn-signal mt-8">
              Talk through the problem
            </Link>
          </div>
          <div className="md:col-span-7">
            <ReviewArt onDark />
          </div>
        </div>
      </section>

      <section className={`${wrap} py-16 md:py-24`}>
        <div className="flex items-end justify-between gap-6">
          <h2 className={sectionTitle}>Selected work</h2>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[var(--ink)] underline decoration-[var(--signal)] decoration-2 underline-offset-4">
            All work <Glyph name="arrow" size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {studies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`} className="plate lift group flex h-full flex-col bg-[var(--chalk)] text-[var(--ink)] no-underline">
              <WorkCover study={study} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="m-0 text-xl font-medium leading-snug">{study.title}</h3>
                <p className="mb-0 mt-2 flex-1 leading-relaxed text-[var(--ink-soft)]">{study.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[var(--forest)]">
                  Read the study <Glyph name="arrow" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid items-center gap-12 py-16 md:grid-cols-12 md:py-24`}>
          <div className="md:col-span-5">
            <h2 className={sectionTitle}>Useful automation. Clear boundaries.</h2>
            <ol className="m-0 mt-8 grid list-none gap-0 p-0">
              {boundaryItems.map((item, index) => (
                <li key={item.label} className="flex items-center gap-4 border-t border-[var(--rule)] py-4 text-lg">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[var(--ink)] bg-[var(--paper)]">
                    <Glyph name={item.icon} size={18} />
                  </span>
                  <span>
                    <span className="sr-only">{index + 1}. </span>
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="plate paper-grid p-6 md:col-span-7 md:p-10">
            <BoundaryArt />
          </div>
        </div>
      </section>

      <section className={`${wrap} py-16 md:py-24`}>
        <h2 className={sectionTitle}>Who you work with</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="plate bg-[var(--forest)] p-8 text-[var(--chalk)] md:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
              <Glyph name="layers" size={22} />
            </span>
            <p className="font-serif-display m-0 mt-6 text-3xl">ROQ CX</p>
            <p className="mb-0 mt-3 text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_86%,transparent)]">
              The studio you hire for websites, web apps, automations and training.
            </p>
          </div>
          <div className="plate bg-[var(--chalk)] p-8 md:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--ink)] bg-[var(--paper)]">
              <Glyph name="person" size={22} />
            </span>
            <p className="font-serif-display m-0 mt-6 text-3xl">Zayne Nair</p>
            <p className="mb-0 mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
              Founder of the studio. Fractional product leadership is a separate practice, on his personal site.
            </p>
            <Link href="https://www.zaynenair.com" className="mt-5 inline-flex items-center gap-2 text-[var(--ink)] underline decoration-[var(--signal)] decoration-2 underline-offset-4">
              Looking for fractional product leadership? Meet Zayne. <Glyph name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-16 md:grid-cols-12 md:py-24`}>
          <h2 className={`${sectionTitle} md:col-span-4`}>Questions</h2>
          <div className="border-t border-[var(--rule)] md:col-span-8">
            {homeFaqs.map((faq) => (
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
        <div className={`${wrap} relative z-10 grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 className="font-serif-display m-0 max-w-[16ch] text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-[var(--chalk)]">
              What’s taking too much time, or making life harder for your customers?
            </h2>
            <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">
              Tell us where things get stuck. We’ll explore whether a build, automation or training engagement makes sense.
            </p>
            <Link href="/contact" className="btn-signal mt-8">
              Talk to us
            </Link>
          </div>
          <div className="lg:col-span-6">
            <UntangleArt className="mx-auto block h-auto w-full max-w-[620px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
