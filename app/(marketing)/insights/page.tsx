import { BlogSearch } from "../../../components/insights/blog-search"
import { getAllPosts } from "../../../lib/blog"
import { Suspense } from "react"
import { ClosingCta, PageHero, wrap } from "../../../components/studio/page-hero"
import { NotesArt, TangleLine } from "../../../components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

export const metadata = pageSeo({
  title: "Insights | ROQ CX",
  description: "Notes on practical AI use, customer experience and the work of choosing a first project.",
  path: "/insights",
})

export default async function BlogIndex() {
  const posts = await getAllPosts()
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort()

  return (
    <article>
      <PageHero
        title="Notes for people putting AI to work."
        lede="Practical writing on choosing where AI belongs, how customers experience a business, and what makes a first project worth doing."
        art={<NotesArt />}
      />
      <div className={`${wrap} py-14 md:py-20`}>
        <Suspense fallback={<div className="h-[600px] rounded-[18px] bg-[var(--chalk)]" />}>
          <BlogSearch posts={posts} availableTags={allTags} />
        </Suspense>
      </div>
      <ClosingCta
        title="Rather talk it through?"
        body="Tell us where things get stuck. We’ll say whether a build, an automation or a training session makes sense."
        art={<TangleLine className="mb-10 block h-auto w-full max-w-[720px]" />}
      />
    </article>
  )
}
