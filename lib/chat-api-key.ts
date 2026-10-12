/** Public gate key. It is visible in the client bundle and is not authentication. */
export const chatApiKey = (process.env.NEXT_PUBLIC_API_KEY || "").trim().replace(/^['"](.+)['"]$/, "$1")
