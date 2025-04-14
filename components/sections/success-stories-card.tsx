"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { CaseStudy } from "../../lib/case-studies"

interface SuccessStoriesCardProps {
  caseStudy: CaseStudy
  index: number
}

export function SuccessStoriesCard({ caseStudy, index }: SuccessStoriesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/case-studies/${caseStudy.slug}`}>
        <GlassCard className="h-full p-6 hover:scale-[1.02] transition-transform">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-roq-orange" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {caseStudy.industry}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold">{caseStudy.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {caseStudy.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.results.map((result, i) => (
                <span
                  key={i}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {result.title}: {result.value}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
} 