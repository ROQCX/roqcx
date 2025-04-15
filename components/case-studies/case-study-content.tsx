"use client"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { GlassCard } from "../ui/glass-card"
import type { CaseStudyWithContent } from "../../lib/case-studies"
import Image from "next/image"
import { motion } from "framer-motion"
import {  Lightbulb,  Puzzle, LineChart } from "lucide-react"
import { ComponentProps } from "react"

interface CaseStudyContentProps {
  caseStudy: CaseStudyWithContent
}

interface ImageProps extends ComponentProps<'img'> {
  src: string
  alt: string
}

const components = {
  img: (props: ImageProps) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative my-12 overflow-hidden rounded-xl"
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={1200}
        height={630}
        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
  pre: (props: ComponentProps<'pre'>) => (
    <motion.pre
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8 rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100 dark:bg-zinc-800"
    >
      {props.children}
    </motion.pre>
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8 border-l-4 border-primary/50 pl-4 italic text-muted-foreground"
    >
      {props.children}
    </motion.blockquote>
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
  h1: (props: ComponentProps<'h1'>) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 mt-12 text-3xl font-semibold tracking-tight text-foreground"
    >
      {props.children}
    </motion.h1>
  ),
  h2: (props: ComponentProps<'h2'>) => {
    const text = props.children
    let icon = null
    
    if (typeof text === 'string') {
      if (text === "The Challenge") {
        icon = (
          <div className="relative mr-3">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm" />
            <Puzzle className="relative h-7 w-7 text-blue-500" />
          </div>
        )
      } else if (text === "Our Solution") {
        icon = (
          <div className="relative mr-3">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-sm" />
            <Lightbulb className="relative h-7 w-7 text-yellow-500" />
          </div>
        )
      } else if (text === "The Impact") {
        icon = (
          <div className="relative mr-3">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-sm" />
            <LineChart className="relative h-7 w-7 text-green-500" />
          </div>
        )
      }
    }

    return (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 mt-10 flex items-center text-2xl font-semibold tracking-tight text-foreground"
      >
        {icon}
        {props.children}
      </motion.h2>
    )
  },
  h3: (props: ComponentProps<'h3'>) => (
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-4 mt-8 text-xl font-semibold tracking-tight text-foreground"
    >
      {props.children}
    </motion.h3>
  ),
  h4: (props: ComponentProps<'h4'>) => (
    <motion.h4
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-4 mt-6 text-lg font-semibold tracking-tight text-foreground"
    >
      {props.children}
    </motion.h4>
  ),
  p: (props: ComponentProps<'p'>) => (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-4 text-base leading-7 text-muted-foreground"
    >
      {props.children}
    </motion.p>
  ),
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const Component = useMemo(
    () => getMDXComponent(caseStudy.content),
    [caseStudy.content]
  )

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