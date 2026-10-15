import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { LogoMark } from "./Logo";

const LEGAL = [
  ["Privacy", "/legal/privacy"],
  ["Terms", "/legal/terms-of-use"],
  ["Cookies", "/legal/cookies"],
  ["AI Disclaimer", "/legal/ai-disclaimer"],
  ["Data Rights", "/legal/data-rights"],
  ["Legal Notices", "/legal/contact"],
  ["Accessibility", "/legal/accessibility"],
  ["Sitemap", "/sitemap"],
];

export function Footer() {
  return (
    <footer className="px-2 pb-2 pt-3 md:px-4 md:pb-4">
      <div className="theme-dark noise relative overflow-hidden rounded-[32px] md:rounded-[44px]">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 pb-12 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <p className="max-w-xs font-display text-3xl leading-tight text-ink">Intelligent systems, engineered to fit your business.</p>
              <a href={`mailto:${SITE.email}`} className="mt-6 block text-sm text-ink/80 hover:text-ink">{SITE.email}</a>
              <Link href="/start-project" className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">Start a project</Link>
            </div>
            {NAV.filter((g) => ["Services", "Industries", "Company"].includes(g.label)).map((g) => (
              <div key={g.label}>
                <h2 className="font-ui text-sm font-medium text-ink">{g.label}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {g.items?.map((i) => (
                    <li key={i.href}><Link href={i.href} className="text-ink/60 transition-colors hover:text-ink">{i.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div aria-hidden className="flex select-none items-end gap-4 overflow-hidden border-t border-line pt-8 text-ink">
            <LogoMark size={96} />
            <span className="font-display text-[clamp(3rem,13vw,10rem)] leading-[0.8] tracking-tight text-ink/90">Aurozen<span className="text-ink/35">AI</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-ink/40">
            <span>© AUROZEN AI. All rights reserved.</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map(([l, h]) => (<li key={h}><Link href={h} className="hover:text-ink">{l}</Link></li>))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
