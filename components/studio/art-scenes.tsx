import { Art, Bar, C, G, Sheet, type GlyphName } from "./art-primitives"

/* ─────────────────────── Recognition spots ─────────────────────── */

export function ToolsSpot() {
  return (
    <Art viewBox="0 0 200 140">
      <Sheet x={20} y={30} w={84} h={64} r={8} rotate={-9}>
        <rect x={20} y={30} width={84} height={14} rx={8} fill={C.clay} />
        <Bar x={30} y={56} w={50} h={6} />
        <Bar x={30} y={68} w={36} h={6} />
      </Sheet>
      <Sheet x={70} y={18} w={84} h={64} r={8} fill={C.paper} rotate={6}>
        <rect x={70} y={18} width={84} height={14} rx={8} fill={C.forest} />
        <Bar x={80} y={44} w={60} h={6} />
        <Bar x={80} y={56} w={44} h={6} />
      </Sheet>
      <Sheet x={96} y={62} w={84} h={60} r={8} rotate={-3}>
        <rect x={96} y={62} width={84} height={14} rx={8} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
        <Bar x={106} y={88} w={56} h={6} />
        <Bar x={106} y={100} w={40} h={6} />
      </Sheet>
    </Art>
  )
}

export function WaitSpot() {
  return (
    <Art viewBox="0 0 200 140">
      <Sheet x={18} y={24} w={112} h={58} r={16}>
        <circle cx={52} cy={53} r={5} fill={C.ink} />
        <circle cx={74} cy={53} r={5} fill={C.ink} opacity={0.5} />
        <circle cx={96} cy={53} r={5} fill={C.ink} opacity={0.25} />
      </Sheet>
      <path d="M36 82 l-4 18 18-14" fill={C.chalk} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={146} cy={90} r={30} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
      <path d="M146 72 V90 L160 100" fill="none" stroke={C.clay} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M116 60 a36 36 0 0 1 14 -10" fill="none" stroke={C.clay} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M176 60 a36 36 0 0 0 -14 -10" fill="none" stroke={C.clay} strokeWidth={1.5} strokeLinecap="round" />
    </Art>
  )
}

export function RetypeSpot() {
  return (
    <Art viewBox="0 0 200 140">
      <Sheet x={18} y={20} w={60} h={84} r={6}>
        <Bar x={28} y={36} w={40} h={6} fill={C.clay} />
        <Bar x={28} y={50} w={34} h={6} />
        <Bar x={28} y={62} w={40} h={6} />
        <Bar x={28} y={74} w={26} h={6} />
      </Sheet>
      <Sheet x={122} y={34} w={60} h={84} r={6} fill={C.paper}>
        <Bar x={132} y={50} w={40} h={6} fill={C.clay} />
        <Bar x={132} y={64} w={34} h={6} />
        <Bar x={132} y={76} w={40} h={6} />
        <Bar x={132} y={88} w={20} h={6} />
      </Sheet>
      <path d="M84 40 C 100 22, 108 24, 118 38" fill="none" stroke={C.ink} strokeWidth={1.75} strokeLinecap="round" />
      <path d="M112 36 l6 2 1-7" fill="none" stroke={C.ink} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 104 C 104 124, 94 122, 84 108" fill="none" stroke={C.ink} strokeWidth={1.75} strokeLinecap="round" />
      <path d="M90 110 l-6 -2 -1 7" fill="none" stroke={C.ink} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <text x="100" y="78" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.clay}>×3</text>
    </Art>
  )
}

export function IdeasSpot() {
  const notes = [
    { x: 22, y: 24, r: -8, f: C.signal },
    { x: 70, y: 14, r: 5, f: C.chalk },
    { x: 124, y: 22, r: -4, f: C.paper },
    { x: 40, y: 72, r: 7, f: C.chalk },
    { x: 140, y: 74, r: -10, f: C.signal },
  ]
  return (
    <Art viewBox="0 0 200 140">
      {notes.map((n) => (
        <Sheet key={`${n.x}-${n.y}`} x={n.x} y={n.y} w={36} h={32} r={4} fill={n.f} rotate={n.r}>
          <Bar x={n.x + 7} y={n.y + 10} w={22} h={4} fill={C.ink} />
          <Bar x={n.x + 7} y={n.y + 19} w={14} h={4} fill={C.ink} />
        </Sheet>
      ))}
      <path d="M20 128 C 50 110, 60 136, 90 116 S 120 90, 104 104 S 120 128, 150 118" fill="none" stroke={C.clay} strokeWidth={1.75} strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx={162} cy={116} r={12} fill={C.chalk} stroke={C.clay} strokeWidth={1.5} />
      <text x={162} y={121} textAnchor="middle" fontSize="14" fontWeight="600" fill={C.clay}>?</text>
    </Art>
  )
}

/* ─────────────────────── Workflow strip ─────────────────────── */

const flowLabels = ["Today", "Improve", "A person", "Measure"]

/** Four-node strip: friction, the change, the human checkpoint, the measure. */
export function MiniFlow({ problem, change }: { problem: GlyphName; change: GlyphName }) {
  const nodes: { x: number; icon: GlyphName; fill: string; stroke: string; color: string }[] = [
    { x: 40, icon: problem, fill: C.chalk, stroke: C.clay, color: C.clay },
    { x: 140, icon: change, fill: C.forest, stroke: C.forest, color: C.chalk },
    { x: 240, icon: "person", fill: C.signal, stroke: C.ink, color: C.ink },
    { x: 340, icon: "gauge", fill: C.chalk, stroke: C.ink, color: C.ink },
  ]
  return (
    <Art viewBox="0 0 380 104">
      <path d="M40 40 C 60 18, 74 64, 90 38 S 104 44, 110 40" fill="none" stroke={C.clay} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M170 40 H210 M270 40 H310" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <path d="M204 35 l6 5 -6 5 M304 35 l6 5 -6 5" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {nodes.map((n, i) => (
        <g key={n.x}>
          <circle cx={n.x} cy={40} r={28} fill={n.fill} stroke={n.stroke} strokeWidth={1.75} />
          <G name={n.icon} x={n.x - 12} y={28} color={n.color} />
          <text x={n.x} y={92} textAnchor="middle" fontSize="13" fill={C.soft}>{flowLabels[i]}</text>
        </g>
      ))}
    </Art>
  )
}

/* ─────────────────────── Service art ─────────────────────── */

export function AutomateArt() {
  const apps: { y: number; icon: GlyphName; label: string }[] = [
    { y: 40, icon: "mail", label: "Inbox" },
    { y: 130, icon: "grid", label: "Records" },
    { y: 220, icon: "doc", label: "Documents" },
  ]
  return (
    <Art viewBox="0 0 480 340">
      <path d="M148 72 C 182 72, 168 162, 196 162 M148 162 H196 M148 252 C 182 252, 168 162, 196 162" fill="none" stroke={C.forest} strokeWidth="2" />
      {apps.map((a) => (
        <Sheet key={a.label} x={20} y={a.y} w={128} h={64} r={12}>
          <G name={a.icon} x={34} y={a.y + 20} />
          <text x={66} y={a.y + 37} fontSize="14" fill={C.ink}>{a.label}</text>
        </Sheet>
      ))}
      <Sheet x={196} y={130} w={108} h={64} r={14} fill={C.forest} stroke={C.forest}>
        <G name="sort" x={210} y={150} color={C.signal} width={2} />
        <text x={240} y={167} fontSize="14" fill={C.chalk}>Prepare</text>
      </Sheet>
      <path d="M304 162 H328" stroke={C.ink} strokeWidth="2" className="ill-march" />
      <Sheet x={328} y={104} w={136} h={116} r={14}>
        <G name="person" x={344} y={120} />
        <text x={376} y={137} fontSize="14" fontWeight="600" fill={C.ink}>Approve?</text>
        <rect x={344} y={164} width={40} height={22} rx={11} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
        <circle cx={373} cy={175} r={7} fill={C.ink} />
        <text x={394} y={180} fontSize="13" fill={C.soft}>Running</text>
        <text x={344} y={206} fontSize="12" fill={C.soft}>Pause at any time</text>
      </Sheet>
      <path d="M352 52 C 384 60, 400 76, 394 98" fill="none" stroke={C.clay} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M388 92 l6 7 5-8" fill="none" stroke={C.clay} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <text x={250} y={48} fontSize="14" fontStyle="italic" fill={C.clay}>a person stays in the loop</text>
      <path d="M196 276 v10 H464 v-10" fill="none" stroke={C.soft} strokeWidth="1.25" />
      <text x={330} y={310} textAnchor="middle" fontSize="13" fill={C.soft}>Only the agreed systems, only the agreed actions</text>
    </Art>
  )
}

export function BuildArt() {
  return (
    <Art viewBox="0 0 480 340">
      <Sheet x={20} y={24} w={360} h={266} r={14}>
        <path d="M20 58 H380" stroke={C.ink} strokeWidth="1.5" />
        <circle cx={40} cy={41} r={4.5} fill={C.clay} />
        <circle cx={56} cy={41} r={4.5} fill={C.rule} />
        <circle cx={72} cy={41} r={4.5} fill={C.rule} />
        <rect x={98} y={33} width={200} height={16} rx={8} fill={C.paper} />
        <Bar x={44} y={84} w={150} h={14} fill={C.ink} />
        <Bar x={44} y={106} w={110} h={14} fill={C.ink} />
        <Bar x={44} y={132} w={140} h={6} />
        <Bar x={44} y={144} w={120} h={6} />
        <rect x={44} y={162} width={92} height={28} rx={8} fill={C.forest} />
        <Bar x={58} y={173} w={64} h={6} fill={C.chalk} />
        <rect x={214} y={78} width={144} height={110} rx={10} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
        <circle cx={318} cy={106} r={13} fill={C.chalk} stroke={C.ink} strokeWidth={1.5} />
        <path d="M214 172 L262 126 L300 160 L320 144 L358 176 V178 a10 10 0 0 1 -10 10 H224 a10 10 0 0 1 -10 -10 z" fill={C.forest} />
        {[44, 150, 256].map((x) => (
          <g key={x}>
            <rect x={x} y={208} width={100} height={62} rx={8} fill={C.paper} stroke={C.rule} strokeWidth={1.5} />
            <Bar x={x + 12} y={222} w={56} h={6} fill={C.ink} />
            <Bar x={x + 12} y={236} w={74} h={5} />
            <Bar x={x + 12} y={248} w={52} h={5} />
          </g>
        ))}
      </Sheet>
      <g transform="translate(112 178)">
        <path d="M0 0 L0 20 L5.5 14.5 L9.5 23.5 L13 22 L9 13 L16 13 Z" fill={C.ink} stroke={C.chalk} strokeWidth="1.25" strokeLinejoin="round" />
      </g>
      <ellipse cx={90} cy={176} rx={60} ry={24} fill="none" stroke={C.clay} strokeWidth="1.75" transform="rotate(-4 90 176)" />
      <text x={20} y={320} fontSize="14" fontStyle="italic" fill={C.clay}>one clear next step</text>
      <Sheet x={340} y={100} w={124} h={220} r={22} fill={C.ink} stroke={C.ink}>
        <rect x={348} y={114} width={108} height={192} rx={14} fill={C.chalk} />
        <rect x={386} y={104} width={32} height={5} rx={2.5} fill={C.soft} />
        <Bar x={360} y={130} w={70} h={10} fill={C.ink} />
        <Bar x={360} y={148} w={84} h={5} />
        <Bar x={360} y={158} w={60} h={5} />
        {[178, 206, 234].map((y) => (
          <rect key={y} x={360} y={y} width={84} height={20} rx={6} fill={C.paper} stroke={C.rule} strokeWidth={1.25} />
        ))}
        <rect x={360} y={266} width={84} height={24} rx={8} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
        <Bar x={382} y={275} w={40} h={6} fill={C.ink} />
      </Sheet>
    </Art>
  )
}

export function TrainArt() {
  const lines = [92, 114, 136, 158, 180, 202, 224]
  const widths = [220, 196, 232, 180, 214, 150, 200]
  return (
    <Art viewBox="0 0 480 340">
      <Sheet x={24} y={24} w={300} h={270} r={14}>
        <text x={44} y={58} fontSize="15" fontWeight="600" fill={C.ink}>Draft from AI</text>
        <rect x={196} y={42} width={110} height={24} rx={12} fill={C.clay} fillOpacity={0.12} />
        <text x={251} y={58} textAnchor="middle" fontSize="12" fill={C.clay}>check first</text>
        <path d="M44 72 H304" stroke={C.rule} strokeWidth="1.5" />
        <rect x={40} y={108} width={204} height={16} rx={3} fill={C.signal} />
        {lines.map((y, i) => (
          <Bar key={y} x={44} y={y + 4} w={widths[i]} h={8} fill={i === 1 ? C.ink : C.rule} />
        ))}
        <path d="M40 166 H230" stroke={C.clay} strokeWidth="2.5" strokeLinecap="round" />
        <G name="check" x={276} y={106} color={C.forest} width={2.5} />
        <G name="cross" x={276} y={150} color={C.clay} width={2.5} />
        <ellipse cx={150} cy={188} rx={118} ry={16} fill="none" stroke={C.clay} strokeWidth="1.75" transform="rotate(-2 150 188)" />
        <text x={44} y={268} fontSize="14" fontStyle="italic" fill={C.clay}>where did this come from?</text>
        <path d="M150 252 C 140 236, 136 222, 146 206" fill="none" stroke={C.clay} strokeWidth="1.5" strokeLinecap="round" />
      </Sheet>
      <Sheet x={262} y={188} w={198} h={132} r={14} fill={C.forest} stroke={C.forest}>
        <G name="lock" x={280} y={204} color={C.signal} />
        <text x={312} y={221} fontSize="14" fontWeight="600" fill={C.chalk}>Don’t paste</text>
        {["Customer records", "Passwords", "Signed contracts"].map((t, i) => (
          <g key={t}>
            <circle cx={286} cy={250 + i * 22} r={3} fill={C.signal} />
            <text x={298} y={255 + i * 22} fontSize="13" fill={C.chalk}>{t}</text>
          </g>
        ))}
      </Sheet>
      <G name="team" x={360} y={44} size={64} color={C.ink} width={1.75} />
      <path d="M352 120 C 340 132, 334 140, 330 150" fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" />
    </Art>
  )
}

export function ReviewArt({ onDark = false }: { onDark?: boolean }) {
  const label = onDark ? C.chalk : C.ink
  const muted = onDark ? "rgba(255,253,248,0.7)" : C.soft
  const ideas = [
    { text: "Chatbot for the site", x: 16, r: -3, fill: C.chalk, stopped: true },
    { text: "Auto-reply to enquiries", x: 30, r: 2, fill: C.signal, stopped: false },
    { text: "Summarise meetings", x: 16, r: -2, fill: C.paper, stopped: false },
    { text: "Retype invoices", x: 30, r: 3, fill: C.chalk, stopped: false },
    { text: "Lead scoring", x: 16, r: -4, fill: C.paper, stopped: true },
  ]
  const checks: { icon: GlyphName; text: string; cy: number }[] = [
    { icon: "gauge", text: "Value", cy: 100 },
    { icon: "grid", text: "Data", cy: 176 },
    { icon: "team", text: "Use", cy: 252 },
  ]
  const goes = [
    "M180 122 C 200 122, 196 140, 214 140 M282 140 C 306 140, 306 89, 330 89",
    "M166 174 C 192 174, 194 196, 214 196 M282 196 C 306 196, 306 150, 330 150",
    "M180 226 H214 M282 226 C 306 226, 306 204, 330 204",
  ]
  const stops = [
    { d: "M166 70 C 184 70, 186 88, 198 88", x: 204, y: 88 },
    { d: "M166 278 C 184 278, 186 268, 198 268", x: 204, y: 268 },
  ]
  return (
    <Art
      viewBox="0 0 560 360"
      label="Illustration: five ideas pass through three checks: value, data and use. Two are stopped. One becomes the pilot, one waits, and one is fixed without AI."
    >
      {["Your ideas", "Three checks", "Recommendation"].map((t, i) => (
        <g key={t}>
          <circle cx={[22, 222, 338][i]} cy={20} r={9} fill="none" stroke={label} strokeWidth={1.25} />
          <text x={[22, 222, 338][i]} y={24} textAnchor="middle" fontSize="11" fill={label}>{i + 1}</text>
          <text x={[38, 238, 354][i]} y={24} fontSize="13" fill={label}>{t}</text>
        </g>
      ))}

      {goes.map((d) => (
        <path key={d} d={d} fill="none" stroke={onDark ? C.signal : C.forest} strokeWidth="2.25" className="ill-march" />
      ))}
      {stops.map((s) => (
        <g key={s.d}>
          <path d={s.d} fill="none" stroke={C.clay} strokeWidth="1.75" strokeDasharray="3 4" />
          <circle cx={s.x} cy={s.y} r={8} fill={C.clay} />
          <G name="cross" x={s.x - 5} y={s.y - 5} size={10} color={C.chalk} width={2} />
        </g>
      ))}

      {ideas.map((idea, i) => {
        const y = 52 + i * 52
        return (
          <g key={idea.text} transform={`rotate(${idea.r} ${idea.x + 75} ${y + 18})`} opacity={idea.stopped ? 0.72 : 1}>
            <rect x={idea.x + 3} y={y + 4} width={150} height={36} rx={6} fill={C.ink} opacity={0.18} />
            <rect x={idea.x} y={y} width={150} height={36} rx={6} fill={idea.fill} stroke={C.ink} strokeWidth={1.25} />
            <text x={idea.x + 12} y={y + 23} fontSize="12.5" fill={C.ink}>{idea.text}</text>
          </g>
        )
      })}

      <rect x={214} y={44} width={68} height={260} rx={34} fill={C.forest} stroke={onDark ? C.signal : C.forest} strokeOpacity={0.5} strokeWidth={1.5} />
      {checks.map((c) => (
        <g key={c.text}>
          <circle cx={248} cy={c.cy} r={20} fill={C.chalk} />
          <G name={c.icon} x={238} y={c.cy - 10} size={20} />
          <text x={248} y={c.cy + 36} textAnchor="middle" fontSize="11" fill={C.chalk}>{c.text}</text>
        </g>
      ))}

      <Sheet x={330} y={44} w={214} h={260} r={16}>
        <rect x={342} y={60} width={190} height={58} rx={10} fill={C.signal} stroke={C.ink} strokeWidth={1.25} />
        <text x={356} y={84} fontSize="14" fontWeight="600" fill={C.ink}>1 · Pilot</text>
        <text x={356} y={104} fontSize="12" fill={C.ink}>Auto-reply to enquiries</text>
        <G name="flag" x={502} y={70} size={20} />
        <rect x={342} y={128} width={190} height={44} rx={10} fill={C.paper} />
        <text x={356} y={146} fontSize="13" fontWeight="600" fill={C.soft}>2 · Later</text>
        <text x={356} y={163} fontSize="12" fill={C.soft}>Summarise meetings</text>
        <G name="clock" x={504} y={141} size={18} color={C.soft} />
        <rect x={342} y={182} width={190} height={44} rx={10} fill={C.chalk} stroke={C.clay} strokeDasharray="4 4" />
        <text x={356} y={200} fontSize="13" fontWeight="600" fill={C.clay}>3 · No AI needed</text>
        <text x={356} y={217} fontSize="12" fill={C.soft}>Fix the form instead</text>
        <G name="form" x={504} y={195} size={18} color={C.clay} />
        <path d="M342 248 H532" stroke={C.rule} strokeWidth={1.25} />
        <G name="gauge" x={344} y={264} size={18} color={C.forest} />
        <text x={370} y={278} fontSize="12" fill={C.forest}>Measure: time to a useful reply</text>
      </Sheet>

      <g transform="translate(16 334)">
        <circle cx={6} cy={0} r={6} fill={C.clay} />
        <text x={20} y={4} fontSize="12" fill={muted}>Stopped at a check</text>
        <path d="M150 0 H178" stroke={onDark ? C.signal : C.forest} strokeWidth="2.25" />
        <text x={188} y={4} fontSize="12" fill={muted}>Goes forward</text>
        <text x={528} y={4} textAnchor="end" fontSize="12" fontStyle="italic" fill={onDark ? C.signal : C.clay}>illustrative example</text>
      </g>
    </Art>
  )
}

/* ─────────────────────── Boundaries ─────────────────────── */

export const boundaryItems: { icon: GlyphName; label: string; text: string }[] = [
  { icon: "key", label: "Access", text: "What the solution can access." },
  { icon: "arrow", label: "Actions", text: "What it is allowed to do." },
  { icon: "person", label: "Approval", text: "Where a person has to approve." },
  { icon: "eye", label: "Review", text: "How activity is reviewed." },
  { icon: "badge", label: "Owner", text: "Who owns it after launch." },
]

export function BoundaryArt() {
  const chips = [
    { x: 16, y: 34, to: "M136 54 C 160 54, 170 80, 178 108" },
    { x: 360, y: 34, to: "M364 54 C 340 54, 330 80, 322 108" },
    { x: 376, y: 172, to: "M376 192 H342" },
    { x: 360, y: 314, to: "M364 334 C 340 334, 330 310, 322 286" },
    { x: 16, y: 314, to: "M136 334 C 160 334, 170 310, 178 286" },
  ]
  return (
    <Art viewBox="0 0 500 380">
      <rect x="158" y="100" width="184" height="190" rx="26" fill={C.forest} fillOpacity="0.05" stroke={C.forest} strokeWidth="2" strokeDasharray="6 6" />
      {chips.map((c) => (
        <path key={c.to} d={c.to} fill="none" stroke={C.ink} strokeWidth="1.25" strokeDasharray="2 4" />
      ))}
      <Sheet x={192} y={164} w={116} h={60} r={14} fill={C.forest} stroke={C.forest}>
        <G name="sort" x={206} y={182} color={C.signal} width={2} />
        <text x={238} y={199} fontSize="14" fill={C.chalk}>Workflow</text>
      </Sheet>
      {boundaryItems.map((item, i) => {
        const c = chips[i]
        return (
          <g key={item.label}>
            <rect x={c.x} y={c.y} width={124} height={40} rx={20} fill={C.chalk} stroke={C.ink} strokeWidth={1.5} />
            <circle cx={c.x + 20} cy={c.y + 20} r={12} fill={i === 2 ? C.signal : C.paper} stroke={C.ink} strokeWidth={1.25} />
            <G name={item.icon} x={c.x + 12} y={c.y + 12} size={16} />
            <text x={c.x + 40} y={c.y + 25} fontSize="14" fill={C.ink}>{item.label}</text>
          </g>
        )
      })}
    </Art>
  )
}

/* ─────────────────────── Motif ─────────────────────── */

/** The signature line: a knot of ad hoc effort that resolves into one clear path. */
export function TangleLine({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 1200 120" className={className ?? "block h-auto w-full"} preserveAspectRatio="xMidYMid meet">
      <path
        d="M0 60 C 40 60, 60 18, 92 28 S 124 102, 82 92 S 58 36, 122 40 S 186 112, 152 102 S 132 26, 204 46 S 266 104, 232 94 S 222 36, 296 54 S 352 70, 400 60"
        fill="none"
        stroke={C.clay}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M400 60 H1150" stroke={C.signal} strokeWidth="2.5" className="ill-draw" />
      <circle cx="1160" cy="60" r="10" fill={C.signal} />
    </Art>
  )
}

/* ─────────────────────── Contact ─────────────────────── */

export function ReplyArt() {
  return (
    <Art viewBox="0 0 420 200">
      <Sheet x={10} y={30} w={150} h={96} r={12}>
        <G name="form" x={24} y={44} />
        <Bar x={24} y={80} w={110} h={6} />
        <Bar x={24} y={92} w={90} h={6} />
        <Bar x={24} y={104} w={60} h={6} />
      </Sheet>
      <path d="M168 78 C 200 40, 230 40, 252 70" fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <path d="M246 64 l6 6 2-8" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="288" cy="80" r="30" fill={C.signal} stroke={C.ink} strokeWidth="1.5" />
      <G name="eye" x={276} y={68} />
      <path d="M318 92 C 340 120, 360 124, 380 112" fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <Sheet x={340} y={120} w={70} h={48} r={8} fill={C.forest} stroke={C.forest}>
        <G name="mail" x={363} y={132} color={C.chalk} />
      </Sheet>
      <text x={85} y={150} textAnchor="middle" fontSize="13" fill={C.soft}>You write</text>
      <text x={288} y={136} textAnchor="middle" fontSize="13" fill={C.soft}>We read</text>
      <text x={375} y={192} textAnchor="middle" fontSize="13" fill={C.soft}>We reply</text>
    </Art>
  )
}

export const serviceArt = {
  "/services/ai-automation": AutomateArt,
  "/services/websites-web-apps": BuildArt,
  "/services/ai-training": TrainArt,
  "/ai-opportunity-review": ReviewArt,
} as const
