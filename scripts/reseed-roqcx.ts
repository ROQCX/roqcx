import 'dotenv/config'
import { db } from '../lib/db'
import { generateEmbedding, storeEmbedding } from '../lib/ai/embedding'

// Knowledge base for the ROQ CX chat assistant.
// Mirrors the positioning shipped across the site (solutions hub, sprint pages,
// system prompt at app/api/chat/roqcx/route.ts).
const CHUNKS = [
  // ── Brand + positioning ────────────────────────────────────────────────
  `ROQ CX is a fractional product team for SMEs. We turn napkin sketches into clickable prototypes, validate them with real users, and ship the ones that earn their place to production on a fixed two-week cadence. We are not an automation consultancy, an AI agency, or a training provider; we run product sprints.`,

  `ROQ CX is based in Dubai, UAE and works with SMEs across the UAE, GCC, and globally (remote-first). Contact: hello@roqcx.com · +971 56 252 0720 · roqcx.com.`,

  // ── The four sprints ───────────────────────────────────────────────────
  `We sell four fixed-fee sprints. You can stop after any one of them with no retainer and no lock-in:
  - Prototype Sprint: 14 days. Validate a product idea.
  - Build & Launch: 4 weeks. Ship a production MVP.
  - Website Sprint: 4 weeks. Business website built from a paid diagnostic. From AED 18,000 ($5,000 USD).
  - Market Launch: 8 weeks. Take a shipped product to live customers.
Product engagements usually start with the Prototype Sprint. Website buyers start with Website Sprint. Each one is fixed-fee and fixed-scope.`,

  // ── Prototype Sprint detail ────────────────────────────────────────────
  `Prototype Sprint (14 days). A fixed-fee fourteen-day sprint that turns a fuzzy idea into a hi-fi clickable prototype, validated through five recorded user interviews, ending with a signed go/no-go memo on day 14. You walk away with: a clickable prototype on a public URL, five interview recordings + transcripts, a written go/no-go memo with rationale, and a clean backlog for the build sprint if you want to keep going. Not for marketing websites — those go to Website Sprint.`,

  `Prototype Sprint shape:
  - Week 1: Frame the idea. Day 1 kick-off + success metric agreed. Day 2 map the riskiest assumption. Day 3 lo-fi flows + content draft. Day 4 hi-fi prototype build starts. Day 5 internal review + interview script.
  - Week 2: Validate. Day 6 recruit interview participants and polish prototype. Days 7–9 run five real-user interviews, recorded. Day 10 synthesize what actually happened vs. expectations. Days 11–12 iterate where signal was clear. Day 13 write the go/no-go memo. Day 14 readout, signed memo, handover.`,

  `Prototype Sprint inputs (what we need from you on day 1): a one-page problem statement, a target segment plus access to five candidate users, one defensible success metric, and a decision-maker available on the call. Decision on day 14 is one of: ship (move to Build & Launch), iterate (a second short sprint), kill (cleanly with notes), or pivot (reframe and re-scope).`,

  // ── Build & Launch detail ──────────────────────────────────────────────
  `Build & Launch (4 weeks). A fixed-fee four-week sprint that takes a validated prototype to a production codebase. You get: a production codebase in your repo, auth + database + payments + integrations wired, CI/CD, staging environment, monitoring, handoff docs (architecture + runbook), and a 14-day post-handover warranty on shipped scope.`,

  `Build & Launch shape (week by week):
  - Week 1: Scaffold. Confirm stack (default Next.js + Supabase or yours), spin up repo + CI/CD + staging + error tracking, wire schema + auth, ship first production deploy by end of week.
  - Week 2: Core flows. Primary user flow end-to-end, payments + receipts (Stripe by default), transactional email + auth flows, analytics events instrumented.
  - Week 3: Hardening. Edge cases, empty/error states, rate limits + abuse protection, admin tools you'll actually use, internal load + smoke tests.
  - Week 4: Handover. Production launch with monitoring, walkthrough + handoff docs, warranty window opens, optional roll into Market Launch.`,

  // ── Website Sprint detail ──────────────────────────────────────────────
  `Website Sprint (4 weeks). For SMEs that need a business website, not a product prototype. One-line promise: a website built from what actually makes you money, not from a template and a wishlist. Published starting price: from AED 18,000 ($5,000 USD). Fixed fee. No retainers, no T&M, no scope-creep invoices. Details: https://www.roqcx.com/solutions/website-sprint`,

  `Website Sprint phases:
  - Days 1–3 Business diagnostic (paid, with deliverable either way): working session on the model — what a customer is worth, where enquiries come from, what happens after a form submit, what the site is supposed to move. Ends in DIAGNOSTIC.PDF and a single signed success metric. If the diagnostic says the site is not the constraint, ROQ CX says so and the engagement can stop there.
  - Days 4–8 Structure + narrative: sitemap, page-by-page argument, copy direction. Two divergent low-fi directions. Artefacts: Figma + copy doc.
  - Days 9–16 Build: production Next.js + TypeScript + Tailwind + shadcn/ui on Vercel; Supabase where there is data; real content. Artefacts: GitHub repo + staging URL.
  - Days 17–20 Instrument + hand over: analytics against the success metric, error tracking, CI/CD, design tokens, written handover. Artefacts: HANDOVER.MD · tokens · dashboard.
The diagnostic is bundled as phase 01, not a standalone SKU today. Client owns repo, Figma, tokens, and content from minute one. No lock-in. Do not promise rankings, traffic numbers, or conversion percentages.`,

  `Website Sprint is not for: five pages by Friday, template skins with stock copy, SEO ranking promises, or hourly estimates. About 30% of ROQ CX sprints end in a deliberate kill — that is evidence the diagnostic is real, not a talking point.`,

  // ── Market Launch detail ───────────────────────────────────────────────
  `Market Launch (8 weeks). A fixed-fee eight-week sprint that takes a shipped product to live customers. You get: a high-converting landing page, onboarding sequence + lifecycle email, a paid + organic acquisition baseline with creative, an analytics pipeline, and a 30-day cohort dashboard with the retention curve and a written readout.`,

  `Market Launch shape:
  - Weeks 1–2 Positioning: messaging tightened against real users, landing wireframe + copy, brand assets audited or produced, channels chosen.
  - Weeks 3–4 Funnel: landing page shipped + A/B ready, in-product onboarding, lifecycle email (welcome / activation / win-back), activation + retention events.
  - Weeks 5–6 Launch: soft launch to a private cohort, paid acquisition live, daily funnel-health standup, iterate on the highest-leverage step.
  - Weeks 7–8 Read the data: cohort retention dashboard, 30-day readout of what scaled and what didn't, recommendation on the next investment.`,

  // ── Stack / engineering ────────────────────────────────────────────────
  `Our default stack is Next.js + TypeScript + Supabase + Stripe + Vercel. We'll build in your existing stack if we're competent in it. Just ask. Code lives in your GitHub org from day one. You own everything; no vendor lock-in, no hostage code.`,

  // ── Commercials ────────────────────────────────────────────────────────
  `Commercials. Each sprint is fixed-fee and fixed-scope. You can stop after any milestone and keep everything we've built. There is no monthly retainer. Website Sprint has a published floor: from AED 18,000 ($5,000 USD). Other product sprint prices are agreed on the kick-off call. When asked "How much does a sprint cost?", lead with the Website Sprint floor if relevant, and point visitors at https://www.roqcx.com/contact or https://www.roqcx.com/solutions/website-sprint for the website offer. Do not invent other price numbers.`,

  // ── Differentiators ────────────────────────────────────────────────────
  `Who ROQ CX is for: SMEs that want product velocity without hiring a full in-house team, and SMEs that need a website built from a business diagnostic rather than a template wishlist. Who it's not for: enterprises that need long procurement cycles, five-pages-by-Friday website jobs, pure-design polish on an existing live product, or buyers who want estimates by the hour.`,

  // ── Selected case studies (for grounding) ──────────────────────────────
  `Selected work, Syntheve: a clickable prototype shipped in 14 days that we then took into a Build & Launch sprint. See https://www.roqcx.com/case-studies/syntheve.`,

  `Selected work, Mazadak e-Auction: a sprint-built auction platform for an existing SME. See https://www.roqcx.com/case-studies/mazadak-e-auction.`,

  `Selected work, Dubai 7s Ticketing: a high-traffic event ticketing platform and companion app shipped under sprint pressure for the regional rugby championship. Processed 80,000+ ticket passes and millions of app interactions with real-time validation and integrated payments. See https://www.roqcx.com/case-studies/dubai-7s-ticketing.`,

  // ── This chat demo itself ──────────────────────────────────────────────
  `This very chat assistant is an example sprint output. It's a streaming, RAG-backed assistant built on a knowledge base, exactly the kind of thing we deliver inside a Prototype Sprint. Sessions are encrypted and deleted after 24 hours.`,

  // ── Founder + team ─────────────────────────────────────────────────────
  `Founded by Zayne Nair (Founder & CEO). Senior team, no junior pyramid, no handoffs. You work directly with the people doing the work.`,

  // ── Process beliefs ────────────────────────────────────────────────────
  `How we work: evidence over opinions (we prototype and test with real users, we don't argue features into existence), small senior team (no junior pyramid), and speed with a system (two-week cycles, fixed checkpoints, predictable deliverables). Fast does not mean chaotic.`,
] as const

async function main() {
  console.log('DB URL:', process.env.TURSO_DB_URL)

  const before = await db.execute({
    sql: 'SELECT COUNT(*) AS count FROM chunks WHERE is_global = TRUE',
    args: [],
  })
  console.log('Before, global rows:', before.rows[0])

  await db.execute({
    sql: 'DELETE FROM embeddings WHERE chunk_id IN (SELECT id FROM chunks WHERE is_global = TRUE)',
    args: [],
  })
  await db.execute({
    sql: 'DELETE FROM chunks WHERE is_global = TRUE',
    args: [],
  })

  console.log(`Inserting ${CHUNKS.length} global chunks...`)

  for (const content of CHUNKS) {
    const embedding = await generateEmbedding(content)
    await storeEmbedding(content, embedding, null)
    console.log('  +', content.slice(0, 72).replace(/\s+/g, ' ') + '...')
  }

  const after = await db.execute({
    sql: 'SELECT COUNT(*) AS count FROM chunks WHERE is_global = TRUE',
    args: [],
  })
  console.log('\nAfter, global rows:', after.rows[0])
  process.exit(0)
}

main().catch((error) => {
  console.error('Reseed failed:', error)
  process.exit(1)
})
