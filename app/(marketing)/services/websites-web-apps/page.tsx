import type { Metadata } from "next"
import { ServiceView } from "@/components/studio/service-view"
import { ServiceStructuredData } from "@/components/seo/service-structured-data"
import { services } from "@/lib/site-content"
import { pageSeo } from "@/lib/seo"

const service = services[1]

export const metadata: Metadata = pageSeo({
  title: "Websites & Web Apps for SMEs | ROQ CX",
  description: service.lede,
  path: "/services/websites-web-apps",
})

export default function WebsitesPage() {
  return (
    <>
      <ServiceStructuredData service={service} serviceType="Web design and development" />
      <ServiceView {...service} />
    </>
  )
}
