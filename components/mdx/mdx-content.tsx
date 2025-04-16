
import { CaseStudyHeader } from "../case-studies/case-study-header"
import { BlogPostHeader } from "../insights/blog-post-header"
import { CaseStudyContent } from "../case-studies/case-study-content"
import { BlogPostContent } from "../insights/blog-post-content"
import type { CaseStudyWithContent } from "@/lib/case-studies"
import type { BlogPostWithContent } from "@/lib/blog"

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
            <BlogPostHeader post={data as BlogPostWithContent} />
            <BlogPostContent post={data as BlogPostWithContent} />
          </>
        )}
     
    </>
  )
} 