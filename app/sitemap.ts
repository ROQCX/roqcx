import type { MetadataRoute } from "next"
import { getAllCaseStudies } from "@/lib/case-studies"
import { getAllPosts } from "@/lib/blog"

const SITE = "https://www.roqcx.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/solutions/prototype-sprint`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/solutions/build-launch`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/solutions/market-launch`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/sample-sprint-plan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/chatbot`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  const [caseStudies, posts] = await Promise.all([getAllCaseStudies(), getAllPosts()])

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/insights/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes]
}
