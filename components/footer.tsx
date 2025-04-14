import Link from "next/link"
import { Mail, MessageCircle, MapPin } from "lucide-react"
import Image from "next/image"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  contact: [
    {
      icon: Mail,
      title: "Email",
      description: "hello@roqcx.com",
      href: "mailto:hello@roqcx.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with us",
      href: "https://wa.me/971562520720"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Dubai, UAE",
      href: "https://maps.google.com"
    }
  ]
}

export function Footer() {
  return (
    <footer className="relative bg-background/50 border-t backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/3d_logo.svg"
                alt="ROQ CX Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold">ROQ CX</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering SMBs with AI & Automation
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Navigation</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Contact</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.contact.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target={item.title === "WhatsApp" ? "_blank" : undefined}
                    rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Business Hours</h3>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 6:00 PM GST</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} ROQ CX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 