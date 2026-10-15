"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hold = (l: string) => { if (t.current) clearTimeout(t.current); setMenu(l); };
  const release = () => { if (t.current) clearTimeout(t.current); t.current = setTimeout(() => setMenu(null), 120); };
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => { setOpen(false); setMenu(null); }, [path]);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (nav.current && !nav.current.contains(e.target as Node)) setMenu(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(null); };
    document.addEventListener("mousedown", out);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", esc); };
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <div className={`flex h-14 w-full max-w-7xl items-center justify-between rounded-full border pl-5 pr-2 shadow-sm backdrop-blur-xl transition-colors ${scrolled || open ? "border-line bg-surface/85" : "border-line/60 bg-surface/55"}`}>
        <Link href="/" aria-label="AUROZEN AI home"><Logo size={26} /></Link>

        <nav ref={nav} className="hidden items-center lg:flex" aria-label="Primary">
          {NAV.map((g) => {
            const active = g.items?.some((i) => path.startsWith(i.href));
            const wide = (g.items?.length ?? 0) > 6;
            return (
              <div key={g.label} className="relative" onMouseEnter={() => hold(g.label)} onMouseLeave={release}>
                <button onClick={() => setMenu(menu === g.label ? null : g.label)} aria-expanded={menu === g.label} className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors hover:text-ink ${menu === g.label || active ? "text-ink" : "text-ink/60"}`} aria-haspopup="true">
                  {g.label}
                  <svg width="9" height="9" viewBox="0 0 10 10" className={`opacity-50 transition-transform ${menu === g.label ? "rotate-180" : ""}`} aria-hidden><path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" fill="none" strokeWidth="1.4" /></svg>
                </button>
                <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition duration-150 ${menu === g.label ? "visible opacity-100" : "invisible opacity-0"}`}>
                  <div className={`grid gap-1 rounded-3xl border border-line bg-surface p-2 shadow-2xl shadow-black/15 ${wide ? "w-[580px] grid-cols-2" : "w-64"}`}>
                    {g.items?.map((i) => (
                      <Link key={i.href} href={i.href} onClick={() => { setMenu(null); (document.activeElement as HTMLElement | null)?.blur(); }} className="rounded-2xl px-3 py-2.5 transition-colors hover:bg-ink/[0.05]">
                        <span className="block text-[14px] font-medium text-ink">{i.label}</span>
                        {i.desc && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{i.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <button onClick={() => window.dispatchEvent(new Event("aurozen:palette"))} className="mr-1 flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink" aria-label="Search the site">
            Search <kbd className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Link href="/book-consultation" className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-85">Book a consultation</Link>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="fixed inset-x-3 bottom-3 top-[4.5rem] overflow-y-auto rounded-3xl border border-line bg-surface p-3 lg:hidden" aria-label="Mobile">
          {NAV.map((g) => (
            <div key={g.label} className="border-b border-line last:border-0">
              <button className="flex w-full items-center justify-between px-3 py-4 text-left font-display text-2xl" onClick={() => setSub(sub === g.label ? null : g.label)} aria-expanded={sub === g.label}>
                {g.label}
                <span className="text-muted">{sub === g.label ? "−" : "+"}</span>
              </button>
              {sub === g.label && (
                <div className="pb-3">
                  {g.items?.map((i) => (
                    <Link key={i.href} href={i.href} className="block rounded-xl px-3 py-2.5 text-sm text-ink/75 hover:bg-ink/5">{i.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href={SITE.clientPortalUrl ?? "/support"} className="mt-3 block px-3 py-3 text-sm text-muted">Client portal</Link>
          <Link href="/book-consultation" className="mt-2 block rounded-full bg-ink px-4 py-3.5 text-center font-medium text-paper">Book a consultation</Link>
        </nav>
      )}
    </header>
  );
}
