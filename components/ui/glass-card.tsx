"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "gradient"
  intensity?: "low" | "medium" | "high"
}

const intensityMap = {
  low: "backdrop-blur-sm bg-white/40 dark:bg-white/10",
  medium: "backdrop-blur-md bg-white/50 dark:bg-white/20",
  high: "backdrop-blur-lg bg-white/60 dark:bg-white/30",
}

export function GlassCard({
  className,
  variant = "default",
  intensity = "medium",
  children,
  ...props
}: GlassCardProps) {
  const baseStyles = cn(
    "rounded-lg border border-zinc-200/50 dark:border-white/10",
    "shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
    intensityMap[intensity],
    {
      "bg-gradient-to-br from-roq-orange/10 via-roq-pink/10 to-roq-blue/10 dark:from-roq-orange/10 dark:via-roq-pink/10 dark:to-roq-blue/10":
        variant === "gradient",
    },
    className
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={baseStyles}
      {...props}
    >
      {children}
    </motion.div>
  )
} 