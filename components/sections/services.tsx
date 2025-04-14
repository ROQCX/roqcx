"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { GlassCard } from "../ui/glass-card"
import { ArrowRight } from "lucide-react"

interface Service {
  title: string
  description: string
  isCustomIcon: boolean
  href: string
}

const services: Service[] = [
  {
    title: "Process Automation",
    description: "Automate repetitive processes to save time and reduce errors. Let your team focus on growth while we handle the routine tasks.",
    isCustomIcon: true,
    href: "/solutions/automation"
  },
  {
    title: "Analytics Dashboards",
    description: "Interactive dashboards for real-time insights. All your key metrics in one place – accessible anytime for data-driven decisions.",
    isCustomIcon: true,
    href: "/solutions/analytics"
  },
  {
    title: "AI & Predictive Models",
    description: "Integrated ML predictions for smarter decisions. Anticipate trends and make proactive decisions with confidence.",
    isCustomIcon: true,
    href: "/solutions/ai"
  }
]

export function Services() {
  const getIconPath = (title: string) => {
    if (title.includes("AI")) return "/ai.svg"
    if (title.includes("Analytics")) return "/analytics.svg"
    return "/automation.svg"
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Transform your business with cutting-edge solutions tailored for SMBs.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className="group h-full p-6 transition-all hover:scale-105"
                onClick={() => window.location.href = service.href}
              >
                <div className="flex h-full flex-col">
                  <div className="relative mb-10 h-36 w-36 mx-auto">
                    <Image
                      src={getIconPath(service.title)}
                      alt={`${service.title} Icon`}
                      fill
                      className="object-contain transition-all duration-200 group-hover:scale-105 filter dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_8px_rgba(0,0,32,0.15)]"
                      sizes="144px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-grow text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-roq-pink">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 