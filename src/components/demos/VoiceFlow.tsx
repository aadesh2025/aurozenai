"use client";
import { useState } from "react";

const SCENARIOS = [
  { id: "appt", label: "Appointment scheduling", steps: [
    ["Greeting", "Agent: “Thanks for calling. How can I help?”", "None"],
    ["Intent recognition", "Caller: “I need to book a visit next week.” → intent: book_appointment", "None"],
    ["Information collection", "Agent asks for name, preferred day, and contact number.", "None"],
    ["Business-system action", "Check calendar availability and create a booking.", "Calendar API"],
    ["Confirmation", "Agent reads back the booking details.", "None"],
    ["Human handoff", "If no slot fits or the caller asks for a person, transfer to staff.", "Call transfer"],
  ], fails: ["Caller speech misrecognized: ask to repeat, then hand off", "Calendar unavailable: take a message instead"] },
  { id: "lead", label: "Lead qualification", steps: [
    ["Greeting", "Agent introduces the business.", "None"],
    ["Intent recognition", "Caller describes a need → intent: sales_inquiry", "None"],
    ["Information collection", "Company, need, timeline, contact details.", "None"],
    ["Business-system action", "Create a lead record with a summary.", "CRM API"],
    ["Confirmation", "Agent confirms a follow-up.", "None"],
    ["Human handoff", "High-priority leads transferred to sales.", "Call transfer"],
  ], fails: ["Caller declines to share details: record what is given", "CRM write fails: log and alert staff"] },
  { id: "faq", label: "Customer FAQs", steps: [
    ["Greeting", "Standard welcome.", "None"],
    ["Intent recognition", "Question classified against known topics.", "None"],
    ["Information collection", "Clarify if ambiguous.", "None"],
    ["Business-system action", "Retrieve the approved answer from the knowledge base.", "Knowledge base"],
    ["Confirmation", "Ask whether the answer helped.", "None"],
    ["Human handoff", "Unknown topics are routed to a person.", "Call transfer"],
  ], fails: ["Topic not covered: say so and hand off", "Conflicting sources: escalate"] },
  { id: "route", label: "Call routing", steps: [
    ["Greeting", "Welcome and ask the reason for calling.", "None"],
    ["Intent recognition", "Classify: sales, support, billing, other.", "None"],
    ["Information collection", "Collect name and account reference if needed.", "None"],
    ["Business-system action", "Look up the right team and availability.", "Phone system"],
    ["Confirmation", "Tell the caller who they are being connected to.", "None"],
    ["Human handoff", "Transfer with a short summary.", "Call transfer"],
  ], fails: ["Team unavailable: offer voicemail or callback"] },
];

export function VoiceFlow() {
  const [id, setId] = useState("appt");
  const [i, setI] = useState(0);
  const s = SCENARIOS.find((x) => x.id === id)!;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Scenario">
        {SCENARIOS.map((x) => <button key={x.id} role="radio" aria-checked={id === x.id} onClick={() => { setId(x.id); setI(0); }} className={`rounded-full border px-4 py-1.5 text-sm ${id === x.id ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{x.label}</button>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <ol>{s.steps.map((st, k) => (
          <li key={st[0]}><button onClick={() => setI(k)} aria-current={k === i} className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${k === i ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{k + 1}. {st[0]}</button>{k < s.steps.length - 1 && <div className="mx-auto h-2 w-px bg-line" />}</li>
        ))}</ol>
        <div className="rounded-xl theme-dark p-6 text-ink" aria-live="polite">
          <p className="font-mono text-xs text-accent">Flow explorer. No call, microphone, or telephony provider is used.</p>
          <h3 className="mt-2 text-xl font-semibold">{s.steps[i][0]}</h3>
          <p className="mt-2 text-sm text-ink/80">{s.steps[i][1]}</p>
          <p className="mt-3 text-sm text-ink/60">Integration needed: {s.steps[i][2]}</p>
          <div className="mt-5 border-t border-ink/10 pt-4 text-sm text-ink/70"><b className="text-ink">Possible failure cases</b><ul className="list-disc pl-5">{s.fails.map((f) => <li key={f}>{f}</li>)}</ul></div>
        </div>
      </div>
    </div>
  );
}
