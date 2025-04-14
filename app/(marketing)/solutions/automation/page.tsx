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

export default function Automation() {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
              <Cog className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Process Automation
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Transform your business operations with intelligent automation.
            Streamline workflows, reduce errors, and free your team to focus on
            strategic work.
          </p>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-24 max-w-7xl">
          <h2 className="text-center text-2xl font-bold">Key Features</h2>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <GlassCard key={feature.title} className="p-6">
                <div className="flex h-full flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 flex-grow text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mx-auto mt-24 max-w-7xl">
          <h2 className="text-center text-2xl font-bold">Benefits</h2>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <CTACard
            title="Ready to Automate Your Processes?"
            description="Let's discuss how we can help streamline your operations and boost efficiency."
            buttonText="Schedule a Consultation"
            href="/contact"
          />
        </div>
      </div>
    </div>
  )
} 