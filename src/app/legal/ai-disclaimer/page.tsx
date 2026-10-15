import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { alternates: { canonical: "/legal/ai-disclaimer" }, description: "What AI-generated content and the interactive demonstrations on the AUROZEN AI website can and cannot do.", title: "AI Use and Limitations" };

export default function Page() {
  return (
    <Legal
      title="AI Use and Limitations"
      intro="What AI-generated content and our interactive demonstrations can and cannot do."
      todo={["If a live AI chatbot or voice demo is added, add its in-interface notice and disclosure of data handling", "Lawyer review of how this interacts with client contracts"]}
      sections={[
        ["Scope", "This page covers information and demonstrations on this website. Contracted AI systems are described in each project's specification and agreement."],
        ["Demonstrations", "Interactive tools on this site (the assessment, workflow builder, agent, knowledge, and voice demos) use sample data and fixed rules in your browser. They are illustrations. They do not connect to real accounts, contact anyone, or show the performance of a deployed system."],
        ["Limits of AI output", "AI systems can produce incorrect, incomplete, or out-of-date output. Verify anything important before relying on it, and keep human review for consequential decisions."],
        ["Not professional advice", "Nothing on this site, including AI-assisted content or assessment results, is legal, medical, financial, or other regulated advice."],
        ["Chatbots, RAG, agents, and voice", "These systems depend on their data, configuration, integrations, and third-party services, and can fail or behave unexpectedly. We design for testing, fallbacks, and human handoff, but cannot promise perfect accuracy or uninterrupted operation."],
        ["Relationship to contracts", "A project's agreement and statement of work define what is delivered. This page does not reduce commitments made there."],
      ]}
    />
  );
}
