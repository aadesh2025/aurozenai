import type { MetadataRoute } from "next";
import { SITE, NAV } from "@/lib/site";
import { ROLES } from "@/lib/partners";
import { ARTICLES, PROJECTS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/start-project", "/legal/privacy", "/legal", "/legal/terms-of-use", "/legal/cookies", "/legal/ai-disclaimer", "/legal/data-rights", "/legal/contact", "/legal/data-processing", "/legal/accessibility"]);
  NAV.forEach((g) => g.items?.forEach((i) => paths.add(i.href)));
  ROLES.forEach((r) => paths.add(`/partners/${r.slug}`));
  SITE.bookings.forEach((b) => paths.add(`/book/${b.slug}`));
  ARTICLES.forEach((a) => paths.add(`/insights/${a.slug}`));
  PROJECTS.forEach((p) => paths.add(`/work/${p.slug}`));
  const now = new Date();
  const prio = (p: string) => (p === "/" ? 1 : p.startsWith("/services/") || p === "/start-project" || p === "/products/vicero" ? 0.9 : p.startsWith("/legal") || p === "/accessibility" || p === "/sitemap" ? 0.3 : 0.6);
  return [...paths].map((p) => ({ url: `${SITE.url}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: p === "/" || p === "/insights" ? ("weekly" as const) : ("monthly" as const), priority: prio(p) }));
}
