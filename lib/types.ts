// Types for the application
// Note: Message type is imported from 'ai' package 

export interface CaseStudy {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  content: string
  author?: {
    name: string
    role: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  content: string
  author?: {
    name: string
    role: string
  }
} 