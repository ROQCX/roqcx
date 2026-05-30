import * as React from "react"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const glassCardVariants = cva(
  "rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/50 dark:bg-zinc-900/50",
        gradient:
          "bg-gradient-to-br from-[color-mix(in_oklab,var(--rqx-accent)_10%,transparent)] via-[color-mix(in_oklab,var(--rqx-accent3)_10%,transparent)] to-[color-mix(in_oklab,var(--rqx-accent2)_10%,transparent)]",
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