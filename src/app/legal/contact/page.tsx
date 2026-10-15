import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact and Legal Notices" };

export default function Page() {
  return (
    <Legal
      title="Contact and Legal Notices"
      todo={["Exact legal name and structure", "Registration details, if any", "Business address, only if you decide to publish it (do not publish a home address by default)", "Whether formal notices need a specific channel", "A dedicated privacy contact address"]}
      sections={[
        ["Who we are", "AUROZEN AI, an AI consultancy operated from India. Legal name: [TO BE CONFIRMED]. Structure: [TO BE CONFIRMED]. Registration: [IF APPLICABLE]."],
        ["General and project inquiries", `Use the contact form or the Start a Project page, or email ${SITE.email}.`],
        ["Client support", "Existing clients: use the Client Support page."],
        ["Privacy requests", `Email ${SITE.email} with the subject "Privacy request".`],
        ["Formal legal notices", `Send to ${SITE.email}. [A postal address will be added here if required.]`],
      ]}
    />
  );
}
