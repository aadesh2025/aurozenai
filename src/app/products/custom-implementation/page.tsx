import type { Metadata } from "next";
import { Bullets, FinalCta, Hero, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/products/custom-implementation" }, description: "Use VICERO as provided or commission AUROZEN AI to configure, integrate, and extend it for your business.", title: "SaaS and Custom Implementation" };

export default function Page() {
  return (
    <>
      <Hero title="SaaS and Custom Implementation" text={`Use ${SITE.product.name} as provided, or commission a tailored implementation. Scope is determined after discovery.`} trail={[["Products"], ["Custom Implementation"]]} />
      <Section title="When a custom implementation helps">
        <Bullets items={["Help configuring the platform", "Knowledge-base setup", "Integration with existing software", "Custom workflows", "Additional business-specific functionality", "Deployment guidance", "Ongoing support"]} />
      </Section>
      <FinalCta title="Discuss your implementation" label="Contact AUROZEN AI" href="/contact" />
    </>
  );
}
