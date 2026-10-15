import type { Metadata } from "next";
import { IntegrationDirectory } from "@/components/Interactive";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/technology-integrations" }, description: "Technologies and integrations AUROZEN AI works with, with honest status labels: supported, needs validation, custom, or unsupported.", title: "Technology & Integrations" };

export default function Page() {
  return (
    <>
      <Hero title="Technology & Integrations" text="Technologies organized by function. Integrations are scoped per project, not assumed to be prebuilt connectors." trail={[["Our Work"], ["Technology & Integrations"]]} />
      <Section><IntegrationDirectory /></Section>
      <Section title="For any integration, we clarify" dark>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink/70">
          <li>What can be connected and what data can move</li>
          <li>Possible workflows and required permissions</li>
          <li>Technical limitations</li>
          <li>How to request it: use the contact form</li>
        </ul>
      </Section>
    </>
  );
}
