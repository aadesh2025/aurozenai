import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_GROUPS } from "@/lib/content";
import { Hero, Section } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = { alternates: { canonical: "/resources/faq" }, description: "Answers about AUROZEN AI services: consulting, audits, automation, agents, RAG, voice, integrations, delivery, security, and support.", title: "FAQs" };

export default function Page() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_GROUPS.flatMap((g) => g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))) }} />
      <Hero title="Frequently Asked Questions" trail={[["Insights"], ["FAQs"]]} />
      <Section>
        <div className="space-y-8">
          {FAQ_GROUPS.map((g) => (
            <div key={g.group}>
              <h2 className="font-ui text-xl font-medium capitalize">{g.group}</h2>
              {g.items.map((i) => (
                <details key={i.q} className="mt-3 rounded-lg border border-line bg-surface-2 p-4">
                  <summary className="cursor-pointer font-medium">{i.q}</summary>
                  <p className="mt-2 text-sm text-muted">{i.a} <Link href={g.link} className="text-accent">Learn more →</Link></p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
