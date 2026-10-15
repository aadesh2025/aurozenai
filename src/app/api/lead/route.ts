import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";


// Delivery order: Gmail (if GMAIL_APP_PASSWORD set) -> webhook (if LEAD_WEBHOOK_URL set) -> local leads/leads.jsonl.
// The local file is always written in non-serverless setups so a lead is never lost.
const MAX = 4000;
const rateMap = new Map<string, number[]>();
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= 5) return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  rateMap.set(ip, [...hits, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const form = String(body.form ?? "contact").replace(/[^a-z-]/gi, "").slice(0, 40) || "contact";
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "website" || k === "form") continue;
    fields[k.slice(0, 60)] = String(v ?? "").slice(0, MAX);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "")) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 422 });
  }

  const payload = { form, receivedAt: new Date().toISOString(), fields };
  let delivered = false;

  const user = process.env.GMAIL_USER ?? "aurozenai@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (pass) {
    try {
      const t = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
      const rows = Object.entries(fields).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("");
      await t.sendMail({
        from: `AUROZEN AI Website <${user}>`,
        to: user,
        replyTo: fields.email,
        subject: `[AUROZEN AI] New ${form} inquiry${fields.name ? ` from ${fields.name.replace(/[\r\n]/g, " ")}` : ""}`,
        html: `<table>${rows}</table>`,
        text: Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n"),
      });
      delivered = true;
    } catch (e) {
      console.error("[lead] gmail failed", e instanceof Error ? e.message : e);
    }
  }

  // No app password needed: Web3Forms (WEB3FORMS_KEY) or, by default, FormSubmit to the business inbox.
  if (!delivered) {
    const subject = `[AUROZEN AI] New ${form} inquiry${fields.name ? ` from ${oneLine(fields.name)}` : ""}`;
    const body = JSON.stringify({ ...fields, _subject: subject, _template: "table", _captcha: "false" });
    try {
      const key = process.env.WEB3FORMS_KEY;
      const r = key
        ? await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ access_key: key, subject, from_name: "AUROZEN AI Website", replyto: fields.email, ...fields }) })
        : await fetch(`https://formsubmit.co/ajax/${user}`, { method: "POST", headers: { "content-type": "application/json", accept: "application/json", origin: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurozenai.vercel.app", referer: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurozenai.vercel.app") + "/" }, body });
      const j = await r.json().catch(() => ({}));
      if (r.ok && (j.success === true || j.success === "true")) delivered = true;
      else console.error("[lead] relay failed", r.status, JSON.stringify(j).slice(0, 200));
    } catch (e) {
      console.error("[lead] relay error", e instanceof Error ? e.message : e);
    }
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (r.ok) delivered = true;
    } catch (e) {
      console.error("[lead] webhook failed", e instanceof Error ? e.message : e);
    }
  }

  try {
    const dir = path.join(process.cwd(), "leads");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(payload) + "\n");
    delivered = true;
  } catch {
    // read-only filesystem (e.g. serverless); rely on email/webhook
  }

  if (!delivered) {
    return NextResponse.json({ ok: false, error: `Could not deliver your message. Please email ${user} directly.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
