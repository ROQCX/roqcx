"use client"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { GlassCard } from "../ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import { format } from "date-fns"
import type { BlogPostWithContent } from "../../lib/blog"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import type { ComponentProps } from "react"

interface BlogPostContentProps {
  post: BlogPostWithContent
}

const components = {
  img: (props: ComponentProps<'img'>) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 overflow-hidden rounded-xl"
    >
      <Image
        src={props.src || ""}
        alt={props.alt || ""}
        width={1200}
        height={630}
        className="w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
      />
    </motion.div>
  ),
  a: (props: ComponentProps<'a'>) => (
    <a
      {...props}
      className="text-primary hover:text-primary/80 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code
      {...props}
      className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800"
    />
  ),
  pre: (props: HTMLMotionProps<'pre'>) => (
    <motion.pre
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="my-8 rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100 dark:bg-zinc-800"
    />
  ),
  blockquote: (props: HTMLMotionProps<'blockquote'>) => (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="my-8 border-l-4 border-primary/50 pl-4 italic text-muted-foreground"
    />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      {...props}
      className="my-6 list-disc space-y-3 pl-6 marker:text-primary/50 dark:marker:text-primary/50"
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      {...props}
      className="my-6 list-decimal space-y-3 pl-6 marker:text-primary/50 dark:marker:text-primary/50"
    />
  ),
  table: (props: ComponentProps<'table'>) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <table
        {...props}
        className="w-full border-collapse divide-y divide-zinc-200 dark:divide-zinc-800"
      />
    </motion.div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th
      {...props}
      className="border-r border-zinc-200 bg-zinc-50/50 px-4 py-3 text-left text-sm font-medium text-zinc-900 last:border-r-0 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100"
    />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td
      {...props}
      className="border-r border-zinc-200 px-4 py-3 text-sm text-zinc-600 last:border-r-0 dark:border-zinc-800 dark:text-zinc-400"
    />
  ),
  tr: (props: ComponentProps<'tr'>) => (
    <tr
      {...props}
      className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
    />
  ),
  h1: (props: HTMLMotionProps<'h1'>) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="mb-8 mt-12 text-3xl font-semibold tracking-tight text-foreground"
    />
  ),
  h2: (props: HTMLMotionProps<'h2'>) => (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="mb-6 mt-10 text-2xl font-semibold tracking-tight text-foreground"
    />
  ),
  h3: (props: HTMLMotionProps<'h3'>) => (
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="mb-4 mt-8 text-xl font-semibold tracking-tight text-foreground"
    />
  ),
  h4: (props: HTMLMotionProps<'h4'>) => (
    <motion.h4
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="mb-4 mt-6 text-lg font-semibold tracking-tight text-foreground"
    />
  ),
  p: (props: HTMLMotionProps<'p'>) => (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
      className="my-4 text-base leading-7 text-muted-foreground"
    />
  ),
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const Component = useMemo(() => getMDXComponent(post.content), [post.content])

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-12 text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {post.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {post.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
        >
          {post.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-6"
        >
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
        </motion.div>
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