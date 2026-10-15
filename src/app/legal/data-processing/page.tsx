import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { title: "Data Processing Information" };

export default function Page() {
  return (
    <Legal
      title="Data Processing Information"
      intro="How client data is handled in AI implementation projects."
      todo={["Decide per service whether AUROZEN AI acts as processor or in another role (do not assume)", "Prepare a Data Processing Agreement for client projects and VICERO", "Subprocessor list: model providers, hosting, and tools actually used", "Hosting locations and retention rules", "Verify every statement about model training with each provider"]}
      sections={[
        ["Scope", "This page is general information. Terms for a specific project or for VICERO are set out in the agreement for that engagement, including a data processing agreement where appropriate."],
        ["Roles", "Responsibilities depend on the service. Where we process client data on a client's instructions, that will be recorded in the project agreement."],
        ["Providers", "Projects may involve hosting, AI model, and workflow providers. They will be identified in the project documentation. [LIST ONCE CONFIRMED.]"],
        ["What we will not claim", "We do not make blanket statements about model training, data location, or certifications. Such statements will be given only where verified for the specific project."],
      ]}
    />
  );
}
