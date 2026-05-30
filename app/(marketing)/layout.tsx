import type { Metadata } from "next";
import { Navigation } from "../../components/layout/navigation";
import { Footer } from "../../components/footer";
import { StructuredData } from "../../components/seo/structured-data";

const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "ROQ CX",
  url: "https://www.roqcx.com",
  logo: "https://www.roqcx.com/brand/mark-3d.png",
  description: "ROQ CX is the fractional product team for SMEs, turning napkin sketches into clickable prototypes, validated with real users, and shipped to production on a fixed two-week cadence.",
  sameAs: [
    "https://www.linkedin.com/company/roqcx",
    "https://twitter.com/roqcx",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-56-252-0720",
    contactType: "customer service",
    email: "hello@roqcx.com",
    areaServed: ["AE", "GCC", "Global"],
    availableLanguage: ["English", "Arabic"]
  },
  foundingDate: "2023",
  founders: [
    {
      "@type": "Person",
      name: "Zayne Nair",
      jobTitle: "Founder & CEO"
    }
  ],
  employees: {
    "@type": "Person",
    name: "Zayne Nair",
    jobTitle: "Founder & CEO"
  },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708"
    },
    geoRadius: "1000"
  },
  offers: {
    "@type": "AggregateOffer",
    offerCount: "3",
    offers: [
      {
        "@type": "Service",
        name: "Prototype Sprint",
        description: "A fixed two-week sprint that turns a fuzzy idea into a hi-fi clickable prototype, validated with five real-user interviews, with a written go/no-go decision at day 14.",
        provider: { "@type": "Organization", name: "ROQ CX" },
        serviceType: "Product Prototyping",
        areaServed: ["AE", "GCC", "Global"],
      },
      {
        "@type": "Service",
        name: "Build & Launch",
        description: "Four-week production build of a validated prototype: auth, database, payments, analytics, CI/CD, staging, and handoff docs, in your stack or ours.",
        provider: { "@type": "Organization", name: "ROQ CX" },
        serviceType: "MVP Engineering",
        areaServed: ["AE", "GCC", "Global"],
      },
      {
        "@type": "Service",
        name: "Market Launch",
        description: "Eight-week journey from prototype to live customers: landing page, onboarding sequence, and a 30-day cohort dashboard measuring real outcomes.",
        provider: { "@type": "Organization", name: "ROQ CX" },
        serviceType: "Product Launch",
        areaServed: ["AE", "GCC", "Global"],
      },
    ],
  },
};

export const metadata: Metadata = {
  title: "ROQ CX | From idea to live prototype in 2 weeks",
  description: "The fractional product team for SMEs. We turn napkin sketches into clickable prototypes, validate with real users, and ship to production on a fixed two-week cadence.",
  metadataBase: new URL("https://www.roqcx.com"),
  openGraph: {
    title: "ROQ CX | From idea to live prototype in 2 weeks",
    description: "The fractional product team for SMEs. Two-week prototype sprints, eight weeks to market launch: predictable, fixed-fee, and stop after any milestone.",
    url: "https://www.roqcx.com",
    siteName: "ROQ CX",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "ROQ CX | Fractional product team for SMEs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROQ CX | From idea to live prototype in 2 weeks",
    description: "The fractional product team for SMEs. Two-week prototype sprints, fixed-fee, stop after any milestone.",
    images: ["/og"],
    creator: "@roqcx",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
      <Navigation />
      <main className="relative z-10 pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}