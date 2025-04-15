import { notFound } from "next/navigation"
import { getCaseStudyBySlug, getCaseStudyContent } from "../../../../lib/case-studies"
import { CaseStudyHeader } from "../../../../components/case-studies/case-study-header"
import { CaseStudyContent } from "../../../../components/case-studies/case-study-content"
import { CaseStudyRelated } from "../../../../components/case-studies/case-study-related"
import { Suspense } from "react"
import type { Metadata } from "next"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {}
  }

  return {
    title: `${caseStudy.title} | ROQ Case Study`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} | ROQ Case Study`,
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

  return (
    <article className="mx-auto w-full">
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