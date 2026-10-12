declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function executeRecaptcha(action: string) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey || typeof window.grecaptcha === "undefined") {
    throw new Error("reCAPTCHA is not configured")
  }
  return window.grecaptcha.execute(siteKey, { action })
}
