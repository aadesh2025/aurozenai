import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SITE.bookings.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = SITE.bookings.find((x) => x.slug === slug);
  return b ? { title: b.title, description: b.text, alternates: { canonical: `/book/${b.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = SITE.bookings.find((x) => x.slug === slug);
  if (!b) notFound();
  const back = b.audience === "partner" ? ["/partners", "Partner With Us"] : ["/book-consultation", "All meeting types"];
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-6 pt-24 md:pt-28">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl md:text-3xl">{b.title} <span className="font-mono text-sm text-muted">{b.mins}</span></h1>
        <Link href={back[0]} className="text-sm text-accent underline underline-offset-4">← {back[1]}</Link>
      </div>
      <iframe src={`https://cal.com/aurozen-ai/${b.slug}?embed=true&layout=month_view`} title={b.title} className="card h-[calc(100dvh-10rem)] min-h-[620px] w-full" />
    </section>
  );
}
