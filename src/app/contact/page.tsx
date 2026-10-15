import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { Hero, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <>
      <Hero title="Contact AUROZEN AI" text="Tell us what you are trying to solve." trail={[["Contact"]]} />
      <Section>
        <div className="max-w-2xl"><ContactForm /></div>
        <p className="mt-6 text-sm text-muted">Or email <a className="text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a>. For a more detailed inquiry, <a className="text-accent" href="/start-project">start a project</a>.</p>
      </Section>
    </>
  );
}
