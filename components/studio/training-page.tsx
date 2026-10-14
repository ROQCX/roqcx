import Link from "next/link"
import type { ReactNode } from "react"
import { TrainingInterestForm } from "@/components/training/interest-form"
import { CurriculumItem, TrackedLink } from "@/components/training/tracked"
import {
  CORPORATE_HASH,
  audiences,
  corporateIncludes,
  curriculum,
  exercises,
  format,
  outcomes,
  principles,
  trainingFaqs,
  type ModuleArt,
} from "@/lib/training-content"
import { Glyph } from "./illustrations"
import { wrap, sectionTitle } from "./page-hero"
import {
  AgentLoopArt,
  ConversationShiftArt,
  HierarchyArt,
  JourneyArt,
  MessyToUsefulArt,
  RctoArt,
} from "./training-illustrations"

const onDarkSoft = "text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]"

const moduleArt: Record<ModuleArt, () => ReactNode> = {
  hierarchy: HierarchyArt,
  rcto: RctoArt,
  agent: AgentLoopArt,
}

export function TrainingPage() {
  return (
    <article>
      {/* Hero */}
      <header className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20`}>
          <div className="lg:col-span-6">
            <h1 className="font-serif-display m-0 text-[clamp(2.8rem,5.4vw,5rem)] font-light leading-[0.95] tracking-[-0.03em] text-[var(--chalk)]">
              AI in Practice
              <span className="mt-3 block text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight tracking-[-0.01em] text-[color-mix(in_srgb,var(--chalk)_78%,transparent)]">
                A practical AI masterclass
              </span>
            </h1>
            <p className="font-serif-display m-0 mt-6 text-[clamp(1.25rem,2vw,1.6rem)] italic leading-snug text-[var(--signal)]">
              Understand it. Experiment with it. Put it to work.
            </p>
            <p className={`mb-0 mt-6 max-w-[38rem] text-lg leading-relaxed ${onDarkSoft}`}>
              You’ve probably used ChatGPT, Claude or another AI tool. But are you getting real value from it, or still figuring out what it can actually do?
            </p>
            <p className={`mb-0 mt-4 max-w-[38rem] text-lg leading-relaxed ${onDarkSoft}`}>
              This one-day masterclass helps professionals understand how AI works, where it falls short and how to use it well in everyday work. Explore the tools, practise on real business scenarios and find opportunities to make AI useful in your own role.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink href="#register" event="registration_interest" location="hero" className="btn-signal">
                Register your interest
              </TrackedLink>
              <TrackedLink href="#corporate" event="corporate_enquiry" location="hero" className="btn-line text-[var(--chalk)]">
                Training for your team
              </TrackedLink>
            </div>
            <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-[color-mix(in_srgb,var(--chalk)_75%,transparent)]">
              {["One day", "Managers and teams", "No coding required"].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="text-[var(--signal)]">
                    <Glyph name="check" size={16} strokeWidth={2.25} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="plate paper-grid border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] md:p-8">
              <JourneyArt />
            </div>
          </div>
        </div>
      </header>

      {/* The problem */}
      <section className="border-b border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 className={`${sectionTitle} max-w-[18ch]`}>Using AI is easy. Using it well takes understanding.</h2>
            <div className="mt-6 grid max-w-[38rem] gap-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              <p className="m-0">
                AI isn’t new. You’ve been using it for years, from recommendation engines and fraud detection to navigation and predictive text. What’s changed is how we interact with it. Instead of working quietly in the background, AI is now something you can talk to: ask it to write, analyse, summarise, compare, explain and solve problems.
              </p>
              <p className="m-0">
                The results can be impressive. But impressive doesn’t always mean useful. AI can confidently give you the wrong answer, agree with a weak idea or produce something polished that misses the point.
              </p>
              <p className="m-0 text-[var(--ink)]">
                The challenge isn’t just writing better prompts. It’s understanding what AI is good at, where it struggles and how to work with it. That’s where this masterclass starts.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="plate paper-grid p-5 md:p-8">
              <ConversationShiftArt />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={`${sectionTitle} max-w-[22ch]`}>What you’ll take away from the masterclass</h2>
        <p className="mb-0 mt-4 max-w-[40rem] text-lg leading-relaxed text-[var(--ink-soft)]">
          You don’t need to become an AI expert. You should leave with a better understanding of the technology and practical ways to start using it.
        </p>
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <li key={item.title} className="plate flex flex-col bg-[var(--chalk)] p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ink)] bg-[var(--paper)]">
                <Glyph name={item.icon} size={20} />
              </span>
              <h3 className="m-0 mt-6 text-xl font-medium">{item.title}</h3>
              <p className="mb-0 mt-2 leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Curriculum */}
      <section className="border-y border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:py-20 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className={`${sectionTitle}`}>What we’ll cover in the AI masterclass</h2>
              <p className="mb-0 mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                Six modules that take you from the fundamentals to applying AI in your own work.
              </p>
              <div className="plate paper-grid mx-auto mt-8 hidden max-w-[360px] p-5 lg:block">
                <HierarchyArt />
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--rule)] lg:col-span-7">
            {curriculum.map((module, index) => {
              const Art = module.art ? moduleArt[module.art] : null
              return (
                <CurriculumItem key={module.title} index={index + 1} title={module.title} defaultOpen={index === 0}>
                  <p className="mb-0 mt-3 max-w-[40rem] leading-relaxed text-[var(--ink-soft)]">{module.body}</p>
                  {Art ? (
                    <div className={`plate paper-grid mt-5 max-w-[480px] p-4 ${module.art === "hierarchy" ? "lg:hidden" : ""}`}>
                      <Art />
                    </div>
                  ) : null}
                </CurriculumItem>
              )
            })}
          </div>
        </div>
      </section>

      {/* Exercises */}
      <section className="bg-[var(--forest)] text-[var(--chalk)]">
        <div className={`${wrap} py-14 md:py-20`}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className={`${sectionTitle} text-[var(--chalk)]`}>Less watching. More doing.</h2>
              <p className={`mb-0 mt-4 max-w-[36rem] text-lg leading-relaxed ${onDarkSoft}`}>
                This isn’t a day of slides and impressive demos. You’ll work through practical exercises that apply each idea to real business problems.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="plate paper-grid p-4 md:p-6">
                <MessyToUsefulArt />
              </div>
            </div>
          </div>
          <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
            {exercises.map((exercise) => (
              <li
                key={exercise.title}
                className="rounded-[18px] border border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] bg-[color-mix(in_srgb,var(--chalk)_6%,transparent)] p-6"
              >
                <h3 className="m-0 text-xl font-medium">{exercise.title}</h3>
                {exercise.body.map((paragraph) => (
                  <p key={paragraph} className={`mb-0 mt-3 leading-relaxed ${onDarkSoft}`}>
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audience */}
      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={`${sectionTitle}`}>Who is this AI masterclass for?</h2>
        <p className="mb-0 mt-4 max-w-[40rem] text-lg leading-relaxed text-[var(--ink-soft)]">
          You don’t need a technical background or previous AI training. It’s for people who want to move beyond experimenting and start using AI more effectively.
        </p>
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
          {audiences.map((item) => (
            <li key={item.title} className="plate flex gap-4 bg-[var(--chalk)] p-6">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[var(--clay)] text-[var(--clay)]">
                <Glyph name={item.icon} size={18} />
              </span>
              <span>
                <h3 className="m-0 text-lg font-medium">{item.title}</h3>
                <p className="mb-0 mt-1 leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </span>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-8 max-w-[44rem] border-l-2 border-[var(--clay)] pl-4 leading-relaxed text-[var(--ink-soft)]">
          Whether you’ve never used ChatGPT or use AI every day, the aim is the same: understand the technology well enough to use it with more confidence and better judgement.
        </p>
      </section>

      {/* Differentiation */}
      <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
        <div className={`${wrap} grid gap-10 py-14 md:py-20 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className={`${sectionTitle} max-w-[16ch]`}>It’s not about learning a hundred prompts.</h2>
            <p className="mb-0 mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              AI tools change quickly. Memorising prompts or learning where every button sits will only get you so far. This masterclass focuses on the concepts and skills that stay useful as the technology moves.
            </p>
          </div>
          <ul className="m-0 grid list-none gap-0 border-t border-[var(--rule)] p-0 lg:col-span-7">
            {principles.map((item) => (
              <li key={item.title} className="border-b border-[var(--rule)] py-6">
                <h3 className="m-0 text-xl font-medium">{item.title}</h3>
                <p className="mb-0 mt-2 leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Corporate */}
      <section id="corporate" className="scroll-mt-24 py-14 md:py-20">
        <div className={`${wrap} grid items-start gap-10 rounded-[18px] bg-[var(--void)] px-6 py-12 text-[var(--chalk)] md:px-12 md:py-16 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 className="font-serif-display m-0 max-w-[16ch] text-[clamp(2rem,3.6vw,3.25rem)] font-light leading-[1.02] text-[var(--chalk)]">
              Bring the AI masterclass to your team.
            </h2>
            <p className={`mb-0 mt-5 max-w-[36rem] text-lg leading-relaxed ${onDarkSoft}`}>
              AI adoption isn’t just giving people access to the latest tools. It’s helping them understand what those tools can do, encouraging experimentation and setting sensible boundaries for using AI at work.
            </p>
            <p className={`mb-0 mt-4 max-w-[36rem] text-lg leading-relaxed ${onDarkSoft}`}>
              Corporate workshops are tailored to your organisation’s functions, the tools you already use and your everyday business challenges.
            </p>
            <TrackedLink href={CORPORATE_HASH} event="corporate_enquiry" location="corporate_section" className="btn-signal mt-8">
              Enquire about corporate training
            </TrackedLink>
          </div>
          <div className="lg:col-span-6">
            <p className="m-0 text-sm text-[color-mix(in_srgb,var(--chalk)_70%,transparent)]">A tailored workshop can include:</p>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {corporateIncludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-[14px] border border-[color-mix(in_srgb,var(--chalk)_16%,transparent)] bg-[color-mix(in_srgb,var(--chalk)_5%,transparent)] p-4 leading-relaxed"
                >
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
                    <Glyph name="check" size={15} strokeWidth={2.25} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="border-t border-[var(--rule)]">
        <div className={`${wrap} grid gap-8 py-14 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-4">
            <h2 className="font-serif-display m-0 text-3xl leading-tight">Taught by the studio.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="m-0 text-lg leading-relaxed">
              AI in Practice is run by ROQ CX. The day uses the same judgement as the studio’s client work: where AI helps, where it does not, and what a person still has to check.
            </p>
            <p className="mb-0 mt-4 leading-relaxed text-[var(--ink-soft)]">
              You practise on your own non-confidential work, then leave with a way to judge what is worth trying next.
            </p>
            <p className="mb-0 mt-6">
              <Link href="/about" className="inline-flex min-h-11 items-center text-[var(--ink)] underline decoration-[var(--signal)] decoration-2 underline-offset-4">
                About the studio
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Format and registration */}
      <section id="register" className="scroll-mt-24 border-t border-[var(--rule)] bg-[var(--chalk)]">
        <span id={CORPORATE_HASH.slice(1)} className="block scroll-mt-24" aria-hidden="true" />
        <div className={`${wrap} grid gap-12 py-14 md:py-20 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className={`${sectionTitle}`}>A practical day of learning, experimenting and applying AI.</h2>
            <dl className="m-0 mt-8 grid grid-cols-2 gap-3">
              {format.map((item) => (
                <div key={item.label} className="plate bg-[var(--paper)] p-4">
                  <dt className="flex items-center gap-2 text-sm text-[var(--forest)]">
                    <Glyph name={item.icon} size={14} />
                    {item.label}
                  </dt>
                  <dd className="m-0 mt-2 leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mb-0 mt-6 leading-relaxed text-[var(--ink-soft)]">
              The day mixes short explanations, live demonstrations, individual exercises and group discussion. Bring real, non-confidential work examples to use in the exercises.
            </p>
          </div>
          <div className="plate self-start bg-[var(--paper)] p-6 shadow-[0_24px_50px_-30px_rgba(18,21,19,0.35)] md:p-10 lg:col-span-7">
            <h3 className="font-serif-display m-0 text-3xl">Register your interest</h3>
            <p className="mb-6 mt-2 leading-relaxed text-[var(--ink-soft)]">
              Hear about upcoming masterclass dates, or ask about a session for your organisation.
            </p>
            <TrainingInterestForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)]">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12 md:py-20`}>
          <h2 className={`${sectionTitle} md:col-span-4`}>Frequently asked questions about the AI masterclass</h2>
          <div className="border-t border-[var(--rule)] md:col-span-8">
            {trainingFaqs.map((faq) => (
              <details key={faq.question} className="faq-item border-b border-[var(--rule)] py-5">
                <summary className="text-lg">{faq.question}</summary>
                <p className="mb-0 mt-3 max-w-[40rem] leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-stage">
        <div className="aurora" aria-hidden="true" />
        <div className={`${wrap} relative z-10 py-16 md:py-24`}>
          <h2 className="font-serif-display m-0 max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.75rem)] font-light leading-[1] text-[var(--chalk)]">
            Stop wondering what AI can do. Start finding out what it can do for you.
          </h2>
          <p className={`mb-0 mt-5 max-w-[38rem] text-lg leading-relaxed ${onDarkSoft}`}>
            You don’t need the perfect prompt, tool or process to start. You need a practical understanding of the technology, a willingness to experiment and the judgement to recognise what works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink href="#register" event="registration_interest" location="final_cta" className="btn-signal">
              Register your interest
            </TrackedLink>
            <TrackedLink href={CORPORATE_HASH} event="corporate_enquiry" location="final_cta" className="btn-line text-[var(--chalk)]">
              Enquire about corporate training
            </TrackedLink>
          </div>
        </div>
      </section>
    </article>
  )
}
