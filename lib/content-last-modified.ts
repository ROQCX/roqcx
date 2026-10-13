/**
 * Sitemap last modified from the `updated` frontmatter date. File mtime is not used:
 * a fresh build checkout stamps every file with the build time.
 */
export function getContentLastModified(updated?: string): Date | undefined {
  if (!updated) return undefined
  const parsed = new Date(updated)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

export function latestDate(dates: (Date | undefined)[]): Date | undefined {
  const times = dates.filter((d): d is Date => d !== undefined).map((d) => d.getTime())
  return times.length === 0 ? undefined : new Date(Math.max(...times))
}
