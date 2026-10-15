import type { Metadata } from "next";
import { ConsultForm } from "@/components/Forms";
import { Bullets, Hero, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Book a Consultation" };

export default function Page() {
  return (
    <>
      <Hero title="Book a Consultation" text="A focused first conversation about your problem and possible approaches." trail={[["Consulting & Auditing"], ["Book a Consultation"]]} />
      <Section title="What to expect">
        <Bullets items={["We discuss your goals and current process", "We tell you honestly whether AI fits", "We outline possible next steps", "No obligation"]} />
        <p className="mt-4 text-sm text-muted">Helpful to prepare: the process in question, the tools involved, and what a good outcome looks like.</p>
      </Section>
      <Section title="Choose a time">
        {SITE.calendarUrl ? (
          <iframe src={SITE.calendarUrl} title="Schedule a consultation" className="h-[700px] w-full card" />
        ) : (
          <p className="text-sm text-muted">Online scheduling is being connected. Send the form below and we will reply with available times.</p>
        )}
      </Section>
      <Section title="Tell us about your project"><div className="max-w-2xl"><ConsultForm /></div></Section>
    </>
  );
}
