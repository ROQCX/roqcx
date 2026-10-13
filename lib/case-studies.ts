import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getContentLastModified } from "./content-last-modified"
import { isContentSlug } from "./content-slug"


const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies")

export type CaseStudySurface = "website" | "app"

export interface CaseStudy {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  /** Desktop still for the iMac. Falls back to the cover. */
  desktopImage?: string
  /** Mobile screenshot shown in the phone beside the iMac. Falls back to the cover. */
  mobileImage?: string
  /** Looping screen recording. When set, work cards play it inside a handset. */
  coverVideo?: string
  logo: string
  hideCover?: boolean
  /** Website covers render inside a device screen. App covers are already device shots. */
  surface: CaseStudySurface
  tags: string[]
  client: string
  industry: string[]
  duration: string
  role: string
  teamSize: string
  technologies: string[]
  results: Array<{
    title: string
    value: string
  }>
  author?: {
    name: string
    role: string
  }
  lastModified?: Date
}

export interface CaseStudyWithContent extends CaseStudy {
  content: string
}

function caseStudyPath(slug: string) {
  if (!isContentSlug(slug)) return null
  return path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
}

function labelList(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string")
}

function mediaPath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("..")) return undefined
  return trimmed
}

function resolveSurface(data: {
  surface?: unknown
  tags?: unknown
  industry?: unknown
  industries?: unknown
}): CaseStudySurface {
  if (data.surface === "website" || data.surface === "app") return data.surface

  const labels = [...labelList(data.tags), ...labelList(data.industry), ...labelList(data.industries)]
  return labels.some((label) => /\bmobile\b/i.test(label)) ? "app" : "website"
}

function parseCaseStudy(
  slug: string,
  fileContent: string,
  includeContent: boolean,
): CaseStudy | CaseStudyWithContent {
  const { data, content } = matter(fileContent)
  const base: CaseStudy = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    coverImage: data.coverImage,
    desktopImage: mediaPath(data.desktopImage),
    mobileImage: mediaPath(data.mobileImage),
    coverVideo: mediaPath(data.coverVideo),
    logo: data.logo,
    hideCover: Boolean(data.hideCover),
    surface: resolveSurface(data),
    tags: data.tags,
    client: data.client,
    industry: labelList(data.industry ?? data.industries),
    duration: data.duration,
    role: data.role,
    teamSize: data.teamSize,
    technologies: data.technologies,
    results: data.results,
    author: data.author,
    lastModified: getContentLastModified(data.updated),
  }

  if (includeContent) {
    return { ...base, content }
  }
  return base
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []

  const fileNames = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => /\.mdx?$/.test(file))
  const caseStudies = (
    await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "")
        return getCaseStudyBySlug(slug)
      }),
    )
  ).filter((study): study is CaseStudy => study !== null)

  return caseStudies.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const filePath = caseStudyPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf8")
  return parseCaseStudy(slug, fileContent, false) as CaseStudy
}

export async function getCaseStudyContent(
  slug: string,
): Promise<CaseStudyWithContent | null> {
  const filePath = caseStudyPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf8")
  return parseCaseStudy(slug, fileContent, true) as CaseStudyWithContent
}
