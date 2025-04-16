type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

interface StructuredDataProps {
  data: JsonObject
  type?: 'Organization' | 'BlogPosting' | 'Article' | 'FAQPage' | 'Product' | 'BreadcrumbList' | 'LocalBusiness'
}

export function StructuredData({ data, type }: StructuredDataProps) {
  // Ensure @context is always present
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type || data['@type'] || 'WebPage',
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 