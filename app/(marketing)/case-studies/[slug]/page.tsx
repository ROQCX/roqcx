import { notFound } from "next/navigation"
import { getCaseStudyBySlug, getAllCaseStudies, getCaseStudyContent } from "../../../../lib/case-studies"
import { CaseStudyHeader } from "../../../../components/case-studies/case-study-header"
import { CaseStudyContent } from "../../../../components/case-studies/case-study-content"
import { CaseStudyRelated } from "../../../../components/case-studies/case-study-related"
import type { Metadata } from "next"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

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

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyContent(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <article className="mx-auto w-full">
      <div className="max-w-3xl mx-auto">
        <CaseStudyHeader caseStudy={caseStudy} />
      </div>
      <div className="w-[90%] mx-auto">
        <CaseStudyContent caseStudy={caseStudy} />
      </div>
      <div className="max-w-3xl mx-auto">
        <CaseStudyRelated caseStudy={caseStudy} />
      </div>
    </article>
  )
} 