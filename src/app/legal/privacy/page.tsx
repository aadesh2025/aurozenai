import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/legal/privacy" }, description: "How AUROZEN AI collects, uses, shares, and protects personal information submitted through this website.", title: "Privacy Policy" };

export default function Page() {
  return (
    <Legal
      title="Privacy Policy"
      intro="How AUROZEN AI handles personal information collected through this website."
      todo={[
        "Exact legal name and structure (believed to be an Indian sole proprietorship; confirm)",
        "Business address, if required for disclosure",
        "Which email, hosting, and AI providers actually receive form data",
        "Retention periods",
        "Whether analytics, a mailing list, or recruitment forms will be added",
        "Which privacy laws apply, based on who you serve (India, EU/UK, California, Canada, Australia)",
      ]}
      sections={[
        ["Who we are", `This website is operated by AUROZEN AI, an AI consultancy based in India (legal name and registration details: [TO BE CONFIRMED]). Contact: ${SITE.email}. This policy covers this website only. The VICERO platform (${SITE.product.appUrl}) and client projects have separate terms and notices.`],
        ["Information we collect", ["Information you submit through our forms: name, business email, company, country, industry, service of interest, project description, existing systems, preferred contact method, and for support requests, the issue description and affected service.", "Basic technical data processed by our hosting infrastructure when you visit (for example IP address and request logs). We do not currently run analytics or advertising trackers on this website.", "Please do not include confidential, sensitive, or regulated personal data in forms."]],
        ["How we use it", "To respond to your inquiry, schedule conversations, prepare proposals, provide requested services and support, keep the website secure, prevent abuse, and meet legal obligations. We do not sell your personal information."],
        ["Where it goes", ["Form submissions are delivered to our business mailbox and may be stored in our own records. [CONFIRM: email provider, hosting provider, and any workflow or CRM tools receiving submissions.]", "We may share information with service providers who help us run the website and business, with professional advisers, or where required by law. We will list providers once confirmed."]],
        ["AI processing", "Submissions are not currently processed by AI systems on this website. If that changes (for example AI-assisted triage of inquiries), this policy will be updated before it starts. AI demonstrations on the site run in your browser using sample data and do not send what you type to a server."],
        ["International transfers", "We operate from India and our providers may process data in other countries. [CONFIRM: provider locations and any transfer safeguards for visitors from the EU/UK.]"],
        ["Retention", "We keep inquiry information only as long as needed for the purpose it was collected, for our legal obligations, or to resolve disputes. [DEFINE: specific periods, for example inquiries that do not become projects.]"],
        ["Security", "We use reasonable technical and organizational measures, including access-controlled storage of submissions and keeping credentials out of the website code. No system is completely secure, and we cannot guarantee absolute security."],
        ["Your rights", "Depending on where you live, you may have rights to access, correct, delete, or restrict use of your information, to withdraw consent, and to complain to a regulator. See our Data Rights page for how to make a request."],
        ["Marketing", "We contact you about your inquiry. We do not currently run a marketing mailing list. If we start one, we will ask for your permission where the law requires it and include an unsubscribe option."],
        ["Children", "This website is for businesses and is not directed at children. We do not knowingly collect children's information."],
        ["Third-party links", "Links to other sites, including VICERO, are governed by those sites' own privacy practices."],
        ["Changes", "We will update this page when practices change and revise the date above."],
        ["Contact", `Privacy questions: ${SITE.email}.`],
      ]}
    />
  );
}
