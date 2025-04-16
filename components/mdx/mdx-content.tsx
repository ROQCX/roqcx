import { CaseStudyContent } from "@/components/case-studies/case-study-content"
import { BlogPostContent } from "@/components/insights/blog-post-content"
import { CaseStudyHeader } from "@/components/case-studies/case-study-header"
import { CaseStudyRelated } from "@/components/case-studies/case-study-related"
import { BlogPostHeader } from "../insights/blog-post-header"

interface MDXContentProps {
  content: string
  type: 'case-study' | 'blog-post'
  metadata: any
}

export async function MDXContent({ content, type, metadata }: MDXContentProps) {
  if (type === 'case-study') {
    return (
      <>
        <CaseStudyHeader caseStudy={metadata} />
        <CaseStudyContent caseStudy={{ ...metadata, content }} />
        <CaseStudyRelated caseStudy={metadata} />
      </>
    )
  }
  
  return (
    <>
      <BlogPostHeader post={{ ...metadata }} />
      <BlogPostContent post={{ ...metadata, content }} />
    </>
  )
} 