import type { Metadata } from "next";
import { FinalCta, Hero, PhaseStrip, Section } from "@/components/ui";

export const metadata: Metadata = { title: "How We Work" };

const STAGES = [
  ["Initial inquiry", "You describe the problem and desired outcome."],
  ["Discovery", "We gather requirements and understand the existing process."],
  ["Assessment", "Feasibility, risks, integrations, and approaches are evaluated."],
  ["Proposal", "Scope, deliverables, assumptions, and commercial terms are defined."],
  ["Architecture", "The solution design and implementation plan are established."],
  ["Development", "The agreed system is built and integrated."],
  ["Testing", "Functionality, reliability, and relevant safety requirements are evaluated."],
  ["Deployment", "The solution is deployed in the agreed environment."],
  ["Support", "Maintenance and support are provided under the agreed arrangement."],
];

export default function HowWeWork() {
  return (
    <>
      <Hero title="How We Work" text="The client journey from first inquiry to ongoing support." trail={[["Company"], ["How We Work"]]} />
      <Section title="Nine stages">
        <ol className="space-y-3">
          {STAGES.map(([t, d], i) => (
            <li key={t} className="flex gap-4 card bg-surface-2 p-5">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div><h2 className="font-display font-semibold">{t}</h2><p className="text-sm text-muted">{d}</p></div>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Delivery framework" dark><PhaseStrip /></Section>
      <Section title="Deployment, customization, and support">
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          <div><h3 className="font-semibold text-ink">Deployment</h3><p>Subject to feasibility, infrastructure, security, and access: AUROZEN-managed, client-managed cloud, client-owned servers, or hybrid, where we can support it.</p></div>
          <div><h3 className="font-semibold text-ink">Customization</h3><p>Configuration, integration, and substantial new development are distinguished in each proposal.</p></div>
          <div><h3 className="font-semibold text-ink">Monthly support</h3><p>Available as an engagement where appropriate. Not an automatic promise of unlimited maintenance.</p></div>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
