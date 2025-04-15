import { ContactForm } from "../../../components/contact/contact-form"
import { Metadata } from "next"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import Script from "next/script"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Contact Us | ROQ CX",
  description: "Get in touch with us to learn more about how ROQ CX can help your business.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@roqcx.com",
    href: "mailto:hello@roqcx.com"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/971562520720"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dubai, UAE",
    href: "https://maps.google.com"
  }
]

export default function ContactPage() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <div className="pt-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Have a question or want to learn more about our services? We&apos;re here to help. Fill out the form or reach out directly through any of these channels.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors"
                    target={item.title === "WhatsApp" ? "_blank" : undefined}
                    rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-roq-orange to-roq-pink">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:pl-8 xl:pl-12">
              <div className="overflow-hidden rounded-2xl bg-background/60 shadow-sm ring-1 ring-zinc-950/5 backdrop-blur dark:bg-zinc-900/60 dark:ring-white/10">
                <div className="p-8">
                  <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 