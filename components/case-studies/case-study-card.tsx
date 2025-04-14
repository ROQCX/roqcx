"use client"

import { motion } from 'framer-motion'
import { GlassCard } from '../ui/glass-card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { CaseStudy } from '../../lib/case-studies'

export function CaseStudyCard({ slug, title, description, industry }: CaseStudy) {
  return (
    <Link href={`/case-studies/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <GlassCard className="group h-full p-6 transition-all hover:scale-[1.02]">
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{industry}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Link>
  )
} 