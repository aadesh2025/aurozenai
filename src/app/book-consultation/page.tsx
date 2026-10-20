import type { Metadata } from "next";
import { CalEmbed } from "@/components/CalEmbed";
import { ConsultForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/book-consultation" }, description: "Book a free-form first conversation with AUROZEN AI about your process, your tools, and whether AI fits.", title: "Book a Consultation" };

export default function Page() {
  return (
    <>
      <Hero title="Book a consultation" text="A focused first conversation about your problem and possible approaches. No obligation." trail={[["Consulting & Auditing"], ["Book a Consultation"]]} />
      <Split
        aside={
          <>
            <Info title="What to expect" points={["We discuss your goals and current process.", "We tell you honestly whether AI fits.", "We outline possible next steps."]} />
            <Info title="Helpful to bring" points={["The process you want to improve.", "The tools and systems involved.", "What a good outcome looks like."]} />
          </>
        }
      >
        <CalEmbed options={SITE.cal.client} title="Schedule a consultation" />
        <ConsultForm />
      </Split>
    </>
  );
}
