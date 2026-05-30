import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { getContentLastModified } from "./content-last-modified"


const BLOG_DIR = path.join(process.cwd(), "content/insights")

// List of known acronyms that should stay in all caps
const ACRONYMS = new Set([
  'AI', 'ML', 'GCC', 'SMB', 'CX', 'API', 'SaaS', 'PaaS', 'IaaS',
  'CRM', 'ERP', 'CMS', 'UI', 'UX', 'CI', 'CD', 'IoT', 'RPA',
  'NLP', 'OCR', 'BPM', 'BI', 'DWH', 'ETL', 'GDPR', 'HIPAA',
  'ISO', 'KPI', 'ROI', 'SLA', 'SME', 'SMB', 'SME', 'SMB'
])

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
  // Convert to lowercase and split into words
  const words = tag.toLowerCase().split(/[\s-]+/)
  
  // Capitalize first letter of each word, keeping acronyms in all caps
  return words
    .map(word => {
      const upperWord = word.toUpperCase()
      return ACRONYMS.has(upperWord) 
        ? upperWord 
        : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR)
  const posts = await Promise.all(
    files
      .filter((file) => /\.mdx?$/.test(file))
      .map((file) => getPostBySlug(file.replace(/\.mdx?$/, "")))
  )

  return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    lastModified: getContentLastModified(filePath, {
      date: data.date,
      updated: data.updated,
    }),
    author: typeof data.author === 'string' 
      ? {
          name: data.author,
          image: "/authors/default.jpg",
          role: "Author"
        }
      : data.author || {
          name: "ROQ CX Team",
          image: "/authors/default.jpg",
          role: "Author"
        },
    readingTime: Math.ceil(readingTime(content).minutes),
    tags: (data.tags || []).map(normalizeTag),
    coverImage: data.coverImage || data.image,
  }
}

export async function getPostContent(slug: string): Promise<BlogPostWithContent> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  // Handle both string and object author formats
  const author = typeof data.author === 'string' 
    ? {
        name: data.author,
        image: "/authors/default.jpg",
        role: "Author"
      }
    : data.author

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author,
    readingTime: Math.ceil(readingTime(content).minutes),
    tags: (data.tags || []).map(normalizeTag),
    coverImage: data.coverImage || data.image,
    content,
    lastModified: getContentLastModified(filePath, {
      date: data.date,
      updated: data.updated,
    }),
  }
} 