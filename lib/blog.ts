import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { getContentLastModified } from "./content-last-modified"
import { isContentSlug } from "./content-slug"

const BLOG_DIR = path.join(process.cwd(), "content/insights")

const ACRONYMS = new Set([
  "AI", "ML", "GCC", "SMB", "CX", "API", "SAAS", "PAAS", "IAAS",
  "CRM", "ERP", "CMS", "UI", "UX", "CI", "CD", "IOT", "RPA",
  "NLP", "OCR", "BPM", "BI", "DWH", "ETL", "GDPR", "HIPAA",
  "ISO", "KPI", "ROI", "SLA", "SME",
])

const defaultAuthor = {
  name: "ROQ CX Team",
  image: "/authors/default.jpg",
  role: "Author",
}

export interface BlogPost {
  slug: string
  title: string
  /** Search-result title when it should differ from the on-page headline. */
  seoTitle?: string
  description: string
  date: string
  author: {
    name: string
    image: string
    role: string
    url?: string
  }
  readingTime: number
  tags: string[]
  coverImage: string
  lastModified?: Date
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

function normalizeTag(tag: string): string {
  const words = tag.toLowerCase().split(/[\s-]+/)

  return words
    .map((word) => {
      const upperWord = word.toUpperCase()
      return ACRONYMS.has(upperWord) ? upperWord : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

function authorUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  try {
    const url = new URL(value.trim())
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined
    return url.href
  } catch {
    return undefined
  }
}

function authorFrom(author: unknown): BlogPost["author"] {
  if (typeof author === "string") {
    return { name: author, image: defaultAuthor.image, role: "Author" }
  }
  if (author && typeof author === "object" && "name" in author) {
    const record = author as Partial<BlogPost["author"]>
    return {
      name: record.name || defaultAuthor.name,
      image: record.image || defaultAuthor.image,
      role: record.role || defaultAuthor.role,
      url: authorUrl(record.url),
    }
  }
  return defaultAuthor
}

function tagsFrom(tags: unknown): string[] {
  if (!Array.isArray(tags)) return []
  return tags.filter((tag): tag is string => typeof tag === "string").map(normalizeTag)
}

function postPath(slug: string) {
  if (!isContentSlug(slug)) return null
  return path.join(BLOG_DIR, `${slug}.mdx`)
}

function parsePost(slug: string, fileContent: string, includeContent: boolean) {
  const { data, content } = matter(fileContent)
  const post: BlogPost = {
    slug,
    title: data.title,
    seoTitle: typeof data.seoTitle === "string" ? data.seoTitle : undefined,
    description: data.description,
    date: data.date,
    lastModified: getContentLastModified(data.updated),
    author: authorFrom(data.author),
    readingTime: Math.ceil(readingTime(content).minutes),
    tags: tagsFrom(data.tags),
    coverImage: data.coverImage || data.image,
  }

  if (includeContent) return { ...post, content }
  return post
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return []

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "")
      const filePath = postPath(slug)
      if (!filePath) return null
      return parsePost(slug, fs.readFileSync(filePath, "utf8"), false)
    })
    .filter((post): post is BlogPost => post !== null)

  return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = postPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null
  return parsePost(slug, fs.readFileSync(filePath, "utf8"), false)
}

export async function getPostContent(slug: string): Promise<BlogPostWithContent | null> {
  const filePath = postPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null
  return parsePost(slug, fs.readFileSync(filePath, "utf8"), true) as BlogPostWithContent
}
