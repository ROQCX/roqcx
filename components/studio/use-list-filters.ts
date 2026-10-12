"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export function useListFilters(param: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const query = searchParams.get("q") || ""
  const selected = searchParams.get(param)?.split(",").filter(Boolean) ?? []

  function push(params: URLSearchParams) {
    const qs = params.toString()
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname)
    })
  }

  function setQuery(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set("q", value)
    else params.delete("q")
    push(params)
  }

  function toggle(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    if (next.length > 0) params.set(param, next.join(","))
    else params.delete(param)
    push(params)
  }

  function clear() {
    startTransition(() => {
      router.push(pathname)
    })
  }

  return { query, selected, isPending, setQuery, toggle, clear }
}
