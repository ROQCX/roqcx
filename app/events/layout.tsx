import { Syne } from "next/font/google"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/layout/navigation"

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="relative z-10 pt-[72px]">
        <div className={`${syne.className} ltey-landing`}>{children}</div>
      </main>
      <Footer />
    </>
  )
}
