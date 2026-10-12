/** Slugs come from filenames. Reject anything that could escape the content directory. */
export function isContentSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
