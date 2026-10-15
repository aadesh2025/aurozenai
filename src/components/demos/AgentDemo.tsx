"use client";
import Link from "next/link";
import { useState } from "react";

const LEADS = [
  { id: "a", label: "Complete inquiry", msg: "Hi, I run a 20-person logistics firm. We want to automate invoice entry into our accounting system. Budget approved, want to start next month. — Priya, Director", extracted: { Company: "Logistics firm (20 staff)", Need: "Invoice automation", Timeline: "Next month", Authority: "Director" }, missing: [], verdict: "Qualified", action: "Route to sales for a discovery call", approval: true },
  { id: "b", label: "Vague inquiry", msg: "Interested in AI for my business. What can you do?", extracted: { Company: "Not stated", Need: "Unclear", Timeline: "Not stated", Authority: "Unknown" }, missing: ["Company", "Specific need", "Timeline"], verdict: "Needs more information", action: "Send a clarifying questions email", approval: true },
  { id: "c", label: "Out of scope", msg: "Can you guarantee our AI will give correct medical diagnoses to patients?", extracted: { Company: "Not stated", Need: "Clinical diagnosis", Timeline: "Not stated", Authority: "Unknown" }, missing: ["Company"], verdict: "Escalate to a person", action: "Flag for human review. Out of scope for an administrative assistant.", approval: true },
];

export function AgentDemo() {
  const [id, setId] = useState("a");
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState<boolean | null>(null);
  const l = LEADS.find((x) => x.id === id)!;
  const pick = (i: string) => { setId(i); setStep(0); setApproved(null); };
  const stages = ["Incoming lead", "Information extracted", "Missing information", "Qualification (rule-based)", "Suggested action", "Human approval"];
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="space-y-2" role="radiogroup" aria-label="Scenario">
        {LEADS.map((x) => (<button key={x.id} role="radio" aria-checked={id === x.id} onClick={() => pick(x.id)} className={`w-full rounded-lg border px-4 py-3 text-left text-sm ${id === x.id ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{x.label}</button>))}
      </div>
      <div className="rounded-xl theme-dark p-6 text-ink" aria-live="polite">
        <p className="font-mono text-xs text-accent">Demonstration with fictional data. No customer is contacted and no system is changed.</p>
        <ol className="mt-4 space-y-3">
          {stages.slice(0, step + 1).map((s, i) => (
            <li key={s} className="rounded-lg border border-ink/10 bg-ink/5 p-4 text-sm">
              <b>{i + 1}. {s}</b>
              <div className="mt-1 text-ink/70">
                {i === 0 && l.msg}
                {i === 1 && Object.entries(l.extracted).map(([k, v]) => <div key={k}><span className="text-ink/50">{k}:</span> {v}</div>)}
                {i === 2 && (l.missing.length ? l.missing.join(", ") : "Nothing critical missing.")}
                {i === 3 && l.verdict}
                {i === 4 && l.action}
                {i === 5 && (approved === null ? (<div className="flex gap-2"><button onClick={() => setApproved(true)} className="rounded bg-violet px-3 py-1">Approve</button><button onClick={() => setApproved(false)} className="rounded border border-ink/30 px-3 py-1">Reject</button></div>) : approved ? "Approved. (Simulated) action would now run." : "Rejected. Nothing happens.")}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          {step < stages.length - 1 && <button onClick={() => setStep(step + 1)} className="rounded-md bg-violet px-4 py-2 text-sm">Next step</button>}
          <button onClick={() => pick(id)} className="rounded-md border border-ink/30 px-4 py-2 text-sm">Restart</button>
          <Link href="/services/ai-integration" className="px-2 py-2 text-sm text-accent">How it connects to your systems →</Link>
        </div>
      </div>
    </div>
  );
}
