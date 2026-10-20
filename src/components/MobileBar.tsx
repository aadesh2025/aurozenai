"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Mobile-only sticky action bar. Appears after the first screen, hides near the footer and on form pages.
const HIDE = ["/contact", "/start-project", "/book-consultation", "/book", "/support"];

export function MobileBar() {
  const [show, setShow] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 700;
      setShow(y > 500 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (HIDE.some((h) => path.startsWith(h))) return null;
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>
      <div className="mx-auto flex max-w-md gap-2 rounded-full border border-line bg-surface/90 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Link href="/book-consultation" tabIndex={show ? 0 : -1} className="flex-1 rounded-full bg-ink py-3 text-center text-[15px] font-medium text-paper">Book a consultation</Link>
        <Link href="/start-project" tabIndex={show ? 0 : -1} className="rounded-full px-5 py-3 text-[15px] font-medium text-ink">Start project</Link>
      </div>
    </div>
  );
}
