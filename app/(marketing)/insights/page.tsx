import { BlogSearch } from "../../../components/insights/blog-search"
import { getAllPosts } from "../../../lib/blog"
import { Suspense } from "react"

function BlogSearchSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-full rounded-md bg-muted animate-pulse" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export const metadata = {
  title: "Insights & Articles | ROQ CX",
  description: "Expert insights, articles, and resources on business automation, analytics, AI, and digital transformation for modern businesses.",
}

export default async function BlogIndex() {
  const posts = await getAllPosts()
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort()

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto w-full text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Insights &{" "}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Articles
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Expert insights on business automation, analytics, AI, and digital
          transformation for modern businesses.
        </p>
      </div>

      <div className="mt-16">
        <Suspense fallback={<BlogSearchSkeleton />}>
          <BlogSearch posts={posts} availableTags={allTags} />
        </Suspense>
      </div>
    </div>
  )
} 