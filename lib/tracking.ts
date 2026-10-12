export const LINKEDIN_PARTNER_ID = "8341681"

/** Container ids only. Anything else is ignored so it cannot be interpolated into a script. */
export function googleTagManagerId() {
  const id = (process.env.NEXT_PUBLIC_GTM_ID || "").trim()
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : ""
}
