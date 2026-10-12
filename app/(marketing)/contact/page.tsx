import type { Metadata } from "next"
import Script from "next/script"
import { ContactForm } from "@/components/contact/contact-form"
import { ReplyArt } from "@/components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Contact | ROQ CX",
  description:
    "Tell us where things get stuck. We’ll say whether a build, an automation or a training session makes sense.",
  path: "/contact",
})

const details = [
  { label: "Email", value: "hello@roqcx.com", href: "mailto:hello@roqcx.com" },
  { label: "WhatsApp", value: "+971 56 252 0720", href: "https://wa.me/971562520720" },
  { label: "Studio", value: "Dubai, UAE", href: "https://maps.google.com/?q=Dubai" },
]

export default function ContactPage() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <article className="mx-auto grid w-[min(1240px,calc(100%-2.5rem))] gap-12 pb-24 pt-16 md:w-[min(1240px,calc(100%-4rem))] md:grid-cols-12 md:pt-20">
        <header className="md:col-span-5">
          <h1 className="font-serif-display m-0 text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.08]">
            Tell us where it gets stuck.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
            A few lines are enough. We read them and reply by email. Please don’t include passwords, customer records or confidential documents.
          </p>
          <ul className="m-0 mt-8 list-none p-0">
            {details.map((item) => (
              <li key={item.label} className="border-t border-[var(--rule)] py-3">
                <span className="block text-sm text-[var(--ink-soft)]">{item.label}</span>
                <a href={item.href} className="text-[var(--ink)]">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
          <div className="plate paper-grid mt-8 p-5">
            <ReplyArt />
          </div>
        </header>
        <div className="plate self-start bg-[var(--chalk)] p-6 shadow-[0_24px_50px_-30px_rgba(18,21,19,0.35)] md:col-span-7 md:p-10">
          <ContactForm />
        </div>
      </article>
    </>
  )
}
