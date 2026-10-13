import { StructuredData } from "./structured-data"
import { pageUrl, siteName, siteUrl } from "@/lib/seo"
import type { ServiceContent } from "@/lib/site-content"

/** Service, BreadcrumbList and FAQPage markup for a /services/* page. */
export function ServiceStructuredData({
  service,
  serviceType,
}: {
  service: ServiceContent
  serviceType: string
}) {
  const url = pageUrl(service.path)
  const crumbs = [
    { name: "Home", item: pageUrl("/") },
    { name: "Services", item: pageUrl("/services") },
    { name: service.label, item: url },
  ]

  return (
    <>
      <StructuredData
        type="Service"
        data={{
          name: service.label,
          serviceType,
          description: service.lede,
          url,
          provider: { "@type": "ProfessionalService", name: siteName, url: siteUrl },
          areaServed: [
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Place", name: "GCC" },
          ],
          audience: { "@type": "BusinessAudience", name: "Small and medium-sized businesses" },
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...crumb,
          })),
        }}
      />
      {service.faqs.length > 0 ? (
        <StructuredData
          type="FAQPage"
          data={{
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      ) : null}
    </>
  )
}
