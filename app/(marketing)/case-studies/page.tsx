import { Suspense } from "react"
import { getAllCaseStudies } from "../../../lib/case-studies"
import { DeviceScreen } from "../../../components/case-studies/work-cover"
import { CaseStudySearch } from "../../../components/case-studies/case-study-search"
import { ClosingCta, PageHero, wrap } from "../../../components/studio/page-hero"
import { TangleLine } from "../../../components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

const collage: { src: string; className: string; loading?: "eager" }[] = [
  {
    src: "/case-studies/paul-ries-cover.webp",
    className: "left-0 top-8 w-[52%] -rotate-2",
    loading: "eager",
  },
  { src: "/case-studies/wenanny-hero.webp", className: "right-0 top-0 w-[50%] rotate-2" },
  { src: "/case-studies/syntheve-fullpage-cover.webp", className: "bottom-2 left-[16%] w-[52%] rotate-1" },
]

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()
  const allIndustries = Array.from(
    new Set(caseStudies.flatMap((study) => study.industry))
  ).sort()

  return (
    <article>
      <PageHero
        title="Work you can look at."
        lede="Customer tools, marketplaces and the operational work behind them. Each one is a project we delivered."
        plate={false}
        art={
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]" aria-hidden>
            {collage.map((item) => (
              <DeviceScreen
                key={item.src}
                src={item.src}
                showPhone={false}
                sizes="(min-width: 1024px) 280px, 50vw"
                loading={item.loading}
                className={`absolute drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] ${item.className}`}
              />
            ))}
          </div>
        }
      />
      <div className={`${wrap} py-14 md:py-20`}>
        <Suspense fallback={<div className="h-[600px] rounded-[18px] bg-[var(--chalk)]" />}>
          <CaseStudySearch
            caseStudies={caseStudies}
            availableIndustries={allIndustries}
            eagerCovers={collage.flatMap((item) => (item.loading === "eager" ? [item.src] : []))}
          />
        </Suspense>
      </div>
      <ClosingCta
        title="Want something like this?"
        body="Tell us where things get stuck. We’ll say whether a build, an automation or a training session makes sense."
        art={<TangleLine className="mb-10 block h-auto w-full max-w-[720px]" />}
      />
    </article>
  )
}

export const metadata = pageSeo({
  title: "Case Studies: Web Apps, Platforms & Automation | ROQ CX",
  description: "Selected ROQ CX work: customer tools, marketplaces and operational builds.",
  path: "/case-studies",
})