import type { Metadata } from "next";
import { ARTICLES } from "@/lib/content";
import { ArticleSearch } from "@/components/Interactive";
import { Hero, Section } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/insights" }, description: "Practical articles on AI consulting, automation, agents, knowledge systems, voice, and integrating AI into existing software.", title: "Insights" };

export default function Insights() {
  return (
    <>
      <Hero title="Insights" text="Practical writing on AI consulting, automation, agents, knowledge systems, and integration." trail={[["Insights"]]} />
      <Section>
        <ArticleSearch items={ARTICLES.map(({ slug, title, category, intro }) => ({ slug, title, category, intro }))} />
      </Section>
    </>
  );
}
