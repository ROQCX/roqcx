import Image from "next/image"

interface BrowserSandboxProps {
  src: string
  alt: string
  url?: string
}

export function BrowserSandbox({ src, alt, url = "https://example.com" }: BrowserSandboxProps) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-geist-mono truncate rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            {url}
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-950">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 960px"
        />
      </div>
    </div>
  )
}

