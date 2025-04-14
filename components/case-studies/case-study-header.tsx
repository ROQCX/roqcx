import Image from "next/image"
import type { CaseStudy } from "../../lib/case-studies"

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy
}

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  return (
    <header className="relative mb-8">
      <div className="absolute inset-0 -z-10">
        <Image
          src={caseStudy.coverImage}
          alt={caseStudy.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-6 h-16 w-40">
            <Image
              src={caseStudy.logo}
              alt={`${caseStudy.client} logo`}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {caseStudy.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {caseStudy.description}
          </p>
        </div>
      </div>
    </header>
  )
} 