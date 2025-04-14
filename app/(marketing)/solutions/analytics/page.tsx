import { GlassCard } from "../../../../components/ui/glass-card"
import { CTACard } from "../../../../components/ui/cta-card"
import {
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Target,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    title: "Real-time Dashboards",
    description:
      "Create customizable dashboards that display your most important metrics in real-time, enabling quick decision-making.",
    icon: Activity,
  },
  {
    title: "Advanced Visualizations",
    description:
      "Transform complex data into clear, interactive charts and graphs that make it easy to spot trends and patterns.",
    icon: LineChart,
  },
  {
    title: "Performance Tracking",
    description:
      "Monitor KPIs and business metrics with automated reporting and customizable alerts for important changes.",
    icon: Target,
  },
]

const benefits = [
  {
    title: "Data-Driven Decisions",
    description: "Make informed decisions based on real-time insights and analytics",
    icon: PieChart,
  },
  {
    title: "Improved Efficiency",
    description: "Identify bottlenecks and optimization opportunities in your operations",
    icon: TrendingUp,
  },
  {
    title: "Better Forecasting",
    description: "Predict trends and plan ahead with historical data analysis",
    icon: BarChart3,
  },
]

export default function Analytics() {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Analytics & Dashboards
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Transform your data into actionable insights with powerful analytics and
            beautiful dashboards. Make informed decisions faster with real-time
            visibility into your business performance.
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
            title="Ready to Transform Your Data into Insights?"
            description="Let's discuss how our analytics solutions can help you make data-driven decisions and drive growth."
            buttonText="Schedule a Consultation"
            href="/contact"
          />
        </div>
      </div>
    </div>
  )
} 