import { getAllCaseStudies, getCaseStudyContent } from "../../../../lib/case-studies"
import { CaseStudyContent } from "../../../../components/case-studies/case-study-content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { StructuredData } from "../../../../components/seo/structured-data"
import { Suspense } from "react"

type Params = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const caseStudy = await getCaseStudyContent(params.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    }
  }

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

export default async function CaseStudyPage({ params }: Params) {
  const caseStudy = await getCaseStudyContent(params.slug)

  if (!caseStudy || !caseStudy.content) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    image: caseStudy.coverImage,
    ...(caseStudy.author && {
      author: {
        "@type": "Person",
        name: caseStudy.author.name,
        jobTitle: caseStudy.author.role,
      },
    }),
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
    <article className="mx-auto">
      <StructuredData data={jsonLd} />
      <Suspense fallback={<div>Loading case study content...</div>}>
        <CaseStudyContent caseStudy={caseStudy} />
      </Suspense>
    </article>
  )
} 