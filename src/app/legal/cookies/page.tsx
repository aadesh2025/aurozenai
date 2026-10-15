import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { alternates: { canonical: "/legal/cookies" }, description: "Cookie policy for the AUROZEN AI website: what is stored on your device and how that may change.", title: "Cookie Policy" };

export default function Page() {
  return (
    <Legal
      title="Cookie Policy"
      intro="What this website stores on your device."
      todo={[
        "Scan the deployed site (not just the code) for cookies, local storage, and third-party requests",
        "If analytics, scheduling embeds, or other third-party scripts are added: list each, its purpose and lifetime, and add a consent banner that blocks non-essential items until consent",
        "Add a persistent 'Cookie preferences' link if any non-essential technology is introduced",
      ]}
      sections={[
        ["Current status", "At the time of writing, this website does not set analytics, advertising, or tracking cookies, and does not load third-party tracking scripts. Fonts are served from our own domain."],
        ["What may still be stored", "Technical requests and server logs necessary to deliver pages and protect the site. Your browser may keep ordinary cache data. The site does not use local storage for tracking."],
        ["Embedded services", "The consultation booking page will embed a scheduling tool once connected. When that happens, the provider may set its own cookies, and this policy and a consent control will be updated first."],
        ["If this changes", "Before we add any analytics or non-essential technology, we will list it here with its provider, purpose, and duration, and ask for consent where required."],
        ["Contact", "Questions: use the Legal Notices page."],
      ]}
    />
  );
}
