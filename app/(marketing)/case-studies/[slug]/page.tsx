import { notFound } from "next/navigation"
import { getAllCaseStudies, getCaseStudyContent, type CaseStudyWithContent } from "@/lib/case-studies"
import { StructuredData } from "@/components/seo/structured-data"
import Image from "next/image"
import Link from "next/link"
import { CaseStudyCard } from "@/components/case-studies/case-study-card"
import { Prose } from "@/components/studio/prose"
import { ClosingCta, PageHero, sectionTitle, wrap } from "@/components/studio/page-hero"
import { Glyph, TangleLine } from "@/components/studio/illustrations"
import { PhoneLoop } from "@/components/case-studies/phone-loop"
import { pageSeo, siteUrl } from "@/lib/seo"

// Generate static pages for all case studies at build time
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const caseStudies = await getAllCaseStudies()
  const caseStudy = caseStudies.find((c) => c.slug === resolvedParams.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    }
  }

  return pageSeo({
    title: caseStudy.title,
    description: caseStudy.description,
    path: `/case-studies/${caseStudy.slug}`,
    type: "article",
  })
}

const resultCols: Record<number, string> = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }

function WorkBreadcrumb({ study }: { study: CaseStudyWithContent }) {
  const current = study.client || study.title
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/case-studies" },
    { name: current, href: `/case-studies/${study.slug}` },
  ]

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `${siteUrl}${crumb.href}`,
          })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[color-mix(in_srgb,var(--chalk)_72%,transparent)]">
          {crumbs.map((crumb, index) => {
            const isCurrent = index === crumbs.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {isCurrent ? (
                  <span aria-current="page" className="text-[var(--chalk)]">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="text-[var(--chalk)] no-underline hover:text-[var(--signal)]">
                    {crumb.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// The page component - will be statically generated at build time
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const [caseStudy, allCaseStudies] = await Promise.all([
    getCaseStudyContent(resolvedParams.slug),
    getAllCaseStudies(),
  ])

  if (!caseStudy) {
    notFound()
  }

  const relatedStudies = allCaseStudies
    .filter((study) => study.slug !== resolvedParams.slug)
    .slice(0, 3)

  const industries = caseStudy.industry
  const facts = [
    { label: "Client", value: caseStudy.client },
    { label: "Our role", value: caseStudy.role },
    { label: "Duration", value: caseStudy.duration },
    { label: "Team", value: caseStudy.teamSize },
  ].filter((fact) => fact.value)

  return (
    <article>
      <StructuredData
        type="Article"
        data={{
          "@type": "Article",
          headline: caseStudy.title,
          description: caseStudy.description,
          image: caseStudy.coverImage,
          datePublished: caseStudy.date,
          dateModified: caseStudy.lastModified?.toISOString(),
          url: `${siteUrl}/case-studies/${caseStudy.slug}`,
          author: caseStudy.author
            ? {
                "@type": "Person",
                name: caseStudy.author.name,
              }
            : undefined,
        }}
      />

      <PageHero
        nav={<WorkBreadcrumb study={caseStudy} />}
        title={caseStudy.title}
        lede={caseStudy.description}
        plate={false}
        art={
          caseStudy.coverVideo ? (
            <div className="flex justify-center">
              <PhoneLoop
                src={caseStudy.coverVideo}
                poster={caseStudy.coverImage}
                className="h-[min(68vh,520px)]"
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-[18px] border border-[color-mix(in_srgb,var(--chalk)_18%,transparent)] bg-[var(--chalk)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--clay)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--rule)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--rule)]" />
                <span className="ml-3 h-5 flex-1 rounded-full bg-[var(--paper)]" />
              </div>
              <div className="relative aspect-[16/10] bg-[var(--paper)]">
                <Image src={caseStudy.coverImage} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
              </div>
            </div>
          )
        }
      >
        <div className="mt-8 flex items-center gap-4">
          <span className="relative grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-full bg-[var(--chalk)]">
            <Image src={caseStudy.logo} alt={`${caseStudy.client} logo`} fill sizes="56px" className="object-contain p-2" />
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {industries.map((industry) => (
              <li key={industry} className="rounded-full border border-[color-mix(in_srgb,var(--chalk)_22%,transparent)] px-3 py-1 text-sm text-[var(--chalk)]">
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {caseStudy.results?.length ? (
        <section className="border-b border-[var(--rule)] bg-[var(--chalk)]">
          <dl className={`${wrap} m-0 grid gap-px overflow-hidden py-0 ${resultCols[Math.min(caseStudy.results.length, 3)]}`}>
            {caseStudy.results.slice(0, 3).map((result, index) => (
              <div key={result.title} className={`py-8 sm:px-8 ${index > 0 ? "border-t border-[var(--rule)] sm:border-l sm:border-t-0" : ""} ${index === 0 ? "sm:pl-0" : ""}`}>
                <dt className="font-geist-mono text-xs uppercase tracking-[0.18em] text-[var(--forest)]">{result.title}</dt>
                <dd className="font-serif-display m-0 mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight">{result.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <div className={`${wrap} grid gap-12 py-14 md:py-20 lg:grid-cols-12`}>
        <div className="min-w-0 lg:col-span-8">
          <Prose source={caseStudy.content} numbered={false} />
        </div>
        <aside className="lg:col-span-4">
          <div className="grid gap-5 lg:sticky lg:top-[96px]">
            <div className="plate bg-[var(--chalk)] p-6">
              <p className="m-0 font-geist-mono text-xs uppercase tracking-[0.18em] text-[var(--forest)]">At a glance</p>
              <dl className="m-0 mt-4 grid gap-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="border-t border-[var(--rule)] pt-3">
                    <dt className="text-sm text-[var(--ink-soft)]">{fact.label}</dt>
                    <dd className="m-0 mt-0.5">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {caseStudy.technologies?.length ? (
                <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 border-t border-[var(--rule)] p-0 pt-4">
                  {caseStudy.technologies.map((tech) => (
                    <li key={tech} className="rounded-full bg-[var(--paper)] px-3 py-1 text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="plate bg-[var(--forest)] p-6 text-[var(--chalk)]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]">
                <Glyph name="chat" size={18} />
              </span>
              <p className="font-serif-display m-0 mt-4 text-2xl leading-tight">Something similar in your business?</p>
              <p className="mb-0 mt-2 leading-relaxed text-[color-mix(in_srgb,var(--chalk)_82%,transparent)]">Tell us where it gets stuck. We’ll say what we would try first.</p>
              <Link href="/contact" className="btn-signal mt-5">
                Talk to us
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {relatedStudies.length > 0 ? (
        <section className="border-t border-[var(--rule)] bg-[var(--chalk)]">
          <div className={`${wrap} py-14 md:py-20`}>
            <div className="flex items-end justify-between gap-6">
              <h2 className={sectionTitle}>More work</h2>
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-[var(--ink)] underline decoration-[var(--signal)] decoration-2 underline-offset-4">
                All work <Glyph name="arrow" size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedStudies.map((study) => (
                <CaseStudyCard key={study.slug} {...study} />
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
