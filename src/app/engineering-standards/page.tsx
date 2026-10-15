import type { Metadata } from "next";
import { FinalCta, Hero, Section } from "@/components/ui";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { title: "Engineering & Delivery Standards" };

// TODO: confirm each practice reflects how you actually work before launch.
const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  { title: "Before we build", items: [
    { q: "Requirements documentation", a: "What the system must do, what it must not do, who uses it, and how we will know it works. Written down and agreed." },
    { q: "Architecture design", a: "Components, data flows, permissions, and failure behavior sketched and reviewed before implementation." },
  ] },
  { title: "While we build", items: [
    { q: "Version control", a: "Code and configuration are kept in version control with a history of changes." },
    { q: "Environment separation", a: "Development, testing, and production are kept apart so experiments do not touch live data." },
    { q: "Secrets management", a: "Keys and passwords live in environment configuration, never in code or documents." },
    { q: "Access controls", a: "Least-privilege access to client systems, granted for the project and removed afterwards." },
    { q: "Error handling", a: "Retries, timeouts, fallbacks, and clear alerts for the failures we can anticipate." },
  ] },
  { title: "Before and after release", items: [
    { q: "Testing", a: "Normal cases, edge cases, and failure scenarios, with results recorded against agreed criteria." },
    { q: "Deployment procedures", a: "A written release process and a way to roll back." },
    { q: "Documentation", a: "How it works, how to operate it, and what its limits are." },
    { q: "Monitoring", a: "Logs and checks appropriate to the system so problems are noticed." },
    { q: "Maintenance", a: "Agreed support covers fixes and upstream changes; new features are scoped separately." },
  ] },
];

export default function Page() {
  return (
    <>
      <Hero title="The practices behind the work." text="What we aim to do on every project. We make no certification claims; these are working practices." trail={[["Our Work"], ["Engineering Standards"]]} />
      {GROUPS.map((g, i) => (
        <Section key={g.title} dark={i === 1} title={g.title}><FaqList items={g.items} /></Section>
      ))}
      <FinalCta />
    </>
  );
}
