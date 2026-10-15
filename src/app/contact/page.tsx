import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <>
      <Hero title="Contact AUROZEN AI" text="Tell us what you are trying to solve." trail={[["Contact"]]} />
      <Split aside={<><Info title="What happens next" points={["We read your message the same day we see it.", "We reply by email, usually with a question or two.", "If it is a fit, we set up a short call to scope it."]} foot={<>Prefer email? <a className="text-accent underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></>} /><div className="card p-7"><h2 className="font-ui text-xl font-medium">Bigger project?</h2><p className="mt-2 text-[16px] text-muted">Use the six-step form to describe systems, requirements, and constraints.</p><a href="/start-project" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">Start a project</a></div></>}>
        <ContactForm />
      </Split>
    </>
  );
}
