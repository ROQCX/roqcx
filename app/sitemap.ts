import type { MetadataRoute } from "next"
import { getAllCaseStudies } from "@/lib/case-studies"
import { getAllPosts } from "@/lib/blog"
import { latestDate } from "@/lib/content-last-modified"
import { SPRINTS } from "@/lib/sprints"

const SITE = "https://www.roqcx.com"

// Built from MDX in content/ at deploy time. Adding a file under
// content/insights or content/case-studies includes it on the next build.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts] = await Promise.all([getAllCaseStudies(), getAllPosts()])

  const latestInsight = latestDate(posts.map((post) => post.lastModified))
  const latestCaseStudy = latestDate(caseStudies.map((study) => study.lastModified))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    ...SPRINTS.map((s) => ({
      url: `${SITE}${s.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE}/sample-sprint-plan`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE}/case-studies`,
      lastModified: latestCaseStudy,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/insights`,
      lastModified: latestInsight,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/chatbot`, changeFrequency: "monthly", priority: 0.5 },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE}/case-studies/${study.slug}`,
    lastModified: study.lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/insights/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes]
}
