"use client"

import { GlassCard } from "./glass-card"
import { ArrowRight, Cog, BarChart3, Brain, MessageSquare } from "lucide-react"
import Link from "next/link"

const icons = {
  cog: Cog,
  "bar-chart-3": BarChart3,
  brain: Brain,
  "message-square": MessageSquare,
} as const

export type IconName = keyof typeof icons

interface SolutionCardProps {
  title: string
  description: string
  icon: IconName
  href: string
  features: string[]
}

export function SolutionCard({ title, description, icon, href, features }: SolutionCardProps) {
  const Icon = icons[icon]
  
  return (
    <Link href={href}>
      <GlassCard className="group cursor-pointer p-8 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>

          <p className="mt-4 flex-grow text-zinc-600 dark:text-zinc-400">
            {description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <div className="h-1 w-1 rounded-full bg-roq-pink" />
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center text-sm font-medium text-roq-pink">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </GlassCard>
    </Link>
  )
} 