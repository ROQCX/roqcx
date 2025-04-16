import { notFound } from "next/navigation"
import { getAllCaseStudies, getCaseStudyContent } from "@/lib/case-studies"
import { StructuredData } from "@/components/seo/structured-data"
import { CaseStudyRelated } from "@/components/case-studies/case-study-related"
import { MDXContent } from "@/components/mdx/mdx-content"

// Generate static pages for all case studies at build time
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const caseStudies = await getAllCaseStudies()
  const caseStudy = caseStudies.find((c) => c.slug === resolvedParams.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    }
  }

  return {
    title: caseStudy.title,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
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
  }
}

// The page component - will be statically generated at build time
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const [caseStudy, allCaseStudies] = await Promise.all([
    getCaseStudyContent(resolvedParams.slug),
    getAllCaseStudies(),
  ])

  if (!caseStudy) {
    notFound()
  }

  const relatedStudies = allCaseStudies
    .filter((study) => study.slug !== resolvedParams.slug)
    .slice(0, 3)

  return (
    <>
      <StructuredData
        type="CaseStudy"
        data={{
          "@type": "CaseStudy",
          headline: caseStudy.title,
          description: caseStudy.description,
          image: caseStudy.coverImage,
          datePublished: caseStudy.date,
          author: caseStudy.author ? {
            "@type": "Person",
            name: caseStudy.author.name
          } : undefined,
        }}
      />
      <MDXContent content={caseStudy.content} type="case-study" data={caseStudy} />
      <CaseStudyRelated relatedStudies={relatedStudies} />
    </>
  )
} 