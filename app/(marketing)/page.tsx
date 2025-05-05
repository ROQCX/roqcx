import { Hero } from "../../components/sections/hero"
import { Services } from "../../components/sections/services"
import { RoqchatShowcase } from "../../components/sections/roqchat-showcase"
import { Mission } from "../../components/sections/mission"
import { SuccessStories } from "../../components/sections/success-stories"
import { CTA } from "../../components/sections/cta"
import { FAQPage } from "../../components/faq/faq-page"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <RoqchatShowcase />
      <Mission />
      <SuccessStories />
      <FAQPage />
      <CTA />
    </>
  )
}

export const metadata = {
  title: "ROQ CX - Automate & Elevate Your Business",
  description: "Automate, analyze, and elevate your business with ROQ CX. Discover our AI-powered solutions, case studies, and expert insights for SMBs.",
}
