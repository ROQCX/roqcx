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
    title: "Eliminate Manual Overload",
    description:
      "Escape admin chaos and reclaim 10+ hours per week. Automate scheduling, data entry, and reporting so your team can focus on growth, not grunt work.",
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
    title: "Win and Keep More Customers",
    description:
      "Never miss a lead. Smart workflows and CRM automation engage prospects instantly and nurture them on autopilot—helping you win and keep more customers.",
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
    title: "Deliver a Consistent Experience",
    description:
      "Deliver a consistent, professional customer experience 24/7. Our automation ensures every customer gets fast, reliable service—no matter how busy you are.",
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
      "24/7 AI-powered assistant for instant, accurate responses. Enhance support, boost productivity, and streamline communication for your team and customers.",
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
      <div className="container mx-auto px-4 ">
        <div className="mx-auto max-w-2xl text-center pt-20 sm:pt-32">
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

export const metadata = {
  title: "Solutions | ROQ CX",
  description: "Explore ROQ CX's suite of automation, analytics, AI, and customer support solutions designed to transform and grow your business.",
} 