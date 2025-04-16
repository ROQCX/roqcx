"use client"

import { CaseStudyCard } from "./case-study-card"
import type { CaseStudy } from "../../lib/case-studies"

export function CaseStudyCardList({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="space-y-4">
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} {...study} />
      ))}
    </div>
  )
} 