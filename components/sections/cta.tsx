"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { ArrowRight, Calendar } from "lucide-react"

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <GlassCard
            variant="gradient"
            intensity="high"
            className="px-6 py-24 sm:px-24 sm:py-32"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s transform your customer experience
              </h2>
              
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Let&apos;s explore how technology can lighten your load and boost your
                business. Schedule a free consultation today.
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </motion.a>

                <motion.a
                  href="/calendar"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-900/10 bg-white/50 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Call
                  <Calendar className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
} 