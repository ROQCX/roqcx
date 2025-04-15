import { GlassCard } from "../../../../components/ui/glass-card"
import { CTACard } from "../../../../components/ui/cta-card"
import { ChatInterface } from "../../../../components/chat/chat-interface"
import {
  MessageSquare,
  Shield,
  Zap,
  Headphones,
  Brain,
  Bot,
  ArrowRight,
} from "lucide-react"
import { cookies } from 'next/headers'
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

const ROQ_CX_QUESTIONS = [
  "How can ROQ CX help improve my customer service?",
  "What are the key benefits of using ROQ CX for small businesses?",
  "How does ROQ CX's AI technology work?",
  "Can ROQ CX help reduce my customer support costs?",
  "What makes ROQ CX different from other customer experience platforms?",
  "How can ROQ CX help me understand my customers better?"
]

export default async function ROQChat() {
    
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
            ROQChat AI Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Experience the future of customer support and team collaboration with our
            AI-powered chat assistant. Get instant, accurate responses and streamline
            your communication workflows.
          </p>
          <div className="mt-8">
            <Link href="/chatbot">
              <Button size="lg" className="group">
                Try it for yourself
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
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

        {/* Chat Interface Section */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-8">Try ROQChat Now</h2>
          <GlassCard className="p-6">
            <ChatInterface
              initialMessages={[]}
              isReadonly={false}
              exampleQuestions={ROQ_CX_QUESTIONS}
              welcomeMessage="Welcome to ROQ CX Assistant! How can I help you learn about our products and services?"
              showInfoButton={false}
              apiRoute="/api/chat/roqcx"
            />
          </GlassCard>
        </div>

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