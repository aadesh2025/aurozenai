import type { Metadata } from "next";
import { FinalCta, Hero, PhaseStrip, Section, Container } from "@/components/ui";
import { Toc } from "@/components/Toc";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { alternates: { canonical: "/company/how-we-work" }, title: "How We Work", description: "The AUROZEN AI client journey from first inquiry to ongoing support." };

const STAGES = [
  ["Initial inquiry", "You describe the problem and the outcome you want.", "A short note or the project form is enough. We read it and reply with questions.", "A shared first understanding."],
  ["Discovery", "We gather requirements and understand how the work happens today.", "Interviews, process walk-throughs, and a look at the tools involved.", "A written problem statement and requirements."],
  ["Assessment", "Feasibility, risks, integrations, and possible approaches are evaluated.", "We check APIs, data quality, permissions, and volumes before promising anything.", "Findings and viable options."],
  ["Proposal", "Scope, deliverables, assumptions, and commercial terms are defined.", "Tailored to your project. No templated price lists.", "A proposal you can accept, change, or decline."],
  ["Architecture", "The solution design and implementation plan are established.", "Components, data flow, permissions, and a test plan.", "A design you sign off before building."],
  ["Development", "The agreed system is built and integrated.", "Regular updates and a working system in a test environment as early as possible.", "Working components."],
  ["Testing", "Functionality, reliability, and relevant safety requirements are evaluated.", "Normal cases, edge cases, failure scenarios, and your own real examples.", "Test results against agreed criteria."],
  ["Deployment", "The solution is deployed in the agreed environment.", "Release, handover, and documentation. Rollback plan in place.", "A live, documented system."],
  ["Support", "Maintenance and support are provided under the agreed arrangement.", "Fixes, monitoring, and upstream changes as agreed. New features are scoped separately.", "Ongoing reliability."],
] as const;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function HowWeWork() {
  return (
    <>
      <Hero title="From first message to ongoing support." text="The nine stages of a typical project. The detail changes by service; the order does not." trail={[["Company"], ["How We Work"]]} />
      <Container className="grid gap-12 pb-12 pt-4 lg:grid-cols-[210px_1fr] lg:gap-16">
        <Toc items={STAGES.map(([t]) => ({ id: slug(t), label: t }))} />
        <ol className="space-y-5">
          {STAGES.map(([t, what, how, out], i) => (
            <li key={t} id={slug(t)} className="card scroll-pop scroll-mt-28 p-7 md:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-3xl leading-tight md:text-4xl">{t}</h2>
              </div>
              <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-ink/90">{what}</p>
              <dl className="mt-6 grid gap-4 border-t border-line pt-5 md:grid-cols-2">
                <div><dt className="text-sm text-muted">What happens</dt><dd className="mt-1 text-[16.5px] text-ink/85">{how}</dd></div>
                <div><dt className="text-sm text-muted">You get</dt><dd className="mt-1 text-[16.5px] text-ink/85">{out}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </Container>

      <Section dark title="The delivery framework" lede="The same eight phases show up across every service page.">
        <PhaseStrip />
      </Section>

      <Section title="Deployment, customization, and support">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <p className="max-w-sm text-lg text-muted">Three things worth knowing before you start.</p>
          <FaqList items={[
            { q: "Where can the system run?", a: "In an agreed environment, subject to feasibility, infrastructure, security, and access: AUROZEN-managed, client-managed cloud, client-owned servers, or hybrid, where we can support it." },
            { q: "What counts as customization?", a: "We separate configuration, integration, and substantial new development in each proposal so the scope is never vague." },
            { q: "Is support included?", a: "Monthly support is available as an engagement where appropriate. It is not an automatic promise of unlimited maintenance." },
          ]} />
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
