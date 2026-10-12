/** How long a chat demo session, its cookie, and its stored turns stay valid. */
export const SESSION_TTL_MS = 24 * 60 * 60 * 1000

/** Cookie maxAge is seconds. Keep this derived from the millisecond TTL. */
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000
