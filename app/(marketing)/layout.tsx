import type { Metadata } from "next";
import { Navigation } from "../../components/layout/navigation";
import { GradientBackground } from "../../components/ui/gradient-background";
import { GeometricPattern } from "../../components/ui/geometric-pattern";
import { Footer } from "../../components/footer";
import { StructuredData } from "../../components/seo/structured-data";

const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ROQ CX",
  url: "https://www.roqcx.com",
  logo: "https://www.roqcx.com/roqcx.png",
  description: "Transform your business with cutting-edge automation, analytics, and AI solutions tailored for SMBs.",
  sameAs: [
    "https://twitter.com/roqcx",
    "https://linkedin.com/company/roqcx",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "UAE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@roqcx.com",
    availableLanguage: ["English"],
  },
  offers: {
    "@type": "AggregateOffer",
    offerCount: "4",
    offers: [
      {
        "@type": "Offer",
        name: "Process Automation",
        description: "Streamline your operations with intelligent automation solutions",
      },
      {
        "@type": "Offer",
        name: "Analytics & Dashboards",
        description: "Transform your data into actionable insights",
      },
      {
        "@type": "Offer",
        name: "AI & Predictive Models",
        description: "Harness the power of AI for your business",
      },
      {
        "@type": "Offer",
        name: "ROQChat AI Assistant",
        description: "24/7 AI-powered customer support solution",
      },
    ],
  },
};

export const metadata: Metadata = {
  title: "ROQ CX - Automate & Elevate Your Business",
  description: "Transform your business with cutting-edge automation, analytics, and AI solutions tailored for SMBs.",
  metadataBase: new URL("https://www.roqcx.com"),
  openGraph: {
    title: "ROQ CX - Automate & Elevate Your Business",
    description: "Transform your business with cutting-edge automation, analytics, and AI solutions tailored for SMBs.",
    url: "https://www.roqcx.com",
    siteName: "ROQ CX",
    images: [
      {
        url: "/roqcx.png",
        width: 1024,
        height: 1024,
        alt: "ROQ CX Logo - Business Automation & AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROQ CX - Automate & Elevate Your Business",
    description: "Transform your business with cutting-edge automation, analytics, and AI solutions tailored for SMBs.",
    images: ["/roqcx.png"],
    creator: "@roqcx",
  },
  icons: {
    icon: [
      { url: "/3d_logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={defaultStructuredData} />
      <div className="fixed inset-0 -z-10 h-full">
        <GradientBackground />
        <GeometricPattern variant="dark" density="medium" />
      </div>
      <Navigation />
      <main className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
} 