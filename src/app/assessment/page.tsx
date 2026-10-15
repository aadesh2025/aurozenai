import type { Metadata } from "next";
import { Assessment } from "@/components/Interactive";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "AI Readiness Assessment" };

export default function Page() {
  return (
    <>
      <Hero title="AI Readiness Assessment" text="A few quick questions. The result is preliminary guidance, not a formal audit." trail={[["Consulting & Auditing"], ["Assessment"]]} />
      <Section><div className="max-w-2xl"><Assessment /></div></Section>
    </>
  );
}
