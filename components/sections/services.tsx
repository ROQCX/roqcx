"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { GlassCard } from "../ui/glass-card"
import { ArrowRight } from "lucide-react"

interface Service {
  title: string
  description: string
  icon: string // SVG path
  href: string
}

const services: Service[] = [
  {
    title: "Eliminate Manual Overload",
    description: "Escape admin chaos. Automate scheduling, data entry, and reporting to reclaim 10+ hours per week and let your team focus on growth, not grunt work.",
    icon: "/automation.svg",
    href: "/solutions/automation"
  },
  {
    title: "Win and Keep More Customers",
    description: "Never miss a lead. Our smart workflows and CRM automation engage prospects instantly and nurture them on autopilot, helping you win and keep more customers.",
    icon: "/analytics.svg",
    href: "/solutions/analytics"
  },
  {
    title: "Deliver a Consistent Experience",
    description: "Deliver a consistent, professional customer experience 24/7. Our automation ensures every customer gets fast, reliable service, no matter how busy you are.",
    icon: "/ai.svg",
    href: "/solutions/ai"
  }
]

export function Services() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            We help small businesses escape the chaos of everyday operations by automating what slows them down. Our AI-powered tools eliminate friction so you can grow with less stress, fewer mistakes, and more time to focus on what really matters.
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
                      src={service.icon}
                      alt={`${service.title} Icon`}
                      fill
                      className="object-contain transition-all duration-200 group-hover:scale-105 filter dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_8px_rgba(0,0,32,0.15)]"
                      sizes="144px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {service.title.split(' ').slice(0, Math.ceil(service.title.split(' ').length / 2)).join(' ')}<br />
                    {service.title.split(' ').slice(Math.ceil(service.title.split(' ').length / 2)).join(' ')}
                  </h3>
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