import type { Metadata } from "next";
import { Inter, Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const grotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "AUROZEN AI — Engineering Intelligent Systems for Business Growth", template: "%s | AUROZEN AI" },
  description: SITE.description,
  openGraph: { siteName: "AUROZEN AI", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-surface focus:px-3 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
