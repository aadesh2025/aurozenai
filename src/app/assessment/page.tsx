import type { Metadata } from "next";
import { Assessment } from "@/components/Interactive";
import { Hero, Info, Split } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/assessment" }, description: "Answer a few questions and get preliminary guidance on whether AI consulting, an audit, automation, or a knowledge system is the right first step.", title: "AI Readiness Assessment" };

export default function Page() {
  return (
    <>
      <Hero title="AI Readiness Assessment" text="A few quick questions. The result is preliminary guidance, not a formal audit." trail={[["Consulting & Auditing"], ["Assessment"]]} />
      <Split aside={<Info title="About this assessment" points={["It uses simple rules, not machine learning.", "It shows which answers shaped the result.", "Nothing is stored or sent unless you contact us.", "The result is a starting point, not a formal audit."]} />}><Assessment /></Split>
    </>
  );
}
