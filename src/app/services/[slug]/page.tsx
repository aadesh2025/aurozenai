import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService } from "@/lib/services";
import { PRICING, PHASES, SITE } from "@/lib/site";
import { Btn, Container, FinalCta, Hero, Related } from "@/components/ui";
import { Toc } from "@/components/Toc";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { AutomationBuilder } from "@/components/demos/AutomationBuilder";
import { AgentDemo } from "@/components/demos/AgentDemo";
import { RagExplorer } from "@/components/demos/RagExplorer";
import { VoiceFlow } from "@/components/demos/VoiceFlow";
import { VoiceDemo } from "@/components/demos/VoiceDemo";

type P = { params: Promise<{ slug: string }> };

const DEMOS: Record<string, [string, string, React.ReactNode]> = {
  "ai-automation": ["Build an example workflow", "A browser-only demonstrator. It does not connect to any account or send data.", <AutomationBuilder key="a" />],
  "ai-agents": ["See an agent handle a task", "Fictional leads and deterministic rules. No customer is contacted.", <AgentDemo key="b" />],
  "rag-knowledge-systems": ["From documents to answers", "Sample documents and local keyword matching. No model is called.", <RagExplorer key="c" />],
  "ai-voice-agents": ["Hear and explore a voice flow", "Spoken by your browser. No phone call or microphone is used.", <div key="d" className="space-y-12"><VoiceDemo /><VoiceFlow /></div>],
};

export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: s.name, description: s.short, alternates: { canonical: `/services/${s.slug}` }, openGraph: { title: s.name, description: s.short, url: `/services/${s.slug}` } } : {};
}

const H = ({ id, children, sub }: { id: string; children: React.ReactNode; sub?: string }) => (
  <div id={id} className="scroll-mt-28">
    <h2 className="text-4xl leading-tight md:text-5xl">{children}</h2>
    {sub && <p className="mt-3 max-w-xl text-muted">{sub}</p>}
  </div>
);

export default async function ServicePage({ params }: P) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const price = s.priceKey ? PRICING[s.priceKey] : null;
  const demo = DEMOS[s.slug];
  const toc = [
    { id: "problems", label: "Problems we solve" },
    { id: "approach", label: "How we approach it" },
    ...(demo ? [{ id: "demo", label: "Try it" }] : []),
    { id: "deliver", label: "What you receive" },
    { id: "process", label: "Delivery process" },
    { id: "faq", label: "Questions" },
  ];
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.short, serviceType: s.name, provider: { "@type": "Organization", name: "AUROZEN AI", url: SITE.url }, areaServed: ["US", "GB", "CA", "AU", "EU", "IN"], url: `${SITE.url}/services/${s.slug}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <JsonLd data={ld} />
      <Hero
        title={s.name}
        text={s.intro}
        trail={[["Services"], [s.name]]}
        aside={
          <aside className="card reveal p-7 [animation-delay:150ms]">
            <h2 className="font-ui text-sm font-medium text-muted">Best suited when</h2>
            <ul className="mt-4 space-y-3">
              {s.whenItFits.map((w) => (
                <li key={w} className="flex gap-3 text-[15px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{w}</li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">{s.caveat}</p>
          </aside>
        }
      >
        <Btn href="/start-project">{s.cta}</Btn>
        <Btn href="/book-consultation" ghost>Book a consultation</Btn>
        {price && <span className="font-mono text-sm text-accent">{s.name}: starting at {price}</span>}
      </Hero>

      <Container className="grid gap-12 pb-20 pt-6 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Toc items={toc} />
        <div className="min-w-0 space-y-24">
          <section>
            <H id="problems">Problems we solve</H>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.problems.map((p) => (
                <li key={p} className="card p-5 text-[15px]">{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <H id="approach" sub="The work, in the order it happens.">How we approach it</H>
            <ol className="relative mt-8 space-y-6 border-l border-line pl-8">
              {s.approach.map((a) => (
                <li key={a.title} className="relative">
                  <span aria-hidden className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-paper" />
                  <h3 className="text-xl font-medium">{a.title}</h3>
                  <p className="mt-1 max-w-xl text-muted">{a.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-2">
              {s.examples.map((e) => <span key={e} className="rounded-full border border-line px-3 py-1.5 text-sm text-muted">{e}</span>)}
            </div>
          </section>

          {demo && (
            <section className="-mx-5 md:mx-0">
              <div className="theme-dark noise overflow-hidden rounded-[28px] p-5 md:rounded-[36px] md:p-10">
                <H id="demo" sub={demo[1]}>{demo[0]}</H>
                <div className="mt-8">{demo[2]}</div>
              </div>
            </section>
          )}

          <section>
            <H id="deliver">What you receive</H>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="card p-6">
                <h3 className="font-ui text-lg">Deliverables</h3>
                <ul className="mt-3 space-y-2 text-[15px]">{s.deliverables.map((d) => <li key={d} className="flex gap-2"><span className="text-accent">✓</span>{d}</li>)}</ul>
              </div>
              <div className="card space-y-5 p-6 text-[15px]">
                <div><h3 className="font-ui text-lg">With your existing software</h3><p className="mt-1 text-muted">{s.integrations}</p></div>
                <div><h3 className="font-ui text-lg">Testing and deployment</h3><p className="mt-1 text-muted">{s.testing}</p></div>
                <div><h3 className="font-ui text-lg">Ongoing support</h3><p className="mt-1 text-muted">{s.support}</p></div>
              </div>
            </div>
          </section>

          <section>
            <H id="process" sub="The same eight phases on every project; the detail changes by service.">Delivery process</H>
            <ol className="mt-8 flex gap-3 overflow-x-auto pb-3">
              {PHASES.map((p, i) => (
                <li key={p.name} className="card w-48 shrink-0 p-4"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-1 font-medium">{p.name}</h3><p className="mt-1 text-xs leading-relaxed text-muted">{p.text}</p></li>
              ))}
            </ol>
          </section>

          <section>
            <H id="faq">Questions</H>
            <div className="mt-6"><FaqList items={s.faqs} /></div>
            <p className="mt-6 text-sm text-muted">{price ? "Final scope and proposal depend on your requirements." : "Scope is determined after discovery. Request a tailored proposal."} <Link href="/resources/faq" className="text-accent underline underline-offset-4">More FAQs</Link></p>
          </section>
        </div>
      </Container>

      <Related slugs={s.related} />
      <FinalCta label={s.cta} />
    </>
  );
}
