"use client"

import { CaseStudyCard } from "./case-study-card"
import type { CaseStudy } from "../../lib/case-studies"
import { FilterBar } from "../studio/filter-bar"
import { useListFilters } from "../studio/use-list-filters"

interface CaseStudySearchProps {
  caseStudies: CaseStudy[]
  availableIndustries: string[]
  /** Covers already shown in the hero. A later lazy copy of the same file makes Next treat the hero as lazy. */
  eagerCovers?: string[]
}

function displayedCover(study: CaseStudy) {
  if (study.coverVideo) return ""
  return study.surface === "website" ? study.desktopImage ?? study.coverImage : study.coverImage
}

export function CaseStudySearch({ caseStudies, availableIndustries, eagerCovers = [] }: CaseStudySearchProps) {
  const { query, selected, isPending, setQuery, toggle, clear } = useListFilters("industries")

  const filteredCaseStudies = caseStudies.filter((study) => {
    const q = query.toLowerCase()
    const matchesSearch = !q ||
      study.title.toLowerCase().includes(q) ||
      study.description.toLowerCase().includes(q) ||
      study.client.toLowerCase().includes(q)

    const matchesIndustries = selected.every((industry) => study.industry.includes(industry))

    return matchesSearch && matchesIndustries
  })

  return (
    <div className="grid gap-10">
      <FilterBar
        query={query}
        placeholder="Search work"
        onQuery={setQuery}
        options={availableIndustries}
        selected={selected}
        onToggle={toggle}
        onClear={clear}
        pending={isPending}
        count={filteredCaseStudies.length}
        noun="study"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCaseStudies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            {...study}
            imageLoading={eagerCovers.includes(displayedCover(study)) ? "eager" : undefined}
          />
        ))}
        {filteredCaseStudies.length === 0 && (
          <p className="col-span-full py-12 text-center text-lg text-[var(--ink-soft)]">No work matches those filters.</p>
        )}
      </div>
    </div>
  )
}
