"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-7rem)] w-full overflow-hidden">
      <div className="relative flex h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center translate-y-[-3.5rem]"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">
              Automate & Elevate
            </span>
            <span className="mt-2 block bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
              Your Business
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Free your team from repetitive tasks and gain insights that drive growth.
            Focus on what matters while we handle the rest.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlassCard
                variant="gradient"
                className="group inline-flex cursor-pointer items-center space-x-2 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                <span className="font-semibold">
                  Let&apos;s Get Started
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </GlassCard>
            </motion.div>

            <motion.a
              href="/solutions"
              className="group flex items-center text-lg font-semibold text-zinc-900 dark:text-zinc-100"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute bottom-8 inset-x-0 hidden sm:flex justify-center"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Scroll to explore
              </span>
              <svg
                className="mt-2 h-6 w-6 text-zinc-600 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 