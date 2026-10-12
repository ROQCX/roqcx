// Teaching diagrams for the AI in Practice masterclass. Same fixed light
// palette and drawing language as illustrations.tsx.
import { Art, Bar, C, G, Sheet, type GlyphName } from "./illustrations"

const mono = "var(--font-geist-mono), ui-monospace, monospace"

/* ─────────────────────── 1. Learning journey ─────────────────────── */

const stages: { label: string; note: string; icon: GlyphName; x: number; y: number }[] = [
  { label: "Understand", note: "how it works, where it fails", icon: "search", x: 82, y: 236 },
  { label: "Experiment", note: "real tasks, challenged output", icon: "pen", x: 240, y: 158 },
  { label: "Apply", note: "your role, your workflow", icon: "check", x: 398, y: 80 },
]

/** Understand → experiment → apply, joined by one continuous line. */
export function JourneyArt() {
  return (
    <Art viewBox="0 0 480 330" label="Three stages: understand AI, experiment with it, apply it to your work">
      <path
        d="M20 300 C 50 280, 60 250, 82 236 S 190 190, 240 158 S 350 110, 398 80 S 450 40, 466 24"
        fill="none"
        stroke={C.ink}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M398 80 S 450 40, 466 24" fill="none" stroke={C.forest} strokeWidth="4" strokeLinecap="round" className="ill-draw" />
      {stages.map((s, i) => {
        const last = i === stages.length - 1
        return (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r={30} fill={last ? C.signal : C.chalk} stroke={C.ink} strokeWidth="1.75" />
            <G name={s.icon} x={s.x - 12} y={s.y - 12} color={C.ink} width={2} />
            <text x={s.x} y={s.y + 54} textAnchor="middle" fontSize="11" letterSpacing="2" fontFamily={mono} fill={C.soft}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={s.x} y={s.y + 74} textAnchor="middle" fontSize="17" fontWeight="600" fill={C.ink}>
              {s.label}
            </text>
            <text x={s.x} y={s.y + 93} textAnchor="middle" fontSize="12" fill={C.soft}>
              {s.note}
            </text>
          </g>
        )
      })}
    </Art>
  )
}

/* ─────────────────────── 2. Background AI → conversation ─────────────────────── */

const backgroundAi = ["Recommendations", "Fraud checks", "Navigation", "Predictive text"]

/** AI has worked quietly for years. What changed is that we can now talk to it. */
export function ConversationShiftArt() {
  return (
    <Art viewBox="0 0 520 320" label="AI used to work in the background. Now you can have a conversation with it.">
      <text x={20} y={30} fontSize="11" letterSpacing="2" fontFamily={mono} fill={C.soft}>FOR YEARS</text>
      <text x={20} y={52} fontSize="16" fontWeight="600" fill={C.ink}>In the background</text>
      {backgroundAi.map((label, i) => (
        <g key={label}>
          <rect x={20} y={74 + i * 52} width={186} height={38} rx={19} fill={C.paper} stroke={C.rule} strokeWidth="1.5" />
          <circle cx={42} cy={93 + i * 52} r={5} fill={C.rule} />
          <text x={58} y={98 + i * 52} fontSize="14" fill={C.soft}>{label}</text>
        </g>
      ))}

      <path d="M222 168 H268" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <path d="M262 162 l7 6 -7 6" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <text x={286} y={30} fontSize="11" letterSpacing="2" fontFamily={mono} fill={C.clay}>NOW</text>
      <text x={286} y={52} fontSize="16" fontWeight="600" fill={C.ink}>In conversation</text>
      <Sheet x={286} y={70} w={216} h={230} r={14}>
        <rect x={340} y={86} width={150} height={34} rx={12} fill={C.forest} />
        <text x={352} y={108} fontSize="13" fill={C.chalk}>Summarise these notes</text>
        <rect x={300} y={132} width={170} height={64} rx={12} fill={C.paper} stroke={C.rule} strokeWidth="1.25" />
        <Bar x={312} y={146} w={140} h={7} fill={C.ink} />
        <Bar x={312} y={160} w={118} h={7} />
        <Bar x={312} y={174} w={132} h={7} />
        <rect x={350} y={208} width={140} height={34} rx={12} fill={C.forest} />
        <text x={362} y={230} fontSize="13" fill={C.chalk}>What did you miss?</text>
        <rect x={300} y={254} width={120} height={30} rx={12} fill={C.signal} stroke={C.ink} strokeWidth="1.25" />
        <Bar x={312} y={265} w={84} h={7} fill={C.ink} />
      </Sheet>
    </Art>
  )
}

/* ─────────────────────── 3. AI hierarchy ─────────────────────── */

const rings = [
  { label: "Artificial intelligence", r: 148, fill: C.paper },
  { label: "Machine learning", r: 112, fill: C.chalk },
  { label: "Generative AI", r: 76, fill: "#e6ece7" },
  { label: "LLMs", r: 38, fill: C.signal },
]

/** AI contains machine learning, which contains generative AI, which contains LLMs. */
export function HierarchyArt() {
  const base = 312
  return (
    <Art
      viewBox="0 0 340 330"
      label="Nested circles: artificial intelligence contains machine learning, which contains generative AI, which contains large language models"
    >
      {rings.map((ring) => {
        const cy = base - ring.r
        const inner = ring.r === 38
        return (
          <g key={ring.label}>
            <circle cx={170} cy={cy} r={ring.r} fill={ring.fill} stroke={C.ink} strokeWidth="1.5" />
            <text
              x={170}
              y={inner ? cy + 5 : cy - ring.r + 24}
              textAnchor="middle"
              fontSize={inner ? 14 : 13}
              fontWeight={inner ? 600 : 500}
              fill={C.ink}
            >
              {ring.label}
            </text>
          </g>
        )
      })}
    </Art>
  )
}

/* ─────────────────────── 4. Messy input → useful output ─────────────────────── */

/** Meeting notes, feedback and half an idea become one structured page, then a person checks it. */
export function MessyToUsefulArt() {
  const scraps = [
    { x: 16, y: 40, r: -8, label: "Meeting notes" },
    { x: 40, y: 130, r: 5, label: "Customer feedback" },
    { x: 10, y: 214, r: -4, label: "Half an idea" },
  ]
  const sections = ["Decisions", "Actions", "Open questions"]
  return (
    <Art viewBox="0 0 540 330" label="Messy inputs such as notes and feedback become a structured output, which a person then checks">
      {scraps.map((s, i) => (
        <Sheet key={s.label} x={s.x} y={s.y} w={150} h={74} r={8} rotate={s.r} fill={i === 1 ? C.paper : C.chalk}>
          <text x={s.x + 14} y={s.y + 24} fontSize="12" fontWeight="600" fill={C.ink}>{s.label}</text>
          <path
            d={`M${s.x + 14} ${s.y + 44} c 12 -8, 22 8, 34 0 s 22 -8, 34 0 s 22 8, 40 -2`}
            fill="none"
            stroke={C.soft}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Bar x={s.x + 14} y={s.y + 54} w={70} h={6} />
        </Sheet>
      ))}

      <path d="M184 165 C 210 165, 214 165, 236 165" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" fill="none" className="ill-march" />
      <circle cx={262} cy={165} r={26} fill={C.forest} />
      <text x={262} y={170} textAnchor="middle" fontSize="13" fontWeight="600" fill={C.chalk}>AI</text>
      <path d="M288 165 H318" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 4" className="ill-march" />
      <path d="M312 159 l7 6 -7 6" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <Sheet x={330} y={40} w={194} h={250} r={14}>
        {sections.map((label, i) => (
          <g key={label}>
            <text x={348} y={74 + i * 68} fontSize="12" letterSpacing="1.5" fontFamily={mono} fill={C.forest}>
              {label.toUpperCase()}
            </text>
            <Bar x={348} y={86 + i * 68} w={150} h={7} fill={i === 0 ? C.ink : C.rule} />
            <Bar x={348} y={100 + i * 68} w={118} h={7} />
          </g>
        ))}
        <G name="check" x={490} y={56} size={20} color={C.forest} width={2.25} />
        <G name="check" x={490} y={124} size={20} color={C.forest} width={2.25} />
      </Sheet>
      <ellipse cx={420} cy={232} rx={88} ry={20} fill="none" stroke={C.clay} strokeWidth="1.75" transform="rotate(-3 420 232)" />
      <text x={330} y={318} fontSize="13" fontStyle="italic" fill={C.clay}>what did it miss?</text>
    </Art>
  )
}

/* ─────────────────────── 5. R-C-T-O prompting ─────────────────────── */

const rcto = [
  { key: "R", name: "Role", example: "You are an operations analyst.", fill: C.forest, text: C.chalk },
  { key: "C", name: "Context", example: "These are notes from a supplier call.", fill: C.paper, text: C.ink },
  { key: "T", name: "Task", example: "List each decision and who owns it.", fill: C.paper, text: C.ink },
  { key: "O", name: "Output", example: "A table, five rows at most.", fill: C.signal, text: C.ink },
]

/** Role, Context, Task, Output: four parts of a clear instruction. */
export function RctoArt() {
  return (
    <Art viewBox="0 0 520 300" label="The R-C-T-O prompting framework: Role, Context, Task and Output">
      <Sheet x={10} y={10} w={500} h={276} r={14}>
        {rcto.map((row, i) => {
          const y = 28 + i * 62
          return (
            <g key={row.key}>
              <rect x={28} y={y} width={48} height={48} rx={10} fill={row.fill} stroke={C.ink} strokeWidth="1.25" />
              <text x={52} y={y + 32} textAnchor="middle" fontSize="22" fontWeight="600" fill={row.text}>{row.key}</text>
              <text x={92} y={y + 20} fontSize="11" letterSpacing="2" fontFamily={mono} fill={C.soft}>{row.name.toUpperCase()}</text>
              <text x={92} y={y + 40} fontSize="15" fill={C.ink}>{row.example}</text>
            </g>
          )
        })}
      </Sheet>
    </Art>
  )
}

/* ─────────────────────── 6. How an agent works ─────────────────────── */

const loop = [
  { label: "Plan", x: 230, y: 70 },
  { label: "Use a tool", x: 350, y: 180 },
  { label: "Check result", x: 230, y: 290 },
  { label: "Adjust", x: 110, y: 180 },
]

/** An agent loops through plan, act, check and adjust. A person approves before anything leaves. */
export function AgentLoopArt() {
  return (
    <Art viewBox="0 0 540 360" label="An AI agent works in a loop: plan, use a tool, check the result and adjust. A person approves before the result is used.">
      <circle cx={230} cy={180} r={110} fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="6 7" className="ill-march" />
      <text x={20} y={34} fontSize="11" letterSpacing="2" fontFamily={mono} fill={C.soft}>GOAL</text>
      <text x={20} y={54} fontSize="14" fill={C.ink}>“Prepare the weekly</text>
      <text x={20} y={72} fontSize="14" fill={C.ink}>supplier summary”</text>
      <path d="M150 60 C 166 66, 172 68, 176 70" fill="none" stroke={C.ink} strokeWidth="1.5" />
      <path d="M170 64 l7 6 -9 3" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {loop.map((node, i) => (
        <g key={node.label}>
          <rect x={node.x - 56} y={node.y - 20} width={112} height={40} rx={20} fill={i === 1 ? C.forest : C.chalk} stroke={C.ink} strokeWidth="1.5" />
          <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill={i === 1 ? C.chalk : C.ink}>
            {node.label}
          </text>
        </g>
      ))}
      <path d="M286 296 C 340 310, 360 312, 392 304" fill="none" stroke={C.ink} strokeWidth="1.5" />
      <path d="M384 298 l9 6 -9 5" fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Sheet x={398} y={262} w={128} h={78} r={12} fill={C.signal}>
        <G name="person" x={412} y={276} size={20} color={C.ink} width={2} />
        <text x={438} y={292} fontSize="13" fontWeight="600" fill={C.ink}>A person</text>
        <text x={412} y={318} fontSize="13" fill={C.ink}>approves first</text>
      </Sheet>
    </Art>
  )
}
