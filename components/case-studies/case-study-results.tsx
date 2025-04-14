import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CaseStudy } from "../../lib/case-studies"

interface CaseStudyResultsProps {
  caseStudy: CaseStudy
}

export function CaseStudyResults({ caseStudy }: CaseStudyResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {caseStudy.results.map((result) => (
            <div
              key={result.title}
              className="flex items-center justify-between rounded-lg border border-border/50 p-4"
            >
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.title}
              </span>
              <span className="text-lg font-semibold text-primary">
                {result.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 