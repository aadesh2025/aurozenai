import type { Metadata } from "next";
import { FinalCta, Hero, Section } from "@/components/ui";
import { DeploymentExplorer } from "@/components/demos/DeploymentExplorer";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { alternates: { canonical: "/company/approach" }, description: "How AUROZEN AI evaluates a problem and chooses technology: feasibility, build versus buy, integration, evaluation, deployment.", title: "Our Approach" };

const TOPICS = [
  { q: "Business-process analysis", a: "We map how the work happens today, who does it, how often, where it breaks, and what a good outcome looks like. The process is the unit of design, not the model." },
  { q: "Technical feasibility", a: "We check whether the data, access, and tooling support the idea: APIs, permissions, data quality, and volumes. Better to learn a blocker in week one than week six." },
  { q: "Build versus buy", a: "If an existing product fits, we say so. We build custom only where it gives you something a product cannot, or where integration needs it." },
  { q: "Model and platform selection", a: "Chosen on accuracy for your task, latency, cost, privacy requirements, and operational fit. We avoid committing to one provider for everything." },
  { q: "Integration strategy", a: "How the solution reaches your systems, with what permissions, and what happens when a connected service is slow or down." },
  { q: "Data and knowledge architecture", a: "Where information lives, how it is prepared, who may see what, and how it stays current." },
  { q: "Evaluation and testing", a: "A defined set of real questions or cases and agreed pass criteria before launch, plus failure scenarios. Re-run after meaningful changes." },
  { q: "Deployment and monitoring", a: "Where it runs, how releases happen, what is logged, and who looks at it afterwards." },
];

export default function Approach() {
  return (
    <>
      <Hero title="How we decide what to build, and how." text="Our approach to evaluating a problem and choosing technology. Open each topic to see what it means in practice." trail={[["Company"], ["Our Approach"]]} />
      <Section title="Eight things we work through"><FaqList items={TOPICS} /></Section>
      <Section dark title="Deployment models" lede="Illustrative arrangements. What we can support depends on your project, infrastructure, and security needs.">
        <DeploymentExplorer />
      </Section>
      <FinalCta />
    </>
  );
}
