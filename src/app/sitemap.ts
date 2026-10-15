import type { MetadataRoute } from "next";
import { SITE, NAV } from "@/lib/site";
import { ROLES } from "@/lib/partners";
import { ARTICLES, PROJECTS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/start-project", "/legal/privacy", "/legal", "/legal/terms-of-use", "/legal/cookies", "/legal/ai-disclaimer", "/legal/data-rights", "/legal/contact", "/legal/data-processing", "/legal/accessibility"]);
  NAV.forEach((g) => g.items?.forEach((i) => paths.add(i.href)));
  ROLES.forEach((r) => paths.add(`/partners/${r.slug}`));
  paths.add("/partners/apply");
  ARTICLES.forEach((a) => paths.add(`/insights/${a.slug}`));
  PROJECTS.forEach((p) => paths.add(`/work/${p.slug}`));
  return [...paths].map((p) => ({ url: `${SITE.url}${p}` }));
}
