"use client";
import { useState } from "react";

const DOCS = [
  { id: "returns", title: "Returns Policy (sample)", text: "Items can be returned within 30 days of delivery in original condition. Refunds are issued to the original payment method within 7 business days." },
  { id: "ship", title: "Shipping Guide (sample)", text: "Standard shipping takes 3 to 5 business days. Express shipping takes 1 to 2 business days. International orders may take longer." },
  { id: "warranty", title: "Warranty Terms (sample)", text: "Electronics carry a 12-month limited warranty covering manufacturing defects. Accidental damage is not covered." },
];
const STOP = new Set(["the", "a", "is", "of", "to", "do", "i", "my", "how", "what", "can", "are", "in", "for", "and", "long", "does", "take"]);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
const SAMPLES = ["How long do I have to return an item?", "How long does express shipping take?", "Do you offer gift cards?"];

export function RagExplorer() {
  const [q, setQ] = useState("");
  const [ran, setRan] = useState("");
  const qs = new Set(words(ran));
  const scored = DOCS.map((d) => ({ d, score: words(d.text + " " + d.title).filter((w) => qs.has(w)).length })).sort((a, b) => b.score - a.score);
  const hits = scored.filter((s) => s.score >= 2);
  const best = hits[0];
  const answerSentence = best ? best.d.text.split(". ").map((s) => ({ s, k: words(s).filter((w) => qs.has(w)).length })).sort((a, b) => b.k - a.k)[0].s.replace(/\.?$/, ".") : "";
  const PIPE = ["Source documents", "Chunking + metadata", "Search + retrieval", "Context assembly", "Answer + sources", "Human check where needed"];

  return (
    <div className="space-y-6">
      <ol className="flex flex-wrap gap-2 text-xs">{PIPE.map((p, i) => <li key={p} className="rounded-full border border-line bg-surface-2 px-3 py-1"><span className="font-mono text-accent">{i + 1}</span> {p}</li>)}</ol>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold">Sample knowledge base (fictional)</h3>
          <ul className="space-y-2">{DOCS.map((d) => <li key={d.id} className="rounded-lg border border-line bg-surface-2 p-3 text-sm"><b>{d.title}</b><p className="text-muted">{d.text}</p></li>)}</ul>
        </div>
        <div>
          <form onSubmit={(e) => { e.preventDefault(); setRan(q); }} className="flex gap-2">
            <label htmlFor="rq" className="sr-only">Question</label>
            <input id="rq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about the sample documents" className="flex-1 rounded-md border border-line bg-surface-2 px-3.5 py-3 text-base sm:text-sm" />
            <button className="rounded-md bg-violet px-4 py-2 text-sm text-white">Ask</button>
          </form>
          <div className="mt-2 flex flex-wrap gap-2">{SAMPLES.map((s) => <button key={s} onClick={() => { setQ(s); setRan(s); }} className="rounded-full border border-line px-3 py-1 text-xs">{s}</button>)}</div>
          {ran && (
            <div className="mt-4 rounded-xl theme-dark p-5 text-sm text-ink" aria-live="polite">
              <p className="font-mono text-xs text-accent">Demonstration. Keyword matching on local sample text; no model is called.</p>
              <p className="mt-3 font-medium">Retrieved passages</p>
              {hits.length ? hits.map((h) => <p key={h.d.id} className="mt-1 text-ink/70">“{h.d.text}” <span className="text-ink/40">({h.d.title})</span></p>) : <p className="text-ink/60">No passage matched.</p>}
              <p className="mt-3 font-medium">Answer</p>
              {best ? <p className="text-ink/80">{answerSentence} <span className="text-accent">[Source: {best.d.title}]</span></p> : <p className="text-ink/80">The sample documents do not contain this information. A real system should say so and offer a human follow-up instead of guessing.</p>}
              {best && <p className="mt-2 text-xs text-ink/50">Even with sources, important answers should be verified.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
