import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { FooterCols } from "./FooterCols";

const COLS: { title: string; links: [string, string][] }[] = [
  { title: "Pages", links: [["Home", "/"], ["About", "/company/about"], ["Our Work", "/work"], ["Insights", "/insights"], ["Partner With Us", "/partners"], ["Contact", "/contact"]] },
  { title: "Services", links: [["AI Consulting", "/services/ai-consulting"], ["AI Auditing", "/services/ai-audit"], ["AI Automation", "/services/ai-automation"], ["AI Agents", "/services/ai-agents"], ["AI Chatbots", "/services/ai-chatbots"], ["Voice Agents", "/services/ai-voice-agents"]] },
  { title: "Company", links: [["Our Approach", "/company/approach"], ["How We Work", "/company/how-we-work"], ["VICERO", "/products/vicero"], ["Client Support", "/support"], ["Book a Consultation", "/book-consultation"], ["Talk with me", SITE.calProfile]] },
  { title: "Industries", links: [["Professional Services", "/industries/professional-services"], ["Healthcare & Clinics", "/industries/healthcare"], ["E-commerce & Retail", "/industries/ecommerce"], ["Real Estate", "/industries/real-estate"], ["Small Businesses", "/industries/smbs"]] },
];

const LEGAL: [string, string][] = [["Privacy Policy", "/legal/privacy"], ["Terms of Use", "/legal/terms-of-use"], ["Cookie Policy", "/legal/cookies"], ["AI Disclaimer", "/legal/ai-disclaimer"], ["Data Rights", "/legal/data-rights"], ["Legal Notices", "/legal/contact"], ["Accessibility", "/legal/accessibility"], ["Legal Centre", "/legal"], ["Sitemap", "/sitemap"]];

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-6 pt-12 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <Logo size={36} />
            <p className="mt-6 max-w-xs text-base text-ink/55">Engineering intelligent systems for business growth.</p>
            <a href={`mailto:${SITE.email}`} className="mt-5 block text-base text-ink/80 transition-colors hover:text-ink">{SITE.email}</a>
                      </div>
          <FooterCols cols={COLS} />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-14">
        <div className="border-t border-line py-6">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
            {LEGAL.map(([l, h]) => (<li key={h}><Link href={h} className="text-ink/65 transition-colors hover:text-ink">{l}</Link></li>))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/45">
            <span>© {SITE.name}. All rights reserved.</span>
            <span className="flex items-center gap-2 font-mono text-[13px]"><span className="h-2 w-2 rounded-full bg-violet" />Systems answering, right now</span>
          </div>
        </div>
      </div>

      <div aria-hidden className="select-none overflow-hidden px-1 pb-3 pt-2 text-center">
        <span className="block bg-gradient-to-b from-ink/30 to-ink/[0.06] bg-clip-text font-sans text-[clamp(3.5rem,16.5vw,16rem)] font-bold leading-[1] tracking-[-0.05em] text-transparent">
          AUROZENAI
        </span>
      </div>
    </footer>
  );
}
