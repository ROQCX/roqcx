import type { Metadata } from "next"
import { HomePage } from "@/components/studio/home-page"
import { getAllCaseStudies } from "@/lib/case-studies"
import { defaultDescription, defaultTitle, pageSeo } from "@/lib/seo"

const featuredSlugs = ["lets-talk-early-years", "syntheve", "dubai-7s-ticketing", "wenanny"]

export const metadata: Metadata = pageSeo({
  title: defaultTitle,
  description: defaultDescription,
  path: "/",
})

export default async function Home() {
  const studies = await getAllCaseStudies()
  const featured = featuredSlugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study) => study !== undefined)

  return <HomePage studies={featured} />
}
