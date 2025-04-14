import * as React from "react"
import { getAllCaseStudies, CaseStudy } from "../../lib/case-studies"
import { SuccessStoriesCard } from "./success-stories-card"

function getRandomCaseStudies(caseStudies: CaseStudy[], count: number) {
  // Create a copy of the array to avoid mutating the original
  const shuffled = [...caseStudies]
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Return the first 'count' items
  return shuffled.slice(0, count)
}

export async function SuccessStories() {
  const caseStudies = await getAllCaseStudies()
  const featuredCaseStudies = getRandomCaseStudies(caseStudies, 2)

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            See how we&apos;ve helped businesses like yours transform their operations
            and achieve remarkable results.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
          {featuredCaseStudies.map((caseStudy, index) => (
            <SuccessStoriesCard
              key={caseStudy.slug}
              caseStudy={caseStudy}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 