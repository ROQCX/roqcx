import { BlogSearch } from "../../../components/insights/blog-search"
import { getAllPosts } from "../../../lib/blog"
import { Suspense } from "react"
import { FullBleedSection, GridBg, RQX, SectionHeader } from "../../../components/redesign/atoms"

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
  title: "Journal | Notes from the sprint room | ROQ CX",
  description: "Field notes on prototyping, validating, and shipping product for SMEs, written by the team running the two-week sprints.",
  alternates: { canonical: "https://www.roqcx.com/insights" },
  openGraph: {
    title: "Journal | Notes from the sprint room | ROQ CX",
    description: "Field notes on prototyping, validating, and shipping product for SMEs, written by the team running the two-week sprints.",
    url: "https://www.roqcx.com/insights",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | Notes from the sprint room | ROQ CX",
    description: "Field notes on prototyping, validating, and shipping product for SMEs.",
    images: ["/og"],
  },
}

export default async function BlogIndex() {
  const posts = await getAllPosts()
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort()

  return (
    <FullBleedSection
      style={{
        background: RQX.bg,
        position: "relative",
        overflow: "hidden",
      }}
      className="py-[88px] pb-[120px] px-6 sm:px-10 lg:px-14"
    >
      <GridBg opacity={0.45} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -260,
          left: -240,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in oklab, ${RQX.accent2} 14%, transparent) 0%, transparent 60%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: 1100 }}>
          <SectionHeader
            kicker="Journal"
            title={
              <>
                Insights for teams
                <br />
                building faster.
              </>
            }
            lede="Notes on prototyping, shipping, and the systems behind repeatable delivery."
          />
        </div>

        <div style={{ marginTop: 48 }}>
          <Suspense fallback={<BlogSearchSkeleton />}>
            <BlogSearch posts={posts} availableTags={allTags} />
          </Suspense>
        </div>
      </div>
    </FullBleedSection>
  )
} 