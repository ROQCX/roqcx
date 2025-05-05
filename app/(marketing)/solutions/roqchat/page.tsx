import { GlassCard } from "../../../../components/ui/glass-card"
import { CTACard } from "../../../../components/ui/cta-card"
import {
  MessageSquare,
  Shield,
  Zap,
  Headphones,
  Brain,
  Bot,
  ArrowRight,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react"
import Link from 'next/link'
import { Button } from "../../../../components/ui/button"

const features = [
  {
    title: "AI-Powered Assistant",
    description:
      "Advanced AI that understands context, provides accurate responses, and learns from interactions.",
    icon: Brain,
  },
  {
    title: "Real-time Messaging",
    description:
      "Instant message delivery with typing indicators and read receipts for seamless communication.",
    icon: MessageSquare,
  },
  {
    title: "Enterprise Security",
    description:
      "End-to-end encryption and advanced security measures to protect sensitive communications.",
    icon: Shield,
  },
]

const benefits = [
  {
    title: "24/7 Availability",
    description: "Get instant responses anytime, anywhere with our AI assistant",
    icon: Bot,
  },
  {
    title: "Increased Productivity",
    description: "Streamline communication and reduce response times",
    icon: Zap,
  },
  {
    title: "Enhanced Support",
    description: "Provide better customer service with instant, accurate responses",
    icon: Headphones,
  },
]

const agenticCapabilities = [
  {
    title: "Autonomous Problem Solving",
    description: "Our AI doesn't just respond, it takes initiative to solve complex customer issues by breaking them down into actionable steps and executing them independently.",
    icon: Target,
  },
  {
    title: "Contextual Understanding",
    description: "The AI maintains deep context awareness across conversations, remembering previous interactions and using them to provide more relevant, personalized solutions.",
    icon: Brain,
  },
  {
    title: "Proactive Assistance",
    description: "Instead of waiting for instructions, our AI anticipates needs and suggests solutions before problems arise, reducing response times and improving customer satisfaction.",
    icon: Sparkles,
  },
  {
    title: "Workflow Automation",
    description: "Seamlessly integrates with your existing systems to automate routine tasks, from ticket creation to follow-up scheduling, without human intervention.",
    icon: Workflow,
  },
]

export const metadata = {
  title: "ROQChat AI Assistant | ROQ CX",
  description: "Experience the future of customer support with ROQChat's AI-powered assistant. Get 24/7 instant, accurate responses and streamline your communication workflows.",
}

export default async function ROQChat() {
  return (
    <div className="relative">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-2xl text-center pt-20 sm:pt-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            ROQChat{' '}
            <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Experience the future of customer support and team collaboration with our AI-powered chat assistant. Get instant, accurate responses and streamline your communication workflows.
          </p>
          <div className="inline-block rounded-full bg-roq-orange/90 px-6 py-2 text-white font-semibold shadow mt-6">
            24/7 instant, accurate responses
          </div>
          <div className="mt-8">
            <Link href="/chatbot">
              <Button size="lg" className="group">
                Try it for yourself
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
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

        {/* Agentic AI Section */}
        <section className="container mx-auto px-4 mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Beyond Chatbots:{" "}
              <span className="bg-gradient-to-r from-roq-orange to-roq-pink bg-clip-text text-transparent">
                Agentic AI
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              ROQChat isn't just another chatbot, it's an intelligent agent that actively solves problems, learns from interactions, and continuously improves your customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agenticCapabilities.map((capability) => (
              <GlassCard key={capability.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <capability.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{capability.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block rounded-lg bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-roq-orange">Real Results:</span>{" "}
                Our clients see an average 40% reduction in response time and 65% increase in first-contact resolution
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <CTACard
            title="Ready to Transform Your Communication?"
            description="Let's discuss how ROQChat can enhance your customer support and team collaboration."
            buttonText="Schedule a Consultation"
            href="/contact"
          />
        </div>
      </div>
    </div>
  )
} 