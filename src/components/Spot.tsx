"use client";
import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

const track = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export function SpotLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  return <Link href={href} onMouseMove={track} className={`card spot ${className}`}>{children}</Link>;
}

export function SpotBox({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div onMouseMove={track} className={`card spot ${className}`}>{children}</div>;
}
