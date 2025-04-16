"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { MessageSquare, Clock, Users, Lightbulb } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"

const features = [
  {
    title: "24/7 Customer Service",
    description: "Instant responses to customer queries, any time of day.",
    icon: MessageSquare
  },
  {
    title: "Time-Saving",
    description: "Automate responses to common questions and support requests.",
    icon: Clock
  },
  {
    title: "Team Support",
    description: "Faster employee onboarding with instant access to internal knowledge.",
    icon: Users
  },
  {
    title: "Smart Learning",
    description: "Continuously learns from your data to provide better answers.",
    icon: Lightbulb
  }
]

const messages = [
  {
    role: "assistant",
    content: "Hi! I'm ROQChat, your AI assistant. How can I help you today?",
  },
  {
    role: "user",
    content: "Can you help me find information about your case studies?",
  },
  {
    role: "assistant",
    content:
      "Of course! We have several case studies showcasing our work. Here are some highlights:\n\n1. E-commerce platform optimization\n2. Healthcare system integration\n3. Financial services automation\n\nWould you like me to provide more details about any specific case study?",
  },
  {
    role: "user",
    content: "Tell me more about the e-commerce platform case study.",
  },
  {
    role: "assistant",
    content:
      "The e-commerce platform case study demonstrates how we helped a major retailer:\n\n• Increase conversion rates by 45%\n• Reduce page load times by 60%\n• Implement AI-powered product recommendations\n• Enhance mobile user experience\n\nWould you like to see the full case study?",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function RoqchatShowcase() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Meet ROQChat
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Experience the future of customer service with our AI-powered chat
            solution. ROQChat understands context, learns from interactions, and
            provides personalized assistance 24/7.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-12"
        >
          <div className="relative lg:col-span-7">
            <GlassCard
              variant="gradient"
              className="overflow-hidden p-6"
            >
              {/* Chat Interface Mockup */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col space-y-4"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-zinc-100 dark:bg-zinc-800"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Chat Input */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-zinc-200 bg-white/50 px-4 py-2 text-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold">
                    Intelligent Conversations
                  </h3>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    ROQChat goes beyond simple Q&A. It understands context,
                    maintains conversation history, and provides relevant,
                    personalized responses that feel natural and helpful.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mt-10"
                >
                  <h3 className="text-2xl font-bold">
                    24/7 Availability
                  </h3>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    Never miss a customer inquiry. ROQChat is always available to
                    handle questions, provide support, and guide users through your
                    services.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-10"
                >
                  <Button asChild>
                    <Link href="/contact">
                      Try ROQChat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 