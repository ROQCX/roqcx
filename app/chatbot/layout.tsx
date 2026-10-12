import type { Metadata } from "next"
import { Navigation } from "../../components/layout/navigation"
import { Footer } from "../../components/footer"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Chat demo | ROQ CX",
  description:
    "Tell it something, then ask for it back. See how an assistant can answer from information you have given it.",
  path: "/chatbot",
})

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="relative z-10 pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  )
}
