import type { Metadata } from "next";
import { ApplyWizard } from "@/components/partners/ApplyWizard";
import { Hero, Info, Split } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/partners/apply" }, title: "Apply to Collaborate", description: "Apply to collaborate with AUROZEN AI. No application fee." };

export default function Page() {
  return (
    <>
      <Hero title="Apply to collaborate" text="Six short steps. We only ask what we need to evaluate your application. No application fee." trail={[["Partner With Us", "/partners"], ["Apply"]]} />
      <Split aside={<Info title="How applications work" points={["We read every application by hand.", "If there is a possible fit we email you to talk it through.", "Terms are agreed in writing before any work starts.", "No application fee, ever."]} foot="Not every application leads to a collaboration. There is no guaranteed salary, project, or equity." />}><ApplyWizard /></Split>
    </>
  );
}
