"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useTransition, useState } from "react"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Search, X, Filter } from "lucide-react"
import { CaseStudyCard } from "./case-study-card"
import type { CaseStudy } from "../../lib/case-studies"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

interface CaseStudySearchProps {
  caseStudies: CaseStudy[]
  availableIndustries: string[]
}

export function CaseStudySearch({ caseStudies, availableIndustries }: CaseStudySearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const currentQuery = searchParams.get("q") || ""
  const currentIndustries = searchParams.get("industries")?.split(",").filter(Boolean) || []

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (value: string) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString("q", value)}`
      )
    })
  }

  const toggleIndustry = (industry: string) => {
    startTransition(() => {
      const newIndustries = currentIndustries.includes(industry)
        ? currentIndustries.filter((i) => i !== industry)
        : [...currentIndustries, industry]

      router.push(
        `${pathname}?${createQueryString("industries", newIndustries.join(","))}`
      )
    })
  }

  const clearFilters = () => {
    startTransition(() => {
      router.push(pathname)
    })
  }

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch = !currentQuery || 
      study.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(currentQuery.toLowerCase()) ||
      study.client.toLowerCase().includes(currentQuery.toLowerCase())

    const matchesIndustries = currentIndustries.length === 0 ||
      currentIndustries.every((industry) => study.industry === industry)

    return matchesSearch && matchesIndustries
  })

  return (
    <div className="w-full space-y-8">
      <div className="container mx-auto space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search case studies..."
              className="h-12 pl-12 text-base"
              value={currentQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {currentIndustries.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {currentIndustries.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter by Industry</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {availableIndustries.map((industry) => (
                  <Button
                    key={industry}
                    variant={currentIndustries.includes(industry) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {(currentQuery || currentIndustries.length > 0) && (
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isPending ? "Updating results..." : "Showing filtered results"}
            </p>
            <button
              onClick={clearFilters}
              className="flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <X className="mr-1.5 h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} {...study} />
          ))}
          {filteredCaseStudies.length === 0 && (
            <div className="col-span-full py-12 text-center text-lg text-zinc-600 dark:text-zinc-400">
              No case studies found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 