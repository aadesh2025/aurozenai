"use client";
import { useState, FormEvent } from "react";

const input = "w-full rounded-md border border-line bg-surface-2 px-3.5 py-3 text-base sm:text-sm focus:border-violet";
const label = "mb-1 block text-sm font-medium";

export function SimpleForm({ form, messageLabel = "Message", done = "Thank you. We have received your message and will reply by email." }: { form: string; messageLabel?: string; done?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ form, ...data }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error ?? "Something went wrong");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error");
      setState("error");
    }
  }
  if (state === "done") return <p className="rounded-lg border border-accent/40 bg-surface-2 p-6">{done}</p>;
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="name" className={label}>Name *</label><input id="name" name="name" required className={input} /></div>
        <div><label htmlFor="email" className={label}>Email *</label><input id="email" name="email" type="email" required className={input} /></div>
      </div>
      <div><label htmlFor="message" className={label}>{messageLabel} *</label><textarea id="message" name="message" required rows={5} className={input} /></div>
      <p className="text-xs text-muted">We use this only to respond to you. See our Privacy Policy. Please do not include confidential or sensitive data.</p>
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button disabled={state === "sending"} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
