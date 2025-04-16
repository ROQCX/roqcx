"use client"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { GlassCard } from "../ui/glass-card"
import type { BlogPostWithContent } from "../../lib/blog"
import Image from "next/image"
import type { ComponentProps } from "react"
import type { MDXComponents } from "mdx/types"
import { motion } from 'framer-motion'

interface BlogPostContentProps {
  post: BlogPostWithContent
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <motion.h1 {...fadeInUp} className="text-3xl font-bold mt-8 mb-4">
      {children}
    </motion.h1>
  ),
  h2: ({ children }) => (
    <motion.h2 {...fadeInUp} className="text-2xl font-bold mt-8 mb-4">
      {children}
    </motion.h2>
  ),
  h3: ({ children }) => (
    <motion.h3 {...fadeInUp} className="text-xl font-semibold mt-6 mb-3">
      {children}
    </motion.h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4 {...props} className="text-lg font-semibold mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <motion.p {...fadeInUp} className="my-4 leading-relaxed">
      {children}
    </motion.p>
  ),
  a: ({ href, children }) => (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  ),
  img: ({ src, alt }) => (
    <div className="relative w-full h-64 my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  ),
  ul: ({ children }) => (
    <motion.ul {...fadeInUp} className="list-disc list-inside space-y-2 my-4">
      {children}
    </motion.ul>
  ),
  ol: ({ children }) => (
    <motion.ol {...fadeInUp} className="list-decimal list-inside space-y-2 my-4">
      {children}
    </motion.ol>
  ),
  li: ({ children }) => (
    <motion.li {...fadeInUp} className="my-2">
      {children}
    </motion.li>
  ),
  blockquote: ({ children }) => (
    <motion.blockquote {...fadeInUp} className="border-l-4 border-primary pl-4 my-4 italic">
      {children}
    </motion.blockquote>
  ),
  pre: ({ children }) => (
    <motion.pre {...fadeInUp} className="bg-muted p-4 rounded-lg my-4 overflow-x-auto">
      {children}
    </motion.pre>
  ),
  code: ({ children }) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  table: ({ children, ...props }: ComponentProps<'table'>) => (
    <div className="my-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table {...props} className="w-full border-collapse divide-y divide-zinc-200 dark:divide-zinc-800">
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<'th'>) => (
    <th {...props} className="border-r border-zinc-200 bg-zinc-50/50 px-4 py-3 text-left text-sm font-medium text-zinc-900 last:border-r-0 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps<'td'>) => (
    <td {...props} className="border-r border-zinc-200 px-4 py-3 text-sm text-zinc-600 last:border-r-0 dark:border-zinc-800 dark:text-zinc-400">
      {children}
    </td>
  ),
  tr: ({ children, ...props }: ComponentProps<'tr'>) => (
    <tr {...props} className="border-b border-zinc-200 last:border-0 dark:border-zinc-800">
      {children}
    </tr>
  ),
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const Component = useMemo(() => {
    if (!post.content) return null
    try {
      return getMDXComponent(post.content)
    } catch (error) {
      console.error('Error creating MDX component:', error)
      return null
    }
  }, [post.content])

  if (!Component) {
    return <div>Failed to load content</div>
  }

  return (
    <div className="mx-auto">
      <GlassCard 
        variant="gradient"
        className="prose prose-zinc mx-auto w-full max-w-none dark:prose-invert 
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
        p-8 lg:prose-lg
        bg-gradient-to-br from-roq-orange/10 via-roq-pink/10 to-roq-blue/10
        dark:from-roq-orange/5 dark:via-roq-pink/5 dark:to-roq-blue/5">
        <Component components={components} />
      </GlassCard>
    </div>
  )
} 