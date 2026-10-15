"use client";
import Image from "next/image";
import { useState } from "react";

const TABS = [
  { id: "inbox", label: "Inbox", text: "A customer asks about delivery, the agent answers, and a person from the team can step in with the whole conversation in front of them.", alt: "VICERO inbox with a customer conversation, the agent's reply, and a team member taking over" },
  { id: "conversations", label: "Conversations", text: "Every conversation across the website widget, WhatsApp and Instagram in one list.", alt: "List of recent conversations across channels" },
  { id: "contacts", label: "Customers", text: "A light CRM of who has been in touch, on which channel, and what stage they are at.", alt: "Customer list with channel, stage, and last activity" },
  { id: "knowledge", label: "Knowledge", text: "The documents and web pages the agent reads, with their indexing status.", alt: "Knowledge base with documents and indexing status" },
  { id: "analytics", label: "Analytics", text: "Conversations, resolution rate, response time, and cost over 30 days.", alt: "Analytics dashboard for the last 30 days" },
  { id: "workflow", label: "Automations", text: "A visual workflow: a refund request is checked, then approved by a person or handled automatically.", alt: "Workflow builder with an approval step" },
] as const;

export function ViceroTour() {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const t = TABS[i];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Product area" className="flex flex-wrap gap-2">
          {TABS.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`rounded-full border px-4 py-2 text-[15px] transition-colors ${i === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{x.label}</button>
          ))}
        </div>
        <div role="group" aria-label="Screenshot theme" className="flex rounded-full border border-line p-1 text-sm">
          {(["light", "dark"] as const).map((m) => (
            <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 capitalize ${mode === m ? "bg-ink text-paper" : "text-muted"}`}>{m}</button>
          ))}
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-[17px] text-muted" aria-live="polite">{t.text}</p>
      <div className="card mt-6 overflow-hidden p-2 sm:p-3">
        <div className="mb-2 flex items-center gap-1.5 px-2 pt-1" aria-hidden><span className="h-2.5 w-2.5 rounded-full bg-ink/15" /><span className="h-2.5 w-2.5 rounded-full bg-ink/15" /><span className="h-2.5 w-2.5 rounded-full bg-ink/15" /></div>
        <Image key={`${mode}-${t.id}`} src={`/vicero/${mode}/${t.id === "inbox" ? "inbox" : t.id}.png`} alt={t.alt} width={2160} height={1350} sizes="(min-width:1280px) 1180px, 100vw" className="reveal h-auto w-full rounded-xl border border-line" />
      </div>
      <p className="mt-3 text-sm text-muted">Screenshots of the real app with invented demo data (a fictional furniture shop). All people, numbers, and documents are made up.</p>
    </div>
  );
}
