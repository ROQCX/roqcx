"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "../ui/theme-toggle"
import { BrandLockup } from "../brand/lockup"
import { RQX } from "../redesign/atoms"

type MenuItem = { href: string; label: string }

const menuItems: MenuItem[] = [
  { href: "/solutions", label: "Sprints" },
  { href: "/case-studies", label: "Work" },
  { href: "/chatbot", label: "Chat demo" },
  { href: "/insights", label: "Journal" },
  { href: "/about", label: "About" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: `color-mix(in oklab, ${RQX.bg} 78%, transparent)`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: `1px solid ${RQX.lineDim}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            aria-label="ROQ CX"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            <BrandLockup height={46} variant="3d" priority />
          </Link>
        </div>

        <nav
          className="rqx-desktop-nav"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 26,
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: RQX.fgDim,
                fontSize: 13.5,
                letterSpacing: "-0.005em",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="rqx-desktop-actions" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ThemeToggle />
          <Link
            href="/contact"
            style={{
              background: RQX.accent,
              color: RQX.accentFg,
              border: "none",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "-0.005em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            Start a prototype sprint <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="rqx-mobile-actions" style={{ display: "none", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: `1px solid ${RQX.line}`,
              color: RQX.fg,
              width: 38,
              height: 38,
              borderRadius: 10,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rqx-mobile-menu"
          style={{
            background: RQX.bg,
            borderTop: `1px solid ${RQX.lineDim}`,
          }}
        >
          <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 500,
                  color: RQX.fg,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: 12,
                background: RQX.accent,
                color: RQX.accentFg,
                padding: "14px 16px",
                borderRadius: 12,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Start a prototype sprint →
            </Link>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          :global(.rqx-desktop-nav),
          :global(.rqx-desktop-actions) {
            display: none !important;
          }
          :global(.rqx-mobile-actions) {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  )
}
