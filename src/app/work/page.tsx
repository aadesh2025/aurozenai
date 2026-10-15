import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/content";
import { Hero, Section } from "@/components/ui";
import { SpotLink } from "@/components/Spot";

export const metadata: Metadata = { title: "Our Work" };

export default function Work() {
  return (
    <>
      <Hero title="Reference designs and prototypes." text="Each piece is labeled by status and by the data it used. We do not publish invented client results." trail={[["Our Work"]]} />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <SpotLink key={p.slug} href={`/work/${p.slug}`} className="group flex flex-col p-8">
              <div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-line px-3 py-1 text-accent">{p.status}</span><span className="rounded-full border border-line px-3 py-1 text-muted">{p.category}</span></div>
              <h2 className="mt-5 text-3xl leading-tight md:text-4xl">{p.title}</h2>
              <p className="mt-3 text-[17px] text-muted">{p.summary}</p>
              <span className="mt-auto pt-8 text-muted transition-colors group-hover:text-accent">Read the write-up →</span>
            </SpotLink>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[16px] text-muted">Real client work will appear here with permission, including what was built, how it was tested, and what was measured. Meanwhile, see <Link href="/products/vicero" className="text-accent underline underline-offset-4">VICERO</Link>, our own product.</p>
      </Section>
    </>
  );
}
