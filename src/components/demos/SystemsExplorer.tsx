"use client";
import Link from "next/link";
import { useState } from "react";

type Node = { id: string; label: string; x: number; y: number; text: string; apps: string[]; href: string; links: string[] };

const NODES: Node[] = [
  { id: "agents", label: "AI Agents", x: 130, y: 60, text: "Models that decide steps and call approved tools, with human approval for higher-risk actions.", apps: ["Lead qualification", "Support triage", "Research assistant"], href: "/services/ai-agents", links: ["rag", "crm", "auto"] },
  { id: "rag", label: "Knowledge / RAG", x: 130, y: 210, text: "Your documents prepared for retrieval so answers can cite sources.", apps: ["Policy search", "Product documentation", "Internal assistant"], href: "/services/rag-knowledge-systems", links: ["agents", "voice"] },
  { id: "voice", label: "Voice Agents", x: 360, y: 20, text: "Speech in, speech out, connected to scheduling and CRM with human handoff.", apps: ["Inbound calls", "Appointments", "Call routing"], href: "/services/ai-voice-agents", links: ["rag", "crm"] },
  { id: "auto", label: "Automation", x: 360, y: 250, text: "Multi-step workflows across your tools, with failure handling.", apps: ["Form to CRM", "Document processing", "Notifications"], href: "/services/ai-automation", links: ["agents", "crm", "mon"] },
  { id: "crm", label: "CRM & APIs", x: 590, y: 90, text: "Your existing business systems, connected where an API and access exist.", apps: ["CRM updates", "Database reads", "Internal apps"], href: "/services/ai-integration", links: ["agents", "voice", "auto"] },
  { id: "mon", label: "Monitoring", x: 590, y: 220, text: "Logs, evaluation, and error analysis so behavior stays visible after launch.", apps: ["Error analysis", "Quality review", "Usage tracking"], href: "/services/ai-support-maintenance", links: ["auto"] },
];
const CX = 360, CY = 140;

export function SystemsExplorer() {
  const [sel, setSel] = useState("agents");
  const cur = NODES.find((n) => n.id === sel)!;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <svg viewBox="0 0 760 320" className="w-full rounded-xl border border-ink/10 bg-paper" role="group" aria-label="Interactive system diagram. Select a component.">
        {NODES.map((n) => (
          <line key={n.id} x1={CX} y1={CY} x2={n.x + 60} y2={n.y + 20} stroke={n.id === sel || cur.links.includes(n.id) ? "#4CD9E8" : "#ffffff22"} strokeWidth={n.id === sel ? 2 : 1.2} className={cur.links.includes(n.id) || n.id === sel ? "flow" : ""} />
        ))}
        <rect x={CX - 70} y={CY - 28} width="140" height="56" rx="10" fill="#1C1C22" stroke="#7B5CFF" strokeWidth="2" />
        <text x={CX} y={CY + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">Your business</text>
        {NODES.map((n) => {
          const on = n.id === sel, rel = cur.links.includes(n.id);
          return (
            <g key={n.id} role="button" tabIndex={0} aria-pressed={on} aria-label={n.label} onClick={() => setSel(n.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(n.id))} className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-white">
              <rect x={n.x} y={n.y} width="120" height="40" rx="8" fill={on ? "#7B5CFF" : "#14141a"} stroke={rel ? "#4CD9E8" : "#ffffff33"} strokeWidth={rel ? 2 : 1} />
              <text x={n.x + 60} y={n.y + 25} textAnchor="middle" fill="#fff" fontSize="12">{n.label}</text>
            </g>
          );
        })}
      </svg>
      <div className="rounded-xl border border-ink/10 bg-ink/5 p-6" aria-live="polite">
        <p className="font-mono text-xs text-accent">Illustrative architecture</p>
        <h3 className="mt-1 text-2xl font-semibold">{cur.label}</h3>
        <p className="mt-2 text-sm text-ink/70">{cur.text}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink/70">{cur.apps.map((a) => <li key={a}>{a}</li>)}</ul>
        <p className="mt-4 text-xs text-ink/50">Connected: {cur.links.map((l) => NODES.find((n) => n.id === l)!.label).join(", ")}</p>
        <Link href={cur.href} className="mt-5 inline-block rounded-md bg-violet px-4 py-2 text-sm text-white">View service →</Link>
      </div>
    </div>
  );
}
