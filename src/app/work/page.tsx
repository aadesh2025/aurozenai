import type { Metadata } from "next";
import { PROJECTS } from "@/lib/content";
import { Card, Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Our Work" };

export default function Work() {
  return (
    <>
      <Hero title="Our Work" text="Reference designs and prototypes. Each is labeled by status and data used. We do not publish invented client results." trail={[["Our Work"]]} />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <Card key={p.slug} href={`/work/${p.slug}`} title={`${p.title} (${p.status})`} text={`${p.category}. ${p.summary}`} />
          ))}
        </div>
      </Section>
    </>
  );
}
