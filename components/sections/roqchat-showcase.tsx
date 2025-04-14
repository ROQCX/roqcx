"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "../ui/glass-card"
import { MessageSquare, Clock, Users, Lightbulb } from "lucide-react"

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

export function RoqchatShowcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Knowledge, On Demand
              <br />
              <span className="bg-gradient-to-r from-roq-orange to-roq-pink bg-clip-text text-transparent">
                AI Chatbot Example
              </span>
            </h2>
            
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Imagine a chatbot that can instantly answer customer or team questions
              by pulling facts from your company&apos;s own knowledge base. Our AI chatbot
              uses Retrieval-Augmented Generation, meaning it doesn&apos;t just chat –
              it retrieves the right information from your data to give accurate,
              up-to-date answers.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10">
              <GlassCard
                variant="gradient"
                className="group inline-flex cursor-pointer items-center space-x-2 px-6 py-3 transition-all hover:scale-105"
                onClick={() => window.location.href = '/chatbot'}
              >
                <span className="font-semibold">See it in action</span>
              </GlassCard>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:mt-0"
          >
            <GlassCard
              variant="gradient"
              intensity="high"
              className="overflow-hidden p-6"
            >
              {/* Chat Interface Mockup */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-roq-orange/20 p-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1 rounded-lg bg-white/10 p-3">
                    How can I automate my invoice processing?
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-roq-pink/20 p-2">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 rounded-lg bg-white/10 p-3">
                    I can help you automate your invoice processing! Our solution can:
                    <ul className="mt-2 list-disc pl-4">
                      <li>Extract data from invoices automatically</li>
                      <li>Match invoices with purchase orders</li>
                      <li>Route for approval based on your rules</li>
                      <li>Update your accounting system</li>
                    </ul>
                    Would you like to see a demo of how this works?
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 