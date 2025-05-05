import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROQ CX",
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
      {
        url: "/roqcx.webp",
        width: 1024,
        height: 1024,
        alt: "ROQ CX Logo - Business Automation & AI Solutions",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROQ CX - Automate & Elevate Your Business",
    description: "Transform your business with cutting-edge automation, analytics, and AI solutions tailored for SMBs.",
    images: ["/roqcx.png", "/roqcx.webp"],
    creator: "@roqcx",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/3d_logo.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/3d_logo.svg", type: "image/svg+xml" }
    ],
    shortcut: ["/favicon.ico"]
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
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
