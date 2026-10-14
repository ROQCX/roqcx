import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug, getPostContent } from "@/lib/blog"
import Link from "next/link"
import { format } from "date-fns"
import { StructuredData } from "@/components/seo/structured-data"
import { BlogCard } from "@/components/insights/blog-card"
import { Prose } from "@/components/studio/prose"
import { ClosingCta, PageHero, sectionTitle, wrap } from "@/components/studio/page-hero"
import { Glyph, InsightArt, TangleLine } from "@/components/studio/illustrations"
import { pageSeo } from "@/lib/seo"

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
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return pageSeo({
    title: post.seoTitle ?? post.title,
    socialTitle: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    type: "article",
  })
}

// The page component - will be statically generated at build time
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const [post, allPosts] = await Promise.all([getPostContent(resolvedParams.slug), getAllPosts()])

  if (!post) {
    notFound()
  }

  const related = allPosts
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => b.tags.filter((tag) => post.tags.includes(tag)).length - a.tags.filter((tag) => post.tags.includes(tag)).length)
    .slice(0, 3)

  const published = new Date(post.date)
  const dateLabel = Number.isNaN(published.getTime()) ? post.date : format(published, "MMMM yyyy")

  return (
    <article>
      <StructuredData
        type="BlogPosting"
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.coverImage,
          datePublished: post.date,
          author: post.author
            ? {
                "@type": "Person",
                name: post.author.name,
                ...(post.author.url ? { url: post.author.url } : {}),
              }
            : undefined,
        }}
      />

      <PageHero
        title={post.title}
        lede={post.description}
        art={<InsightArt slug={post.slug} title={post.title} />}
      >
        <p className="mb-0 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[color-mix(in_srgb,var(--chalk)_78%,transparent)]">
          <span className="inline-flex items-center gap-2">
            <Glyph name="person" size={16} />
            <AuthorName name={post.author.name} url={post.author.url} onDark />
          </span>
          <span className="inline-flex items-center gap-2">
            <Glyph name="clock" size={16} />
            {post.readingTime} min read
          </span>
          <span>{dateLabel}</span>
        </p>
      </PageHero>

      <div className={`${wrap} grid gap-12 py-14 md:py-20 lg:grid-cols-12`}>
        <div className="min-w-0 lg:col-span-8">
          <Prose source={post.content} />
        </div>
        <aside className="lg:col-span-4">
          <div className="grid gap-5 lg:sticky lg:top-[96px]">
            <div className="plate bg-[var(--chalk)] p-6">
              <p className="m-0 font-geist-mono text-xs uppercase tracking-[0.18em] text-[var(--forest)]">Written by</p>
              <AuthorName name={post.author.name} url={post.author.url} className="font-serif-display mt-3 text-2xl" />
              <p className="mb-0 mt-1 text-[var(--ink-soft)]">{post.author.role}</p>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 border-t border-[var(--rule)] p-0 pt-4">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`/insights?tags=${encodeURIComponent(tag)}`} className="inline-block rounded-full bg-[var(--paper)] px-3 py-1 text-sm text-[var(--ink)] no-underline hover:bg-[var(--signal)]">
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="plate bg-[var(--forest)] p-6 text-[var(--chalk)]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
                <Glyph name="compass" size={18} />
              </span>
              <p className="font-serif-display m-0 mt-4 text-2xl leading-tight">Not sure where to start?</p>
              <p className="mb-0 mt-2 leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">The AI Opportunity Review looks at one workflow and recommends a sensible first step.</p>
              <Link href="/ai-opportunity-review" className="btn-signal mt-5">
                See how it works
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
          <div className={`${wrap} py-14 md:py-20`}>
            <div className="flex items-end justify-between gap-6">
              <h2 className={sectionTitle}>Keep reading</h2>
              <Link href="/insights" className="inline-flex items-center gap-2 text-[var(--ink)] underline decoration-[var(--signal)] decoration-2 underline-offset-4">
                All insights <Glyph name="arrow" size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((other) => (
                <BlogCard key={other.slug} {...other} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ClosingCta
        title="What’s taking too much time?"
        body="Tell us where things get stuck. We’ll say whether a build, an automation or a training session makes sense."
        art={<TangleLine className="mb-10 block h-auto w-full max-w-[720px]" />}
      />
    </article>
  )
}

function AuthorName({
  name,
  url,
  onDark = false,
  className = "",
}: {
  name: string
  url?: string
  onDark?: boolean
  className?: string
}) {
  if (!url) return <span className={className}>{name}</span>

  const tone = onDark
    ? "text-[var(--chalk)] decoration-[var(--signal)]"
    : "text-[var(--ink)] decoration-[var(--signal)]"

  return (
    <a
      href={url}
      className={`inline-flex min-h-11 items-center underline decoration-2 underline-offset-4 ${tone} ${className}`}
    >
      {name}
    </a>
  )
}
