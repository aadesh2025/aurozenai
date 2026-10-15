"use client";
import Link from "next/link";
import { useState } from "react";

const OPTIONS = {
  trigger: ["Website form submitted", "New CRM lead", "Incoming email", "Scheduled event"],
  step: ["Validate information", "Classify an inquiry", "Extract document fields", "Generate a summary", "Route a request"],
  action: ["Update a CRM", "Add a row to a spreadsheet", "Send an email notification", "Create a support ticket"],
  review: ["Human approval before action", "No approval step"],
} as const;
type Kind = keyof typeof OPTIONS;

const NEEDS: Record<string, string> = {
  "Website form submitted": "A form that can send a webhook or be polled.",
  "New CRM lead": "CRM API access with read permission.",
  "Incoming email": "Mailbox access via API or forwarding.",
  "Scheduled event": "A scheduler to start the run.",
  "Classify an inquiry": "Defined categories and example inputs.",
  "Extract document fields": "Sample documents and the target field list.",
  "Generate a summary": "Agreed summary format.",
  "Route a request": "Routing rules and owners.",
  "Validate information": "Validation rules.",
  "Update a CRM": "CRM write permission and field mapping.",
  "Add a row to a spreadsheet": "Sheet access and column layout.",
  "Send an email notification": "Sender configuration and recipient rules.",
  "Create a support ticket": "Ticketing system API access.",
};
const AI_STEPS = ["Classify an inquiry", "Extract document fields", "Generate a summary"];

export function AutomationBuilder() {
  const [trigger, setTrigger] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const [review, setReview] = useState<string>(OPTIONS.review[0]);

  const move = (i: number, d: number) => setSteps((s) => { const n = [...s]; const j = i + d; if (j < 0 || j >= n.length) return s; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const toggle = (s: string) => setSteps((x) => (x.includes(s) ? x.filter((y) => y !== s) : [...x, s]));
  const [at, setAt] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const reset = () => { setTrigger(""); setSteps([]); setAction(""); setReview(OPTIONS.review[0]); setAt(-1); setLog([]); };
  const flow = [trigger, ...steps, review.startsWith("Human") ? review : "", action].filter(Boolean);
  const SAMPLE: Record<string, string> = {
    "Website form submitted": "received form { name: 'Priya', need: 'invoice entry' }",
    "New CRM lead": "new lead #4821 from CRM",
    "Incoming email": "email from buyer@example.com",
    "Scheduled event": "timer fired 09:00",
    "Validate information": "required fields present: ok",
    "Classify an inquiry": "classified: sales_inquiry (high intent)",
    "Extract document fields": "extracted: invoice_no, total, due_date",
    "Generate a summary": "summary drafted (2 sentences)",
    "Route a request": "routed to: sales@",
    "Human approval before action": "paused: waiting for approval, approved",
    "Update a CRM": "CRM record updated (simulated)",
    "Add a row to a spreadsheet": "row appended (simulated)",
    "Send an email notification": "notification queued (simulated)",
    "Create a support ticket": "ticket #1093 created (simulated)",
  };
  const run = () => {
    setLog([]);
    flow.forEach((f, i) => {
      setTimeout(() => { setAt(i); setLog((l) => [...l, `${String(i + 1).padStart(2, "0")} ${f}: ${SAMPLE[f] ?? "done"}`]); }, i * 750);
    });
    setTimeout(() => { setAt(-1); setLog((l) => [...l, "run complete (simulation)"]); }, flow.length * 750);
  };
  const needs = [trigger, ...steps, action].filter((x) => NEEDS[x]).map((x) => NEEDS[x]);
  const usesAI = steps.some((s) => AI_STEPS.includes(s));

  const Group = ({ title, kind, current, set }: { title: string; kind: Kind; current: string; set: (v: string) => void }) => (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {OPTIONS[kind].map((o) => (
          <button type="button" key={o} aria-pressed={current === o} onClick={() => set(o)} className={`rounded-full border px-3 py-1.5 text-sm ${current === o ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{o}</button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <Group title="1. Trigger" kind="trigger" current={trigger} set={setTrigger} />
        <fieldset>
          <legend className="mb-2 text-sm font-medium">2. Processing steps (choose any, then reorder)</legend>
          <div className="flex flex-wrap gap-2">
            {OPTIONS.step.map((o) => (
              <button type="button" key={o} aria-pressed={steps.includes(o)} onClick={() => toggle(o)} className={`rounded-full border px-3 py-1.5 text-sm ${steps.includes(o) ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{o}</button>
            ))}
          </div>
        </fieldset>
        <Group title="3. Business-system action" kind="action" current={action} set={setAction} />
        <Group title="4. Oversight" kind="review" current={review} set={setReview} />
        <button onClick={reset} className="rounded-md border border-line px-4 py-2 text-sm">Reset</button>
      </div>
      <div className="rounded-xl theme-dark p-6 text-ink" aria-live="polite">
        <p className="font-mono text-xs text-accent">Demonstration only. Nothing is executed or sent.</p>
        {flow.length ? (
          <ol className="mt-4 space-y-2">
            {flow.map((f, i) => {
              const si = steps.indexOf(f);
              return (
                <li key={f + i} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${at === i ? "scale-[1.02] border-accent bg-accent/15" : "border-ink/10 bg-ink/5"}`}>
                  <span className="font-mono text-xs text-accent">{i + 1}</span><span className="flex-1">{f}</span>
                  {si >= 0 && (<><button aria-label={`Move ${f} up`} onClick={() => move(si, -1)} className="px-1">↑</button><button aria-label={`Move ${f} down`} onClick={() => move(si, 1)} className="px-1">↓</button><button aria-label={`Remove ${f}`} onClick={() => toggle(f)} className="px-1">✕</button></>)}
                </li>
              );
            })}
          </ol>
        ) : <p className="mt-4 text-sm text-ink/60">Pick a trigger to start building.</p>}
        {flow.length > 0 && <button onClick={run} className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-medium text-paper">▶ Run simulation</button>}
        {log.length > 0 && <pre className="mt-3 max-h-40 overflow-auto rounded-xl bg-ink/5 p-3 font-mono text-[11px] leading-relaxed text-ink/80">{log.join("\n")}</pre>}
        {flow.length > 0 && (
          <div className="mt-5 space-y-3 text-sm text-ink/70">
            <div><b className="text-ink">What this might require</b><ul className="list-disc pl-5">{needs.map((n) => <li key={n}>{n}</li>)}</ul></div>
            {usesAI && <p><b className="text-ink">AI note:</b> AI steps can be wrong; consider review for consequential actions.</p>}
            {!review.startsWith("Human") && action && <p><b className="text-ink">Consider:</b> a human approval step before external actions.</p>}
            <Link href="/start-project" className="inline-block rounded-md bg-violet px-4 py-2 text-white">Discuss implementing this</Link>
          </div>
        )}
      </div>
    </div>
  );
}
