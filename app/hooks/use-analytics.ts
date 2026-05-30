'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface DataLayerEvent {
  event: string
  [key: string]: unknown
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
  }
}

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      window.dataLayer?.push({
        event: 'pageview',
        page: pathname,
      })
    }
  }, [pathname])

  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    window.dataLayer?.push({
      event: eventName,
      ...properties,
    })
  }

  return { trackEvent }
} 