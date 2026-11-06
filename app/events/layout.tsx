import { Syne } from "next/font/google"

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${syne.className} ltey-landing`}>{children}</div>
}
