import type { Metadata } from "next"
import { GeometricPattern } from "../../../components/ui/geometric-pattern"

export const metadata: Metadata = {
  title: "ROQ Insights - Insights on Business Automation & AI",
  description: "Expert insights, guides, and trends on business automation, analytics, AI, and digital transformation for SMBs.",
  keywords: [
    "business automation",
    "AI solutions",
    "AI chatbots",
    "digital transformation",
    "customer experience",
    "analytics",
    "SMB technology",
    "process automation",
    "AI implementation",
    "business intelligence",
    "digital innovation"
  ],
  openGraph: {
    title: "ROQ CX Insights - Expert Insights on Business Automation & AI",
    description: "Discover the latest trends and best practices in business automation, AI, and digital transformation for SMBs.",
    type: "website",
    locale: "en_AE",
    siteName: "ROQ CX Insights",
    images: [
      {
        url: "/roqcx.png",
        width: 1200,
        height: 630,
        alt: "ROQ CX Insights - Business Automation & AI Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROQ CX Insights - Expert Insights on Business Automation & AI",
    description: "Discover the latest trends and best practices in business automation, AI, and digital transformation for SMBs.",
    images: ["/roqcx.png"],
  },
  alternates: {
    canonical: "https://www.roqcx.com/insights",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <GeometricPattern className="absolute inset-0 opacity-20" />
      {children}
    </div>
  )
} 