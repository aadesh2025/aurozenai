"use client";
import Link from "next/link";
import { useState } from "react";
import { INTEGRATIONS } from "@/lib/content";

const Q = [
  { id: "industry", q: "What type of business do you operate?", o: ["Professional services", "Healthcare / clinic", "E-commerce / retail", "Real estate", "Other"] },
  { id: "size", q: "Business size?", o: ["Just me", "2–10", "11–50", "50+"] },
  { id: "usage", q: "Are you currently using AI?", o: ["No", "Experimenting", "Yes, in production"] },
  { id: "effort", q: "Which area consumes the most manual effort?", o: ["Customer questions", "Lead handling", "Documents and data entry", "Scheduling / calls", "Reporting"] },
  { id: "data", q: "Do you have structured business data?", o: ["Mostly in documents", "Mostly in a CRM/database", "A mix", "Not sure"] },
  { id: "systems", q: "How many software systems are involved?", o: ["1–2", "3–5", "6 or more"] },
  { id: "concern", q: "Biggest concern?", o: ["Accuracy", "Security / privacy", "Cost", "Integration effort", "Where to start"] },
];

function recommend(a: Record<string, string>) {
  const r = rec(a);
  const why: string[] = [];
  if (a.usage) why.push(`Current AI use: ${a.usage}`);
  if (a.effort) why.push(`Most manual effort: ${a.effort}`);
  if (a.systems) why.push(`Systems involved: ${a.systems}`);
  if (a.concern) why.push(`Main concern: ${a.concern}`);
  return { ...r, why: r.why, factors: why };
}

function rec(a: Record<string, string>) {
  if (a.usage === "Yes, in production") return { title: "AI Systems Audit", href: "/auditing/audit-types", why: "You already run AI; an audit examines reliability, integrations, and risk." };
  if (a.concern === "Where to start" || a.usage === "No") return { title: "AI Discovery consulting", href: "/consulting/levels", why: "Start with opportunities and a high-level roadmap." };
  if (a.effort === "Documents and data entry" || a.data === "Mostly in documents") return { title: "Knowledge-system discussion", href: "/services/rag-knowledge-systems", why: "Your information is document-heavy." };
  if (a.effort === "Scheduling / calls") return { title: "Voice agent discussion", href: "/services/ai-voice-agents", why: "Call and scheduling load suggests a voice workflow." };
  if (a.systems === "6 or more") return { title: "Strategy & Architecture consulting", href: "/consulting/levels", why: "Many systems call for an integration plan first." };
  return { title: "Automation Opportunity Audit", href: "/auditing/audit-types", why: "Rank your processes and pick the first project." };
}

export function Assessment() {
  const [a, setA] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  if (done) {
    const r = recommend(a);
    return (
      <div className="rounded-xl border border-accent/40 bg-surface-2 p-6">
        <p className="text-xs uppercase tracking-wide text-muted">Preliminary guidance</p>
        <h2 className="mt-1 text-2xl font-semibold">{r.title}</h2>
        <p className="mt-2 text-sm text-muted">{r.why} This is a quick guide, not a formal audit or definitive technical recommendation.</p>
        <p className="mt-4 text-xs font-medium">Answers that influenced this (simple rules, not machine learning):</p>
        <ul className="list-disc pl-5 text-xs text-muted">{r.factors.map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="mt-5 flex gap-3">
          <Link href={r.href} className="rounded-md bg-violet px-4 py-2 text-sm text-white">Learn more</Link>
          <Link href="/book-consultation" className="rounded-md border border-line px-4 py-2 text-sm">Book a consultation</Link>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
      {Q.map((q) => (
        <fieldset key={q.id}>
          <legend className="mb-2 font-medium">{q.q}</legend>
          <div className="flex flex-wrap gap-2">
            {q.o.map((o) => (
              <label key={o} className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${a[q.id] === o ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>
                <input type="radio" name={q.id} value={o} className="sr-only" onChange={() => setA({ ...a, [q.id]: o })} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button disabled={Object.keys(a).length < Q.length} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-40">See guidance</button>
    </form>
  );
}

const STATUS_STYLE: Record<string, string> = {
  Supported: "bg-accent/20 text-ink",
  "Requires technical validation": "bg-violet/15 text-ink",
  "Requires custom implementation": "bg-line text-ink",
  "Not currently supported": "bg-red-500/20 text-ink",
};

export function IntegrationDirectory() {
  const [s, setS] = useState("");
  const [cat, setCat] = useState("All");
  const q = s.toLowerCase();
  const groups = INTEGRATIONS.filter((g) => cat === "All" || g.category === cat)
    .map((g) => ({ ...g, items: g.items.filter((i) => (g.category + i.name + i.use).toLowerCase().includes(q)) }))
    .filter((g) => g.items.length);
  return (
    <div>
      <label htmlFor="isearch" className="mb-1 block text-sm font-medium">Search for your software</label>
      <input id="isearch" value={s} onChange={(e) => setS(e.target.value)} placeholder="e.g. CRM, n8n, Docker" className="w-full max-w-md rounded-md border border-line bg-surface-2 px-3 py-2.5 text-sm" />
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Category filter">
        {["All", ...INTEGRATIONS.map((g) => g.category)].map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.flatMap((g) => g.items.map((i) => (
          <div key={g.category + i.name} className="card bg-surface-2 p-5 text-sm">
            <div className="flex items-start justify-between gap-2"><h3 className="font-ui font-medium">{i.name}</h3><span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[i.status]}`}>{i.status}</span></div>
            <p className="mt-1 font-mono text-xs text-muted">{g.category}</p>
            <p className="mt-2 text-muted"><b className="text-ink">Use:</b> {i.use}</p>
            <p className="text-muted"><b className="text-ink">Needs:</b> {i.needs}</p>
          </div>
        )))}
        {!groups.length && <p className="text-sm text-muted">Not listed? Many tools with an API or webhook can be assessed. <Link href="/contact" className="text-accent underline">Request an integration</Link>.</p>}
      </div>
      <p className="mt-4 text-xs text-muted">Having a public API does not mean an integration exists. Each one is scoped and validated per project.</p>
    </div>
  );
}

export function ArticleSearch({ items }: { items: { slug: string; title: string; category: string; intro: string }[] }) {
  const [s, setS] = useState("");
  const list = items.filter((i) => (i.title + i.category + i.intro).toLowerCase().includes(s.toLowerCase()));
  return (
    <div>
      <label htmlFor="asearch" className="sr-only">Search articles</label>
      <input id="asearch" value={s} onChange={(e) => setS(e.target.value)} placeholder="Search articles" className="w-full max-w-md rounded-md border border-line bg-surface-2 px-3 py-2.5 text-sm" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((a) => (
          <Link key={a.slug} href={`/insights/${a.slug}`} className="card bg-surface-2 p-6 hover:border-violet">
            <span className="font-mono text-xs text-accent">{a.category}</span>
            <h3 className="mt-1 font-ui text-lg font-medium">{a.title}</h3>
            <p className="mt-2 text-sm text-muted">{a.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
