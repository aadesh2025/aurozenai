import type { Metadata } from "next";
import { ConsultForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Book a Consultation" };

export default function Page() {
  return (
    <>
      <Hero title="Book a consultation" text="A focused first conversation about your problem and possible approaches. No obligation." trail={[["Consulting & Auditing"], ["Book a Consultation"]]} />
      <Split
        aside={
          <>
            <Info title="What to expect" points={["We discuss your goals and current process.", "We tell you honestly whether AI fits.", "We outline possible next steps."]} />
            <Info title="Helpful to bring" points={["The process you want to improve.", "The tools and systems involved.", "What a good outcome looks like."]} foot={SITE.calendarUrl ? undefined : "Online scheduling is being connected. Send the form and we will reply with available times."} />
          </>
        }
      >
        {SITE.calendarUrl && <iframe src={SITE.calendarUrl} title="Schedule a consultation" className="card mb-8 h-[700px] w-full" />}
        <ConsultForm />
      </Split>
    </>
  );
}
