import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";
import { Container, FinalCta, Hero, Related } from "@/components/ui";
import { Toc } from "@/components/Toc";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.intro } : {};
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function Article({ params }: P) {
  const { slug } = await params;
  const i = ARTICLES.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const a = ARTICLES[i];
  const next = ARTICLES[(i + 1) % ARTICLES.length];
  const words = a.body.flatMap((b) => b.p).join(" ").split(/\s+/).length;
  return (
    <>
      <Hero title={a.title} text={a.intro} trail={[["Insights", "/insights"], [a.category]]}>
        <span className="text-sm text-muted">{Math.max(2, Math.round(words / 200))} min read · Published by AUROZEN AI</span>
      </Hero>
      <Container className="grid gap-12 pb-20 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Toc items={a.body.map((b) => ({ id: slugify(b.h), label: b.h }))} />
        <article className="max-w-2xl">
          <div className="card mb-12 p-6">
            <h2 className="font-ui text-sm font-medium text-muted">Key takeaways</h2>
            <ul className="mt-3 space-y-2 text-[15px]">{a.takeaways.map((t) => <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>)}</ul>
          </div>
          <div className="space-y-12">
            {a.body.map((b) => (
              <section key={b.h} id={slugify(b.h)} className="scroll-mt-28">
                <h2 className="text-3xl leading-tight md:text-4xl">{b.h}</h2>
                <div className="mt-4 space-y-4 text-[17px] leading-[1.75] text-ink/85">{b.p.map((p) => <p key={p}>{p}</p>)}</div>
              </section>
            ))}
          </div>
          <Link href={`/insights/${next.slug}`} className="card mt-16 block p-6">
            <span className="text-sm text-muted">Next article</span>
            <span className="mt-1 block font-display text-2xl">{next.title}</span>
          </Link>
        </article>
      </Container>
      <Related slugs={a.related} />
      <FinalCta />
    </>
  );
}
