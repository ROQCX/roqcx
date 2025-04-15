"use client"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { GlassCard } from "../ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import { format } from "date-fns"
import type { BlogPostWithContent } from "../../lib/blog"
import Image from "next/image"
import type { ComponentProps } from "react"
import type { MDXComponents } from "mdx/types"

interface BlogPostContentProps {
  post: BlogPostWithContent
}

const components: MDXComponents = {
  img: (props: ComponentProps<'img'>) => (
    <div className="my-12 overflow-hidden rounded-xl">
      <Image
        src={props.src || ""}
        alt={props.alt || ""}
        width={1200}
        height={630}
        className="w-full object-cover"
      />
    </div>
  ),
  a: ({ children, ...props }: ComponentProps<'a'>) => (
    <a
      {...props}
      className="text-primary hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: ComponentProps<'code'>) => (
    <code
      {...props}
      className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800"
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: ComponentProps<'pre'>) => (
    <pre {...props} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto my-4">
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote {...props} className="border-l-4 border-roq-orange pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: ComponentProps<'ul'>) => (
    <ul
      {...props}
      className="my-6 list-disc space-y-3 pl-6 marker:text-primary/50 dark:marker:text-primary/50"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<'ol'>) => (
    <ol
      {...props}
      className="my-6 list-decimal space-y-3 pl-6 marker:text-primary/50 dark:marker:text-primary/50"
    >
      {children}
    </ol>
  ),
  table: ({ children, ...props }: ComponentProps<'table'>) => (
    <div className="my-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table
        {...props}
        className="w-full border-collapse divide-y divide-zinc-200 dark:divide-zinc-800"
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<'th'>) => (
    <th
      {...props}
      className="border-r border-zinc-200 bg-zinc-50/50 px-4 py-3 text-left text-sm font-medium text-zinc-900 last:border-r-0 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps<'td'>) => (
    <td
      {...props}
      className="border-r border-zinc-200 px-4 py-3 text-sm text-zinc-600 last:border-r-0 dark:border-zinc-800 dark:text-zinc-400"
    >
      {children}
    </td>
  ),
  tr: ({ children, ...props }: ComponentProps<'tr'>) => (
    <tr
      {...props}
      className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
    >
      {children}
    </tr>
  ),
  h1: ({ children, ...props }: ComponentProps<'h1'>) => (
    <h1 {...props} className="text-4xl font-bold mb-6">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2 {...props} className="text-3xl font-semibold mb-4">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3 {...props} className="text-2xl font-semibold mb-3">
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4 {...props} className="text-xl font-semibold mb-3">
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentProps<'p'>) => (
    <p {...props} className="mb-4 leading-relaxed">
      {children}
    </p>
  ),
  li: ({ children, ...props }: ComponentProps<'li'>) => (
    <li {...props} className="mb-2">
      {children}
    </li>
  ),
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const Component = useMemo(() => {
    if (typeof window === 'undefined') return null
    if (!post.content) return null
    
    try {
      return getMDXComponent(post.content)
    } catch (error) {
      console.error('Error creating MDX component:', error)
      return null
    }
  }, [post.content])

  if (!Component) {
    return <div>Loading content...</div>
  }

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-12 text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          {post.description}
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">{post.author.name}</p>
              <p className="text-muted-foreground">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              {format(new Date(post.date), "MMMM yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>
        </div>
      </header>

      <GlassCard className="prose prose-zinc mx-auto max-w-none dark:prose-invert 
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg 
        prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:shadow-lg
        prose-pre:bg-zinc-900 prose-pre:text-zinc-100
        prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:marker:text-primary/50 dark:prose-li:marker:text-primary/50
        prose-strong:text-foreground dark:prose-strong:text-foreground
        prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-zinc-800
        p-8 lg:prose-lg">
        <Component components={components} />
      </GlassCard>
    </article>
  )
} 