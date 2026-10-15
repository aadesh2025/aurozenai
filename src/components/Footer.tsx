import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const COLS: { title: string; links: [string, string][] }[] = [
  { title: "Pages", links: [["Home", "/"], ["About", "/company/about"], ["Our Work", "/work"], ["Insights", "/insights"], ["Partner With Us", "/partners"], ["Contact", "/contact"]] },
  { title: "Services", links: [["AI Consulting", "/services/ai-consulting"], ["AI Auditing", "/services/ai-audit"], ["AI Automation", "/services/ai-automation"], ["AI Agents", "/services/ai-agents"], ["AI Chatbots", "/services/ai-chatbots"], ["Voice Agents", "/services/ai-voice-agents"]] },
  { title: "Company", links: [["Our Approach", "/company/approach"], ["How We Work", "/company/how-we-work"], ["VICERO", "/products/vicero"], ["Client Support", "/support"], ["Book a Consultation", "/book-consultation"]] },
  { title: "Legal", links: [["Privacy Policy", "/legal/privacy"], ["Terms of Use", "/legal/terms-of-use"], ["Cookie Policy", "/legal/cookies"], ["AI Disclaimer", "/legal/ai-disclaimer"], ["Data Rights", "/legal/data-rights"], ["Accessibility", "/legal/accessibility"]] },
];

export function Footer() {
  return (
    <footer className="theme-dark relative mt-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <Logo size={36} />
            <p className="mt-6 max-w-xs text-base text-ink/55">Engineering intelligent systems for business growth.</p>
            <a href={`mailto:${SITE.email}`} className="mt-5 block text-base text-ink/80 transition-colors hover:text-ink">{SITE.email}</a>
                      </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <h2 className="font-ui text-base font-semibold text-ink">{c.title}</h2>
                <ul className="mt-5 space-y-3.5">
                  {c.links.map(([l, h]) => (
                    <li key={h}><Link href={h} className="text-[15px] text-ink/70 transition-colors hover:text-ink">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-5 text-sm text-ink/45">
          <span>© {SITE.name}. All rights reserved.</span>
          <span className="flex items-center gap-2 font-mono text-[13px]"><span className="h-2 w-2 rounded-full bg-violet" />Systems answering, right now</span>
        </div>
      </div>

      <div aria-hidden className="h-[min(11.5vw,13.5rem)] select-none overflow-hidden px-1 text-center">
        <span className="block bg-gradient-to-b from-ink/40 to-ink/[0.08] bg-clip-text font-sans text-[clamp(3.5rem,17.6vw,17rem)] font-bold leading-[0.84] tracking-[-0.05em] text-transparent">
          AUROZENAI
        </span>
      </div>
    </footer>
  );
}
