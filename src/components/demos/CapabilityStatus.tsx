"use client";
import { useState } from "react";

const DATA = {
  "Active today": { note: "Work we deliver now.", items: ["Website development", "Basic AI chatbots", "Simple AI integrations", "Basic business automations", "n8n workflows", "Practical AI solutions for small and medium businesses"] },
  "Project-dependent": { note: "Delivered where a project and the right skills line up. Scope and feasibility are confirmed first.", items: ["AI consulting and readiness assessments", "AI auditing", "AI agents with approval checkpoints", "RAG and knowledge systems", "Advanced workflow automation"] },
  "On the roadmap": { note: "Where we are heading. Not yet offered as a standard service.", items: ["AI voice agents in production", "Larger AI-powered business systems", "Broader integration coverage", "More of VICERO's capabilities"] },
} as const;

export function CapabilityStatus() {
  const keys = Object.keys(DATA) as (keyof typeof DATA)[];
  const [k, setK] = useState<keyof typeof DATA>(keys[0]);
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <div role="tablist" aria-label="Capability status" className="flex gap-2 md:flex-col">
        {keys.map((x) => (
          <button key={x} role="tab" aria-selected={k === x} onClick={() => setK(x)} className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${k === x ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{x}</button>
        ))}
      </div>
      <div key={k} className="reveal" role="tabpanel">
        <p className="mb-4 text-muted">{DATA[k].note}</p>
        <ul className="grid gap-3 sm:grid-cols-2">{DATA[k].items.map((i) => <li key={i} className="card p-5 text-[15px]">{i}</li>)}</ul>
      </div>
    </div>
  );
}
