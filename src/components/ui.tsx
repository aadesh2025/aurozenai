import Link from "next/link";
import { ReactNode } from "react";
import { PHASES } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { SpotLink } from "./Spot";

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
);

export function Crumbs({ trail }: { trail: [string, string?][] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-ink/45">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-ink">Home</Link></li>
        {trail.map(([l, h], i) => (
          <li key={l} className="flex items-center gap-2">
            <span aria-hidden className="text-ink/25">/</span>
            {h && i < trail.length - 1 ? <Link href={h} className="hover:text-ink">{l}</Link> : <span className="text-ink/75">{l}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const Pill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted">
    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    {children}
  </span>
);

export function Hero({ title, text, trail, children, aside, dark = false }: { title: string; text?: string; trail?: [string, string?][]; children?: ReactNode; aside?: ReactNode; dark?: boolean }) {
  return (
    <section className={`relative isolate overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 ${dark ? "theme-dark" : ""}`}>
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <Container>
        {trail && <Crumbs trail={trail} />}
        <div className={`mt-6 grid gap-10 ${aside ? "lg:grid-cols-[1.1fr_1fr] lg:items-center" : ""}`}>
          <div className="reveal">
            <h1 className="max-w-3xl text-balance text-[2.9rem] leading-[1] text-ink sm:text-6xl md:text-7xl">{title}</h1>
            {text && <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-muted">{text}</p>}
            {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

export const Btn = ({ href, children, ghost = false }: { href: string; children: ReactNode; ghost?: boolean }) => (
  <Link
    href={href}
    className={
      ghost
        ? "inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/50 hover:bg-ink/5"
        : "inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-85"
    }
  >
    {children}
  </Link>
);

// dark => a rounded "stage" panel inset from the page edge. Light sections sit on the page itself.
export const Section = ({ title, lede, children, dark = false, id }: { title?: string; lede?: string; children: ReactNode; dark?: boolean; id?: string }) => {
  const inner = (
    <Container className={dark ? "py-12 md:py-16" : "py-10 md:py-14"}>
      {title && (
        <div className="mb-8 grid gap-3 md:mb-10 md:grid-cols-2 md:items-end">
          <h2 className="text-balance text-4xl leading-[1.05] text-ink md:text-5xl">{title}</h2>
          {lede && <p className="max-w-lg text-pretty text-[17px] text-muted md:justify-self-end">{lede}</p>}
        </div>
      )}
      {children}
    </Container>
  );
  return dark ? (
    <section id={id} className="px-2 py-3 md:px-4">
      <div className="theme-dark noise relative overflow-hidden rounded-[32px] md:rounded-[44px]">{inner}</div>
    </section>
  ) : (
    <section id={id}>{inner}</section>
  );
};

// Hairline rows: a specification list rather than a wall of cards.
export const Bullets = ({ items, single = false }: { items: string[]; dark?: boolean; single?: boolean }) => (
  <ul className={`grid border-t border-line ${single ? "" : "md:grid-cols-2 md:gap-x-12"}`}>
    {items.map((i) => (
      <li key={i} className="flex items-start gap-3 border-b border-line py-4 text-[16.5px] text-ink/85">
        <svg width="16" height="16" viewBox="0 0 16 16" className="mt-1 shrink-0 text-accent" aria-hidden><path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {i}
      </li>
    ))}
  </ul>
);

export const Card = ({ href, title, text, className = "" }: { href: string; title: string; text?: string; className?: string }) => (
  <SpotLink href={href} className={`group flex flex-col p-6 ${className}`}>
    <h3 className="text-lg font-medium text-ink">{title}</h3>
    {text && <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{text}</p>}
    <span className="mt-auto pt-6 text-sm text-muted transition-colors group-hover:text-accent">Learn more →</span>
  </SpotLink>
);

export function PhaseStrip({ dark = true }: { dark?: boolean }) {
  void dark;
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {PHASES.map((p, i) => (
        <li key={p.name} className="bg-surface p-6">
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-lg font-medium text-ink">{p.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Related({ slugs }: { slugs: string[] }) {
  const items = SERVICES.filter((s) => slugs.includes(s.slug));
  return (
    <Section title="Related capabilities">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (<Card key={s.slug} href={`/services/${s.slug}`} title={s.name} text={s.short} />))}
      </div>
    </Section>
  );
}

export function FinalCta({ title = "Have a business problem worth solving?", label = "Start a conversation", href = "/start-project" }: { title?: string; label?: string; href?: string }) {
  return (
    <section className="px-2 pb-3 pt-2 md:px-4">
      <div className="theme-dark noise relative overflow-hidden rounded-[32px] md:rounded-[44px]">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-violet/30 blur-[110px]" />
        <Container className="relative py-14 md:py-20">
          <h2 className="max-w-3xl text-balance text-5xl leading-[1] text-ink md:text-7xl">{title}</h2>
          <p className="mt-6 max-w-md text-muted">Explain your requirements and we will discuss a suitable approach.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href={href}>{label}</Btn>
            <Btn href="/book-consultation" ghost>Book a consultation</Btn>
          </div>
        </Container>
      </div>
    </section>
  );
}
