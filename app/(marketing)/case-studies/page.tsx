import { getAllCaseStudies } from "../../../lib/case-studies"
import { CaseStudySearch } from "../../../components/case-studies/case-study-search"
import { Suspense } from "react"

function CaseStudySearchSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-full rounded-md bg-muted animate-pulse" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()
  const allIndustries = Array.from(
    new Set(caseStudies.flatMap((study) => study.industry))
  ).sort()

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Success{" "}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Stories
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Discover how businesses transformed their operations and achieved remarkable results with our solutions.
        </p>
      </div>

      <div className="mt-16">
        <Suspense fallback={<CaseStudySearchSkeleton />}>
          <CaseStudySearch caseStudies={caseStudies} availableIndustries={allIndustries} />
        </Suspense>
      </div>
    </div>
  )
} 