import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileBar } from "@/components/MobileBar";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const TITLE = "AUROZEN AI | AI consulting, automation and intelligent systems";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#090910" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | AUROZEN AI" },
  description: SITE.description,
  applicationName: "AUROZEN AI",
  keywords: ["AI consulting", "AI automation", "AI agents", "RAG", "AI chatbots", "AI voice agents", "AI integration", "n8n workflows", "AI audit"],
  authors: [{ name: "AUROZEN AI" }],
  creator: "AUROZEN AI",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "AUROZEN AI", title: TITLE, description: SITE.description, url: SITE.url, locale: "en" },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

// Runs before first paint so there is no flash: saved choice, else the device preference.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

const ORG = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: "AUROZEN AI",
      url: SITE.url,
      logo: `${SITE.url}/logo-mark.png`,
      email: SITE.email,
      description: SITE.description,
      areaServed: ["US", "GB", "CA", "AU", "EU", "IN"],
      sameAs: SITE.product.appUrl ? [SITE.product.appUrl] : [],
    },
    { "@type": "WebSite", "@id": `${SITE.url}/#site`, url: SITE.url, name: "AUROZEN AI", publisher: { "@id": `${SITE.url}/#org` }, inLanguage: "en" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${serif.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd data={ORG} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-surface focus:px-3 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileBar />
        <CommandPalette />
      </body>
    </html>
  );
}
