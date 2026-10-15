"use client";
import { useEffect, useState } from "react";

export function BeforeAfter({ title, before, after, flow }: { title: string; before: string[]; after: string[]; flow: string[] }) {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [k, setK] = useState(0);
  useEffect(() => {
    if (mode !== "after") return;
    const id = setInterval(() => setK((x) => (x + 1) % flow.length), 1100);
    return () => clearInterval(id);
  }, [mode, flow.length]);
  const items = mode === "before" ? before : after;
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5">
        <h3 className="max-w-md font-ui text-lg">{title}</h3>
        <div role="tablist" aria-label="Compare" className="flex rounded-full border border-line p-1 text-sm">
          {(["before", "after"] as const).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`rounded-full px-5 py-1.5 capitalize transition-colors ${mode === m ? "bg-ink text-paper" : "text-muted"}`}>{m === "before" ? "Today" : "With a system"}</button>
          ))}
        </div>
      </div>
      <ul className="grid gap-px bg-line sm:grid-cols-2" aria-live="polite">
        {items.map((t, i) => (
          <li key={t} className="flex gap-3 bg-surface p-5 text-[15px]">
            <span className={`mt-0.5 font-mono text-xs ${mode === "before" ? "text-muted" : "text-accent"}`}>{mode === "before" ? "✕" : "✓"}</span>
            <span key={mode + i} className="reveal">{t}</span>
          </li>
        ))}
      </ul>
      {mode === "after" && (
        <div className="flex flex-wrap items-center gap-2 border-t border-line p-5 text-sm" aria-label="Example workflow">
          {flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className={`rounded-full border px-3 py-1.5 transition-all duration-300 ${i === k ? "border-accent bg-accent/15 text-ink" : "border-line text-muted"}`}>{f}</span>
              {i < flow.length - 1 && <span className="text-muted/50">→</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
