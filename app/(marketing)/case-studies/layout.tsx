import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ROQ CX Blog - Insights on Business Automation & AI",
  description: "Expert insights, guides, and trends on business automation, analytics, AI, and digital transformation for SMBs.",
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  )
} 