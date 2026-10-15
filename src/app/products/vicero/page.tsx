import type { Metadata } from "next";
import Link from "next/link";
import { Btn, FinalCta, Hero, Section } from "@/components/ui";
import { SITE } from "@/lib/site";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { title: SITE.product.name, description: `${SITE.product.name} is AUROZEN AI's SaaS platform for building and running AI assistants.` };

export default function Page() {
  const app = SITE.product.appUrl;
  return (
    <>
      <Hero
        title={`${SITE.product.name}, our AI assistant platform.`}
        text="Build, configure, and run AI assistants without writing the plumbing yourself. When you need more than the standard product, our team builds around it."
        trail={[["Products"], [SITE.product.name]]}
        aside={
          <div className="theme-dark rounded-[28px] p-6">
            <div className="flex items-center gap-1.5" aria-hidden><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="ml-3 font-mono text-[11px] text-ink/40">{app?.replace("https://", "")}</span></div>
            <div className="mt-5 grid grid-cols-[120px_1fr] gap-4 text-sm">
              <ul className="space-y-1 text-ink/60">{["Assistants", "Knowledge", "Integrations", "Conversations"].map((x, i) => <li key={x} className={`rounded-lg px-3 py-2 ${i === 0 ? "bg-ink/10 text-ink" : ""}`}>{x}</li>)}</ul>
              <div className="space-y-2"><div className="rounded-xl border border-line p-3"><p className="text-xs text-ink/50">Assistant</p><p>Support assistant</p></div><div className="rounded-xl border border-line p-3"><p className="text-xs text-ink/50">Knowledge sources</p><p>FAQ · Product docs</p></div></div>
            </div>
            <p className="mt-4 text-xs text-ink/40">Illustration. Real screenshots to be added.</p>
          </div>
        }
      >
        {app && <Btn href={app}>Open {SITE.product.name}</Btn>}
        <Btn href="/book-consultation" ghost>Request a demonstration</Btn>
      </Hero>

      <Section title="What it is for" lede="Capability list pending confirmation against the live product. We will not present planned features as production-ready.">
        {/* TODO: list only capabilities that are live today; add real screenshots */}
        <div className="grid gap-4 md:grid-cols-3">
          {[["AI agents", "Assistants that answer and act within limits you set."], ["Knowledge bases", "Ground answers in your own content."], ["Chat and support", "Put assistants where your customers already are."], ["Integrations and webhooks", "Connect to the tools you use."], ["Workflow automation", "Trigger actions from conversations."], ["Your data, your control", "Settings for what the assistant can see and do."]].map(([h, p]) => (
            <div key={h} className="card p-6"><h3 className="text-lg font-medium">{h}</h3><p className="mt-2 text-sm text-muted">{p}</p></div>
          ))}
        </div>
      </Section>

      <Section dark title="Product or project?" lede="Use the platform as it is, or commission work around it.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-7"><h3 className="font-ui text-xl">Use it as provided</h3><p className="mt-2 text-muted">Sign up, configure, and run your assistant yourself.</p>{app && <Link href={app} className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Explore the platform</Link>}</div>
          <div className="card p-7"><h3 className="font-ui text-xl">Add AUROZEN AI on top</h3><p className="mt-2 text-muted">Configuration, knowledge-base setup, integrations, custom workflows, and ongoing support.</p><Link href="/products/custom-implementation" className="mt-5 inline-flex rounded-full border border-ink/20 px-5 py-2.5 text-sm">Custom implementation</Link></div>
        </div>
      </Section>

      <Section title="Questions">
        <div className="grid gap-10 md:grid-cols-[1fr_1.8fr]"><p className="max-w-xs text-muted">Ask us anything about the product.</p>
          <FaqList items={[{ q: `Is ${SITE.product.name} separate from AUROZEN AI services?`, a: "Yes. The product is its own application with its own terms. Our agency work can build around it." }, { q: "Can I try it before talking to you?", a: app ? "Yes, you can open the app directly." : "Contact us for access." }, { q: "Does it replace custom work?", a: "Sometimes. If the standard product fits, you may not need custom work." }]} />
        </div>
      </Section>
      <FinalCta title="Need more than the standard product?" label="Custom implementation" href="/products/custom-implementation" />
    </>
  );
}
