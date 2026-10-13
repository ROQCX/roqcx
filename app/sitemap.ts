import type { MetadataRoute } from "next"
import { getAllCaseStudies } from "@/lib/case-studies"
import { getAllPosts } from "@/lib/blog"
import { latestDate } from "@/lib/content-last-modified"

const SITE = "https://www.roqcx.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts] = await Promise.all([getAllCaseStudies(), getAllPosts()])

  const latestInsight = latestDate(posts.map((post) => post.lastModified))
  const latestCaseStudy = latestDate(caseStudies.map((study) => study.lastModified))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/services/ai-automation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/services/websites-web-apps`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/services/ai-training`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ai-opportunity-review`, changeFrequency: "monthly", priority: 0.8 },
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
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
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
