import Link from "next/link"
import { BrandLockup } from "./brand/lockup"
import { serviceNav } from "@/lib/site-content"

const footerLink = "flex min-h-11 items-center text-[var(--chalk)] no-underline"

const studio = [
  { label: "Work", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Chat demo", href: "/chatbot" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
]

export function Footer() {
  return (
    <footer className="bg-[var(--void)] text-[var(--chalk)]">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2.5rem))] gap-10 py-14 md:w-[min(1240px,calc(100%-4rem))] md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandLockup height={40} onDark />
          <p className="mb-0 mt-4 max-w-sm leading-relaxed text-[color-mix(in_srgb,var(--chalk)_78%,transparent)]">
            ROQ CX helps SMEs move from ad hoc AI use to practical solutions that improve customer experience and reduce operational overhead.
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="m-0 text-sm text-[color-mix(in_srgb,var(--chalk)_62%,transparent)]">Services</h2>
          <ul className="m-0 mt-3 list-none p-0">
            {serviceNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="m-0 text-sm text-[color-mix(in_srgb,var(--chalk)_62%,transparent)]">Studio</h2>
          <ul className="m-0 mt-3 list-none p-0">
            {studio.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="m-0 text-sm text-[color-mix(in_srgb,var(--chalk)_62%,transparent)]">Contact</h2>
          <ul className="m-0 mt-3 list-none p-0">
            <li>
              <a href="mailto:hello@roqcx.com" className={footerLink}>
                hello@roqcx.com
              </a>
            </li>
            <li>
              <a href="tel:+971562520720" className={footerLink}>
                +971 56 252 0720
              </a>
            </li>
            <li>
              <a href="https://wa.me/971562520720" className={footerLink}>
                WhatsApp
              </a>
            </li>
            <li className="py-2 leading-relaxed">ROQ CX - FZCO, Dubai, UAE. Working with SMEs remotely as well.</li>
            <li>
              <a href="https://www.linkedin.com/company/roqcx" className={footerLink}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
