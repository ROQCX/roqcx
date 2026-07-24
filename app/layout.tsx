import type { Metadata } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  adjustFontFallback: false,
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ROQ CX | From idea to live prototype in 2 weeks",
  description: "The fractional product team for SMEs. We turn napkin sketches into clickable prototypes, validate with real users, and ship to production on a fixed two-week cadence.",
  metadataBase: new URL("https://www.roqcx.com"),
  openGraph: {
    title: "ROQ CX | From idea to live prototype in 2 weeks",
    description: "The fractional product team for SMEs. Two-week prototype sprints, four-week builds, eight-week launches: predictable, fixed-fee, and stop after any milestone.",
    url: "https://www.roqcx.com",
    siteName: "ROQ CX",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "ROQ CX | From idea to live prototype in two weeks",
      }
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
    shortcut: ["/favicon.ico"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Apply stored theme before paint to avoid light/dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager — same container as zaynenair.com for cross-domain attribution.
            Confirm linker domains in the shared GTM workspace (GA4 linker):
            zaynenair.com, www.zaynenair.com, roqcx.com, www.roqcx.com */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
        <Script id="gtm-linker-hint" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'gtm_cross_domain_hint',
              linker_domains: ['zaynenair.com', 'www.zaynenair.com', 'roqcx.com', 'www.roqcx.com']
            });
          `}
        </Script>
        {/* LinkedIn Tag */}
        <Script id="linkedin-partner-id" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8341681";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* LinkedIn Tag (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- LinkedIn tracking pixel requires a raw img in noscript */}
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }} 
            alt="" 
            src="https://px.ads.linkedin.com/collect/?pid=8341681&fmt=gif" 
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
