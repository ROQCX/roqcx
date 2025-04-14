"use client"

import { format } from "date-fns"
import { GlassCard } from "../ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarDays, Clock } from "lucide-react"

interface BlogPostProps {
  title: string
  description: string
  content: string
  date: string
  author: {
    name: string
    image: string
    role: string
  }
  readingTime: number
  tags: string[]
}

export function BlogPost({
  title,
  description,
  content,
  date,
  author,
  readingTime,
  tags,
}: BlogPostProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{author.name}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{author.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center">
              <CalendarDays className="mr-1 h-4 w-4" />
              {format(new Date(date), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {readingTime} min read
            </div>
          </div>
        </div>
      </header>

      <GlassCard className="prose prose-zinc dark:prose-invert mx-auto max-w-none p-8 lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </GlassCard>

      <footer className="mt-8">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
} 