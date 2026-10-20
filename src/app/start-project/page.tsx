import type { Metadata } from "next";
import { SimpleForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/start-project" }, description: "Tell AUROZEN AI about your AI or automation project and get a tailored response.", title: "Start a Project" };

export default function Page() {
  return (
    <>
      <Hero title="Start a Project" text="Tell us what you want to build. We reply by email." trail={[["Contact"], ["Start a Project"]]} />
      <Split aside={<Info title="What to include" points={["The problem you want solved.", "The tools and systems involved.", "What a good outcome looks like."]} foot="This is not a proposal or a promise of feasibility." />}><SimpleForm form="start-project" messageLabel="Project details" /></Split>
    </>
  );
}
