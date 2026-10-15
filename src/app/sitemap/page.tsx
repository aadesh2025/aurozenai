import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/lib/site";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Sitemap" };

export default function Page() {
  return (
    <>
      <Hero title="Sitemap" trail={[["Sitemap"]]} />
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {NAV.map((g) => (
            <div key={g.label}>
              <h2 className="font-ui font-medium">{g.label}</h2>
              <ul className="mt-2 space-y-1 text-sm">{g.items?.map((i) => <li key={i.href}><Link href={i.href} className="text-accent">{i.label}</Link></li>)}</ul>
            </div>
          ))}
          <div>
            <h2 className="font-ui font-medium">Contact & Legal</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {[["Start a Project", "/start-project"], ["Privacy", "/legal/privacy"], ["Terms of Use", "/legal/terms-of-use"], ["Cookies", "/legal/cookies"], ["AI Disclaimer", "/legal/ai-disclaimer"], ["Data Rights", "/legal/data-rights"], ["Legal Notices", "/legal/contact"], ["Legal Centre", "/legal"], ["Accessibility", "/legal/accessibility"]].map(([l, h]) => <li key={h}><Link href={h} className="text-accent">{l}</Link></li>)}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
