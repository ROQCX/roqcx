import fs from "fs"

interface ContentDates {
  date?: string
  updated?: string
}

/** Best-effort last modified for sitemap entries: newest of file mtime and frontmatter dates. */
export function getContentLastModified(
  filePath: string,
  { date, updated }: ContentDates,
): Date {
  const { mtimeMs } = fs.statSync(filePath)
  const timestamps = [mtimeMs]

  for (const value of [updated, date]) {
    if (!value) continue
    const parsed = new Date(value).getTime()
    if (!Number.isNaN(parsed)) {
      timestamps.push(parsed)
    }
  }

  return new Date(Math.max(...timestamps))
}

export function latestDate(dates: Date[]): Date {
  if (dates.length === 0) return new Date()
  return new Date(Math.max(...dates.map((d) => d.getTime())))
}
