import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/book-consultation" }, description: "Book a call with AUROZEN AI about your process, your tools, and whether AI fits.", title: "Book a Consultation" };

export default function Page() {
  return (
    <>
      <Hero title="Book a consultation" text="Pick a time that suits you. No obligation." trail={[["Consulting & Auditing"], ["Book a Consultation"]]} />
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {SITE.bookings.filter((b) => b.audience === "client").map((b) => (
            <Link key={b.slug} href={`/book/${b.slug}`} className="card block p-7 transition hover:-translate-y-0.5">
              <span className="font-mono text-xs text-accent">{b.mins}</span>
              <h2 className="mt-2 text-2xl">{b.title}</h2>
              <p className="mt-2 text-muted">{b.text}</p>
              <span className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">Choose a time</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
