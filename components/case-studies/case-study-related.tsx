"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CaseStudy } from "../../lib/case-studies"
import { Suspense } from "react"
import { CaseStudyCardList } from "./case-study-related-list"

interface CaseStudyRelatedProps {
  relatedStudies: CaseStudy[]
}

export function CaseStudyRelated({ relatedStudies }: CaseStudyRelatedProps) {
  if (relatedStudies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Case Studies</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading related case studies...</div>}>
          <CaseStudyCardList studies={relatedStudies} />
        </Suspense>
      </CardContent>
    </Card>
  )
} 