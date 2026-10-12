"use client"

import { BlogCard } from "./blog-card"
import type { BlogPost } from "../../lib/blog"
import { FilterBar } from "../studio/filter-bar"
import { useListFilters } from "../studio/use-list-filters"

interface BlogSearchProps {
  posts: BlogPost[]
  availableTags: string[]
}

export function BlogSearch({ posts, availableTags }: BlogSearchProps) {
  const { query, selected, isPending, setQuery, toggle, clear } = useListFilters("tags")

  const filteredPosts = posts.filter((post) => {
    const q = query.toLowerCase()
    const matchesSearch = !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q)

    const matchesTags = selected.length === 0 || selected.every((tag) => post.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  return (
    <div className="grid gap-10">
      <FilterBar
        query={query}
        placeholder="Search insights"
        onQuery={setQuery}
        options={availableTags}
        selected={selected}
        onToggle={toggle}
        onClear={clear}
        pending={isPending}
        count={filteredPosts.length}
        noun="article"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
        {filteredPosts.length === 0 && (
          <p className="col-span-full py-12 text-center text-lg text-[var(--ink-soft)]">No articles match those filters.</p>
        )}
      </div>
    </div>
  )
}
