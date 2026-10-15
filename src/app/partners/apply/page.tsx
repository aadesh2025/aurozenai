import type { Metadata } from "next";
import { ApplyWizard } from "@/components/partners/ApplyWizard";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Apply to Collaborate", description: "Apply to collaborate with AUROZEN AI. No application fee." };

export default function Page() {
  return (
    <>
      <Hero title="Apply to collaborate" text="Six short steps. We only ask what we need to evaluate your application. No application fee." trail={[["Partner With Us", "/partners"], ["Apply"]]} />
      <Section><div className="max-w-2xl"><ApplyWizard /></div></Section>
    </>
  );
}
