import { notFound } from "next/navigation"
import { getCaseStudyContent, getAllCaseStudies } from "@/lib/case-studies"
import { MDXContent } from "@/components/mdx/mdx-content"
import { StructuredData } from "@/components/seo/structured-data"

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }) {
  try {
    const caseStudy = await getCaseStudyContent(params.slug)
    return {
      title: `${caseStudy.title} | ROQ CX Case Study`,
      description: caseStudy.description,
      openGraph: {
        title: `${caseStudy.title} | ROQ CX Case Study`,
        description: caseStudy.description,
        type: "article",
        publishedTime: caseStudy.date,
        authors: caseStudy.author ? [caseStudy.author.name] : undefined,
        tags: caseStudy.tags,
        images: [
          {
            url: caseStudy.coverImage || "",
            width: 1200,
            height: 630,
            alt: caseStudy.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: caseStudy.title,
        description: caseStudy.description,
        images: [caseStudy.coverImage || ""],
      },
      alternates: {
        canonical: `/case-studies/${params.slug}`,
      },
    }
  } catch (error) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    }
  }
}

export default async function CaseStudyPage({ params }) {
  try {
    const caseStudy = await getCaseStudyContent(params.slug)

    return (
      <article className="container mx-auto px-4 py-8">
        <StructuredData
          type="CaseStudy"
          data={{
            headline: caseStudy.title,
            description: caseStudy.description,
            author: caseStudy.author ? {
              "@type": "Person",
              name: caseStudy.author.name
            } : undefined,
            datePublished: caseStudy.date,
            publisher: {
              "@type": "Organization",
              name: "ROQ CX",
              logo: {
                "@type": "ImageObject",
                url: "https://www.roqcx.com/3d_logo.svg"
              }
            }
          }}
        />
        <MDXContent 
          content={caseStudy.content} 
          type="case-study" 
          metadata={caseStudy}
        />
      </article>
    )
  } catch (error) {
    notFound()
  }
} 