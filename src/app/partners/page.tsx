import type { Metadata } from "next";
import Link from "next/link";
import { Btn, Hero, Section, Pill, Rail } from "@/components/ui";
import { CompensationDisclosure, RoleBrowser, RoleCard, RoleMatcher, Schedules } from "@/components/partners/PartnerHub";
import { FaqList } from "@/components/FaqList";
import { CalEmbed } from "@/components/CalEmbed";
import { SITE } from "@/lib/site";
import { ROLES } from "@/lib/partners";

export const metadata: Metadata = { alternates: { canonical: "/partners" },
  title: "Partner With Us",
  description: "Join AUROZEN AI as a sales partner, business developer, or AI specialist. Flexible, performance-based collaboration with transparent terms.",
};

const WHY = ["Work on practical AI and automation problems for real businesses", "Collaborate with people across business and technical disciplines", "Build experience through clearly scoped responsibilities", "Contribute remotely and flexibly where the role allows", "Show your reliability and results", "Possibly grow into a deeper long-term partnership"];
const STEPS = [["Apply", "Tell us your skills, availability, and expectations."], ["Review", "We read every application by hand."], ["Conversation", "We talk about the role, scope, and fit."], ["Agree terms", "Responsibilities and compensation are agreed in writing before work starts."], ["Start", "Onboarding with a clearly scoped first task."]];
const FAQ = [
  { q: "Is this a salaried job?", a: "AUROZEN AI offers different types of collaboration. Not every opportunity is salaried. Depending on the role, compensation may be commission-based, project-based, or another arrangement agreed in advance. Terms are explained before you commit." },
  { q: "Can college students apply?", a: "Yes. Students can apply for suitable opportunities based on skills, availability, and interests. Some roles accommodate limited weekly time; others need more." },
  { q: "Can homemakers apply?", a: "Yes. We welcome applications from homemakers and others seeking suitable flexible or remote collaboration. Suitability depends on the role's responsibilities and the arrangement agreed." },
  { q: "Can I work remotely?", a: "Many opportunities can be done remotely, depending on the specific role." },
  { q: "Do I need previous experience?", a: "It varies by role. Some suit beginners with relevant skills and a willingness to learn. Specialist and leadership roles need demonstrated experience." },
  { q: "Is sales commission guaranteed?", a: "No. Commission is earned under terms agreed in advance for an eligible sale. Rates, attribution, and payment conditions are documented before work begins." },
  { q: "Can I become a long-term business partner?", a: "Potentially. Contributors with strong results, reliability, leadership, and long-term commitment may be considered for deeper collaboration. It is discussed separately and is not guaranteed." },
  { q: "Is equity available?", a: "Potential equity or ownership may be discussed with exceptional long-term contributors if an appropriate arrangement becomes feasible. It is not guaranteed, not included with any role, and would need separate formal agreements and legal structuring." },
  { q: "Do I need to pay to apply?", a: "No. There is no application fee and no paid training or starter kit." },
];

export default function Page() {
  const featured = ROLES.filter((r) => r.status === "Open for applications").slice(0, 6);
  return (
    <>
      <Hero
        title="Build the next generation of intelligent business systems."
        text="Partner with AUROZEN AI to help businesses adopt AI, automate operations, and build smarter digital systems. We are putting together sales professionals, business partners, developers, and AI specialists."
        trail={[["Company"], ["Partner With Us"]]}
        aside={
          <div className="card p-7">
            <Pill>Honest status</Pill>
            <p className="mt-4 text-lg leading-snug">Flexible collaboration. Availability and compensation depend on the role, the agreed scope, and business needs.</p>
            <p className="mt-3 text-sm text-muted">No guaranteed salary, projects, or equity. No application fees, ever.</p>
          </div>
        }
      >
        <Btn href="#roles">Explore opportunities</Btn>
        <Btn href="/partners/apply" ghost>Apply to collaborate</Btn>
      </Hero>

      <Section title="Why work with AUROZEN AI" lede="An early-stage agency building an international client base. We would rather be clear about that than oversell it.">
        <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {WHY.map((w) => <li key={w} className="border-b border-line py-4 text-[15px] text-ink/85">{w}</li>)}
        </ul>
        <p className="mt-5 text-sm text-muted">We do not promise training, mentoring, clients, earnings, employment, or equity to every collaborator.</p>
      </Section>

      <Section dark id="roles" title="Find an opportunity" lede="Filter by type, level, working style, and how the role is paid. Not every role is an active vacancy: labels say which.">
        <RoleBrowser />
      </Section>

      <Section title="Where we need people first">
        <Rail>{featured.map((r) => <RoleCard key={r.slug} r={r} />)}</Rail>
      </Section>

      <Section dark title="Opportunities that fit different schedules" lede="Whether you are studying, managing things at home, freelancing, or building your career. We ask about your real skills and availability, nothing else.">
        <Schedules />
        <p className="mt-6 max-w-2xl text-sm text-muted">No degree is required where skills can be demonstrated. We do not assume suitability from age, gender, family situation, or student status.</p>
      </Section>

      <Section title="Find the right opportunity for you" lede="Six questions. Rule-based and transparent. Not a hiring decision.">
        <div className="max-w-3xl"><RoleMatcher /></div>
      </Section>

      <Section dark title="How collaboration is paid" lede="Early-stage means no one-size-fits-all salary. Here is exactly what to expect.">
        <CompensationDisclosure />
      </Section>

      <Section title="How it works">
        <ol className="grid gap-4 md:grid-cols-5">
          {STEPS.map(([t, d], i) => (<li key={t} className="card p-5"><span className="font-mono text-xs text-accent">{i + 1}</span><h3 className="mt-2 text-lg font-medium">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li>))}
        </ol>
        <p className="mt-5 max-w-2xl text-sm text-muted">Test tasks, if any, are short and non-commercial. Anything with real commercial value is agreed and compensated in advance.</p>
      </Section>

      <Section title="Questions">
        <div className="grid gap-10 md:grid-cols-[1fr_1.8fr]"><p className="max-w-xs text-muted">Still unsure? Apply and ask. We answer honestly.</p><FaqList items={FAQ} /></div>
      </Section>

      <Section id="book" title="Prefer to talk first?" lede="Book a 30-minute introductory conversation about partnership, sales collaboration, or working together.">
        <div className="max-w-4xl"><CalEmbed options={[{ label: "Business partnership discussion", mins: "30 min", url: SITE.cal.partner }]} title="Book a partnership conversation" /></div>
      </Section>

      <section className="px-2 pb-3 md:px-4">
        <div className="theme-dark noise relative overflow-hidden rounded-[32px] md:rounded-[44px]">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
            <h2 className="mx-auto max-w-2xl text-5xl leading-none md:text-7xl">Ready to contribute?</h2>
            <p className="mx-auto mt-5 max-w-md text-muted">Tell us what you can do. We will tell you honestly whether and how it could work.</p>
            <div className="mt-9 flex justify-center gap-3"><Btn href="/partners/apply">Apply to collaborate</Btn><Link href="#roles" className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-sm">Browse roles</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
