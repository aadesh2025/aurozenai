import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content";
import { FinalCta, Hero, Section } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function Project({ params }: P) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Hero title={p.title} text={p.summary} trail={[["Our Work", "/work"], [p.title]]} />
      <Section>
        <p className="mb-8 rounded-lg border border-ink/15 bg-surface-2 p-4 text-sm"><strong>{p.status}.</strong> {p.data}</p>
        <div className="space-y-6">
          {p.sections.map((s) => (
            <div key={s.title}><h2 className="text-xl font-semibold">{s.title}</h2><p className="mt-1 text-muted">{s.text}</p></div>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
