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

export default function AI() {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI & Predictive Models
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Harness the power of artificial intelligence to predict trends, optimize
            operations, and make data-driven decisions. Enterprise-grade AI
            solutions scaled for growing businesses.
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
            title="Ready to Harness the Power of AI?"
            description="Let's discuss how our AI solutions can help you gain a competitive edge and drive innovation."
            buttonText="Schedule a Consultation"
            href="/contact"
          />
        </div>
      </div>
    </div>
  )
} 