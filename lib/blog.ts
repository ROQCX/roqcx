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
  description: string
  date: string
  author: {
    name: string
    image: string
    role: string
  }
  readingTime: number
  tags: string[]
  coverImage: string
  lastModified: Date
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

function parsePost(slug: string, fileContent: string, filePath: string, includeContent: boolean) {
  const { data, content } = matter(fileContent)
  const post: BlogPost = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    lastModified: getContentLastModified(filePath, {
      date: data.date,
      updated: data.updated,
    }),
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
      return parsePost(slug, fs.readFileSync(filePath, "utf8"), filePath, false)
    })
    .filter((post): post is BlogPost => post !== null)

  return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = postPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null
  return parsePost(slug, fs.readFileSync(filePath, "utf8"), filePath, false)
}

export async function getPostContent(slug: string): Promise<BlogPostWithContent | null> {
  const filePath = postPath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null
  return parsePost(slug, fs.readFileSync(filePath, "utf8"), filePath, true) as BlogPostWithContent
}
