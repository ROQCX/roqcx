import { notFound } from "next/navigation"
import { getAllPosts, getPostContent } from "@/lib/blog"
import { MDXContent } from "@/components/mdx/mdx-content"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

function BlogPostSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />
      <div className="h-96 w-full rounded-lg bg-muted animate-pulse" />
    </div>
  )
}

// Generate static pages for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  }
}

// The page component - will be statically generated at build time
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPostContent(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <StructuredData
        type="BlogPosting"
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.coverImage,
          datePublished: post.date,
          author: post.author ? {
            "@type": "Person",
            name: post.author.name
          } : undefined,
        }}
      />
      <Suspense fallback={<BlogPostSkeleton />}>
        <MDXContent content={post.content} type="blog-post" data={post} />
      </Suspense>
    </div>
  )
} 