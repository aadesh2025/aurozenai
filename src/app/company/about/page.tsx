import type { Metadata } from "next";
import Link from "next/link";
import { Btn, FinalCta, Hero, Section } from "@/components/ui";
import { CapabilityStatus } from "@/components/demos/CapabilityStatus";

export const metadata: Metadata = { alternates: { canonical: "/company/about" }, title: "About", description: "AUROZEN AI is an early-stage AI consultancy and implementation company, built from India for international clients." };

const PRINCIPLES = [
  ["Business first, technology second", "We start from the process and the outcome. If AI is not the right tool, we say so."],
  ["Honest scoping", "What is feasible, what is not, and what we have not done before. No inflated claims."],
  ["Fit your existing tools", "We integrate where feasible rather than asking you to replace your stack."],
  ["Test the failures", "Normal paths are easy. We test timeouts, bad data, and unavailable services too."],
  ["People in the loop", "Human review where mistakes are costly, designed in from the start."],
  ["Say what is real", "We separate what is built, what is a prototype, and what is planned."],
];

export default function About() {
  return (
    <>
      <Hero title="An AI company that treats engineering as the product." text="AUROZEN AI is an early-stage consultancy and implementation company. We help businesses use AI where it genuinely improves operations, and build the systems that make it dependable." trail={[["Company"], ["About"]]}>
        <Btn href="/start-project">Work with us</Btn>
        <Btn href="/partners" ghost>Partner with us</Btn>
      </Hero>

      <Section title="Why we exist" lede="Many businesses are told they need AI and left alone with a demo. The distance between a demo and a system that runs inside daily operations is where most projects fail.">
        <div className="grid gap-10 md:grid-cols-3">
          {[["The gap", "Tools that look good in a pitch but do not connect to the CRM, the inbox, or the phone."], ["Our job", "Understand the process, pick the simplest approach that works, and build it into your real tools."], ["Our promise", "Plain scoping, tested systems, and support you can ask questions of. Not guaranteed outcomes."]].map(([h, p]) => (
            <div key={h} className="border-t border-ink pt-5"><h3 className="text-xl font-medium">{h}</h3><p className="mt-2 text-muted">{p}</p></div>
          ))}
        </div>
      </Section>

      <Section dark title="How we work" lede="Six principles we hold ourselves to.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(([h, p]) => (<div key={h} className="card p-6"><h3 className="text-lg font-medium">{h}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{p}</p></div>))}
        </div>
      </Section>

      <Section title="What we do today, and what is coming" lede="A straight answer to what is available now versus what depends on the project or is still on the roadmap.">
        <CapabilityStatus />
      </Section>

      <Section dark title="Where we are headed">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <p className="max-w-xl text-lg leading-relaxed text-ink/85">We are building toward consulting, automation, agents, knowledge systems, and voice for businesses across the US, UK, Canada, Australia, Europe, and India, alongside our own SaaS product, VICERO. We grow capabilities as we can support them well, and we say so plainly.</p>
          <div className="card p-6"><h3 className="font-ui text-lg">Want to help build it?</h3><p className="mt-2 text-sm text-muted">We are looking for sales partners, business developers, and AI specialists on flexible, clearly agreed terms.</p><Link href="/partners" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">See opportunities</Link></div>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
