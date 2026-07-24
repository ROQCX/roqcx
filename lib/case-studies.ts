import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getContentLastModified } from "./content-last-modified"


const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies")

export interface CaseStudy {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  logo: string
  hideCover?: boolean
  tags: string[]
  client: string
  industry: string
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
  lastModified: Date
}

export interface CaseStudyWithContent extends CaseStudy {
  content: string
}

function caseStudyPath(slug: string) {
  return path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
}

function parseCaseStudy(
  slug: string,
  fileContent: string,
  filePath: string,
  includeContent: boolean,
): CaseStudy | CaseStudyWithContent {
  const { data, content } = matter(fileContent)
  const base: CaseStudy = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    coverImage: data.coverImage,
    logo: data.logo,
    hideCover: Boolean(data.hideCover),
    tags: data.tags,
    client: data.client,
    industry: data.industry ?? data.industries,
    duration: data.duration,
    role: data.role,
    teamSize: data.teamSize,
    technologies: data.technologies,
    results: data.results,
    author: data.author,
    lastModified: getContentLastModified(filePath, {
      date: data.date,
      updated: data.updated,
    }),
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
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf8")
  return parseCaseStudy(slug, fileContent, filePath, false) as CaseStudy
}

export async function getCaseStudyContent(
  slug: string,
): Promise<CaseStudyWithContent | null> {
  const filePath = caseStudyPath(slug)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf8")
  return parseCaseStudy(slug, fileContent, filePath, true) as CaseStudyWithContent
}
