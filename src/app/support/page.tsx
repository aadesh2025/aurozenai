import type { Metadata } from "next";
import Link from "next/link";
import { SupportForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Client Support" };

export default function Page() {
  return (
    <>
      <Hero title="Client Support" text="For existing AUROZEN AI clients." trail={[["Contact"], ["Client Support"]]} />
      <Split
        aside={
          <>
            <Info title="How support works" points={["Tell us what is wrong and which service it affects.", "We categorize it: a fault, a change, or an enhancement.", "We prioritize by impact and your agreement, then update you."]} foot={<>Response times follow your support agreement. See <Link href="/services/ai-support-maintenance" className="text-accent underline underline-offset-4">Support &amp; Maintenance</Link>.</>} />
            {SITE.clientPortalUrl && <a href={SITE.clientPortalUrl} className="card block p-6 text-accent">Open the client portal →</a>}
          </>
        }
      >
        <SupportForm />
      </Split>
    </>
  );
}
