import type { Metadata } from "next";
import { StartProjectForm } from "@/components/Forms";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Start a Project" };

export default function Page() {
  return (
    <>
      <Hero title="Start a Project" text="Six short steps. We collect only what we need to evaluate and respond." trail={[["Contact"], ["Start a Project"]]} />
      <Section><div className="max-w-2xl"><StartProjectForm /></div></Section>
    </>
  );
}
