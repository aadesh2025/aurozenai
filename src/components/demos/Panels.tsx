"use client";
import Link from "next/link";
import { useState } from "react";

export type PanelItem = { slug: string; name: string; short: string; bullets: string[] };

// Horizontal accordion: the active panel expands, the rest collapse into slim tabs (stacks vertically on mobile).
export function Panels({ items }: { items: PanelItem[] }) {
  const [a, setA] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[420px] lg:flex-row">
      {items.map((it, i) => {
        const on = a === i;
        return (
          <div
            key={it.slug}
            onMouseEnter={() => setA(i)}
            onFocus={() => setA(i)}
            className={`card relative overflow-hidden transition-[flex] duration-500 ${on ? "lg:flex-[4]" : "lg:flex-1"} ${on ? "border-accent/50" : ""}`}
          >
            <button onClick={() => setA(i)} aria-expanded={on} className="flex w-full items-center justify-between p-6 text-left lg:absolute lg:inset-x-0 lg:top-0">
              <span className={`font-ui text-lg font-medium ${on ? "" : "lg:absolute lg:left-1/2 lg:top-24 lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-base lg:text-muted lg:[writing-mode:vertical-rl]"}`}>{it.name}</span>
              <span className={`font-mono text-xs text-muted ${on ? "" : "lg:absolute lg:left-1/2 lg:top-6 lg:-translate-x-1/2"}`}>{String(i + 1).padStart(2, "0")}</span>
            </button>
            <div className={`px-6 pb-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-16 lg:transition-opacity lg:duration-300 ${on ? "block lg:opacity-100" : "hidden lg:block lg:pointer-events-none lg:opacity-0"}`}>
              <p className="max-w-md text-sm leading-relaxed text-muted">{it.short}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink/80">{it.bullets.map((b) => <li key={b} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{b}</li>)}</ul>
              <Link href={`/services/${it.slug}`} className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Open service</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
