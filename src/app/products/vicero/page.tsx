import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Btn, FinalCta, Hero, Rail, Section } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { ViceroTour } from "@/components/demos/ViceroTour";
import { SITE } from "@/lib/site";

const APP = SITE.product.appUrl ?? "https://vicero-ai.vercel.app/";
const base = APP.replace(/\/$/, "");

export const metadata: Metadata = { alternates: { canonical: "/products/vicero" },
  title: "VICERO",
  description: "VICERO answers customers from your own documents, on your website, WhatsApp and Instagram, shows the source of each answer, and hands over to a person when it is not sure.",
};

const IDEAS = [
  ["Answers from your documents", "Upload files and web pages. Every reply is written from them and names its source."],
  ["People stay in control", "When the agent is not sure, a person takes over with the whole conversation in front of them."],
  ["Automations that wait for approval", "Build workflows with conditions and calls to your tools. Risky steps pause for a person."],
];

const STEPS = [
  ["Add what you know", "Upload documents and web pages. VICERO indexes them and shows which are ready."],
  ["Set up the agent once", "Give it a persona and its documents, then connect your channels."],
  ["It answers with sources", "Each reply points to the passage it came from. If the answer is not in your documents, it offers a person instead of inventing one."],
  ["Your team steps in", "Conversations land in one inbox. Take over, approve actions, and watch results in analytics."],
];

const SAFE = [
  ["It says when it does not know", "If the answer is not in your documents, the agent offers a person instead of inventing a policy."],
  ["Documents cannot give it orders", "Retrieved text is treated as data. A planted instruction inside a file is neutralised before the model sees it."],
  ["Tenants are isolated", "Every query is scoped to the organisation, enforced where data is fetched."],
  ["Integrations are signed", "Webhooks and n8n calls are signed in both directions."],
  ["Changes are logged", "Admins can see who changed what, and when."],
  ["Risky steps wait", "An approval pauses a run and carries on when someone approves or rejects it."],
];

export default function Page() {
  return (
    <>
      <Hero
        title="Answer customers from your own documents."
        text="VICERO replies on your website, WhatsApp, and Instagram, shows which passage each answer came from, and hands over to a person when it is not sure. It is our own SaaS platform."
        trail={[["Products"], ["VICERO"]]}
        aside={
          <div className="card reveal overflow-hidden p-2 [animation-delay:150ms]">
            <Image src="/vicero/light/dashboard.png" alt="The VICERO dashboard: conversations over 30 days, resolution rate, and channel breakdown" width={2160} height={1350} priority sizes="(min-width:1024px) 560px, 100vw" className="h-auto w-full rounded-xl border border-line" />
          </div>
        }
      >
        <Btn href={APP}>Open VICERO</Btn>
        <Btn href="/book-consultation" ghost>Request a demonstration</Btn>
      </Hero>

      <Section title="Three ideas behind it">
        <Rail cols="md:grid-cols-3">
          {IDEAS.map(([h, p]) => (
            <div key={h} className="card p-7"><h3 className="text-xl font-medium">{h}</h3><p className="mt-3 text-[16.5px] leading-relaxed text-muted">{p}</p></div>
          ))}
        </Rail>
      </Section>

      <Section dark title="Your support desk in one place" lede="Click through the real product. Switch the screenshot theme to see both.">
        <ViceroTour />
      </Section>

      <Section title="How it works">
        <ol className="grid gap-4 md:grid-cols-4">
          {STEPS.map(([h, p], i) => (
            <li key={h} className="card p-6"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-2 text-lg font-medium">{h}</h3><p className="mt-2 text-[15.5px] leading-relaxed text-muted">{p}</p></li>
          ))}
        </ol>
      </Section>

      <Section dark title="One agent on every channel" lede="Write it once. Every channel runs the same agent and the same documents, so an answer on WhatsApp matches the answer on your website.">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Website widget", "A small chat in the corner of any page. The answer names the document it came from."], ["WhatsApp", "Reply to customers where they already message you."], ["Instagram", "Answer direct messages with the same agent."]].map(([h, p]) => (
            <div key={h} className="card p-7"><h3 className="text-xl font-medium">{h}</h3><p className="mt-3 text-[16.5px] text-muted">{p}</p></div>
          ))}
        </div>
      </Section>

      <Section title="Built to stay in bounds" lede="From VICERO's own security notes. Read the full page for what is and is not done yet.">
        <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {SAFE.map(([h, p]) => (
            <li key={h} className="border-b border-line py-5"><h3 className="text-lg font-medium">{h}</h3><p className="mt-1 text-[16px] text-muted">{p}</p></li>
          ))}
        </ul>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {[["Product", "/product"], ["Knowledge", "/knowledge"], ["Automations", "/automations"], ["Security", "/security"], ["Developers", "/developers"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <a key={h} href={`${base}${h}`} className="text-accent underline underline-offset-4">{l} on VICERO →</a>
          ))}
        </p>
      </Section>

      <Section dark title="Product or project?" lede="Use the platform as it is, or have AUROZEN AI build around it.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-8"><h3 className="font-ui text-2xl">Use it as provided</h3><p className="mt-3 text-[16.5px] text-muted">Sign up, add your documents, connect a channel, and run your agent yourself. VICERO lists a free trial on its site.</p><Link href={APP} className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">Explore the platform</Link></div>
          <div className="card p-8"><h3 className="font-ui text-2xl">Add AUROZEN AI on top</h3><p className="mt-3 text-[16.5px] text-muted">Configuration, knowledge-base setup, integrations with your software, custom workflows, and ongoing support. Scoped after discovery.</p><Link href="/products/custom-implementation" className="mt-6 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium">Custom implementation</Link></div>
        </div>
      </Section>

      <Section title="Questions">
        <div className="grid gap-10 md:grid-cols-[1fr_1.8fr]">
          <p className="max-w-xs text-lg text-muted">Anything about VICERO, ask us.</p>
          <FaqList items={[
            { q: "Is VICERO separate from AUROZEN AI services?", a: "Yes. VICERO is its own application with its own terms and sign-up. Our agency work can configure and extend it for you." },
            { q: "Does it always answer correctly?", a: "No AI does. It shows the source of each answer so people can check it, and hands over to a person when it is not sure." },
            { q: "Where do I see pricing?", a: "On VICERO's own pricing page. We do not quote it here." },
            { q: "Can you connect it to my CRM or tools?", a: "Often, where the tool offers the access we need. That is scoped as a custom implementation." },
          ]} />
        </div>
      </Section>

      <FinalCta title="Need more than the standard product?" label="Custom implementation" href="/products/custom-implementation" />
    </>
  );
}
