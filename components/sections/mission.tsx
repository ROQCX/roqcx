"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { Target, Users, Lightbulb, ArrowUpRight } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every solution is crafted with attention to detail, ensuring accuracy and reliability."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work side by side with our clients, celebrating wins together as one team."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Bringing enterprise-level innovation to help small businesses thrive."
  }
]

export function Mission() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why We Do It
            </h2>
            
            <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              <p>
                At ROQ CX, we thrive on tackling complex problems shoulder-to-shoulder
                with our clients. We believe the best solutions emerge when we combine
                cutting-edge technology with a team spirit – working with you, not just
                for you.
              </p>
              <p>
                Our founder, Zayne, discovered early on that building solutions is a lot
                like a team sport – it takes strategy, precision, and collaboration.
                That&apos;s why we approach every project as part of your team, celebrating
                wins together.
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-200">
                Backed by 13+ years in digital innovation and having delivered solutions
                for companies large and small, we bring enterprise-level insight to help
                small businesses thrive.
              </p>
            </div>

            <div className="mt-10">
              <GlassCard
                variant="gradient"
                className="group inline-flex cursor-pointer items-center space-x-2 px-6 py-3 transition-all hover:scale-105"
                onClick={() => window.location.href = '/about'}
              >
                <span className="font-semibold">Learn more about us</span>
                <ArrowUpRight className="h-4 w-4" />
              </GlassCard>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:mt-0"
          >
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{value.title}</h3>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 