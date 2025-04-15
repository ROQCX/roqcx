import { getAllPosts, getPostContent } from "../../../../lib/blog"
import { BlogPostContent } from "../../../../components/insights/blog-post-content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { StructuredData } from "../../../../components/seo/structured-data"
import { Suspense } from "react"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostContent(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | ROQ CX Insights`,
    description: post.description,
    openGraph: {
      title: `${post.title} | ROQ CX Insights`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
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
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostContent(slug)

  if (!post || !post.content) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "ROQ CX",
      logo: {
        "@type": "ImageObject",
        url: "https://www.roqcx.com/roqcx.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.roqcx.com/insights/${post.slug}`,
    },
  }

  return (
    <article className="mx-auto">
      <StructuredData data={jsonLd} />
      <Suspense fallback={<div>Loading blog post content...</div>}>
        <BlogPostContent post={post} />
      </Suspense>
    </article>
  )
} 