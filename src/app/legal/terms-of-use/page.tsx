import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return (
    <Legal
      title="Website Terms of Use"
      intro="Rules for using the AUROZEN AI website. These are not the terms of a client project."
      todo={["Exact legal name", "Governing law and dispute venue (do not copy a foreign one by default)", "Whether any indemnity is appropriate", "Lawyer review of liability limits"]}
      sections={[
        ["Who these terms are with", "The AUROZEN AI website is operated by AUROZEN AI, India (legal details: [TO BE CONFIRMED]). By using the site you agree to these terms."],
        ["Scope", "These terms cover use of this public website only. Paid services are governed by a separate written agreement. VICERO has its own terms."],
        ["Acceptable use", "Do not misuse the site: no attempts to gain unauthorized access, disrupt it, scrape it at abusive volume, submit malicious content, or use forms to send spam or unlawful material."],
        ["Content and intellectual property", "Site content, design, and the AUROZEN AI name and logo belong to AUROZEN AI or its licensors. You may view and share pages for personal or internal business use. Do not copy or republish substantial parts without permission."],
        ["Information on this site", "Content is general information about our services and may change. Descriptions of capabilities are not guarantees of results. Nothing here is professional legal, medical, or financial advice."],
        ["Inquiries", "Submitting a form does not create a client relationship, and we do not promise to issue or accept a quotation. Engagements begin only with a signed or expressly accepted agreement."],
        ["AI content and demos", "See the AI Use and Limitations page."],
        ["Third-party links", "We are not responsible for other sites' content or practices."],
        ["Availability", "We do not guarantee that the site will be uninterrupted or error-free."],
        ["Liability", "To the extent permitted by law, AUROZEN AI is not liable for indirect or consequential loss arising from use of the website. Nothing excludes liability that cannot be excluded by law, and your mandatory consumer rights are unaffected."],
        ["Governing law", "[TO BE DETERMINED WITH LEGAL ADVICE, considering Indian operations and international visitors.]"],
        ["Changes", "We may update these terms; continued use after an update means you accept them."],
      ]}
    />
  );
}
