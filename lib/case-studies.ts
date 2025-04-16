import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import remarkGfm from "remark-gfm"

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies")

export interface CaseStudy {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  logo: string
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

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    )
  }

  try {
    const { code } = await bundleMDX({
      source: content,
      cwd: CASE_STUDIES_DIR,
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
        options.rehypePlugins = [...(options.rehypePlugins ?? [])]
        return options
      },
      esbuildOptions(options) {
        options.target = 'es2020'
        options.platform = 'node'
        options.jsx = 'preserve'
        options.minify = false
        options.bundle = true
        return options
      },
    })

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      coverImage: data.coverImage,
      logo: data.logo,
      tags: data.tags,
      client: data.client,
      industry: data.industry,
      duration: data.duration,
      role: data.role,
      teamSize: data.teamSize,
      technologies: data.technologies,
      results: data.results,
      author: data.author,
      content: code,
    }
  } catch (error) {
    console.error('Error bundling MDX:', error)
    throw error
  }
} 