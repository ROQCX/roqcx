import { CaseStudyHeader } from "../case-studies/case-study-header"
import { BlogPostHeader } from "../insights/blog-post-header"
import { CaseStudyContent } from "../case-studies/case-study-content"
import { BlogPostContent } from "../insights/blog-post-content"
import type { CaseStudyWithContent } from "@/lib/case-studies"
import type { BlogPostWithContent } from "@/lib/blog"
import { Suspense } from "react"

function BlogPostSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />
      <div className="h-96 w-full rounded-lg bg-muted animate-pulse" />
    </div>
  )
}

interface MDXContentProps {
  content: string
  type: "case-study" | "blog-post"
  data: CaseStudyWithContent | BlogPostWithContent
}

export function MDXContent({ content, type, data }: MDXContentProps) {
  return (
    <>
      {type === "case-study" ? (
        <>
          <CaseStudyHeader caseStudy={data as CaseStudyWithContent} />
          <CaseStudyContent caseStudy={data as CaseStudyWithContent} />
        </>
      ) : (
        <>
          <Suspense fallback={<BlogPostSkeleton />}>
            <BlogPostHeader post={data as BlogPostWithContent} />
          </Suspense>
          <Suspense fallback={<BlogPostSkeleton />}>
            <BlogPostContent post={data as BlogPostWithContent} />
          </Suspense>
        </>
      )}
    </>
  )
} 