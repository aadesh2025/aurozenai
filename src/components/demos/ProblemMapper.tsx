"use client";
import Link from "next/link";
import { useState } from "react";

const RULES: { keys: string[]; slug: string; why: string }[] = [
  { keys: ["lead", "sales", "crm", "follow up", "inquiry", "enquiry"], slug: "ai-automation", why: "Lead handling is repetitive, rule-based work that spans tools." },
  { keys: ["support", "customer", "faq", "questions", "tickets", "chat"], slug: "ai-chatbots", why: "Repeated customer questions suit an assistant with human handoff." },
  { keys: ["document", "policy", "knowledge", "search", "pdf", "wiki", "find"], slug: "rag-knowledge-systems", why: "Information locked in documents suits retrieval with source citations." },
  { keys: ["call", "phone", "voice", "appointment", "booking", "schedule"], slug: "ai-voice-agents", why: "Phone and scheduling load suits a voice workflow with handoff." },
  { keys: ["integrate", "connect", "api", "software", "systems", "sync"], slug: "ai-integration", why: "Tools that do not talk to each other need an integration layer." },
  { keys: ["don't know", "dont know", "where to start", "unsure", "strategy", "should we"], slug: "ai-consulting", why: "When the first step is unclear, start with opportunities and a roadmap." },
  { keys: ["audit", "review", "existing", "risk", "unreliable", "wrong answers"], slug: "ai-audit", why: "An existing system with unclear reliability benefits from a structured audit." },
  { keys: ["agent", "autonomous", "tasks", "workflow", "automate", "manual", "repetitive", "data entry", "invoice"], slug: "ai-agents", why: "Defined tasks with approved tools suit an agent with approval checkpoints." },
];
const NAMES: Record<string, string> = {
  "ai-automation": "AI Automation", "ai-chatbots": "AI Chatbots", "rag-knowledge-systems": "RAG & Knowledge Systems", "ai-voice-agents": "AI Voice Agents",
  "ai-integration": "AI Integration", "ai-consulting": "AI Consulting", "ai-audit": "AI Auditing", "ai-agents": "AI Agents",
};
const EXAMPLES = ["Leads wait days for a reply", "Staff can't find answers in our documents", "We miss calls after hours", "We don't know where to start with AI"];

export function ProblemMapper() {
  const [text, setText] = useState("");
  const [ran, setRan] = useState("");
  const t = ran.toLowerCase();
  const found = RULES.map((r) => ({ r, hits: r.keys.filter((k) => t.includes(k)) })).filter((x) => x.hits.length).sort((a, b) => b.hits.length - a.hits.length).slice(0, 3);

  return (
    <div className="card p-5 sm:p-6">
      <form onSubmit={(e) => { e.preventDefault(); setRan(text); }}>
        <label htmlFor="pm" className="text-sm font-medium">What is slowing your business down?</label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input id="pm" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. we copy leads between tools by hand" className="flex-1 rounded-full border border-line bg-paper px-5 py-3 text-sm outline-none focus:border-accent" />
          <button className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">Find a fit</button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((e) => <button key={e} onClick={() => { setText(e); setRan(e); }} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink">{e}</button>)}
      </div>
      {ran && (
        <div className="mt-5 space-y-2" aria-live="polite">
          {found.length ? found.map(({ r, hits }) => (
            <Link key={r.slug} href={`/services/${r.slug}`} className="reveal group flex items-start justify-between gap-4 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-accent">
              <span>
                <span className="block text-sm font-medium">{NAMES[r.slug]}</span>
                <span className="mt-0.5 block text-sm text-muted">{r.why}</span>
                <span className="mt-1 block font-mono text-[11px] text-muted/70">matched: {hits.join(", ")}</span>
              </span>
              <span className="text-muted group-hover:text-accent">→</span>
            </Link>
          )) : (
            <p className="rounded-2xl border border-line bg-paper p-4 text-sm text-muted">No clear match from those words. <Link href="/assessment" className="text-accent underline">Take the readiness assessment</Link> or <Link href="/contact" className="text-accent underline">describe it to us</Link>.</p>
          )}
          <p className="text-xs text-muted">Simple keyword matching, not a recommendation or a formal assessment.</p>
        </div>
      )}
    </div>
  );
}
