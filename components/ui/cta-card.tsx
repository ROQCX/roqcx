"use client"

import { GlassCard } from "./glass-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTACardProps {
  title: string
  description: string
  buttonText: string
  href: string
}

export function CTACard({ title, description, buttonText, href }: CTACardProps) {
  return (
    <Link href={href}>
      <GlassCard
        variant="gradient"
        className="group cursor-pointer p-8 transition-all hover:scale-105"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
        <div className="mt-6 flex items-center justify-center text-sm font-medium">
          {buttonText}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </GlassCard>
    </Link>
  )
} 