import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content";
import { FinalCta, Hero, Info, Split } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? { alternates: { canonical: `/work/${p.slug}` }, title: p.title, description: p.summary } : {};
}

export default async function Project({ params }: P) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Hero title={p.title} text={p.summary} trail={[["Our Work", "/work"], [p.title]]} />
      <Split
        aside={
          <>
            <div className="card p-7">
              <h2 className="font-ui text-xl font-medium">At a glance</h2>
              <dl className="mt-4 divide-y divide-line text-[16px]">
                {([["Status", p.status], ["Category", p.category], ["Data", p.data]] as const).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[90px_1fr] gap-3 py-3"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
            <Info title="How to read this" points={["It is a design or prototype, not a client result.", "No outcomes are claimed unless they were measured.", "Real projects are published with permission."]} />
          </>
        }
      >
        <div className="space-y-10">
          {p.sections.map((s, i) => (
            <section key={s.title} className="relative border-l border-line pl-8">
              <span aria-hidden className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-1 text-3xl leading-tight md:text-4xl">{s.title}</h2>
              <p className="mt-3 max-w-2xl text-[18px] leading-relaxed text-ink/85">{s.text}</p>
            </section>
          ))}
        </div>
      </Split>
      <FinalCta />
    </>
  );
}
