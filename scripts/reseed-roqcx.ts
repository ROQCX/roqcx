import 'dotenv/config'
import { OpenAI } from 'openai'
import { homeFaqs, opportunityReview, services, type Faq, type ProofLink } from '../lib/site-content'
import {
  audiences,
  corporateIncludes,
  curriculum,
  exercises,
  outcomes,
  principles,
  trainingFaqs,
  trainingPath,
} from '../lib/training-content'
import { getAllCaseStudies, getCaseStudyContent } from '../lib/case-studies'
import { getAllPosts } from '../lib/blog'

// Knowledge base for the ROQ CX chat assistant (/api/chat/roqcx).
// Most chunks are generated from the same content the pages render, so the
// assistant stays in step with the site. Keep it aligned with the system prompt
// in app/api/chat/roqcx/route.ts. Do not restore retired sprint offers.
//
//   pnpm seed-db            replace the global knowledge base
//   pnpm seed-db --dry-run  print the chunks without touching the database

const SITE = 'https://www.roqcx.com'

/** Facts that live outside the page content. */
const STUDIO = [
  `ROQ CX is a studio in Dubai that helps small and medium-sized businesses put AI to work, for better customer experiences and less operational overhead. It identifies the opportunities worth pursuing, builds the websites, apps and automations to support them, and trains the team to use them with clear boundaries. It works with SMEs in the UAE, the GCC and remotely elsewhere. Not every engagement needs all three services.`,

  `How to start with ROQ CX: send a few lines through the contact form at ${SITE}/contact describing where things get stuck. The studio reads it and replies by email. You can also email hello@roqcx.com or WhatsApp +971 56 252 0720. Please do not include passwords, customer records or confidential documents in the form or in chat.`,

  `How ROQ CX chooses what to do: understand the problem before naming a tool; prefer the smaller change that still helps the work; keep a person able to approve, stop or correct it; and agree what will be measured before starting. If a clearer page, a form or a plain workflow would do the job, ROQ CX says so instead of recommending AI.`,

  `Before anything is connected, ROQ CX agrees five things with the client: what the solution can access, what it is allowed to do, where a person has to approve, how activity is reviewed, and who owns it after launch.`,

  `Pricing: ROQ CX quotes after it understands the work, and confirms any fee before paid work begins.`,

  `Studio delivery (websites, applications, automations and training) is hired through ROQ CX at ${SITE}.`,

  `ROQ CX does not promise delivery in two weeks, and it quotes after it understands the work. It no longer offers Prototype Sprint, Website Sprint, Build & Launch, Market Launch or a sample sprint plan. A prototype is available when you need to learn something before a larger build, as part of websites and web apps: ${SITE}/services/websites-web-apps.`,

  `The chat demo at ${SITE}/chatbot lets you tell it something, then ask for it back. It answers from what you gave it. Those notes are stored for that browser session. Delete notes removes them immediately, and a daily cleanup removes anything older than 24 hours. What you type is sent so it can reply, so do not share anything private. The chat on other pages is sent to OpenAI to reply and is not stored in the website database. The same idea, using information a business has approved, can answer customer questions from sources the business controls. Project enquiries go through ${SITE}/contact.`,

  `What happens to an enquiry: the contact form asks for a name, email, business name, and what you would like to improve. Google reCAPTCHA checks the submission. If it passes, the message is emailed to zayne@roqcx.com. The website does not keep a copy in a database. The studio keeps the email so it can reply, and will delete it on request. Privacy: ${SITE}/privacy.`,

  `Why ROQ CX exists: many smaller businesses have a few people trying ChatGPT and no clear next step. The studio starts from the business problem and builds the smallest thing that changes the work. Sometimes that is an automation, a website or a prototype. Sometimes the right answer is not AI. ROQ CX is based in Dubai, works across the GCC, and also works remotely. About: ${SITE}/about.`,

  `How an engagement is chosen: map where the work waits, find what holds it up, agree a small test, run it, then keep, change or stop based on what happened. A person can approve, stop or correct what is put in place. What will be measured is agreed before the work starts.`,
]

const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n')
const faqs = (items: Faq[]) => items.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
const proof = (items: ProofLink[]) => items.map((item) => `- ${item.title}: ${item.note} (${SITE}${item.href})`).join('\n')

function offerChunks(offer: {
  path: string
  label?: string
  eyebrow: string
  title: string
  lede: string
  situation: string
  problems: string[]
  deliverables: string[]
  process: { title: string; body: string }[]
  boundaries: string[]
  proof: ProofLink[]
  faqs: Faq[]
}) {
  const name = offer.label ?? 'AI Opportunity Review'
  const url = `${SITE}${offer.path}`
  const chunks = [
    `${name} (${offer.eyebrow}). ${offer.title} ${offer.lede} Who it is for: ${offer.situation} Page: ${url}`,
    `${name}: if this sounds familiar\n${list(offer.problems)}\n\nWhat you get\n${list(offer.deliverables)}\n\nPage: ${url}`,
    `${name}: how an engagement runs\n${offer.process.map((step, i) => `${i + 1}. ${step.title}: ${step.body}`).join('\n')}\n\nWhat we agree up front\n${list(offer.boundaries)}`,
  ]
  if (offer.faqs.length) chunks.push(`${name}: questions\n\n${faqs(offer.faqs)}`)
  if (offer.proof.length) chunks.push(`${name}: related work\n${proof(offer.proof)}`)
  return chunks
}

function trainingChunks() {
  const url = `${SITE}${trainingPath}`
  return [
    `AI in Practice is a one-day masterclass for professionals and teams. It runs from 10:00 to 16:00, live and interactive, in Dubai or on-site for an organisation. It is beginner-friendly and does not require coding. Register your interest at ${url}. A corporate workshop is tailored to the team's functions, tools and everyday work.`,
    `AI in Practice, what you take away\n${outcomes.map((item) => `- ${item.title}: ${item.body}`).join('\n')}\n\nPage: ${url}`,
    `AI in Practice modules\n${curriculum.map((module, index) => `${index + 1}. ${module.title}: ${module.body}`).join('\n')}\n\nPage: ${url}`,
    `AI in Practice exercises\n${exercises.map((exercise) => `- ${exercise.title}: ${exercise.body.join(' ')}`).join('\n')}\n\nWho it is for\n${audiences.map((item) => `- ${item.title}: ${item.body}`).join('\n')}\n\nPage: ${url}`,
    `AI in Practice principles\n${principles.map((item) => `- ${item.title} ${item.body}`).join('\n')}\n\nA corporate workshop can include\n${list(corporateIncludes)}\n\nPage: ${url}`,
    `AI in Practice questions\n\n${faqs(trainingFaqs)}`,
  ]
}

/** Plain text for the assistant. Drops page components and retired offer names. */
function forKnowledge(markdown: string) {
  return markdown
    .replace(/<[A-Z][\s\S]*?\/>/g, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[\s])\*([^*\n]+)\*(?=[\s]|$)/g, '$1$2')
    .replace(/^[ \t]*[-*]\s+/gm, '- ')
    .replace(/^[ \t]*\d+\.\s+/gm, '- ')
    .replace(/^---$/gm, '')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/Build & Launch sprint/gi, 'build engagement')
    .replace(/sprint scope/gi, 'first scope')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function workSections(markdown: string) {
  return markdown
    .split(/\n(?=## )/)
    .map((part) => {
      const match = part.match(/^##\s+(.+)\n([\s\S]*)$/)
      if (!match) return { heading: 'Overview', text: forKnowledge(part) }
      return { heading: match[1].trim(), text: forKnowledge(match[2]) }
    })
    .filter((section) => section.text.length > 0)
}

async function workChunks() {
  const studies = await getAllCaseStudies()
  const full = (await Promise.all(studies.map((study) => getCaseStudyContent(study.slug)))).filter(
    (study) => study !== null,
  )

  return full.flatMap((study) => {
    const url = `${SITE}/case-studies/${study.slug}`
    const reported = study.results?.length
      ? ` The published study states: ${study.results.map((result) => `${result.title}: ${result.value}`).join('; ')}.`
      : ''
    const facts = [
      `Work: ${study.title}.`,
      `Client: ${study.client}.`,
      study.description,
      study.role ? `ROQ CX role: ${study.role}.` : '',
      study.duration ? `Duration: ${study.duration}.` : '',
      study.teamSize ? `Team: ${study.teamSize}.` : '',
      study.technologies?.length ? `Technologies: ${study.technologies.join(', ')}.` : '',
      study.industry.length ? `Industry: ${study.industry.join(', ')}.` : '',
      `Read it at ${url}.`,
    ]
      .filter(Boolean)
      .join(' ')

    const sections = workSections(study.content).map(
      (section) => `Work: ${study.title} (${url})\n${section.heading}\n${section.text}`,
    )
    return [`${facts}${reported}`, ...sections]
  })
}

async function buildChunks() {
  const [studies, posts, work] = await Promise.all([getAllCaseStudies(), getAllPosts(), workChunks()])

  return [
    ...STUDIO,
    `ROQ CX services: AI automation, including AI agents and governance (${SITE}/services/ai-automation), websites and web apps (${SITE}/services/websites-web-apps), and AI training (${SITE}/services/ai-training). The AI Opportunity Review (${SITE}/ai-opportunity-review) is the suggested place to start when you are not sure which you need. Overview: ${SITE}/services`,
    ...services.flatMap(offerChunks),
    ...trainingChunks(),
    ...offerChunks(opportunityReview),
    ...homeFaqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`),
    ...work,
    `Work you can read is at ${SITE}/case-studies: ${studies.map((study) => study.client).join(', ')}.`,
    ...posts.map((post) => `Insight article: ${post.title}. ${post.description} Read it at ${SITE}/insights/${post.slug}`),
  ]
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const chunks = await buildChunks()

  const banned = chunks.filter((chunk) =>
    /—|AED|18,000|two-week sprint|30% of sprints|delivery evidence|this page|this site|rate card|not described as free/i.test(chunk),
  )
  if (banned.length) {
    throw new Error(`Chunks contain retired claims, em dashes, or page captions:\n${banned.map((c) => c.slice(0, 160)).join('\n')}`)
  }

  if (dryRun) {
    chunks.forEach((chunk, i) => console.log(`\n[${i + 1}/${chunks.length}]\n${chunk}`))
    console.log(`\nDry run: ${chunks.length} chunks, nothing written.`)
    return
  }

  // Embed everything first, so a failure leaves the current knowledge base intact.
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const { data } = await openai.embeddings.create({ model: 'text-embedding-3-small', input: chunks })
  const embeddings = data.sort((a, b) => a.index - b.index).map((item) => item.embedding)

  const { db } = await import('../lib/db')
  const before = await db.execute('SELECT COUNT(*) AS count FROM chunks WHERE is_global = TRUE')
  console.log('Global chunks before:', before.rows[0].count)

  const now = Date.now()
  await db.batch(
    [
      'DELETE FROM embeddings WHERE chunk_id IN (SELECT id FROM chunks WHERE is_global = TRUE)',
      'DELETE FROM chunks WHERE is_global = TRUE',
      ...chunks.flatMap((content, i) => {
        const chunkId = crypto.randomUUID()
        return [
          {
            sql: 'INSERT INTO chunks (id, content, session_id, is_global, created_at, updated_at) VALUES (?, ?, NULL, TRUE, ?, ?)',
            args: [chunkId, content, now, now],
          },
          {
            sql: 'INSERT INTO embeddings (id, chunk_id, session_id, embedding, created_at, updated_at) VALUES (?, ?, NULL, vector32(?), ?, ?)',
            args: [crypto.randomUUID(), chunkId, JSON.stringify(embeddings[i]), now, now],
          },
        ]
      }),
    ],
    'write',
  )

  const after = await db.execute('SELECT COUNT(*) AS count FROM chunks WHERE is_global = TRUE')
  console.log('Global chunks after:', after.rows[0].count)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Reseed failed:', error)
    process.exit(1)
  })
