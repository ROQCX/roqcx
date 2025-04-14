"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { usePathname } from "next/navigation"

interface GeometricPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark"
  density?: "low" | "medium" | "high"
}

const Triangle = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("opacity-5 dark:opacity-5", className)}
    {...props}
  >
    <path d="M50 0L100 86.6H0L50 0Z" />
  </svg>
)

const densityMap = {
  low: "gap-32",
  medium: "gap-24",
  high: "gap-16",
}

export function GeometricPattern({
  className,
  variant = "default",
  density = "medium",
  ...props
}: GeometricPatternProps) {
  const pathname = usePathname()
  const [key, setKey] = React.useState(0)

  React.useEffect(() => {
    setKey((prev) => prev + 1)
  }, [pathname])

  return (
    <div
      key={key}
      className={cn(
        "fixed inset-0 h-screen overflow-hidden",
        variant === "dark" ? "text-white" : "text-zinc-950",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
      <div
        className={cn(
          "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full",
          densityMap[density]
        )}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={`${key}-${i}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            className="relative"
          >
            <Triangle
              className={cn(
                "absolute transform",
                i % 3 === 0 && "fill-roq-orange",
                i % 3 === 1 && "fill-roq-pink",
                i % 3 === 2 && "fill-roq-blue"
              )}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
} 