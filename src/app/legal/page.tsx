import type { Metadata } from "next";
import { Card, Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Legal Centre" };

const DOCS = [
  ["Privacy Policy", "/legal/privacy", "How we collect, use, and protect personal information."],
  ["Cookie Policy", "/legal/cookies", "What the website stores on your device."],
  ["Terms of Use", "/legal/terms-of-use", "Rules for using this website."],
  ["AI Use and Limitations", "/legal/ai-disclaimer", "What AI-generated content and demos can and cannot do."],
  ["Accessibility Statement", "/legal/accessibility", "Our accessibility aims and how to report problems."],
  ["Data Protection and Privacy Rights", "/legal/data-rights", "How to make a request about your personal information."],
  ["Contact and Legal Notices", "/legal/contact", "Who we are and where to send privacy and legal messages."],
  ["Data Processing Information", "/legal/data-processing", "How client data is handled in projects."],
];

export default function Page() {
  return (
    <>
      <Hero title="Legal Centre" text="Documents covering this website. Product and client-project terms are provided separately." trail={[["Legal"]]} />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{DOCS.map(([t, h, d]) => <Card key={h} href={h} title={t} text={d} />)}</div>
        <p className="mt-6 max-w-2xl text-sm text-muted">These pages are drafts pending legal review. They apply to the AUROZEN AI website only. VICERO and client engagements are covered by their own terms.</p>
      </Section>
    </>
  );
}
