import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "../../lib/blog"
import { InsightArt } from "../studio/illustrations"

type BlogCardProps = Pick<BlogPost, "slug" | "title" | "description" | "date" | "readingTime" | "tags">

export function BlogCard({ slug, title, description, date, readingTime, tags }: BlogCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="plate lift group flex h-full flex-col bg-[var(--chalk)] text-[var(--ink)] no-underline"
    >
      <div className="paper-grid border-b border-[var(--rule)] px-6 py-5">
        <InsightArt slug={slug} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="m-0 font-geist-mono text-xs uppercase tracking-[0.16em] text-[var(--forest)]">
          {tags.slice(0, 2).join(" · ")}
        </p>
        <h3 className="m-0 mt-2 text-xl font-medium leading-snug">{title}</h3>
        <p className="mb-0 mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--rule)] pt-4 text-sm text-[var(--ink-soft)]">
          <span>
            {date} · {readingTime} min read
          </span>
          <ArrowRight className="h-4 w-4 flex-none text-[var(--forest)] transition-transform group-hover:translate-x-1" aria-hidden />
        </div>
      </div>
    </Link>
  )
}
