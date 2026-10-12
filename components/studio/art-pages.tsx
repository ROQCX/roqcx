import type { ReactNode } from "react"
import { Art, Bar, C, G, Sheet, type GlyphName } from "./art-primitives"

/* ─────────────────────── Services triad ─────────────────────── */

/** Three overlapping offers around one problem. Not every engagement needs all three. */
export function TriadArt() {
  const rings: { cx: number; cy: number; label: string; icon: GlyphName; lx: number; ly: number; fill: string }[] = [
    { cx: 200, cy: 150, label: "Automate", icon: "layers", lx: 140, ly: 96, fill: C.signal },
    { cx: 320, cy: 150, label: "Build", icon: "browser", lx: 352, ly: 96, fill: C.chalk },
    { cx: 260, cy: 254, label: "Train", icon: "team", lx: 246, ly: 318, fill: C.clay },
  ]
  return (
    <Art viewBox="80 30 360 344" label="Illustration: Automate, Build and Train overlap around your problem.">
      {rings.map((r) => (
        <circle key={r.label} cx={r.cx} cy={r.cy} r={110} fill={r.fill} fillOpacity={0.1} stroke={r.fill} strokeOpacity={0.8} strokeWidth={1.75} />
      ))}
      {rings.map((r) => (
        <g key={`${r.label}-l`}>
          <G name={r.icon} x={r.lx - 30} y={r.ly - 17} size={22} color={C.chalk} />
          <text x={r.lx} y={r.ly} fontSize="16" fill={C.chalk}>{r.label}</text>
        </g>
      ))}
      <circle cx={260} cy={186} r={34} fill={C.signal} />
      <G name="compass" x={246} y={172} size={28} color={C.void} width={2} />
      <rect x={214} y={228} width={92} height={22} rx={11} fill={C.void} />
      <text x={260} y={243} textAnchor="middle" fontSize="13" fill={C.chalk}>your problem</text>
    </Art>
  )
}

/** About hero: the Dubai skyline at dusk, with AI already switched on in the businesses inside it. Drawn for dark backgrounds. */
export function AboutArt() {
  const line = { fill: C.void, stroke: C.chalk, strokeOpacity: 0.7, strokeWidth: 1.5, strokeLinejoin: "round" as const }
  const towers = [
    { x: 92, y: 214, w: 30, h: 86 },
    { x: 128, y: 184, w: 26, h: 116 },
    { x: 160, y: 236, w: 38, h: 64 },
    { x: 204, y: 162, w: 28, h: 138 },
    { x: 238, y: 206, w: 26, h: 94 },
    { x: 270, y: 146, w: 22, h: 154 },
    { x: 354, y: 196, w: 30, h: 104 },
    { x: 390, y: 228, w: 36, h: 72 },
    { x: 432, y: 178, w: 26, h: 122 },
  ]
  // Lit windows: businesses where AI is already part of the work.
  const lit: { x: number; y: number; icon: GlyphName }[] = [
    { x: 140, y: 204, icon: "chat" },
    { x: 218, y: 182, icon: "doc" },
    { x: 315, y: 150, icon: "layers" },
    { x: 368, y: 214, icon: "mail" },
    { x: 444, y: 198, icon: "browser" },
  ]
  return (
    <Art viewBox="20 20 460 380" label="Illustration: the Dubai skyline at dusk, with AI connecting the businesses inside it.">
      {/* Low sun over the Gulf */}
      <circle cx={190} cy={170} r={86} fill={C.signal} fillOpacity={0.1} />
      <circle cx={190} cy={170} r={86} fill="none" stroke={C.signal} strokeOpacity={0.45} strokeWidth={1.25} />
      <circle cx={190} cy={170} r={118} fill="none" stroke={C.signal} strokeOpacity={0.15} strokeWidth={1} strokeDasharray="2 6" />

      {/* Connections between lit businesses */}
      {lit.slice(1).map((to, i) => {
        const from = lit[i]
        const mx = (from.x + to.x) / 2
        const my = Math.min(from.y, to.y) - 46
        return (
          <path
            key={`${from.x}-${to.x}`}
            d={`M${from.x + 4} ${from.y} Q ${mx} ${my} ${to.x + 4} ${to.y}`}
            fill="none"
            stroke={C.signal}
            strokeOpacity={0.75}
            strokeWidth={1.25}
            className="ill-march"
          />
        )
      })}

      {/* Burj Al Arab */}
      <path d="M44 300 V176 Q 92 212 86 300 Z" {...line} />
      <path d="M44 214 Q 66 228 72 260" fill="none" stroke={C.chalk} strokeOpacity={0.35} strokeWidth={1} />

      {towers.map((t) => (
        <rect key={t.x} x={t.x} y={t.y} width={t.w} height={t.h} {...line} />
      ))}

      {/* Burj Khalifa */}
      <path d="M298 300 V236 H304 V190 H309 V140 H313 V98 H316 V66 L319 34 L322 66 V98 H325 V140 H329 V190 H334 V236 H340 V300 Z" {...line} />

      {/* Unlit windows */}
      {towers.map((t) =>
        [0, 1, 2].map((row) => (
          <rect key={`${t.x}-${row}`} x={t.x + 7} y={t.y + 18 + row * 22} width={t.w - 14} height={4} rx={2} fill={C.chalk} fillOpacity={0.12} />
        )),
      )}

      {lit.map((w, i) => (
        <g key={w.icon}>
          <rect x={w.x} y={w.y - 4} width={8} height={8} rx={1.5} fill={C.signal} className={i % 2 ? "ill-pulse" : undefined} />
          <circle cx={w.x + 4} cy={w.y - 38} r={15} fill={C.void} stroke={C.signal} strokeWidth={1.25} />
          <G name={w.icon} x={w.x - 4} y={w.y - 46} size={16} color={C.chalk} />
          <path d={`M${w.x + 4} ${w.y - 23} V${w.y - 6}`} stroke={C.signal} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 3" />
        </g>
      ))}

      {/* Waterline and reflection */}
      <path d="M28 300 H472" stroke={C.chalk} strokeOpacity={0.7} strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${150 + i * 12} ${314 + i * 12} H${230 - i * 12}`}
          stroke={C.signal}
          strokeOpacity={0.55 - i * 0.12}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <path
          key={`r-${i}`}
          d={`M${270 + i * 30} ${318 + i * 14} H${330 + i * 34}`}
          stroke={C.chalk}
          strokeOpacity={0.2}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
      ))}

      {/* Location */}
      <circle cx={52} cy={362} r={4} fill={C.signal} />
      <text x={64} y={367} fontSize="15" fill={C.chalk}>Dubai</text>
      <text x={114} y={367} fontSize="11" letterSpacing="1" fontFamily="var(--font-geist-mono), ui-monospace, monospace" fill={C.chalk} fillOpacity={0.55}>
        25.2° N, 55.3° E
      </text>
    </Art>
  )
}

/* ─────────────────────── Insight covers ─────────────────────── */

function AutomationSmbArt() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={24 + i * 30} y={76} width={30} height={22} fill={i % 2 ? C.chalk : C.clay} stroke={C.ink} strokeWidth={1.25} />
          <path d={`M${24 + i * 30} 98 a15 15 0 0 0 30 0 z`} fill={i % 2 ? C.chalk : C.clay} stroke={C.ink} strokeWidth={1.25} />
        </g>
      ))}
      <Sheet x={24} y={112} w={120} h={118} r={4}>
        <rect x={38} y={130} width={40} height={36} rx={3} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
        <rect x={96} y={150} width={34} height={80} fill={C.forest} />
      </Sheet>
      <rect x={156} y={206} width={226} height={14} rx={7} fill={C.paper} stroke={C.ink} strokeWidth={1.25} />
      <path d="M164 213 H374" stroke={C.ink} strokeWidth={1.25} className="ill-march" />
      {(["mail", "doc", "clock"] as GlyphName[]).map((icon, i) => (
        <Sheet key={icon} x={170 + i * 66} y={160} w={52} h={42} r={8}>
          <G name={icon} x={186 + i * 66} y={172} size={20} />
        </Sheet>
      ))}
      <Sheet x={392} y={176} w={74} h={54} r={10} fill={C.forest} stroke={C.forest}>
        <G name="check" x={404} y={192} size={20} color={C.signal} width={2.25} />
        <text x={430} y={208} fontSize="13" fill={C.chalk}>Done</text>
      </Sheet>
      <circle cx={429} cy={118} r={26} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
      <G name="person" x={417} y={106} />
      <path d="M429 144 V172" stroke={C.ink} strokeWidth={1.25} strokeDasharray="3 4" />
      <text x={262} y={96} fontSize="14" fontStyle="italic" fill={C.clay}>a person signs off</text>
      <path d="M372 92 C 390 92, 396 104, 400 112" fill="none" stroke={C.clay} strokeWidth={1.5} strokeLinecap="round" />
    </>
  )
}

function CxArt() {
  const stops: { x: number; y: number; icon: GlyphName; label: string; pain?: boolean; end?: boolean }[] = [
    { x: 56, y: 226, icon: "chat", label: "Asks" },
    { x: 150, y: 236, icon: "mail", label: "Hears back" },
    { x: 246, y: 186, icon: "clock", label: "Waits", pain: true },
    { x: 340, y: 150, icon: "browser", label: "Gets help" },
    { x: 428, y: 104, icon: "check", label: "Returns", end: true },
  ]
  return (
    <>
      <path d="M40 66 C 120 56, 190 70, 246 128 S 360 40, 448 36" fill="none" stroke={C.soft} strokeWidth={1.5} strokeDasharray="4 5" />
      <text x={40} y={52} fontSize="12" fill={C.soft}>how it feels</text>
      <path d="M56 226 C 100 250, 120 240, 150 236 S 210 196, 246 186 S 300 160, 340 150 S 400 120, 428 104" fill="none" stroke={C.forest} strokeWidth={2.5} />
      {stops.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r={22} fill={s.pain ? C.clay : s.end ? C.signal : C.chalk} stroke={C.ink} strokeWidth={1.5} />
          <G name={s.icon} x={s.x - 10} y={s.y - 10} size={20} color={s.pain ? C.chalk : C.ink} />
          <text x={s.x} y={s.y + 40} textAnchor="middle" fontSize="12" fill={s.pain ? C.clay : C.soft}>{s.label}</text>
        </g>
      ))}
      <ellipse cx={246} cy={186} rx={31} ry={30} fill="none" stroke={C.clay} strokeWidth={1.5} strokeDasharray="3 4" />
    </>
  )
}

function FoundationArt() {
  const layers = [
    { x: 60, y: 230, w: 360, label: "Data", fill: C.forest, text: C.chalk },
    { x: 100, y: 186, w: 280, label: "Process", fill: C.paper, text: C.ink },
    { x: 140, y: 142, w: 200, label: "Tools", fill: C.chalk, text: C.ink },
  ]
  return (
    <>
      {layers.map((l) => (
        <Sheet key={l.label} x={l.x} y={l.y} w={l.w} h={40} r={8} fill={l.fill} stroke={C.ink}>
          <text x={l.x + l.w / 2} y={l.y + 25} textAnchor="middle" fontSize="14" fill={l.text}>{l.label}</text>
        </Sheet>
      ))}
      <Sheet x={204} y={92} w={72} h={42} r={8} fill={C.signal}>
        <text x={240} y={118} textAnchor="middle" fontSize="14" fontWeight="600" fill={C.ink}>AI</text>
      </Sheet>
      <path d="M40 232 v38 M40 251 H56" fill="none" stroke={C.clay} strokeWidth={1.5} />
      <text x={30} y={290} fontSize="13" fontStyle="italic" fill={C.clay}>foundation first</text>
      <path d="M446 250 V100" stroke={C.ink} strokeWidth={1.5} strokeDasharray="3 4" />
      <path d="M440 108 l6 -8 6 8" fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={438} y={84} textAnchor="end" fontSize="12" fill={C.soft}>then build up</text>
    </>
  )
}

function EvolutionArt() {
  return (
    <>
      {["Scripts", "Rules", "Orchestration"].map((t, i) => (
        <Sheet key={t} x={20 + i * 155} y={40} w={130} h={180} r={12} fill={i === 2 ? C.chalk : C.paper}>
          <text x={85 + i * 155} y={66} textAnchor="middle" fontSize="13" fontWeight="600" fill={C.ink}>{t}</text>
        </Sheet>
      ))}
      <path d="M46 136 H124" stroke={C.ink} strokeWidth={1.5} />
      {[36, 70, 104].map((x, i) => (
        <rect key={x} x={x} y={125} width={22} height={22} rx={4} fill={i === 2 ? C.clay : C.chalk} stroke={C.ink} strokeWidth={1.25} />
      ))}
      <G name="cross" x={108} y={129} size={14} color={C.chalk} width={2} />
      <text x={85} y={186} textAnchor="middle" fontSize="11" fill={C.clay}>stops at exceptions</text>
      <path d="M240 86 l20 20 -20 20 -20 -20 z" fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
      <path d="M232 120 L210 152 M248 120 L270 152" stroke={C.ink} strokeWidth={1.25} />
      <rect x={192} y={152} width={36} height={24} rx={4} fill={C.chalk} stroke={C.ink} strokeWidth={1.25} />
      <rect x={252} y={152} width={36} height={24} rx={4} fill={C.chalk} stroke={C.ink} strokeWidth={1.25} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        const x = 395 + Math.cos(a) * 46
        const y = 138 + Math.sin(a) * 46
        return (
          <g key={i}>
            <path d={`M395 138 L${x.toFixed(1)} ${y.toFixed(1)}`} stroke={C.forest} strokeWidth={1.5} />
            <circle cx={x} cy={y} r={9} fill={C.paper} stroke={C.ink} strokeWidth={1.25} />
          </g>
        )
      })}
      <circle cx={395} cy={138} r={20} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
      <G name="person" x={385} y={128} size={20} />
      <path d="M20 256 H452" stroke={C.ink} strokeWidth={1.5} />
      <path d="M446 250 l8 6 -8 6" fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {[85, 240, 395].map((x) => (
        <circle key={x} cx={x} cy={256} r={5} fill={C.chalk} stroke={C.ink} strokeWidth={1.5} />
      ))}
    </>
  )
}

function VibeArt() {
  const code = [
    [60, C.signal], [120, C.chalk], [90, C.clay], [150, C.chalk], [70, C.signal], [110, C.chalk], [80, C.clay],
  ] as const
  return (
    <>
      <Sheet x={24} y={44} w={240} h={196} r={12} fill={C.ink} stroke={C.ink}>
        <circle cx={42} cy={62} r={4} fill={C.clay} />
        <circle cx={56} cy={62} r={4} fill={C.soft} />
        <circle cx={70} cy={62} r={4} fill={C.soft} />
        {code.map(([w, f], i) => (
          <Bar key={i} x={44 + (i % 3 === 1 ? 16 : 0)} y={86 + i * 20} w={w} h={7} fill={f} />
        ))}
      </Sheet>
      <Sheet x={300} y={70} w={160} h={170} r={12}>
        <Bar x={316} y={90} w={90} h={10} fill={C.ink} />
        <Bar x={316} y={108} w={120} h={6} />
        <rect x={316} y={126} width={128} height={56} rx={8} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
        <rect x={316} y={196} width={60} height={24} rx={8} fill={C.forest} />
      </Sheet>
      <path d="M232 40 C 268 14, 314 18, 340 56" fill="none" stroke={C.clay} strokeWidth={1.75} strokeLinecap="round" />
      <path d="M332 50 l8 7 2-10" fill="none" stroke={C.clay} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <text x={352} y={50} fontSize="13" fontStyle="italic" fill={C.clay}>try</text>
      <path d="M340 256 C 316 284, 268 286, 238 252" fill="none" stroke={C.clay} strokeWidth={1.75} strokeLinecap="round" />
      <path d="M246 256 l-8 -5 -1 10" fill="none" stroke={C.clay} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <text x={352} y={276} fontSize="13" fontStyle="italic" fill={C.clay}>see, adjust</text>
    </>
  )
}

const insightArt: Record<string, () => ReactNode> = {
  "ai-automation-smb": AutomationSmbArt,
  "cx-matters": CxArt,
  "digital-transformation": FoundationArt,
  "rpa-evolution": EvolutionArt,
  "vibe-coding": VibeArt,
}

/** Cover drawing for an insight. Falls back to the signature line for new posts. */
export function InsightArt({ slug, title }: { slug: string; title?: string }) {
  const Draw = insightArt[slug]
  return (
    <Art viewBox="0 0 480 300" label={title ? `Illustration for ${title}` : undefined}>
      {Draw ? (
        <Draw />
      ) : (
        <g transform="translate(-40 90) scale(0.47)">
          <path
            d="M0 60 C 40 60, 60 18, 92 28 S 124 102, 82 92 S 58 36, 122 40 S 186 112, 152 102 S 132 26, 204 46 S 266 104, 232 94 S 222 36, 296 54 S 352 70, 400 60"
            fill="none"
            stroke={C.clay}
            strokeWidth="5"
          />
          <path d="M400 60 H1100" stroke={C.forest} strokeWidth="5" />
          <circle cx="1110" cy="60" r="16" fill={C.signal} stroke={C.ink} strokeWidth="3" />
        </g>
      )}
    </Art>
  )
}

/* ─────────────────────── Page headers ─────────────────────── */

export function NotesArt() {
  return (
    <Art viewBox="0 0 480 320">
      <Sheet x={24} y={36} w={432} h={250} r={14}>
        <path d="M240 36 V286" stroke={C.rule} strokeWidth={2} />
        {[84, 108, 132, 156, 180, 204, 228, 252].map((y, i) => (
          <g key={y}>
            <path d={`M48 ${y} H220`} stroke={C.rule} strokeWidth={1} />
            {i !== 3 ? <Bar x={52} y={y - 10} w={[150, 120, 160, 0, 140, 100, 150, 80][i]} h={6} fill={i === 0 ? C.ink : C.rule} /> : null}
          </g>
        ))}
        <rect x={48} y={142} width={160} height={16} rx={3} fill={C.signal} />
        <Bar x={52} y={147} w={136} h={6} fill={C.ink} />
        <rect x={266} y={70} width={60} height={34} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.25} />
        <rect x={358} y={70} width={60} height={34} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.25} />
        <path d="M326 87 H352" stroke={C.ink} strokeWidth={1.25} />
        <path d="M346 82 l6 5 -6 5" fill="none" stroke={C.ink} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={312} y={140} width={60} height={34} rx={6} fill={C.forest} />
        <path d="M296 104 L330 140 M388 104 L354 140" stroke={C.ink} strokeWidth={1.25} strokeDasharray="3 3" />
        <ellipse cx={342} cy={157} rx={46} ry={28} fill="none" stroke={C.clay} strokeWidth={1.5} />
        <text x={268} y={214} fontSize="13" fontStyle="italic" fill={C.clay}>start here?</text>
      </Sheet>
      <Sheet x={360} y={196} w={78} h={66} r={4} fill={C.signal} rotate={6}>
        <Bar x={372} y={214} w={50} h={5} fill={C.ink} />
        <Bar x={372} y={226} w={36} h={5} fill={C.ink} />
        <Bar x={372} y={238} w={44} h={5} fill={C.ink} />
      </Sheet>
      <g transform="rotate(-36 340 276)">
        <rect x={290} y={270} width={100} height={12} rx={3} fill={C.forest} stroke={C.ink} strokeWidth={1.25} />
        <path d="M290 270 l-16 6 16 6 z" fill={C.chalk} stroke={C.ink} strokeWidth={1.25} strokeLinejoin="round" />
      </g>
    </Art>
  )
}

export function PrivacyFlowArt() {
  return (
    <Art
      viewBox="0 0 480 270"
      label="Illustration: the enquiry form passes a spam check, is relayed by email to the studio inbox, and is not stored in a database."
    >
      <Sheet x={14} y={64} w={100} h={116} r={12}>
        <G name="form" x={28} y={80} />
        <Bar x={28} y={116} w={70} h={6} />
        <Bar x={28} y={130} w={58} h={6} />
        <rect x={28} y={146} width={52} height={18} rx={5} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
      </Sheet>
      <path d="M114 122 H146 M206 122 H256 M316 122 H350" stroke={C.ink} strokeWidth={1.75} className="ill-march" />
      <circle cx={176} cy={122} r={30} fill={C.chalk} stroke={C.ink} strokeWidth={1.5} />
      <G name="check" x={164} y={110} color={C.forest} width={2.25} />
      <circle cx={286} cy={122} r={30} fill={C.forest} />
      <G name="mail" x={274} y={110} color={C.chalk} />
      <Sheet x={350} y={88} w={118} h={70} r={12} fill={C.signal}>
        <G name="mail" x={364} y={100} size={20} />
        <text x={364} y={142} fontSize="13" fontWeight="600" fill={C.ink}>Studio inbox</text>
      </Sheet>
      <text x={64} y={204} textAnchor="middle" fontSize="12" fill={C.soft}>Your enquiry</text>
      <text x={176} y={174} textAnchor="middle" fontSize="12" fill={C.soft}>Spam check</text>
      <text x={286} y={174} textAnchor="middle" fontSize="12" fill={C.soft}>Email relay</text>
      <path d="M231 122 V200" stroke={C.clay} strokeWidth={1.5} strokeDasharray="3 4" />
      <g transform="translate(205 204)">
        <path d="M0 8 v30 a26 8 0 0 0 52 0 v-30" fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
        <ellipse cx={26} cy={8} rx={26} ry={8} fill={C.chalk} stroke={C.ink} strokeWidth={1.5} />
        <path d="M-6 -2 L58 52" stroke={C.clay} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <text x={268} y={236} fontSize="13" fontStyle="italic" fill={C.clay}>no database</text>
    </Art>
  )
}

export function LostArt() {
  return (
    <Art viewBox="0 0 480 220">
      <circle cx={40} cy={170} r={10} fill={C.forest} />
      <path d="M40 170 C 90 120, 60 60, 120 70 S 190 160, 160 130 S 150 40, 230 60 S 260 140, 300 96" fill="none" stroke={C.clay} strokeWidth={2} strokeDasharray="4 6" strokeLinecap="round" />
      <circle cx={318} cy={88} r={22} fill={C.chalk} stroke={C.clay} strokeWidth={1.75} />
      <text x={318} y={95} textAnchor="middle" fontSize="20" fontWeight="600" fill={C.clay}>?</text>
      <path d="M318 110 C 330 160, 380 176, 430 176" fill="none" stroke={C.forest} strokeWidth={2.5} />
      <G name="flag" x={426} y={146} size={30} />
    </Art>
  )
}

/* ─────────────────────── Chat demo ─────────────────────── */

/** How the memory demo works: what you say becomes a note it reads before answering. */
export function MemoryArt() {
  return (
    <Art
      viewBox="0 0 440 236"
      label="Illustration: what you tell the assistant is saved as a session note. When you ask, it looks back through the notes and answers from them."
    >
      <Sheet x={10} y={22} w={122} h={52} r={14} fill={C.forest} stroke={C.forest}>
        <Bar x={24} y={38} w={84} h={6} fill={C.chalk} />
        <Bar x={24} y={52} w={56} h={6} fill={C.chalk} />
      </Sheet>
      <text x={71} y={96} textAnchor="middle" fontSize="12" fill={C.soft}>You tell it</text>
      <path d="M134 48 H174" stroke={C.ink} strokeWidth={1.75} className="ill-march" />
      <path d="M168 43 l6 5 -6 5" fill="none" stroke={C.ink} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />

      <Sheet x={176} y={12} w={112} h={160} r={10}>
        <text x={190} y={36} fontSize="11" fontWeight="600" fill={C.ink}>Session notes</text>
        {[54, 76, 98, 120, 142].map((y, i) => (
          <g key={y}>
            {i === 2 ? <rect x={186} y={y - 7} width={92} height={16} rx={3} fill={C.signal} /> : null}
            <Bar x={192} y={y - 3} w={[70, 56, 74, 48, 62][i]} h={6} fill={i === 2 ? C.ink : C.rule} />
          </g>
        ))}
      </Sheet>
      <text x={232} y={194} textAnchor="middle" fontSize="12" fill={C.soft}>kept for 24 hours</text>

      <Sheet x={10} y={132} w={122} h={52} r={14} fill={C.paper}>
        <Bar x={24} y={150} w={70} h={6} fill={C.ink} />
        <text x={110} y={166} fontSize="18" fontWeight="600" fill={C.clay}>?</text>
      </Sheet>
      <text x={71} y={206} textAnchor="middle" fontSize="12" fill={C.soft}>You ask</text>
      <path d="M134 158 C 156 158, 158 112, 184 104" fill="none" stroke={C.clay} strokeWidth={1.5} strokeDasharray="3 4" />
      <text x={146} y={124} fontSize="11" fontStyle="italic" fill={C.clay}>looks back</text>

      <path d="M288 104 C 304 104, 306 120, 322 120" fill="none" stroke={C.ink} strokeWidth={1.75} className="ill-march" />
      <Sheet x={322} y={94} w={110} h={54} r={14}>
        <circle cx={340} cy={113} r={8} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
        <Bar x={354} y={110} w={64} h={6} fill={C.ink} />
        <Bar x={336} y={128} w={80} h={6} />
      </Sheet>
      <text x={377} y={170} textAnchor="middle" fontSize="12" fill={C.soft}>answers from them</text>
    </Art>
  )
}
