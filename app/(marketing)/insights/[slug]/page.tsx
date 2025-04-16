import { getAllPosts, getPostContent } from "../../../../lib/blog"
import { BlogPostContent } from "../../../../components/insights/blog-post-content"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { StructuredData } from "@/components/seo/structured-data"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }) {
  const post = await getPostContent(params.slug)

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
      authors: post.author ? [post.author.name] : undefined,
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

export default async function BlogPostPage({ params }) {
  const post = await getPostContent(params.slug)

  if (!post || !post.content) {
    notFound()
  }

  const blogPostStructuredData = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    ...(post.author && {
      author: {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
      },
    }),
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "ROQ CX",
      logo: {
        "@type": "ImageObject",
        url: "https://www.roqcx.com/3d_logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.roqcx.com/insights/${post.slug}`,
    },
  }

  return (
    <article className="mx-auto">
      <StructuredData data={blogPostStructuredData} type="BlogPosting" />
      <Suspense fallback={<div>Loading blog post content...</div>}>
        <BlogPostContent post={post} />
      </Suspense>
    </article>
  )
} 