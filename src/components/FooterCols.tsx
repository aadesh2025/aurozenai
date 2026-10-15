"use client";
import Link from "next/link";
import { useState } from "react";

type Col = { title: string; links: [string, string][] };

// Link columns. On phones each column is a collapsible group; from tablet up all are open.
export function FooterCols({ cols }: { cols: Col[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="divide-y divide-line border-y border-line sm:grid sm:grid-cols-4 sm:gap-x-6 sm:divide-y-0 sm:border-0">
      {cols.map((c) => {
        const on = open === c.title;
        return (
          <div key={c.title} className="sm:py-0">
            <h2>
              <button onClick={() => setOpen(on ? null : c.title)} aria-expanded={on} className="flex w-full items-center justify-between py-4 text-left font-ui text-base font-semibold text-ink sm:pointer-events-none sm:py-0">
                {c.title}
                <span aria-hidden className={`text-muted transition-transform sm:hidden ${on ? "rotate-45" : ""}`}>+</span>
              </button>
            </h2>
            <ul className={`space-y-3 pb-5 sm:mt-5 sm:block sm:space-y-3.5 sm:pb-0 ${on ? "block" : "hidden"}`}>
              {c.links.map(([l, h]) => (
                <li key={h}><Link href={h} className="inline-block py-0.5 text-[15.5px] text-ink/70 transition-colors hover:text-ink">{l}</Link></li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
