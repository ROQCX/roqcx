import type { Metadata } from "next"
import { ServiceView } from "@/components/studio/service-view"
import { ServiceStructuredData } from "@/components/seo/service-structured-data"
import { services } from "@/lib/site-content"
import { pageSeo } from "@/lib/seo"

const service = services[0]

export const metadata: Metadata = pageSeo({
  title: "AI Agents & Governance for Workflows | ROQ CX",
  description:
    "ROQ CX builds AI agents and the governance around them for SME workflows: what an agent can access, what it can do, and where a person still approves.",
  path: "/services/ai-automation",
})

export default function AiAutomationPage() {
  return (
    <>
      <ServiceStructuredData service={service} serviceType="AI agents and governance" />
      <ServiceView {...service} />
    </>
  )
}
