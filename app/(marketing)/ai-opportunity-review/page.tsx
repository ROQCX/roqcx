import type { Metadata } from "next"
import { ServiceView } from "@/components/studio/service-view"
import { opportunityReview } from "@/lib/site-content"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Find Your Business’s AI Opportunities | ROQ CX",
  description: opportunityReview.lede,
  path: "/ai-opportunity-review",
})

export default function OpportunityReviewPage() {
  return <ServiceView {...opportunityReview} />
}
