"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ThemeToggle } from "../ui/theme-toggle"

interface MenuItem {
  href: string
  label: string
  target?: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/solutions",
    label: "Solutions",
    submenu: [
      { href: "/solutions/automation", label: "Process Automation" },
      { href: "/solutions/analytics", label: "Analytics & Dashboards" },
      { href: "/solutions/ai", label: "AI & Predictive Models" },
      { href: "/solutions/roqchat", label: "ROQChat AI Assistant" },
    ],
  },
  { href: "/about", label: "About" },
  { 
    href: "/case-studies", 
    label: "Case Studies",
    submenu: [
      { href: "/case-studies", label: "All Case Studies" },
      { href: "/case-studies/dubai-7s-ticketing", label: "Dubai 7s Ticketing Platform" },
    ]
  },
  { href: "/insights", label: "Insights" },
  { href: "/chatbot", label: "Demo Chat" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-lg bg-background/60">
      <div className="container mx-auto flex h-28 items-center justify-between px-4">
        <div className="flex-none">
          <div className="relative h-32 w-32">
            <Link href="/" className="group">
              <Image
                src="/3d_logo.svg"
                alt="ROQ CX"
                fill
                className="object-contain py-4 transition-all duration-200 group-hover:scale-105 filter dark:drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)] drop-shadow-[0_2px_4px_rgba(0,0,32,0.1)]"
                priority
                sizes="128px"
                quality={100}
              />
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          {menuItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-base font-medium transition-colors hover:text-roq-pink"
                target={item.target}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="absolute left-0 hidden pt-4 group-hover:block">
                  <div className="rounded-md bg-background/80 backdrop-blur-lg p-3 shadow-lg border border-border/50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block whitespace-nowrap px-4 py-2.5 text-base hover:text-roq-pink rounded-md hover:bg-foreground/5"
                        target={subItem.target}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
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

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-x-0 top-24 bg-background/80 backdrop-blur-lg md:hidden border-t border-border/50"
        >
          <div className="container mx-auto px-4 py-4">
            {menuItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-medium hover:text-roq-pink"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="ml-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-3 text-base hover:text-roq-pink pl-4 rounded-md hover:bg-foreground/5"
                        onClick={() => setIsOpen(false)}
                        target={subItem.target}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
} 