"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean
}

export function GradientBackground({
  className,
  animated = true,
  children,
  ...props
}: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-roq-navy-5",
        className
      )}
      {...props}
    >
      {/* Gradient shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orange blob */}
        <motion.div
          initial={animated ? { scale: 0.8, opacity: 0 } : false}
          animate={
            animated
              ? {
                  scale: [0.8, 1.1, 0.9],
                  opacity: [0, 0.3, 0.2],
                  x: [0, 100, -50],
                  y: [0, -50, 100],
                }
              : false
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-roq-orange/20 blur-3xl"
        />

        {/* Pink blob */}
        <motion.div
          initial={animated ? { scale: 0.8, opacity: 0 } : false}
          animate={
            animated
              ? {
                  scale: [0.8, 1.1, 0.9],
                  opacity: [0, 0.3, 0.2],
                  x: [0, -100, 50],
                  y: [0, 50, -100],
                }
              : false
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-roq-pink/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
} 