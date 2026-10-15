import Link from "next/link";
import { Hero, Section } from "./ui";

export type LegalSection = [heading: string, body: string | string[]];

// "todo" lists facts that must be confirmed before this page is final.
export function Legal({ title, intro, sections, todo }: { title: string; intro?: string; sections: LegalSection[]; todo?: string[] }) {
  return (
    <>
      <Hero title={title} text={intro} trail={[["Legal", "/legal"], [title]]} />
      <Section>
        <div className="max-w-2xl space-y-6">
          <div className="rounded-lg border border-ink/15 bg-surface-2 p-4 text-sm">
            <p><strong>Draft for legal review.</strong> Effective date: [TO BE SET ON PUBLICATION]. Last updated: [TO BE SET]. This page describes how the website works today and must be reviewed by a qualified lawyer before it is relied on.</p>
            {todo && todo.length > 0 && (
              <details className="mt-2"><summary className="cursor-pointer text-muted">Facts to confirm before publishing ({todo.length})</summary><ul className="mt-2 list-disc pl-5 text-muted">{todo.map((t) => <li key={t}>{t}</li>)}</ul></details>
            )}
          </div>
          {sections.map(([h, p]) => (
            <div key={h}>
              <h2 className="text-xl font-semibold">{h}</h2>
              {(Array.isArray(p) ? p : [p]).map((t) => <p key={t} className="mt-2 text-sm text-muted">{t}</p>)}
            </div>
          ))}
          <p className="text-sm"><Link href="/legal" className="text-accent">← Legal Centre</Link></p>
        </div>
      </Section>
    </>
  );
}
