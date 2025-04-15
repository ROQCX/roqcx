import { notFound } from "next/navigation"
import { getCaseStudyBySlug, getCaseStudyContent, getAllCaseStudies } from "../../../../lib/case-studies"
import { CaseStudyHeader } from "../../../../components/case-studies/case-study-header"
import { CaseStudyContent } from "../../../../components/case-studies/case-study-content"
import { CaseStudyRelated } from "../../../../components/case-studies/case-study-related"
import { Suspense } from "react"
import type { Metadata } from "next"
import { StructuredData } from "../../../../components/seo/structured-data"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all case studies at build time
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    }
  }

  return {
    title: `${caseStudy.title} | ROQ Case Study`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} | ROQ Case Study`,
      description: caseStudy.description,
      type: "article",
      publishedTime: caseStudy.date,
         tags: caseStudy.tags,
      images: [
        {
          url: caseStudy.coverImage,
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
      images: [caseStudy.coverImage],
    },
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyContent(slug)

  if (!caseStudy || !caseStudy.content) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    image: caseStudy.coverImage,
    datePublished: caseStudy.date,
    dateModified: caseStudy.date,
    publisher: {
      "@type": "Organization",
      name: "ROQ CX",
      logo: {
        "@type": "ImageObject",
        url: "https://www.roqcx.com/roqcx.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.roqcx.com/case-studies/${caseStudy.slug}`,
    },
  }

  return (
    <article className="mx-auto w-full">
      <StructuredData data={jsonLd} />
      <div className="max-w-3xl mx-auto">
        <CaseStudyHeader caseStudy={caseStudy} />
      </div>
      <div className="w-[90%] mx-auto">
        <Suspense fallback={<div>Loading case study content...</div>}>
          <CaseStudyContent caseStudy={caseStudy} />
        </Suspense>
      </div>
      <div className="max-w-3xl mx-auto">
        <CaseStudyRelated caseStudy={caseStudy} />
      </div>
    </article>
  )
} 