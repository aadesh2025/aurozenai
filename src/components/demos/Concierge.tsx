"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
const START: Msg = { role: "assistant", content: "Hi, I am the AUROZEN AI website assistant (an AI). Ask about our services, process, or VICERO." };
const SUGGEST = ["What can you automate?", "How does a project work?", "What is VICERO?"];

// Turn "/path" mentions into links
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\/[a-z][a-z0-9\-/]+)/g).map((p, i) =>
        /^\/[a-z]/.test(p) ? <Link key={i} href={p.replace(/[.,]$/, "")} className="text-accent underline underline-offset-2">{p}</Link> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([START]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy, open]);

  async function send(q: string) {
    if (!q.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next.slice(1) }) });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: j.reply ?? "Something went wrong. Try /contact." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "I could not reach the server. You can still use /contact." }]);
    }
    setBusy(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/25" role="dialog" aria-label="Website assistant">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div><p className="text-sm font-medium">AUROZEN assistant</p><p className="text-xs text-muted">AI. Answers from this website only.</p></div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-full p-2 text-muted hover:bg-ink/5">✕</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
                <p className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${m.role === "user" ? "bg-ink text-paper" : "bg-ink/[0.06]"}`}><Rich text={m.content} /></p>
              </div>
            ))}
            {busy && <p className="w-fit rounded-2xl bg-ink/[0.06] px-3.5 py-2.5 text-muted">Thinking<span className="caret">…</span></p>}
            {msgs.length === 1 && <div className="flex flex-wrap gap-2 pt-1">{SUGGEST.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-accent">{s}</button>)}</div>}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="cq" className="sr-only">Message</label>
            <input id="cq" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question" maxLength={300} className="flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-accent" />
            <button disabled={busy} className="rounded-full bg-ink px-4 py-2 text-sm text-paper disabled:opacity-50">Send</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="pulse flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg">
        <span className="h-2 w-2 rounded-full bg-cyan" /> Ask AUROZEN
      </button>
    </div>
  );
}
