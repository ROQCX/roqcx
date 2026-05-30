import fs from "fs"
import path from "path"
import matter from "gray-matter"


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
}

export interface CaseStudyWithContent extends CaseStudy {
  content: string
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const fileNames = fs.readdirSync(CASE_STUDIES_DIR)
  const caseStudies = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const caseStudy = await getCaseStudyBySlug(slug)
      return caseStudy
    })
  )
  return caseStudies.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    coverImage: data.coverImage,
    logo: data.logo,
    hideCover: Boolean(data.hideCover),
    tags: data.tags,
    client: data.client,
    industry: data.industry,
    duration: data.duration,
    role: data.role,
    teamSize: data.teamSize,
    technologies: data.technologies,
    results: data.results,
    author: data.author,
  }
}

export async function getCaseStudyContent(slug: string): Promise<CaseStudyWithContent> {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    coverImage: data.coverImage,
    logo: data.logo,
    hideCover: Boolean(data.hideCover),
    tags: data.tags,
    client: data.client,
    industry: data.industry,
    duration: data.duration,
    role: data.role,
    teamSize: data.teamSize,
    technologies: data.technologies,
    results: data.results,
    author: data.author,
    content,
  }
} 