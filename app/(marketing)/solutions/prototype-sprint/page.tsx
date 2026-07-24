import type { Metadata } from "next"
import { StructuredData } from "@/components/seo/structured-data"
import { ServiceSprintPage } from "@/components/solutions/service-sprint-page"

export const metadata: Metadata = {
  title: "Prototype Sprint | 14-day product validation sprint | ROQ CX",
  description:
    "A fixed-fee 14-day prototype sprint for SMEs: turn a fuzzy idea into a clickable prototype, validate with five real-user interviews, and walk away with a signed go/no-go memo.",
  alternates: { canonical: "https://www.roqcx.com/solutions/prototype-sprint" },
  openGraph: {
    title: "Prototype Sprint | 14-day product validation sprint | ROQ CX",
    description:
      "Turn a fuzzy idea into a clickable prototype, validate with five real-user interviews, and walk away with a signed go/no-go memo.",
    url: "https://www.roqcx.com/solutions/prototype-sprint",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prototype Sprint | 14-day product validation sprint | ROQ CX",
    description:
      "14 days from sketch to clickable prototype, with five user interviews and a signed memo.",
    images: ["/og"],
  },
}

const schema = {
  "@type": "Service",
  name: "Prototype Sprint",
  serviceType: "Product Prototyping",
  url: "https://www.roqcx.com/solutions/prototype-sprint",
  description:
    "A fixed-fee 14-day sprint that turns an SME idea into a clickable prototype, validated through five recorded user interviews, with a signed go/no-go memo at day 14.",
  provider: { "@type": "Organization", name: "ROQ CX", url: "https://www.roqcx.com" },
  areaServed: ["AE", "GCC", "Global"],
  audience: { "@type": "Audience", audienceType: "Small and medium-sized enterprises" },
  termsOfService: "Fixed-fee, fixed-scope. Stop after day 14.",
}

export default function PrototypeSprintPage() {
  return (
    <>
      <StructuredData data={schema} type="Service" />
      <ServiceSprintPage
        eyebrow="Sprint 01 · Validate"
        duration="14 days"
        title={
          <>
            Prototype Sprint.
            <br />
            Find out if the idea earns a build.
          </>
        }
        lede="A fixed-fee fourteen-day sprint that turns a fuzzy idea into a hi-fi clickable prototype, validates it with five real-user interviews, and ends with a written go/no-go memo."
        outcomes={[
          "Hi-fi clickable prototype on a public URL",
          "Five recorded user interviews with consent",
          "Signed go/no-go memo with rationale",
          "A clean backlog for the build sprint",
        ]}
        weeks={[
          {
            label: "Week 1 · Frame",
            title: "Pressure-test the idea.",
            items: [
              "Day 1: kick-off, success metric agreed",
              "Day 2: map the riskiest assumption",
              "Day 3: lo-fi flows + content draft",
              "Day 4: hi-fi prototype build starts",
              "Day 5: internal review + interview script",
            ],
          },
          {
            label: "Week 2 · Validate",
            title: "Put it in front of humans.",
            items: [
              "Day 6: interview recruiting + final prototype polish",
              "Day 7-9: five real-user interviews, recorded",
              "Day 10: synthesis: what actually happened vs. what we expected",
              "Day 11-12: iterate on the prototype where signal was clear",
              "Day 13: write the go/no-go memo",
              "Day 14: readout, signed memo, handover",
            ],
          },
        ]}
        inputs={[
          "One-page problem statement",
          "Target segment + access to 5 candidates",
          "One success metric you'd defend",
          "A decision-maker on the call",
        ]}
        artifacts={[
          "Clickable prototype URL (Figma / coded)",
          "Five interview recordings + transcripts",
          "Sprint memo with decision rationale",
          "Backlog for the build sprint (optional)",
        ]}
        decision={[
          "Ship: move into Build & Launch",
          "Iterate: second short sprint",
          "Kill: cleanly, with notes",
          "Pivot: reframe and re-scope",
        ]}
        notFor={[
          "Marketing websites — see Website Sprint",
          "Pure design polish on an existing live product",
          "Compliance-heavy enterprise procurement timelines",
          "Anyone who can't get five users on a call in two weeks",
        ]}
        faq={[
          {
            q: "What if we already have a prototype?",
            a: "Then this sprint is about validating it, not building it. We'll skip ahead and spend more days on user interviews and iteration cycles.",
          },
          {
            q: "Who runs the interviews?",
            a: "We do. You're welcome on the calls but the script and the synthesis are owned by ROQ CX.",
          },
          {
            q: "What does the memo cover?",
            a: "What we built, what we expected, what actually happened, our recommendation (ship / iterate / kill / pivot), and the open risks.",
          },
          {
            q: "What if we want to keep going on day 15?",
            a: "Most do. We roll straight into a Build & Launch sprint using the memo as the scope. No new procurement cycle.",
          },
        ]}
        next={{ href: "/solutions/build-launch", label: "Build & Launch", sub: "Next step" }}
      />
    </>
  )
}
