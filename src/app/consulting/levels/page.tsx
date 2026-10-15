import type { Metadata } from "next";
import { PRICING } from "@/lib/site";
import { Btn, FinalCta, Hero, Section } from "@/components/ui";
import { LevelPicker } from "@/components/demos/LevelPicker";

export const metadata: Metadata = { alternates: { canonical: "/consulting/levels" }, description: "Three levels of AI consulting: discovery, strategy and architecture, and advanced systems. Compare scope and deliverables.", title: "AI Consulting Levels" };

export default function Levels() {
  return (
    <>
      <Hero title="Three levels of AI consulting." text="A proposed framework. Pick the level that fits where you are; final deliverables are defined in your proposal." trail={[["Consulting & Auditing"], ["Consulting Levels"]]}>
        <Btn href="/services/ai-consulting">About AI consulting</Btn>
        <Btn href="/assessment" ghost>Not sure? Take the assessment</Btn>
        {PRICING.consulting && <span className="font-mono text-sm text-accent">Starting at {PRICING.consulting}</span>}
      </Hero>
      <Section title="Compare the levels" lede="Select a level to see what changes. Everything is scoped to your situation.">
        <LevelPicker />
      </Section>
      <FinalCta title="Which level fits you?" label="Book a consultation" href="/book-consultation" />
    </>
  );
}
