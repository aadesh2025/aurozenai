"use client";
import Link from "next/link";
import { useState } from "react";

const LEVELS = [
  { id: "Discovery", for: "You are starting your AI journey.", rows: [["Primary objective", "Identify opportunities"], ["Business-process review", "Initial"], ["Technical analysis", "High-level"], ["Integration planning", "Initial"], ["Roadmap", "Initial priorities"], ["Final deliverable", "Discovery findings"]] },
  { id: "Strategy & Architecture", for: "You have defined opportunities and need a plan.", rows: [["Primary objective", "Develop an implementation plan"], ["Business-process review", "Detailed"], ["Technical analysis", "Architecture-level"], ["Integration planning", "Defined"], ["Roadmap", "Structured roadmap"], ["Final deliverable", "Strategy and architecture recommendations"]] },
  { id: "Advanced Systems", for: "You face complex multi-system, agent, or knowledge-system questions.", rows: [["Primary objective", "Resolve complex technical questions"], ["Business-process review", "Detailed, as required"], ["Technical analysis", "Advanced"], ["Integration planning", "Detailed"], ["Roadmap", "Technical implementation plan"], ["Final deliverable", "Advanced technical recommendations"]] },
];

export function LevelPicker() {
  const [i, setI] = useState(0);
  const L = LEVELS[i];
  return (
    <div>
      <div role="tablist" aria-label="Consulting level" className="grid gap-3 md:grid-cols-3">
        {LEVELS.map((l, k) => (
          <button key={l.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`card p-5 text-left transition-all ${i === k ? "!border-accent shadow-[0_18px_40px_-22px_var(--accent)]" : ""}`}>
            <span className="font-mono text-xs text-accent">Level {k + 1}</span>
            <span className="mt-1 block font-ui text-xl">{l.id}</span>
            <span className="mt-1 block text-sm text-muted">{l.for}</span>
          </button>
        ))}
      </div>
      <dl key={i} className="reveal mt-6 divide-y divide-line rounded-3xl border border-line bg-surface">
        {L.rows.map(([k, v]) => (<div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[240px_1fr]"><dt className="text-sm text-muted">{k}</dt><dd className="text-[15px]">{v}</dd></div>))}
      </dl>
      <p className="mt-4 text-sm text-muted">Not every engagement includes every item. <Link href="/book-consultation" className="text-accent underline underline-offset-4">Discuss which level fits</Link>.</p>
    </div>
  );
}
