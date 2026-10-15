import type { Metadata } from "next";
import Link from "next/link";
import { SupportForm } from "@/components/Forms";
import { Hero, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Client Support" };

export default function Page() {
  return (
    <>
      <Hero title="Client Support" text="For existing AUROZEN AI clients." trail={[["Contact"], ["Client Support"]]} />
      <Section>
        <div className="max-w-2xl">
          <SupportForm />
          <p className="mt-6 text-sm text-muted">Response times depend on your support agreement. See <Link href="/services/ai-support-maintenance" className="text-accent">Support &amp; Maintenance</Link>.</p>
          {SITE.clientPortalUrl && <p className="mt-2 text-sm"><a href={SITE.clientPortalUrl} className="text-accent">Open client portal →</a></p>}
        </div>
      </Section>
    </>
  );
}
