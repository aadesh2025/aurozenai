"use client";
import { useEffect, useState } from "react";

// Cal.com embed that follows the site's light/dark theme and shows a skeleton until it loads.
export function BookingFrame({ slug, title }: { slug: string; title: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  const src = `https://cal.com/aurozen-ai/${slug}?embed=true&layout=month_view&theme=${theme}`;
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(80,60,200,.35)]">
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center" aria-hidden>
          <div className="flex items-center gap-3 text-sm text-muted"><span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-accent" />Loading available times…</div>
        </div>
      )}
      <iframe key={src} src={src} title={title} onLoad={() => setLoaded(true)} className={`block h-[860px] md:h-[640px] w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
