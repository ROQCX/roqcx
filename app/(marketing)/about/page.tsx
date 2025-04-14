import { Metadata } from "next"
import { GlassCard } from "../../../components/ui/glass-card"
import { Button } from "../../../components/ui/button"
import { ArrowRight, Target, Users, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "About ROQ CX - Empowering SMBs with AI & Automation",
  description: "Learn about our mission to help small businesses compete with enterprise-grade technology through automation, analytics, and AI solutions.",
}

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every solution is crafted with attention to detail, ensuring accuracy and reliability."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work side by side with our clients, celebrating wins together as one team."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Bringing enterprise-level innovation to help small businesses thrive."
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Empowering Small Businesses with{" "}
          <span className="bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
            Enterprise-Grade Technology
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          At ROQ CX, we believe that every business deserves access to cutting-edge technology 
          that helps them compete and thrive in today&apos;s digital landscape.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert">
          <p>
            Founded with a vision to democratize enterprise-grade solutions, we specialize in 
            helping small and medium-sized businesses leverage automation, analytics, and AI 
            to streamline operations, enhance customer experiences, and drive growth.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              We&apos;re on a mission to level the playing field for SMBs by providing 
              them with the same powerful tools and technologies that large enterprises 
              use to maintain their competitive edge.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              We work side-by-side with our clients, combining deep technical expertise 
              with a collaborative approach to solve complex business challenges and 
              deliver measurable results.
            </p>
          </GlassCard>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Why Choose ROQ CX?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <GlassCard key={value.title} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Let&apos;s work together to build solutions that help your business thrive 
            in the digital age.
          </p>
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 