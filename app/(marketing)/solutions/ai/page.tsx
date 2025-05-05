import { GlassCard } from "../../../../components/ui/glass-card"
import { CTACard } from "../../../../components/ui/cta-card"
import {
  Brain,
  TrendingUp,
  Users,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react"

const features = [
  {
    title: "Predictive Analytics",
    description:
      "Leverage machine learning models to forecast sales, demand, and market trends with high accuracy.",
    icon: TrendingUp,
  },
  {
    title: "Customer Behavior Analysis",
    description:
      "Understand and predict customer behavior patterns to optimize your marketing and product strategies.",
    icon: Users,
  },
  {
    title: "Risk Assessment",
    description:
      "Identify and mitigate potential risks using AI-powered analysis of historical and real-time data.",
    icon: AlertTriangle,
  },
]

const benefits = [
  {
    title: "Smarter Decisions",
    description: "Make data-driven decisions backed by advanced AI algorithms",
    icon: Brain,
  },
  {
    title: "Innovation Driver",
    description: "Stay ahead of competition with cutting-edge AI solutions",
    icon: Lightbulb,
  },
  {
    title: "Enhanced Efficiency",
    description: "Automate complex analysis and decision-making processes",
    icon: Sparkles,
  },
]

export const metadata = {
  title: "Deliver a Consistent Customer Experience | ROQ CX",
  description: "Deliver a consistent, professional customer experience 24/7 with ROQ CX's AI solutions. Our automation ensures every customer gets fast, reliable service.",
}

export default function DeliverConsistentExperiencePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-2xl text-center pt-20 sm:pt-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Deliver a Consistent{' '}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Customer Experience
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Discover how automation ensures every customer gets a fast, professional experience—24/7, without extra headcount or manual effort.
        </p>
        <div className="inline-block rounded-full bg-roq-orange/90 px-6 py-2 text-white font-semibold shadow mt-6">
          Deliver 24/7 responsiveness with zero added headcount
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-4 mt-16">
        <GlassCard className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Why It Matters</h2>
          <div className="flex flex-col items-center gap-2">
           
            <span className="inline-block rounded bg-roq-pink/10 px-3 py-1 text-roq-pink font-semibold text-sm mb-2">
              Automation = Consistency
            </span>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
              Automation ensures every customer gets a consistent, professional, and fast experience—without relying on manual effort. Service industries use automated scheduling to streamline client interactions, reduce admin overhead, and enhance service delivery.
            </p>
            <blockquote className="italic border-l-4 border-roq-orange pl-4 text-zinc-700 dark:text-zinc-300 mb-2">
              "Service businesses adopting automated scheduling systems have seen higher client satisfaction and retention rates, while freeing up staff for more valuable work."
            </blockquote>
            <p className="text-xs text-zinc-400">
              Source: <a href="https://getautonomi.com/scaling-small-businesses-with-automation-case-studies/" target="_blank" rel="noopener noreferrer" className="underline">getautonomi.com</a>, <a href="https://cashflowinventory.com/blog/small-business-automation/" target="_blank" rel="noopener noreferrer" className="underline">cashflowinventory.com</a>
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Features & Benefits */}
      <section className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-roq-orange">Key Features</h2>
            <div className="space-y-6">
              {features.map((feature) => (
                <GlassCard key={feature.title} className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-roq-pink">Benefits</h2>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <GlassCard key={benefit.title} className="flex items-center gap-4 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-24">
        <CTACard
          title="Ready to Harness the Power of AI?"
          description="Let's discuss how our AI solutions can help you gain a competitive edge and drive innovation."
          buttonText="Schedule a Consultation"
          href="/contact"
        />
      </section>
    </div>
  )
} 