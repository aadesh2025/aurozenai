"use client";
import { useState } from "react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => (
        <div key={it.q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="font-ui text-lg">{it.q}</span>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden text-muted">{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
