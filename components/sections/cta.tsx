"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <GlassCard
          variant="gradient"
          className="px-6 py-24 sm:px-24 sm:py-32"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Let's work together to create something extraordinary. Get in touch to start your journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/case-studies">
                  View our work
                </Link>
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
} 