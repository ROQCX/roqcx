'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      window.dataLayer?.push({
        event: 'pageview',
        page: pathname,
      })
    }
  }, [pathname, searchParams])

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    window.dataLayer?.push({
      event: eventName,
      ...properties,
    })
  }

  return { trackEvent }
} 