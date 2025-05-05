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

export const metadata = {
  title: "Win and Keep More Customers | ROQ CX",
  description: "Never miss a lead with ROQ CX's analytics solutions. Smart workflows and CRM automation engage prospects instantly and nurture them on autopilot.",
}

export default function WinAndKeepMoreCustomersPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-2xl text-center pt-20 sm:pt-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Win and Keep More{' '}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Customers
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Discover how automation can help you never miss a lead, nurture customers on autopilot, and boost retention—so you can focus on growth.
        </p>
        <div className="inline-block rounded-full bg-roq-orange/90 px-6 py-2 text-white font-semibold shadow mt-6">
          One client saw a 37% boost in customer retention
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-4 mt-16">
        <GlassCard className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Why It Matters</h2>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-block rounded bg-roq-pink/10 px-3 py-1 text-roq-pink font-semibold text-sm mb-2">
              Automation = Customer Loyalty
            </span>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
              Automation enhances customer satisfaction by improving service delivery and responsiveness. CRM automation and smart workflows help you never miss a lead and nurture customers on autopilot, boosting retention and freeing your team for growth.
            </p>
            <blockquote className="italic border-l-4 border-roq-orange pl-4 text-zinc-700 dark:text-zinc-300 mb-2">
              "E-commerce startups use automation to process orders, manage customer inquiries, and scale operations smoothly, resulting in higher customer satisfaction and more time for innovation."
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
          title="Ready to Transform Your Data into Insights?"
          description="Let's discuss how our analytics solutions can help you make data-driven decisions and drive growth."
          buttonText="Schedule a Consultation"
          href="/contact"
        />
      </section>
    </div>
  )
} 