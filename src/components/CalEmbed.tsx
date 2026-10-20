"use client";
import { useState } from "react";

type Option = { label: string; mins: string; url: string };

export function CalEmbed({ options, title }: { options: Option[]; title: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="mb-8">
      {options.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {options.map((o, n) => (
            <button key={o.url} type="button" onClick={() => setI(n)} aria-pressed={n === i} className={`rounded-full border px-4 py-2 text-sm ${n === i ? "border-ink bg-ink text-paper" : "border-line"}`}>
              {o.label} · {o.mins}
            </button>
          ))}
        </div>
      )}
      <iframe key={options[i].url} src={options[i].url} title={title} loading="lazy" className="card h-[700px] w-full" />
    </div>
  );
}
