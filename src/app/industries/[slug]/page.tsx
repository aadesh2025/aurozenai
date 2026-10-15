import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/content";
import { EXTRA } from "@/lib/industry-extra";
import { SERVICES } from "@/lib/services";
import { Btn, Card, FinalCta, Hero, Related, Section } from "@/components/ui";
import { BeforeAfter } from "@/components/demos/BeforeAfter";
import { FaqList } from "@/components/FaqList";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => INDUSTRIES.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  return i ? { alternates: { canonical: `/industries/${i.slug}` }, title: `AI for ${i.name}`, description: i.intro } : {};
}

export default async function IndustryPage({ params }: P) {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) notFound();
  const x = EXTRA[i.slug];
  const others = INDUSTRIES.filter((o) => o.slug !== i.slug);
  return (
    <>
      <Hero
        title={`AI for ${i.name.toLowerCase()}`}
        text={i.intro}
        trail={[["Industries"], [i.name]]}
        aside={
          <div className="card p-7">
            <h2 className="font-ui text-sm font-medium text-muted">Common problems</h2>
            <ul className="mt-4 space-y-3">{i.problems.map((p) => <li key={p} className="flex gap-3 text-[15px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}</ul>
          </div>
        }
      >
        <Btn href="/start-project">Discuss your project</Btn>
        <Btn href="/assessment" ghost>Take the assessment</Btn>
      </Hero>

      {i.notice && (
        <Section>
          <p className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-[15px]">{i.notice}</p>
        </Section>
      )}

      {x && (
        <Section title="A day, with and without a system" lede="An illustrative scenario, not a client case. Switch the view and watch an example workflow run.">
          <BeforeAfter title={x.scenario.title} before={x.scenario.before} after={x.scenario.after} flow={x.flow} />
          <p className="mt-4 text-sm text-muted">{x.stackNote}</p>
        </Section>
      )}

      <Section dark title="Where AI can help" lede="Potential applications. Which ones make sense depends on your processes, data, and tools.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {i.uses.map((u) => (
            <div key={u} className="card p-6"><h3 className="text-lg font-medium">{u}</h3></div>
          ))}
        </div>
      </Section>

      <Section title="Integration and risk considerations">
        <ul className="grid border-t border-line md:grid-cols-3 md:gap-x-10">
          {i.considerations.map((c) => (
            <li key={c} className="border-b border-line py-5 text-[15px] text-ink/85 md:border-b-0 md:border-r md:pr-8 last:md:border-r-0">{c}</li>
          ))}
        </ul>
      </Section>

      <Section dark title="Services we would draw on">
        <div className="grid gap-4 md:grid-cols-3">
          {i.services.map((s) => { const v = SERVICES.find((y) => y.slug === s)!; return <Card key={s} href={`/services/${s}`} title={v.name} text={v.short} />; })}
        </div>
      </Section>

      {x && (
        <Section title="Questions">
          <div className="grid gap-10 md:grid-cols-[1fr_1.8fr]"><p className="max-w-xs text-muted">Specific to {i.name.toLowerCase()}. More in the <Link href="/resources/faq" className="text-accent underline underline-offset-4">FAQ</Link>.</p><FaqList items={x.faqs} /></div>
        </Section>
      )}

      <Section title="Other industries">
        <div className="flex flex-wrap gap-2">{others.map((o) => <Link key={o.slug} href={`/industries/${o.slug}`} className="rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">{o.name}</Link>)}</div>
      </Section>
      <Related slugs={["ai-consulting", "ai-automation", "ai-chatbots"]} />
      <FinalCta />
    </>
  );
}
