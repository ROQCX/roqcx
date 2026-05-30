import type { Metadata } from "next"
import { Navigation } from "../../components/layout/navigation"

export const metadata: Metadata = {
  title: "Chat demo | ROQ CX",
  description: "Try the ROQ CX prototype agent. Ask it about our two-week sprints, the build process, or how a sprint kicks off.",
  openGraph: {
    title: "Chat demo | ROQ CX",
    description: "Talk to a live prototype agent and see how ROQ CX runs a two-week sprint.",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat demo | ROQ CX",
    description: "Talk to a live prototype agent and see how ROQ CX runs a two-week sprint.",
    images: ["/og"],
  },
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-none">
        <Navigation />
      </div>
      <div className="flex-1 pt-[72px]">{children}</div>
    </div>
  )
}
