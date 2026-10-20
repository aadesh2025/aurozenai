import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMP_TEXT, ROLES, getRole } from "@/lib/partners";
import { Bullets, Btn, Hero, Section } from "@/components/ui";
import { RoleCard } from "@/components/partners/PartnerHub";

type P = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => ROLES.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const r = getRole(slug);
  return r ? { alternates: { canonical: `/partners/${r.slug}` }, title: `${r.title} | Partner With Us`, description: r.summary } : {};
}

export default async function RolePage({ params }: P) {
  const { slug } = await params;
  const r = getRole(slug);
  if (!r) notFound();
  const open = r.status === "Open for applications";
  const similar = ROLES.filter((x) => x.slug !== r.slug && x.group === r.group).slice(0, 3);
  const cta = open ? "Apply for this role" : "Join the talent network";
  return (
    <>
      <Hero
        title={r.title}
        text={r.summary}
        trail={[["Partner With Us", "/partners"], [r.title]]}
        aside={
          <dl className="card divide-y divide-line text-sm">
            {([["Status", r.status], ["Type", r.track], ["Level", r.beginner ? "Beginner-friendly" : r.experience], ["Work", r.arrangement.join(", ")], ["Time", r.availability], ["Pay model", r.compensation], ["Location", r.remote ? "Remote" : "Location-dependent"]] as const).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 px-5 py-3"><dt className="text-muted">{k}</dt><dd className={k === "Status" && open ? "text-accent" : ""}>{v}</dd></div>
            ))}
          </dl>
        }
      >
        <Btn href={`/book/business-partnership`}>{cta}</Btn>
        <Btn href="/partners" ghost>All roles</Btn>
      </Hero>

      {!open && (
        <Section>
          <p className="rounded-2xl border border-line bg-surface p-5 text-sm text-muted">There is no active vacancy for this role right now. Registering interest adds you to our talent network; we reach out when a suitable project or need appears.</p>
        </Section>
      )}

      <Section title="What you would do"><Bullets items={r.responsibilities} /></Section>

      <Section dark title="Skills and expectations">
        <div className="grid gap-10 md:grid-cols-2">
          <div><h3 className="mb-3 text-lg font-medium">Required</h3><Bullets single items={r.required} /></div>
          <div><h3 className="mb-3 text-lg font-medium">Preferred</h3><Bullets single items={r.preferred} /></div>
        </div>
        <p className="mt-8 max-w-2xl text-muted">{r.experience} No degree is required where skills can be demonstrated.</p>
        {r.notes && <p className="mt-4 max-w-2xl text-sm text-ink/80">{r.notes}</p>}
      </Section>

      <Section title="Compensation approach">
        <p className="max-w-2xl text-muted">{COMP_TEXT[r.compensation]}</p>
        <p className="mt-4 max-w-2xl text-sm text-muted">No application fee. Not an employment contract. No guaranteed salary, projects, or equity. Read the <Link href="/partners#roles" className="text-accent underline">full compensation disclosure</Link> on the Partners page.</p>
      </Section>

      <Section dark title="Who should apply">
        <div className="grid gap-10 md:grid-cols-2">
          <div><h3 className="mb-3 text-lg font-medium">A good fit</h3><Bullets single items={[`You can show or explain real work related to ${r.title.toLowerCase()}`, "You are comfortable with the pay model above", "You will take ownership of agreed tasks and report honestly"]} /></div>
          <div><h3 className="mb-3 text-lg font-medium">Probably not a fit</h3><Bullets single items={["You need a guaranteed fixed salary right now", "You are looking for results without sustained effort", "You want authority over pricing, contracts, or strategy from day one"]} /></div>
        </div>
      </Section>

      {similar.length > 0 && (
        <Section title="Related roles"><div className="grid gap-4 md:grid-cols-3">{similar.map((x) => <RoleCard key={x.slug} r={x} />)}</div></Section>
      )}

      <section className="px-2 pb-3 pt-6 md:px-4">
        <div className="theme-dark noise rounded-[32px] md:rounded-[44px]">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <h2 className="max-w-2xl text-4xl leading-none md:text-6xl">{open ? `Interested in ${r.title}?` : "Interested down the line?"}</h2>
            <div className="mt-8"><Btn href={`/book/business-partnership`}>{cta}</Btn></div>
          </div>
        </div>
      </section>
    </>
  );
}
