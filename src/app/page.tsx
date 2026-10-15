import Image from "next/image";
import Link from "next/link";
import { Btn, Container, FinalCta, Section, Pill } from "@/components/ui";
import { SystemDiagram } from "@/components/SystemDiagram";
import { SystemsExplorer } from "@/components/demos/SystemsExplorer";
import { ScrollStory } from "@/components/demos/ScrollStory";
import { ProblemMapper } from "@/components/demos/ProblemMapper";
import { Panels } from "@/components/demos/Panels";
import { VoiceDemo } from "@/components/demos/VoiceDemo";
import { RoiCalculator } from "@/components/demos/RoiCalculator";
import { PhaseExplorer } from "@/components/demos/PhaseExplorer";
import { AutomationBuilder } from "@/components/demos/AutomationBuilder";
import { FaqList } from "@/components/FaqList";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

const PANELS = ["ai-consulting", "ai-audit", "ai-automation", "ai-agents", "ai-integration", "intelligent-business-systems"].map((slug) => {
  const s = SERVICES.find((x) => x.slug === slug)!;
  return { slug, name: s.name, short: s.short, bullets: s.examples.slice(0, 3) };
});
const TICKER = ["AI consulting", "AI auditing", "Workflow automation", "AI agents", "Chatbots", "RAG & knowledge systems", "Voice agents", "Integrations", "Business systems", "Support & maintenance"];
const FAQ = [
  { q: "Do you only build chatbots?", a: "No. Chatbots are one capability. We also do consulting, audits, automation, agents, knowledge systems, voice, and integrations." },
  { q: "Do I have to replace my existing software?", a: "No. We aim to integrate with the tools you already use, where they offer the access we need." },
  { q: "What does a project cost?", a: "Implementation work is scoped after discovery and quoted as a tailored proposal." },
  { q: "Will the AI always be right?", a: "No AI system is. We design for testing, source citations, fallbacks, and human review where it matters." },
  { q: "Where do we start?", a: "Describe your problem above, take the readiness assessment, or book a consultation." },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal">
            <Pill>AI consultancy and implementation, built from India for the world</Pill>
            <h1 className="mt-7 text-balance text-[2.7rem] leading-[1] text-ink sm:text-7xl lg:text-[5.4rem]">
              Intelligent systems for businesses that <em className="text-accent">actually</em> run.
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              We find where AI is worth using, automate the workflows behind it, and wire it into the software you already own.
            </p>
          </div>
            <div className="reveal hidden [animation-delay:150ms] sm:block"><SystemDiagram /></div>
          </div>
          <div className="reveal mt-12 grid items-start gap-8 [animation-delay:150ms] lg:grid-cols-[1.2fr_1fr]">
            <ProblemMapper />
            <div className="flex flex-col gap-3 lg:pt-2 [&>a]:justify-center">
              <Btn href="/start-project">Start a project</Btn>
              <Btn href="/assessment" ghost>Take the readiness assessment</Btn>
              <p className="mt-2 hidden text-sm text-muted md:block">Or press <kbd className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-xs">Ctrl K</kbd> to search the whole site.</p>
            </div>
          </div>
        </Container>
      </section>

      <div className="overflow-hidden border-y border-line py-4" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-sm text-muted">
          {[...TICKER, ...TICKER].map((t, i) => <span key={i} className="flex items-center gap-12">{t}<span className="text-accent">✦</span></span>)}
        </div>
      </div>

      <Section title="What we build" lede="Hover or tap a capability. Each one has its own page with how we approach it and what you receive.">
        <Panels items={PANELS} />
        <p className="mt-6 text-sm text-muted">
          Also: <Link href="/services/ai-chatbots" className="text-ink underline-offset-4 hover:underline">Chatbots</Link>, <Link href="/services/rag-knowledge-systems" className="text-ink underline-offset-4 hover:underline">Knowledge systems</Link>, <Link href="/services/ai-voice-agents" className="text-ink underline-offset-4 hover:underline">Voice agents</Link>, <Link href="/services/ai-support-maintenance" className="text-ink underline-offset-4 hover:underline">Support and maintenance</Link>.
        </p>
      </Section>

      <Section dark title="Explore a system" lede="Select a component to see what it does and how it connects. Illustrative architecture, not a client deployment.">
        <SystemsExplorer />
      </Section>

      <Section title="Build a workflow, then run it" lede="Pick a trigger, add steps, press Run. A browser-only simulation. Nothing is sent anywhere.">
        <AutomationBuilder />
      </Section>

      <Section dark title="Hear a voice agent work" lede="A fictional clinic call, spoken by your browser, with the tool calls the system would make.">
        <VoiceDemo />
      </Section>

      <Section title="What could you win back?" lede="Move the sliders to your own numbers. It is arithmetic on your inputs, not a promise.">
        <RoiCalculator />
      </Section>

      <Section title="How an integrated support system works" lede="Six stages from a customer message to a resolved case, with a person in the loop where it matters.">
        <ScrollStory />
      </Section>

      <Section dark title="How a project runs" lede="Eight phases. Click through to see what you do and what we do at each one.">
        <PhaseExplorer />
        <Link href="/company/how-we-work" className="mt-10 inline-block text-sm text-accent">The full client journey →</Link>
      </Section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="card spot grid gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:p-14">
            <div>
              <Pill>Our product</Pill>
              <h2 className="mt-5 text-5xl leading-none text-ink md:text-6xl">{SITE.product.name}</h2>
              <p className="mt-5 max-w-md text-muted">Our SaaS platform for building and running AI assistants. When you need more than the standard product, our team handles configuration, integrations, and custom work.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="/products/vicero">About {SITE.product.name}</Btn>
                {SITE.product.appUrl && <Btn href={SITE.product.appUrl} ghost>Open the app</Btn>}
              </div>
            </div>
            <div className="self-center">
              <Image src="/vicero/dark/inbox.png" alt="The VICERO inbox: a customer asks about delivery, the agent answers, and a person takes over" width={2160} height={1350} sizes="(min-width:1024px) 520px, 100vw" className="h-auto w-full rounded-2xl border border-line" />
              <p className="mt-2 text-xs text-muted">Real app, invented demo data.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section title="Questions, answered">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <p className="max-w-xs text-muted">More in the <Link href="/resources/faq" className="text-accent underline underline-offset-4">full FAQ</Link>.</p>
          <FaqList items={FAQ} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
