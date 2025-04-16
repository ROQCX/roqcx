"use client"

import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarDays, Clock } from "lucide-react"
import type { BlogPostWithContent } from "../../lib/blog"
import Image from "next/image"

interface BlogPostHeaderProps {
  post: BlogPostWithContent
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative mb-12 h-[400px] w-full">
      <Image
        src={post.coverImage}
        alt={post.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
          {post.description}
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <p className="opacity-80">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm opacity-80">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              {format(new Date(post.date), "MMMM yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

