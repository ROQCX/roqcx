type JsonValue = string | number | boolean | null | JsonObject | JsonArray | undefined
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

interface StructuredDataProps {
  data: JsonObject
  type?: 'Organization' | 'BlogPosting' | 'Article' | 'FAQPage' | 'Product' | 'BreadcrumbList' | 'LocalBusiness' | 'CaseStudy' | 'Service' | 'Course' | 'Event' | 'Person' | 'WebPage'| 'ItemList' | 'ListItem'
}

export function StructuredData({ data, type }: StructuredDataProps) {
  // Ensure @context is always present
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type || data['@type'] || 'WebPage',
    ...data,
  }

  // Remove any undefined values
  const cleanData = Object.fromEntries(
    Object.entries(structuredData).filter(([_, value]) => value !== undefined)
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanData) }}
    />
  )
} 