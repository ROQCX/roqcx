"use client"

import * as React from "react"
import Link from "next/link"
import { BrandLockup } from "../brand/lockup"
import { serviceNav } from "@/lib/site-content"
import { trainingPath } from "@/lib/training-content"

// AI training has its own top-level link, so the Services menu leaves it out.
const serviceMenu = serviceNav.filter((item) => item.href !== trainingPath)

const links = [
  { href: trainingPath, label: "AI training" },
  { href: "/case-studies", label: "Work" },
  { href: "/chatbot", label: "Chat demo" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const servicesRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false)
        setMenuOpen(false)
      }
    }
    function onPointer(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onPointer)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color-mix(in_srgb,var(--chalk)_12%,transparent)] bg-[var(--void)] text-[var(--chalk)]">
      <div className="mx-auto flex h-[72px] w-[min(1240px,calc(100%-2.5rem))] items-center gap-6 md:w-[min(1240px,calc(100%-4rem))]">
        <Link href="/" aria-label="ROQ CX home" className="mr-auto">
          <BrandLockup height={36} priority onDark />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              className="min-h-11 bg-transparent px-1 text-[var(--chalk)]"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
            </button>
            {servicesOpen ? (
              <ul
                id="services-menu"
                className="absolute left-0 top-full z-10 m-0 min-w-64 list-none border border-[color-mix(in_srgb,var(--chalk)_16%,transparent)] bg-[var(--void)] p-2 shadow-none"
              >
                {serviceMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block min-h-11 px-3 py-2 text-[var(--chalk)] no-underline hover:bg-[color-mix(in_srgb,var(--signal)_16%,transparent)]"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-[var(--chalk)] no-underline hover:text-[var(--signal)]">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-signal"
          >
            Talk to us
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-[var(--chalk)] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" data-open={menuOpen} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-[color-mix(in_srgb,var(--chalk)_12%,transparent)] bg-[var(--void)] px-5 py-4 lg:hidden"
        >
          <p className="m-0 text-sm text-[color-mix(in_srgb,var(--chalk)_70%,transparent)]">Services</p>
          <ul className="m-0 mt-2 list-none p-0">
            {serviceMenu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 py-2 text-[var(--chalk)] no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="m-0 mt-3 list-none border-t border-[color-mix(in_srgb,var(--chalk)_12%,transparent)] p-0 pt-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 py-2 text-[var(--chalk)] no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="btn-signal mt-3"
            onClick={() => setMenuOpen(false)}
          >
            Talk to us
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
