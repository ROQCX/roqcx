import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getAllCaseStudies } from "../../lib/case-studies"
import { CaseStudyCard } from "./case-study-card"
import type { CaseStudy } from "../../lib/case-studies"

interface CaseStudyRelatedProps {
  caseStudy: CaseStudy
}

export async function CaseStudyRelated({ caseStudy }: CaseStudyRelatedProps) {
  const allCaseStudies = await getAllCaseStudies()
  const relatedCaseStudies = allCaseStudies
    .filter((study) => study.slug !== caseStudy.slug)
    .slice(0, 3)

  if (relatedCaseStudies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Case Studies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} {...study} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 