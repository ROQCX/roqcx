import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "../../components/layout/navigation";
import { Footer } from "../../components/footer";
import { StructuredData } from "../../components/seo/structured-data";
import { AttributionCapture } from "../../components/analytics/attribution-capture";
import { defaultDescription, defaultTitle, pageSeo } from "@/lib/seo";

const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "ROQ CX",
  legalName: "ROQ CX - FZCO",
  url: "https://www.roqcx.com",
  logo: "https://www.roqcx.com/brand/mark-3d.png",
  description: defaultDescription,
  sameAs: [
    "https://www.linkedin.com/company/roqcx",
    "https://twitter.com/roqcx",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-56-252-0720",
    contactType: "customer service",
    email: "hello@roqcx.com",
    areaServed: ["AE", "GCC", "Global"],
    availableLanguage: ["English"],
  },
  foundingDate: "2023",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI automation",
        serviceType: "AI agents and governance",
        url: "https://www.roqcx.com/services/ai-automation",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Websites and web apps",
        serviceType: "Web design and development",
        url: "https://www.roqcx.com/services/websites-web-apps",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI training",
        serviceType: "Training",
        url: "https://www.roqcx.com/services/ai-training",
      },
    },
  ],
};

export const metadata: Metadata = pageSeo({
  title: defaultTitle,
  description: defaultDescription,
  path: "/",
  includeCanonical: false,
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <AttributionCapture />
      </Suspense>
      <StructuredData data={defaultStructuredData} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="relative z-10 pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}