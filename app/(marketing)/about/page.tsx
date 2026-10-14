import type { Metadata } from "next"
import Link from "next/link"
import { AboutArt, Glyph, TangleLine, type GlyphName } from "@/components/studio/illustrations"
import { PageHero, sectionTitle, wrap } from "@/components/studio/page-hero"
import { pageSeo } from "@/lib/seo"

const cycle: { icon: GlyphName; title: string; body: string }[] = [
  { icon: "eye", title: "Map the flow", body: "See where the work goes and where it waits, before anyone names a tool." },
  { icon: "search", title: "Find the constraint", body: "Find what actually holds the work up, and test that explanation." },
  { icon: "pen", title: "Design a test", body: "Agree the hypothesis, owner, measures and decision rule before we build." },
  { icon: "flag", title: "Run the pilot", body: "Build the smallest version that could work, bounded in scope and risk." },
  { icon: "gauge", title: "Review the evidence", body: "Judge it on customer outcomes, flow, quality and risk, not on activity." },
  { icon: "handoff", title: "Keep, change or stop", body: "Decide from the evidence, then go round again on the next constraint." },
]

const aiNative = [
  {
    title: "Research",
    body: "We use AI to read faster and wider, then check what matters by hand before it reaches a client.",
  },
  {
    title: "Design and build",
    body: "Prototypes, websites and applications are built with AI in the loop, so a working version arrives early and gets tested on real people.",
  },
  {
    title: "Operations",
    body: "Our own admin, follow-ups and reporting run on the same kind of automations we build for clients.",
  },
]

export const metadata: Metadata = pageSeo({
  title: "About ROQ CX | AI-Native Studio in Dubai",
  description:
    "ROQ CX is an AI-native studio in Dubai. We help small and medium-sized businesses put AI to work through websites, web apps, automation and practical training.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <article>
      <PageHero
        title="A studio built to put AI to work."
        lede="ROQ CX helps small and medium-sized businesses use AI for better customer experiences and less operational overhead. We find the opportunities worth pursuing, build the websites, apps and automations to support them, and train teams to use them well."
        art={<AboutArt />}
        plate={false}
      />

      <section className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
        <h2 className={`${sectionTitle} md:col-span-4`}>Why the studio exists</h2>
        <div className="grid gap-4 text-lg leading-relaxed text-[var(--ink-soft)] md:col-span-7 md:col-start-6">
          <p className="m-0 text-[var(--ink)]">
            Large organisations have AI teams, consultancies and budgets for long programmes. Most smaller businesses have a few people trying ChatGPT on their own, and no clear idea of what is worth doing next.
          </p>
          <p className="m-0">
            That gap is where ROQ CX works. We start from the business problem, not the tool, and build the smallest thing that changes how the work gets done. Sometimes that is an automation. Sometimes it is a better website or a working prototype. Sometimes the right answer is not AI at all.
          </p>
          <div className="plate mt-6 bg-[var(--void)] px-6 py-8 md:px-10">
            <TangleLine />
            <p className="mb-0 mt-6 max-w-[34rem] text-base text-[color-mix(in_srgb,var(--chalk)_80%,transparent)]">
              From scattered experiments to one clear path a team can run.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
          <h2 className={`${sectionTitle} md:col-span-4`}>Why Dubai</h2>
          <div className="grid gap-4 text-lg leading-relaxed text-[var(--ink-soft)] md:col-span-7 md:col-start-6">
            <p className="m-0 text-[var(--ink)]">
              Few places have committed to AI as openly as the UAE. Government services, regulators and large employers are already moving, and the expectation is spreading to every business that serves them.
            </p>
            <p className="m-0">
              Dubai is also a city of small and medium-sized businesses: founder-led, multilingual, serving customers from everywhere and competing on service. They feel the pressure to adopt AI first, often without the people to do it.
            </p>
            <p className="m-0">
              Being here means we understand that context, can sit in the room when it helps, and work across the GCC. We also work with businesses elsewhere, remotely.
            </p>
          </div>
        </div>
      </section>

      <section className={`${wrap} py-14 md:py-20`}>
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className={`${sectionTitle} md:col-span-4`}>AI native, in practice</h2>
          <div className="grid gap-4 text-lg leading-relaxed text-[var(--ink-soft)] md:col-span-7 md:col-start-6">
            <p className="m-0 text-[var(--ink)]">
              ROQ CX was set up around AI from the start. It is not a service line added to an existing agency. It is how the studio works every day.
            </p>
            <p className="m-0">
              That keeps the team small and the work fast. It also means we know where AI helps and where it fails, because we rely on it ourselves. What we recommend to clients, we have already used.
            </p>
          </div>
        </div>
        <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {aiNative.map((item) => (
            <li key={item.title} className="plate bg-[var(--chalk)] p-6">
              <h3 className="m-0 text-xl font-medium">{item.title}</h3>
              <p className="mb-0 mt-2 leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--rule)]">
        <div className={`${wrap} py-14 md:py-20`}>
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className={`${sectionTitle} md:col-span-4`}>How we choose what to build</h2>
            <div className="grid gap-4 text-lg leading-relaxed text-[var(--ink-soft)] md:col-span-7 md:col-start-6">
              <p className="m-0 text-[var(--ink)]">
                We run our own work, and every client engagement, on a short improvement cycle. It keeps each commitment small enough to test, and lets evidence decide what happens next.
              </p>
              <p className="m-0">
                A person stays able to approve, stop or correct anything we put in place. We agree what we will measure before we start.
              </p>
            </div>
          </div>
          <ol className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {cycle.map((step, index) => (
              <li key={step.title} className="plate flex gap-4 bg-[var(--chalk)] p-6">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[var(--ink)] bg-[var(--paper)]">
                  <Glyph name={step.icon} size={20} />
                </span>
                <span>
                  <h3 className="m-0 text-lg font-medium">
                    <span className="mr-2 text-[var(--forest)]">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="mb-0 mt-1 leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 py-16 md:py-24`}>
          <h2 className="font-serif-display m-0 max-w-[20ch] text-[clamp(2.2rem,4.4vw,3.75rem)] font-light leading-[1] text-[var(--chalk)]">
            Have something AI could make easier?
          </h2>
          <p className="mb-0 mt-5 max-w-[38rem] text-lg leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">
            Tell us what slows your team down. We will tell you honestly whether AI is the answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-signal">
              Talk to us
            </Link>
            <Link href="/case-studies" className="btn-line text-[var(--chalk)]">
              See our work
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
