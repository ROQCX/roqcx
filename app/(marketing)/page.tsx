import { HeroPrototype } from "@/components/redesign/hero-prototype"
import { ProcessSection } from "@/components/redesign/process-section"
import { TimelineSection } from "@/components/redesign/timeline-section"
import { CapabilitiesSection } from "@/components/redesign/capabilities-section"
import { CasesSection } from "@/components/redesign/cases-section"
import { FAQSection } from "@/components/redesign/faq-section"
import { CtaSection } from "@/components/redesign/cta-section"

export default function Home() {
  return (
    <>
      <HeroPrototype />
      <ProcessSection />
      <TimelineSection />
      <CapabilitiesSection />
      <CasesSection />
      <FAQSection />
      <CtaSection />
    </>
  )
}

export const metadata = {
  title: "ROQ CX | From idea to live prototype in 2 weeks",
  description:
    "The fractional product team for SMEs. We turn napkin sketches into clickable prototypes, validate with real users, and ship to production on a fixed two-week cadence.",
}
