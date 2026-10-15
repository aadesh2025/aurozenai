import type { Metadata } from "next";
import { StartProjectForm } from "@/components/Forms";
import { Hero, Info, Split } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/start-project" }, description: "Describe your AI or automation project in six short steps and get a tailored response from AUROZEN AI.", title: "Start a Project" };

export default function Page() {
  return (
    <>
      <Hero title="Start a Project" text="Six short steps. We collect only what we need to evaluate and respond." trail={[["Contact"], ["Start a Project"]]} />
      <Split aside={<Info title="What we ask, and why" points={["The service and the problem, so we know where to start.", "Your current systems, so we can judge what connects.", "Deployment and security needs, so nothing surprises you later.", "Contact details, so we can answer."]} foot="Nothing is sent until you submit. This is not a proposal or a promise of feasibility." />}><StartProjectForm /></Split>
    </>
  );
}
