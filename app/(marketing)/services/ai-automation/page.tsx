import type { Metadata } from "next"
import { ServiceView } from "@/components/studio/service-view"
import { services } from "@/lib/site-content"
import { pageSeo } from "@/lib/seo"

const service = services[0]

export const metadata: Metadata = pageSeo({
  title: "Business Workflow & AI Automation | ROQ CX",
  description: service.lede,
  path: "/services/ai-automation",
})

export default function AiAutomationPage() {
  return <ServiceView {...service} />
}
