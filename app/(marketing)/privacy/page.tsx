import type { Metadata } from "next"
import { PageHero, wrap } from "@/components/studio/page-hero"
import { Glyph, PrivacyFlowArt, type GlyphName } from "@/components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Privacy | ROQ CX",
  description:
    "What happens to an enquiry sent to ROQ CX, and which tools run when you visit the site.",
  path: "/privacy",
})

const loads: { icon: GlyphName; body: string }[] = [
  {
    icon: "grid",
    body: "Google Tag Manager, shared with zaynenair.com so a visit can be recognised across both sites. It can load analytics and advertising tags.",
  },
  {
    icon: "eye",
    body: "A LinkedIn tag, so we can see visits that come from LinkedIn.",
  },
  {
    icon: "compass",
    body: "If you arrive from another site or a campaign link, we remember that source in this browser for the session and include it with your enquiry, separate from what you write.",
  },
  {
    icon: "chat",
    body: "The chat on other pages sends what you type to OpenAI so it can reply. That conversation is not saved in a website database.",
  },
  {
    icon: "layers",
    body: "The memory demo at /chatbot saves what you type for that browser session so it can recall it. Delete notes removes them immediately. A daily cleanup removes anything older than 24 hours.",
  },
]

export default function PrivacyPage() {
  return (
    <article className="pb-20">
      <PageHero
        title="Privacy"
        lede="ROQ CX is operated from Dubai. Enquiries are read by the studio at hello@roqcx.com."
        art={<PrivacyFlowArt />}
      />
      <div className={`${wrap} grid gap-10 py-14 md:py-20 lg:grid-cols-12`}>
        <div className="grid gap-10 lg:col-span-8">
          <section className="plate bg-[var(--chalk)] p-6 md:p-8">
            <h2 className="m-0 flex items-center gap-3 text-2xl font-medium">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--signal)]">
                <Glyph name="form" size={18} />
              </span>
              Enquiry form
            </h2>
            <p className="mb-0 mt-4 leading-relaxed">
              The contact form asks for your name, email, business name, and what you would like to improve. Interest and timing are optional. Google reCAPTCHA checks the submission. If it passes, the message is emailed to hello@roqcx.com. We don’t keep a copy in a website database. Please don’t include passwords, customer records or confidential documents.
            </p>
            <p className="mb-0 mt-3 leading-relaxed text-[var(--ink-soft)]">
              We keep the email so we can reply. Write to hello@roqcx.com if you want that enquiry deleted. Don’t include passwords, customer records or confidential documents.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display m-0 text-3xl">Tools that run in your browser</h2>
            <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
              {loads.map((item, index) => (
                <li key={index} className="plate flex flex-col gap-4 bg-[var(--chalk)] p-6 leading-relaxed">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)] bg-[var(--paper)]">
                    <Glyph name={item.icon} size={18} />
                  </span>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
        <aside className="lg:col-span-4">
          <div className="plate bg-[var(--forest)] p-6 text-[var(--chalk)] lg:sticky lg:top-[96px]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
              <Glyph name="mail" size={18} />
            </span>
            <p className="font-serif-display m-0 mt-4 text-2xl leading-tight">Questions about your data?</p>
            <p className="mb-0 mt-2 leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">Write to the studio and we’ll answer directly.</p>
            <a href="mailto:hello@roqcx.com" className="btn-signal mt-5">
              hello@roqcx.com
            </a>
          </div>
        </aside>
      </div>
    </article>
  )
}
