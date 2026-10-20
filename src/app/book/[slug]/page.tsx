import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingFrame } from "@/components/BookingFrame";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SITE.bookings.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = SITE.bookings.find((x) => x.slug === slug);
  return b ? { title: b.title, description: b.text, alternates: { canonical: `/book/${b.slug}` } } : {};
}

const STEPS = ["Pick a time", "Confirm your details", "Get the calendar invite"];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = SITE.bookings.find((x) => x.slug === slug);
  if (!b) notFound();
  const back = b.audience === "partner" ? ["/partners", "Partner With Us"] : ["/book-consultation", "All meeting types"];
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-28 md:pt-32">
      <Link href={back[0]} className="text-sm text-muted transition hover:text-ink">← {back[1]}</Link>
      <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{b.mins} · Online meeting</span>
          <h1 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{b.title}</h1>
          <p className="mt-3 max-w-xl text-muted">{b.text}</p>
        </div>
        <ol className="flex gap-2 text-[13px] md:flex-col md:items-end">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-ink/70"><span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 font-mono text-[11px] text-accent">{i + 1}</span><span className="hidden sm:inline">{s}</span></li>
          ))}
        </ol>
      </div>
      <div className="mt-8"><BookingFrame slug={b.slug} title={b.title} /></div>
      <p className="mt-5 text-center text-xs text-muted">Free · No obligation · Times shown in your timezone · You can reschedule from the confirmation email</p>
    </section>
  );
}
