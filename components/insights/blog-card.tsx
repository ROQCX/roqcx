"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { GlassCard } from "../ui/glass-card"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"
import type { BlogPost } from "../../lib/blog"

interface BlogCardProps extends Omit<BlogPost, 'coverImage'> {
  coverImage?: string
}

export function BlogCard({
  slug,
  title,
  description,
  date,
  author,
  readingTime,
  tags,
  coverImage = "/insights/default-cover.jpg",
}: BlogCardProps) {
  return (
    <Link href={`/insights/${slug}`} className="block h-full">
      <GlassCard className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2 max-h-[3.5rem] overflow-hidden">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className={cn(
            "mt-4 text-xl font-semibold line-clamp-2",
            "bg-gradient-to-r from-zinc-900 to-zinc-900 dark:from-zinc-100 dark:to-zinc-100 bg-clip-text",
            "group-hover:from-roq-orange group-hover:via-roq-pink group-hover:to-roq-blue",
            "transition-all duration-300",
            "text-transparent"
          )}>
            {title}
          </h3>

          <p className="mt-2 flex-grow text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {description}
          </p>

          <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>{author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
} 