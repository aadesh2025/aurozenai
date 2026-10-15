"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ROLES } from "@/lib/partners";

type D = Record<string, string>;
const STEPS = ["About you", "Opportunity", "Experience", "Availability", "Expectations", "Review"];
const inp = "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-accent";

export function ApplyWizard() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<D>({ consent: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("role");
    const role = ROLES.find((x) => x.slug === r);
    if (role) setD((x) => ({ ...x, role: role.title }));
  }, []);

  const set = (k: string, v: string) => setD((x) => ({ ...x, [k]: v }));
  const role = ROLES.find((r) => r.title === d.role);
  const track = role?.track;
  const isSales = role?.group.startsWith("Sales") || /sales|business development/i.test(d.role ?? "");
  const isTech = track === "Technical";
  const isOps = role?.group.startsWith("Client");

  const F = ({ k, label, area, type = "text", required, hint, opts }: { k: string; label: string; area?: boolean; type?: string; required?: boolean; hint?: string; opts?: string[] }) => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-medium">{label}{required && " *"}</label>
      {opts ? (
        <select id={k} value={d[k] ?? ""} onChange={(e) => set(k, e.target.value)} className={inp}><option value="">Select…</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>
      ) : area ? (
        <textarea id={k} rows={4} value={d[k] ?? ""} onChange={(e) => set(k, e.target.value)} className={inp} maxLength={1500} />
      ) : (
        <input id={k} type={type} value={d[k] ?? ""} onChange={(e) => set(k, e.target.value)} className={inp} maxLength={300} />
      )}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {tried && required && !(d[k] ?? "").trim() && <p className="mt-1 text-xs text-red-500" role="alert">This field is required.</p>}
    </div>
  );

  const need: string[][] = [["name", "email"], ["role", "arrangement"], ["experience"], [], ["interest", "terms"], ["consent"]];
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "");
  const valid = need[step].every((k) => (d[k] ?? "").trim()) && (step !== 0 || okEmail);

  const next = () => { setTried(true); if (valid) { setStep(step + 1); setTried(false); } };

  async function submit() {
    setState("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ form: "partner-application", ...d }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error ?? "Could not submit");
      setState("done");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Error");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-8">
        <h2 className="text-4xl">Application received</h2>
        <p className="mt-3 max-w-xl text-muted">Thank you{d.name ? `, ${d.name.split(" ")[0]}` : ""}. We review applications by hand. If there is a possible fit we will email you to talk about the role, expectations, and terms. Not every application leads to a collaboration, and no arrangement exists until it is agreed and documented.</p>
        <Link href="/partners" className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Back to opportunities</Link>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-2 text-xs" aria-label="Progress">
        {STEPS.map((s, i) => <li key={s} aria-current={i === step} className={`rounded-full px-3 py-1.5 ${i === step ? "bg-ink text-paper" : i < step ? "bg-accent/15 text-accent" : "border border-line text-muted"}`}>{i + 1}. {s}</li>)}
      </ol>
      <div className="space-y-5">
        {step === 0 && (<>
          <F k="name" label="Full name" required />
          <F k="email" label="Email address" type="email" required />
          <div className="grid gap-5 sm:grid-cols-2"><F k="country" label="Country" /><F k="city" label="City or region (optional)" /></div>
          <F k="contact_pref" label="Preferred contact method (optional)" opts={["Email", "Video call", "Phone", "Chat"]} />
          <F k="profile" label="Portfolio or professional profile URL (optional)" />
          <p className="text-xs text-muted">We do not ask for your home address, ID numbers, or bank details.</p>
        </>)}
        {step === 1 && (<>
          <F k="role" label="Primary role of interest" required opts={ROLES.map((r) => r.title)} />
          <F k="role2" label="Secondary role (optional)" opts={ROLES.map((r) => r.title)} />
          <F k="arrangement" label="Preferred collaboration type" required opts={["Part-time", "Project-based", "Flexible collaboration", "Open to discussing"]} />
          <F k="place" label="Working arrangement" opts={["Remote", "Hybrid", "Location-dependent is fine"]} />
          {role && <p className="rounded-2xl border border-line bg-surface p-4 text-sm text-muted"><b className="text-ink">{role.title}:</b> {role.status}. Pay model: {role.compensation}. <Link href={`/partners/${role.slug}`} className="text-accent underline">Read the role</Link>.</p>}
        </>)}
        {step === 2 && (<>
          <F k="status" label="Current professional status" opts={["Student", "Homemaker", "Freelancer", "Employed", "Between roles", "Business owner"]} />
          <F k="experience" label="Relevant experience" area required hint="Short and honest is fine. Beginners: tell us what you have learned or done." />
          <F k="skills" label="Skills, tools, and technologies" area />
          {isSales && (<>
            <F k="s_leads" label="Have you generated leads before? Describe." area />
            <F k="s_meetings" label="Have you booked qualified meetings or closed B2B deals?" area />
            <F k="s_markets" label="Industries or countries you have worked with" />
            <F k="s_results" label="Results you can substantiate" area />
            <F k="s_commission" label="Are you comfortable with an agreed commission-based arrangement?" opts={["Yes", "Maybe, I want to discuss terms", "No"]} />
          </>)}
          {isTech && (<>
            <F k="t_tools" label="Tools and frameworks you use" />
            <F k="t_projects" label="Projects you personally built" area />
            <F k="t_kind" label="Were they production, prototype, or learning projects?" opts={["Production", "Prototype", "Learning projects", "A mix"]} />
            <F k="t_owned" label="Which parts did you personally implement?" area />
          </>)}
          {isOps && (<>
            <F k="o_coord" label="Have you coordinated clients or projects before?" area />
            <F k="o_tools" label="Project-tracking tools you use" />
            <F k="o_handle" label="How do you handle delays, unclear requirements, and client questions?" area />
          </>)}
          <F k="examples" label="One or two examples of relevant work (links welcome)" area />
        </>)}
        {step === 3 && (<>
          <div className="grid gap-5 sm:grid-cols-2"><F k="hours" label="Approximate hours per week" /><F k="start" label="Earliest start date" type="date" /></div>
          <F k="days" label="Preferred working days" />
          <F k="tz" label="Time zone and preferred communication hours" />
          <F k="future" label="Interested in" opts={["Part-time only", "Project-based only", "Part-time now, possibly full-time later", "Full-time"]} />
        </>)}
        {step === 4 && (<>
          <F k="interest" label="What interests you about AUROZEN AI?" area required />
          <F k="contribute" label="What would you like to contribute?" area />
          <F k="goals" label="Short-term professional goals" area />
          <F k="comp" label="Your compensation expectations" area hint="There is no guaranteed salary. See the disclosed structures on the Partners page." />
          <F k="terms" label="Are you willing to consider the disclosed compensation structure?" required opts={["Yes", "Yes, after discussing terms", "No"]} />
          <F k="longterm" label="Interested in a possible long-term partnership if a suitable opportunity develops?" opts={["Yes", "Maybe", "Not now"]} />
          <p className="text-xs text-muted">A long-term partnership is not guaranteed.</p>
        </>)}
        {step === 5 && (<>
          <dl className="card divide-y divide-line text-sm">
            {Object.entries(d).filter(([k, v]) => v && k !== "consent").map(([k, v]) => <div key={k} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr]"><dt className="capitalize text-muted">{k.replace(/_/g, " ")}</dt><dd className="whitespace-pre-wrap">{v}</dd></div>)}
          </dl>
          <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={d.consent === "yes"} onChange={(e) => set("consent", e.target.checked ? "yes" : "")} className="mt-1 h-4 w-4 accent-[var(--accent)]" /><span>I agree that AUROZEN AI may process this information to evaluate my application and contact me. See the <Link href="/legal/privacy" className="text-accent underline">Privacy Policy</Link>. *</span></label>
          {tried && !d.consent && <p className="text-xs text-red-500" role="alert">Consent is required to submit.</p>}
          {state === "error" && <p role="alert" className="text-sm text-red-500">{msg}</p>}
        </>)}
      </div>
      <div className="mt-8 flex gap-3">
        {step > 0 && <button onClick={() => { setStep(step - 1); setTried(false); }} className="rounded-full border border-line px-6 py-3 text-sm">Back</button>}
        {step < 5 ? <button onClick={next} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">Continue</button> : <button onClick={() => { setTried(true); if (d.consent) submit(); }} disabled={state === "sending"} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-50">{state === "sending" ? "Submitting…" : "Submit application"}</button>}
      </div>
    </div>
  );
}
