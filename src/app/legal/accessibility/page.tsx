import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/legal/accessibility" }, description: "AUROZEN AI accessibility statement: our aims, current status, and how to report a barrier.", title: "Accessibility Statement" };

export default function Page() {
  return (
    <Legal
      title="Accessibility Statement"
      todo={["Run automated (axe/Lighthouse) and manual keyboard and screen-reader tests", "Record results and known issues here", "Only claim a WCAG level after it is evidenced"]}
      sections={[
        ["Our aim", "We aim to make this website usable with a keyboard and assistive technology. It uses semantic HTML, a skip-to-content link, visible focus states, labelled form fields, responsive layouts, and reduced-motion support for animation."],
        ["Status", "Accessibility has not yet been independently audited. We do not claim conformance with WCAG or any certification. Testing is planned and results will be published here."],
        ["Known limitations", "[TO BE FILLED after testing.] Interactive diagrams and demos may have gaps we have not yet identified. Embedded third-party content, such as a future scheduling tool, may not meet our standards."],
        ["Tell us about a problem", `Email ${SITE.email} with the page and what went wrong. We will review reports and work to fix them.`],
      ]}
    />
  );
}
