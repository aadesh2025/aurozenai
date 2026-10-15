import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Data Protection and Privacy Rights" };

export default function Page() {
  return (
    <Legal
      title="Data Protection and Privacy Rights"
      intro="How to ask about the personal information we hold."
      todo={["Response deadlines for each jurisdiction you serve (confirm with counsel; none are invented here)", "Internal request-handling workflow and who owns it", "Regulator complaint contacts per region"]}
      sections={[
        ["What you can ask", "Depending on your location and applicable law, you may ask to access your information, correct it, delete it, restrict or object to its use, withdraw consent, or receive a copy. Not every right applies everywhere."],
        ["How to make a request", `Email ${SITE.email} with the subject "Privacy request". Say what you want and which email address you used on our forms.`],
        ["Verification", "We may ask for information to confirm it is you, so we do not disclose your data to someone else. We will ask only for what is needed."],
        ["Timing", "We respond within the period required by the law that applies to you. [CONFIRM per jurisdiction.]"],
        ["Limits", "We may be unable to fulfil a request where we must keep information by law, to handle legal claims, or where another lawful exception applies. We will explain why."],
        ["Complaints", "You may complain to your local data-protection authority. We would appreciate the chance to resolve it first."],
        ["More", "See the Privacy Policy for how we handle information."],
      ]}
    />
  );
}
