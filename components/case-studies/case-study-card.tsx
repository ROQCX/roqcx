import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '../../lib/case-studies'
import { WorkCover } from './work-cover'

export function CaseStudyCard({
  imageLoading,
  ...study
}: CaseStudy & { imageLoading?: "eager" | "lazy" }) {
  const { slug, title, description, industry, client } = study
  const industries = industry.join(' · ')

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="plate lift group flex h-full flex-col bg-[var(--chalk)] text-[var(--ink)] no-underline"
    >
      <WorkCover
        study={study}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading={imageLoading}
        fetchPriority={imageLoading === "eager" ? "low" : undefined}
      />
      <div className="flex flex-1 flex-col p-6">
        {client ? <p className="m-0 text-sm text-[var(--ink-soft)]">{client}</p> : null}
        <h3 className="m-0 mt-1 text-xl font-medium leading-snug">{title}</h3>
        <p className="mb-0 mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--rule)] pt-4">
          <span className="text-sm text-[var(--ink-soft)]">{industries}</span>
          <ArrowRight className="h-4 w-4 flex-none text-[var(--forest)] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
