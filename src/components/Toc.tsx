"use client";
import { useEffect, useState } from "react";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page" className="sticky top-28 hidden self-start lg:block">
      <p className="mb-4 text-sm text-muted">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${active === i.id ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"}`}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
