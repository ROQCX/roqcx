"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Search, X } from "lucide-react"
import { BlogCard } from "./blog-card"
import type { BlogPost } from "../../lib/blog"

interface BlogSearchProps {
  posts: BlogPost[]
  availableTags: string[]
}

export function BlogSearch({ posts, availableTags }: BlogSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const currentQuery = searchParams.get("q") || ""
  const currentTags = searchParams.get("tags")?.split(",").filter(Boolean) || []

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (value: string) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString("q", value)}`
      )
    })
  }

  const toggleTag = (tag: string) => {
    startTransition(() => {
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag]

      router.push(
        `${pathname}?${createQueryString("tags", newTags.join(","))}`
      )
    })
  }

  const clearFilters = () => {
    startTransition(() => {
      router.push(pathname)
    })
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !currentQuery || 
      post.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(currentQuery.toLowerCase())

    const matchesTags = currentTags.length === 0 ||
      currentTags.every((tag) => post.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  return (
    <div className="w-full space-y-8">
      <div className="container mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="h-12 pl-12 text-base"
            value={currentQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={currentTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm transition-colors hover:bg-primary/90"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {(currentQuery || currentTags.length > 0) && (
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isPending ? "Updating results..." : "Showing filtered results"}
            </p>
            <button
              onClick={clearFilters}
              className="flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <X className="mr-1.5 h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-full py-12 text-center text-lg text-zinc-600 dark:text-zinc-400">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 