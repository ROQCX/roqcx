"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const glassCardVariants = cva(
  "rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/50 dark:bg-zinc-900/50",
        gradient: "bg-gradient-to-br from-roq-orange/10 via-roq-pink/10 to-roq-blue/10 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export function GlassCard({ className, variant, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(glassCardVariants({ variant, className }))}
      {...props}
    />
  )
} 