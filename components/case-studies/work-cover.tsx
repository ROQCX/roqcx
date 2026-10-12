import Image from "next/image"
import type { CaseStudy } from "../../lib/case-studies"
import { LoopVideo, PhoneLoop } from "./phone-loop"

interface DeviceScreenProps {
  src: string
  mobileSrc?: string
  mobileVideo?: string
  sizes: string
  className?: string
  /** Work cards pair an iMac with a phone. The hero collage is the iMac only. */
  showPhone?: boolean
  /** Above-the-fold hero frames should not wait for lazy loading. */
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
}

function GlassImage({
  src,
  sizes,
  className,
  loading,
  fetchPriority,
}: {
  src: string
  sizes: string
  className?: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority ?? (loading === "eager" ? "high" : undefined)}
      className={className ?? "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"}
    />
  )
}

const aluminumGrain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

/** Silver 24-inch iMac, straight on. Work cards set a phone in front of the lower-right corner. */
export function DeviceScreen({ src, mobileSrc, mobileVideo, sizes, className, showPhone = true, loading, fetchPriority }: DeviceScreenProps) {
  return (
    <div className={className}>
      <div className="relative">
        <div className={showPhone ? "relative z-0 w-[86%]" : "relative w-full"}>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1 left-1/2 h-3 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-[6px]"
          />
          <div className="relative overflow-hidden rounded-[1.15rem] shadow-[0_22px_28px_-20px_rgba(28,26,24,0.72),0_1px_0_rgba(255,255,255,0.75)_inset,0_0_0_1px_rgba(70,64,58,0.28)]">
            <div
              className="relative"
              style={{
                background: [
                  "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 14%)",
                  "linear-gradient(90deg, rgba(55,50,46,0.22) 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 92%, rgba(40,36,32,0.24) 100%)",
                  "linear-gradient(180deg, #fbfaf8 0%, #e6e2dc 36%, #c8c3bb 100%)",
                ].join(","),
              }}
            >
              <div className="relative px-[1.7%] pb-0 pt-[1.7%]">
                <div className="relative rounded-[0.7rem] bg-[#0a0b0c] px-[0.45rem] pb-[0.45rem] pt-[0.72rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1px_#000]">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[0.28rem] z-10 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_32%_32%,#9aa0aa_0%,#3a3e46_42%,#0b0c0e_70%)] shadow-[0_0_0_1px_#1c1e22,inset_0_0_0_0.5px_rgba(255,255,255,0.35)]"
                  />
                  <div className="relative aspect-video overflow-hidden rounded-[0.28rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                    <GlassImage src={src} sizes={sizes} loading={loading} fetchPriority={fetchPriority} />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_16%,transparent_34%)]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                </div>
              </div>
              <div className="relative h-0 pb-[6.4%]" aria-hidden>
                <div className="absolute inset-x-[18%] top-0 h-px bg-white/45" />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
                style={{ backgroundImage: aluminumGrain, backgroundSize: "160px 160px" }}
              />
            </div>
          </div>
          <div className="relative z-0 flex flex-col items-center" aria-hidden>
            <div
              className="-mt-px h-3.5 w-[13%] bg-[linear-gradient(90deg,#7a7672_0%,#f7f5f2_42%,#f7f5f2_58%,#6f6b67_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
              style={{ clipPath: "polygon(24% 0, 76% 0, 100% 100%, 0 100%)" }}
            />
            <div className="-mt-px h-[7px] w-[46%] rounded-[50%] bg-[linear-gradient(180deg,#fdfcfb_0%,#d9d4cc_42%,#8f8b86_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_12px_-8px_rgba(20,16,12,0.65)]" />
          </div>
        </div>

        {showPhone ? (
          <div className="absolute bottom-0 right-0 z-10 w-[18%]">
            <div className="rounded-[1.15rem] bg-[var(--void)] p-[3px] shadow-[0_16px_28px_-12px_rgba(12,15,13,0.7)] ring-1 ring-black/30">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[0.95rem] bg-[var(--chalk)]">
                {/* Capture sits between the notch and the home indicator so the page isn't clipped by the chrome. */}
                <div className="absolute inset-x-0 bottom-[3.4%] top-[6.4%]">
                  {mobileVideo ? (
                    <LoopVideo
                      src={mobileVideo}
                      poster={mobileSrc ?? src}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  ) : (
                    <GlassImage src={mobileSrc ?? src} sizes="(min-width: 768px) 140px, 28vw" />
                  )}
                </div>
                <div className="pointer-events-none absolute left-1/2 top-[2.2%] h-[3.2%] w-[34%] -translate-x-1/2 rounded-full bg-[var(--void)]" aria-hidden />
                <div className="pointer-events-none absolute bottom-[1.6%] left-1/2 h-[0.7%] w-[32%] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--ink)_55%,transparent)]" aria-hidden />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface WorkCoverProps {
  study: Pick<CaseStudy, "coverImage" | "coverVideo" | "desktopImage" | "mobileImage" | "surface">
  sizes: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
}

export function WorkCover({ study, sizes, loading, fetchPriority }: WorkCoverProps) {
  if (!study.coverImage && !study.desktopImage) return null

  if (study.coverVideo) {
    return (
      <div className="paper-grid relative aspect-[4/3] overflow-hidden border-b border-[var(--rule)]">
        <div className="absolute inset-3 flex items-center justify-center">
          <PhoneLoop src={study.coverVideo} poster={study.coverImage} className="h-full" />
        </div>
      </div>
    )
  }

  if (study.surface === "website") {
    return (
      <div className="paper-grid flex aspect-[4/3] flex-col justify-end border-b border-[var(--rule)] px-4 pb-4 pt-5 sm:px-5">
        <DeviceScreen
          src={study.desktopImage ?? study.coverImage}
          mobileSrc={study.mobileImage ?? study.coverImage}
          mobileVideo={study.coverVideo}
          sizes={sizes}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--rule)] bg-[var(--paper)]">
      <Image
        src={study.coverImage}
        alt=""
        fill
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority ?? (loading === "eager" ? "high" : undefined)}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
      />
    </div>
  )
}
