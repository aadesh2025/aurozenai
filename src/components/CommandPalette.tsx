"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ARTICLES, INDUSTRIES } from "@/lib/content";

type Item = { label: string; href: string; group: string; hint?: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const m = new Map<string, Item>();
    SERVICES.forEach((s) => m.set(`/services/${s.slug}`, { label: s.name, href: `/services/${s.slug}`, group: "Services", hint: s.short }));
    INDUSTRIES.forEach((i) => m.set(`/industries/${i.slug}`, { label: i.name, href: `/industries/${i.slug}`, group: "Industries", hint: i.intro }));
    ARTICLES.forEach((a) => m.set(`/insights/${a.slug}`, { label: a.title, href: `/insights/${a.slug}`, group: "Insights" }));
    NAV.forEach((g) => g.items?.forEach((i) => !m.has(i.href) && m.set(i.href, { label: i.label, href: i.href, group: g.label, hint: i.desc })));
    [["Start a project", "/start-project"], ["Contact", "/contact"], ["Legal Centre", "/legal"]].forEach(([label, href]) => m.set(href, { label, href, group: "Quick links" }));
    return [...m.values()];
  }, []);

  const results = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return items.slice(0, 9);
    return items.filter((i) => (i.label + " " + (i.hint ?? "") + " " + i.group).toLowerCase().includes(t)).slice(0, 9);
  }, [q, items]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    const ev = () => setOpen(true);
    window.addEventListener("keydown", key);
    window.addEventListener("aurozen:palette", ev);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("aurozen:palette", ev); };
  }, []);
  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => input.current?.focus(), 20); } }, [open]);
  useEffect(() => { setIdx(0); }, [q]);

  const go = (h: string) => { setOpen(false); router.push(h); };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[14vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)} role="dialog" aria-modal aria-label="Search the site">
      <div onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
            if (e.key === "Enter" && results[idx]) go(results[idx].href);
          }}
          placeholder="Search services, industries, articles…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none"
          aria-label="Search"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.map((r, i) => (
            <li key={r.href}>
              <button onMouseEnter={() => setIdx(i)} onClick={() => go(r.href)} className={`flex w-full items-baseline justify-between gap-4 rounded-2xl px-3 py-2.5 text-left ${i === idx ? "bg-ink/[0.07]" : ""}`}>
                <span><span className="block text-sm font-medium">{r.label}</span>{r.hint && <span className="line-clamp-1 block text-xs text-muted">{r.hint}</span>}</span>
                <span className="shrink-0 text-xs text-muted">{r.group}</span>
              </button>
            </li>
          ))}
          {!results.length && <li className="px-3 py-6 text-center text-sm text-muted">No match. Try the assistant at the bottom right.</li>}
        </ul>
      </div>
    </div>
  );
}
