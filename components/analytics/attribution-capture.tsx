"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { captureSessionAttribution } from "@/lib/attribution"

/**
 * Persists first-touch referrer + UTMs for the session (contact form + analytics).
 */
export function AttributionCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureSessionAttribution()
  }, [pathname, searchParams])

  return null
}
