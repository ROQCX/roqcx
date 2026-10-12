import type { Metadata } from "next"
import Script from "next/script"
import { StructuredData } from "@/components/seo/structured-data"
import { TrainingPage } from "@/components/studio/training-page"
import { curriculum, trainingFaqs } from "@/lib/training-content"
import { pageSeo, pageUrl } from "@/lib/seo"

const canonical = pageUrl("/services/ai-training")
const description =
  "Practical AI training for professionals in Dubai. Learn ChatGPT, prompting, AI agents and safe AI adoption in a hands-on, one-day masterclass."

export const metadata: Metadata = pageSeo({
  title: "AI Masterclass Dubai | Practical AI Training – ROQ CX",
  description,
  path: "/services/ai-training",
  socialTitle: "AI in Practice | Practical AI Masterclass",
  socialDescription: "Understand AI, experiment with leading tools and learn how to apply AI in your everyday work.",
})

export default function TrainingRoute() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <StructuredData
        type="Course"
        data={{
          name: "AI in Practice: A Practical AI Masterclass",
          description:
            "A practical, one-day introduction to generative AI, ChatGPT, prompting, AI agents and responsible AI use at work.",
          url: canonical,
          provider: { "@type": "Organization", name: "ROQ CX", sameAs: "https://www.roqcx.com" },
          educationalLevel: "Beginner",
          inLanguage: "en",
          timeRequired: "PT6H",
          teaches: curriculum.map((module) => module.title),
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          mainEntity: trainingFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <TrainingPage />
    </>
  )
}
