import type { Metadata } from "next";
import { PRICING } from "@/lib/site";
import { Btn, FinalCta, Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "AI Audit Types" };

const AUDITS = [
  { n: "AI Readiness Audit", who: "Businesses deciding whether to adopt AI.", needs: "Process descriptions, system list, data overview.", examines: "Processes, data, systems, organizational readiness.", gets: "Findings, risks, and initial priorities.", out: "Implementation and certification." },
  { n: "AI Systems Audit", who: "Businesses running AI that is unreliable or unmonitored.", needs: "Access to the system, configs, and logs as agreed.", examines: "Architecture, integrations, data handling, reliability, latency, monitoring.", gets: "Risk findings and technical recommendations.", out: "Formal security certification or compliance sign-off." },
  { n: "AI Automation Opportunity Audit", who: "Businesses with many manual processes.", needs: "Walkthroughs of key processes and tools.", examines: "Candidate processes and feasibility.", gets: "A prioritized opportunity list and roadmap.", out: "Building the automations." },
];

export default function AuditTypes() {
  return (
    <>
      <Hero title="AI Audit Types" text="Choose the audit that fits your situation. Scope is defined per engagement." trail={[["Consulting & Auditing"], ["Audit Types"]]}>
        <Btn href="/start-project">Choose an Audit</Btn>
        {PRICING.audit && <span className="self-center font-mono text-sm text-accent">Starting at {PRICING.audit}</span>}
      </Hero>
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {AUDITS.map((a) => (
            <div key={a.n} className="card bg-surface-2 p-6 text-sm">
              <h2 className="font-display text-xl font-semibold">{a.n}</h2>
              <dl className="mt-4 space-y-3">
                {([["Who it is for", a.who], ["Information required", a.needs], ["What is examined", a.examines], ["What you receive", a.gets], ["Outside scope", a.out]] as const).map(([k, v]) => (
                  <div key={k}><dt className="font-medium">{k}</dt><dd className="text-muted">{v}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">An audit is not formal certification, regulatory approval, or a security guarantee. After the audit you can implement with AUROZEN, your own team, or another provider.</p>
      </Section>
      <FinalCta />
    </>
  );
}
