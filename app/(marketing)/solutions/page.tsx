import { SolutionCard, type IconName } from "../../../components/ui/solution-card"

interface Solution {
  title: string
  description: string
  icon: IconName
  href: string
  features: string[]
}

const solutions: Solution[] = [
  {
    title: "Process Automation",
    description:
      "Streamline your operations with intelligent automation. From data entry to complex workflows, we'll help you save time and reduce errors.",
    icon: "cog",
    href: "/solutions/automation",
    features: [
      "Automated data entry and processing",
      "Workflow optimization",
      "Document processing",
      "System integration",
    ],
  },
  {
    title: "Analytics & Dashboards",
    description:
      "Transform your data into actionable insights. Get real-time visibility into your business performance with custom dashboards.",
    icon: "bar-chart-3",
    href: "/solutions/analytics",
    features: [
      "Real-time KPI tracking",
      "Custom dashboard creation",
      "Data visualization",
      "Performance analytics",
    ],
  },
  {
    title: "AI & Predictive Models",
    description:
      "Harness the power of AI to predict trends and make data-driven decisions. Enterprise-grade AI solutions scaled for SMBs.",
    icon: "brain",
    href: "/solutions/ai",
    features: [
      "Sales forecasting",
      "Customer behavior analysis",
      "Predictive maintenance",
      "Risk assessment",
    ],
  },
  {
    title: "ROQChat AI Assistant",
    description:
      "Your 24/7 AI-powered assistant that learns from your business data to provide accurate, instant responses to customer queries.",
    icon: "message-square",
    href: "/solutions/roqchat",
    features: [
      "24/7 customer support",
      "Knowledge base integration",
      "Multi-channel support",
      "Continuous learning",
    ],
  },
]

export default function Solutions() {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 sm:">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Solutions that{" "}
            <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Business
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover how our suite of solutions can help you automate processes,
            gain insights, and drive growth for your business.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </div>
      </div>
    </div>
  )
} 