import { getAllCaseStudies } from "../../../lib/case-studies"
import { CaseStudySearch } from "../../../components/case-studies/case-study-search"
import { Suspense } from "react"
import { FullBleedSection, GridBg, RQX, SectionHeader } from "../../../components/redesign/atoms"

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
    <FullBleedSection
      style={{
        background: RQX.bg,
        position: "relative",
        overflow: "hidden",
      }}
      className="py-[88px] pb-[120px] px-6 sm:px-10 lg:px-14"
    >
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -220,
          right: -220,
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent} 16%, transparent) 0%, transparent 60%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
          opacity: 0.85,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: 1100 }}>
          <SectionHeader
            kicker="Selected work"
            title={
              <>
                Case studies
                <br />
                shipped under pressure.
              </>
            }
            lede="A handful of builds where speed was the point. Clear scope, tight feedback loops, and real-world usage."
          />
        </div>

        <div style={{ marginTop: 48 }}>
          <Suspense fallback={<CaseStudySearchSkeleton />}>
            <CaseStudySearch caseStudies={caseStudies} availableIndustries={allIndustries} />
          </Suspense>
        </div>
      </div>
    </FullBleedSection>
  )
}

export const metadata = {
  title: "Case studies | Prototype sprints in the wild | ROQ CX",
  description: "Real builds shipped on the two-week ROQ CX sprint cadence: clear scope, tight feedback loops, and live URLs you can click on day 14.",
  alternates: { canonical: "https://www.roqcx.com/case-studies" },
  openGraph: {
    title: "Case studies | Prototype sprints in the wild | ROQ CX",
    description: "Real builds shipped on the two-week ROQ CX sprint cadence: clear scope, tight feedback loops, and live URLs you can click on day 14.",
    url: "https://www.roqcx.com/case-studies",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case studies | Prototype sprints in the wild | ROQ CX",
    description: "Real builds shipped on the two-week ROQ CX sprint cadence.",
    images: ["/og"],
  },
}