import Link from "next/link";
import { Container, Hero } from "./ui";
import { Toc } from "./Toc";
import { SITE } from "@/lib/site";

export type LegalSection = [heading: string, body: string | string[]];

const DOCS: [string, string][] = [
  ["Privacy Policy", "/legal/privacy"],
  ["Cookie Policy", "/legal/cookies"],
  ["Terms of Use", "/legal/terms-of-use"],
  ["AI Use and Limitations", "/legal/ai-disclaimer"],
  ["Data Rights", "/legal/data-rights"],
  ["Contact and Legal Notices", "/legal/contact"],
  ["Accessibility", "/legal/accessibility"],
  ["Data Processing", "/legal/data-processing"],
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// "todo" lists facts that must be confirmed before this page is final.
export function Legal({ title, intro, sections, todo }: { title: string; intro?: string; sections: LegalSection[]; todo?: string[] }) {
  return (
    <>
      <Hero title={title} text={intro} trail={[["Legal", "/legal"], [title]]} />
      <Container className="grid gap-10 pb-16 pt-4 lg:grid-cols-[210px_minmax(0,1fr)_300px] lg:gap-14">
        <Toc items={sections.map(([h]) => ({ id: slug(h), label: h }))} />

        <article className="min-w-0 max-w-3xl">
          <div className="card p-6">
            <p className="text-[16px]"><strong>Draft for legal review.</strong> Effective date: [TO BE SET ON PUBLICATION]. Last updated: [TO BE SET]. This page describes how the website works today and must be reviewed by a qualified lawyer before it is relied on.</p>
            {todo && todo.length > 0 && (
              <details className="mt-3"><summary className="cursor-pointer text-[15px] text-muted">Facts to confirm before publishing ({todo.length})</summary><ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-muted">{todo.map((t) => <li key={t}>{t}</li>)}</ul></details>
            )}
          </div>
          <div className="mt-10 space-y-10">
            {sections.map(([h, p]) => (
              <section key={h} id={slug(h)} className="scroll-mt-28">
                <h2 className="text-3xl leading-tight md:text-4xl">{h}</h2>
                <div className="mt-3 space-y-3 text-[17px] leading-[1.75] text-ink/85">{(Array.isArray(p) ? p : [p]).map((t) => <p key={t}>{t}</p>)}</div>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h2 className="font-ui text-lg font-medium">Legal Centre</h2>
            <ul className="mt-3 divide-y divide-line text-[15.5px]">
              {DOCS.map(([l, h]) => (
                <li key={h}><Link href={h} className="flex items-center justify-between py-2.5 text-ink/80 transition-colors hover:text-accent">{l}<span aria-hidden className="text-muted">→</span></Link></li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-ui text-lg font-medium">Questions?</h2>
            <p className="mt-2 text-[15.5px] text-muted">For privacy requests or legal notices, email us.</p>
            <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-[15.5px] text-accent underline underline-offset-4">{SITE.email}</a>
          </div>
        </aside>
      </Container>
    </>
  );
}
