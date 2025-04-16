import { notFound } from "next/navigation"
import { getPostContent, getAllPosts } from "@/lib/blog"
import { MDXContent } from "@/components/mdx/mdx-content"
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
  try {
    const post = await getPostContent(params.slug)
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
            url: post.coverImage || "",
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
        images: [post.coverImage || ""],
      },
      alternates: {
        canonical: `/insights/${params.slug}`,
      },
    }
  } catch (error) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }
}

export default async function BlogPostPage({ params }) {
  try {
    const post = await getPostContent(params.slug)

    return (
      <article className="container mx-auto px-4 py-8">
        <StructuredData
          type="BlogPosting"
          data={{
            headline: post.title,
            description: post.description,
            author: post.author ? {
              "@type": "Person",
              name: post.author.name
            } : undefined,
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              name: "ROQ CX",
              logo: {
                "@type": "ImageObject",
                url: "https://www.roqcx.com/3d_logo.svg"
              }
            }
          }}
        />
        <MDXContent 
          content={post.content} 
          type="blog-post" 
          metadata={post}
        />
      </article>
    )
  } catch (error) {
    notFound()
  }
} 