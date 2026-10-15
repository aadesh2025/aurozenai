import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/content";
import { SITE } from "@/lib/site";

// Site concierge. Uses Groq when GROQ_API_KEY is set; otherwise answers from site content with simple matching.
const rate = new Map<string, number[]>();

const FACTS = [
  "AUROZEN AI is an early-stage AI consultancy and implementation company operated from India.",
  ...SERVICES.map((s) => `${s.name} (/services/${s.slug}): ${s.short}`),
  ...INDUSTRIES.map((i) => `Industry ${i.name} (/industries/${i.slug}): ${i.intro}`),
  `SaaS product: ${SITE.product.name} (${SITE.product.appUrl}); custom work at /products/custom-implementation.`,
  "Contact: /contact. Start a project: /start-project. Book a call: /book-consultation. Readiness assessment: /assessment.",
].join("\n");

const SYSTEM = `You are the website assistant for AUROZEN AI. Answer briefly (max 90 words) using ONLY the facts below.
Rules: never state prices or estimates; never promise outcomes, accuracy, certifications, or client results; if unsure or the question is outside these facts, say you are not sure and suggest /contact. When relevant, name one page path to visit. You are an AI, say so if asked.
FACTS:\n${FACTS}`;

function local(q: string) {
  const t = q.toLowerCase();
  const hit = SERVICES.map((s) => ({ s, score: [s.name, s.short, ...s.examples].join(" ").toLowerCase().split(/\W+/).filter((w) => w.length > 3 && t.includes(w)).length })).sort((a, b) => b.score - a.score)[0];
  if (/price|cost|how much|quote|rate/.test(t)) return "Pricing is set per project after discovery, so we do not publish estimates. Describe what you need at /start-project for a tailored proposal.";
  if (/vicero|saas|product/.test(t)) return `${SITE.product.name} is our SaaS platform for AI assistants. Details at /products/vicero, and custom work at /products/custom-implementation.`;
  if (/book|call|meeting|consult/.test(t)) return "You can request a consultation at /book-consultation. Online scheduling is being connected, so the form there is the quickest route.";
  if (hit && hit.score > 0) return `${hit.s.name}: ${hit.s.short} More at /services/${hit.s.slug}.`;
  return "I am not sure about that one. The best route is /contact, or try the readiness assessment at /assessment to find the right starting point.";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "x";
  const now = Date.now();
  const hits = (rate.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= 12) return NextResponse.json({ reply: "You are sending messages quickly. Please wait a moment." }, { status: 429 });
  rate.set(ip, [...hits, now]);

  let msgs: { role: string; content: string }[] = [];
  try {
    const b = await req.json();
    msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-8).map((m: { role: string; content: string }) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content).slice(0, 600) }));
  } catch {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }
  const last = msgs.filter((m) => m.role === "user").at(-1)?.content ?? "";
  if (!last) return NextResponse.json({ reply: "Ask me about our services, process, or VICERO." });

  const key = process.env.GROQ_API_KEY;
  if (key) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({ model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile", temperature: 0.3, max_tokens: 220, messages: [{ role: "system", content: SYSTEM }, ...msgs] }),
      });
      if (r.ok) {
        const j = await r.json();
        const reply = j.choices?.[0]?.message?.content;
        if (reply) return NextResponse.json({ reply: String(reply), live: true });
      }
    } catch {
      // fall through to local answer
    }
  }
  return NextResponse.json({ reply: local(last), live: false });
}
