import { GlassCard } from "../../../../components/ui/glass-card"
import { CTACard } from "../../../../components/ui/cta-card"
import {
  Cog,
  FileText,
  Repeat,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react"

const features = [
  {
    title: "Document Processing",
    description:
      "Automatically extract, validate, and process data from invoices, receipts, forms, and other documents.",
    icon: FileText,
  },
  {
    title: "Workflow Automation",
    description:
      "Design and implement custom workflows that streamline your business processes and reduce manual intervention.",
    icon: Repeat,
  },
  {
    title: "System Integration",
    description:
      "Connect your existing systems and applications to create a seamless flow of information across your organization.",
    icon: Zap,
  },
]

const benefits = [
  {
    title: "Save Time",
    description: "Reduce manual tasks by up to 80% with intelligent automation",
    icon: Clock,
  },
  {
    title: "Minimize Errors",
    description: "Eliminate human error and ensure consistent process execution",
    icon: CheckCircle,
  },
  {
    title: "Scale Operations",
    description: "Handle growing workloads without adding headcount",
    icon: Cog,
  },
]

export const metadata = {
  title: "Eliminate Manual Overload | ROQ CX",
  description: "Escape admin chaos and reclaim 10+ hours per week with ROQ CX's automation solutions. Automate scheduling, data entry, and reporting to focus on growth.",
}

export default function EliminateManualOverloadPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-2xl text-center pt-20 sm:pt-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Eliminate Manual Overload &{' '}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Save Time
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Discover how automation can help your business escape admin chaos, reclaim 10+ hours per week, and focus on what really matters.
        </p>
        <div className="inline-block rounded-full bg-roq-orange/90 px-6 py-2 text-white font-semibold shadow mt-6">
          Imagine reclaiming 10+ hours per week
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-4 mt-16">
        <GlassCard className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Why It Matters</h2>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-block rounded bg-roq-pink/10 px-3 py-1 text-roq-pink font-semibold text-sm mb-2">
              Automation = Competitive Edge
            </span>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
              Automation is now accessible to small businesses, enabling you to compete with larger corporations. Real-world examples show that automating routine tasks like data entry, scheduling, and inventory management can free up 10+ hours per week, reduce manual errors, and let your team focus on growth.
            </p>
            <blockquote className="italic border-l-4 border-roq-orange pl-4 text-zinc-700 dark:text-zinc-300 mb-2">
              "A boutique retailer automated inventory management and customer communications, improving accuracy and freeing up time for creative merchandising and customer engagement."
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
          title="Ready to Automate Your Processes?"
          description="Let's discuss how we can help streamline your operations and boost efficiency."
          buttonText="Schedule a Consultation"
          href="/contact"
        />
      </section>
    </div>
  )
} 