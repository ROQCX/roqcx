"use client"

import { Search, X } from "lucide-react"

interface FilterBarProps {
  query: string
  placeholder: string
  onQuery: (value: string) => void
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  onClear: () => void
  pending: boolean
  count: number
  noun: string
}

/** Search field and filter chips shared by the work and insights indexes. */
export function FilterBar({ query, placeholder, onQuery, options, selected, onToggle, onClear, pending, count, noun }: FilterBarProps) {
  const filtering = Boolean(query) || selected.length > 0
  return (
    <div className="grid gap-5">
      <label className="relative block">
        <span className="sr-only">{placeholder}</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--ink-soft)]" aria-hidden />
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          className="h-14 w-full rounded-full border border-[var(--rule)] bg-[var(--chalk)] pl-12 pr-5 text-base text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--forest)]"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => {
          const on = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option)}
              className={`min-h-10 rounded-full border px-4 text-sm ${
                on
                  ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--chalk)]"
                  : "border-[var(--rule)] bg-[var(--chalk)] text-[var(--ink)] hover:border-[var(--forest)]"
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
      {filtering ? (
        <div className="flex items-center justify-between border-t border-[var(--rule)] pt-4 text-sm text-[var(--ink-soft)]">
          <p className="m-0" aria-live="polite">
            {pending ? "Updating…" : `${count} ${noun}${count === 1 ? "" : "s"}`}
          </p>
          <button type="button" onClick={onClear} className="inline-flex min-h-10 items-center gap-1.5 text-[var(--ink)]">
            <X className="h-4 w-4" aria-hidden />
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  )
}
