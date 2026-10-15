"use client";
import { useState, FormEvent } from "react";
import { SERVICE_OPTIONS } from "@/lib/site";

async function send(form: string, data: Record<string, string>) {
  const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ form, ...data }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error ?? "Something went wrong");
}

const input = "w-full rounded-md border border-line bg-surface-2 px-3.5 py-3 text-base sm:text-sm focus:border-violet";
const label = "mb-1 block text-sm font-medium";

function Field({ name, title, type = "text", required, area, options }: { name: string; title: string; type?: string; required?: boolean; area?: boolean; options?: string[] }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{title}{required && " *"}</label>
      {options ? (
        <select id={name} name={name} required={required} className={input} defaultValue="">
          <option value="" disabled>Select…</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : area ? (
        <textarea id={name} name={name} required={required} rows={4} className={input} />
      ) : (
        <input id={name} name={name} type={type} required={required} className={input} />
      )}
    </div>
  );
}

function Honeypot() {
  return <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />;
}

function useSubmit(form: string) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [summary, setSummary] = useState<Record<string, string>>({});
  async function onSubmit(e: FormEvent<HTMLFormElement>, extra: Record<string, string> = {}) {
    e.preventDefault();
    const data = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), ...extra } as Record<string, string>;
    setState("sending");
    try {
      await send(form, data);
      setSummary(data);
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error");
      setState("error");
    }
  }
  return { state, msg, summary, onSubmit };
}

const Privacy = () => <p className="text-xs text-muted">We use this information only to respond to your inquiry. See our Privacy Policy. Please do not include confidential or sensitive data.</p>;

export function ContactForm({ form = "contact", withSystems = true }: { form?: string; withSystems?: boolean }) {
  const { state, msg, onSubmit } = useSubmit(form);
  if (state === "done") return <p className="rounded-lg border border-accent/40 bg-surface-2 p-6">Thank you. We have received your message and will reply by email.</p>;
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" title="Name" required />
        <Field name="email" title="Business email" type="email" required />
        <Field name="company" title="Company" />
        <Field name="country" title="Country" />
        <Field name="industry" title="Industry" />
        <Field name="service" title="Service of interest" options={SERVICE_OPTIONS} />
      </div>
      <Field name="problem" title="Brief problem description" area required />
      {withSystems && <Field name="systems" title="Existing systems" />}
      <Field name="preferred_contact" title="Preferred contact method" options={["Email", "Video call", "Phone"]} />
      <Privacy />
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button disabled={state === "sending"} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}

export function ConsultForm() {
  return <ContactForm form="consultation" />;
}

export function SupportForm() {
  const { state, msg, onSubmit } = useSubmit("support");
  if (state === "done") return <p className="rounded-lg border border-accent/40 bg-surface-2 p-6">Request received. We will respond by email.</p>;
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" title="Name" required />
        <Field name="email" title="Email" type="email" required />
        <Field name="company" title="Company" />
        <Field name="service" title="Affected service" options={SERVICE_OPTIONS} />
      </div>
      <Field name="issue" title="Describe the issue" area required />
      <Field name="urgency" title="Impact" options={["Question", "Minor issue", "Workflow degraded", "Workflow down"]} />
      <p className="text-xs text-muted">File attachments: not enabled yet. Reply to our confirmation email to send files.</p>
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button disabled={state === "sending"} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-60">Submit request</button>
    </form>
  );
}

const STEPS = ["Service", "Problem", "Systems", "Requirements", "Contact", "Confirm"];

export function StartProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const f = (k: string) => ({ id: k, value: data[k] ?? "", onChange: (e: { target: { value: string } }) => set(k, e.target.value), className: input });
  const valid = [!!data.service, !!data.problem, true, true, !!data.name && /\S+@\S+\.\S+/.test(data.email ?? ""), true][step];

  async function submit() {
    setState("sending");
    try {
      await send("start-project", data);
      setState("done");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Error");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="rounded-lg border border-accent/40 bg-surface-2 p-6">
        <h2 className="text-xl font-semibold">Inquiry received</h2>
        <p className="mt-2 text-sm text-muted">Next: we review your inquiry and reply by email to arrange a discovery conversation. No commitment is made at this stage.</p>
        <dl className="mt-4 space-y-1 text-sm">
          {Object.entries(data).map(([k, v]) => (<div key={k}><dt className="inline font-medium capitalize">{k.replace(/_/g, " ")}: </dt><dd className="inline">{v}</dd></div>))}
        </dl>
      </div>
    );

  return (
    <div>
      <ol className="mb-6 flex flex-wrap gap-2 text-xs" aria-label="Progress">
        {STEPS.map((s, i) => (<li key={s} className={`rounded-full px-3 py-1 ${i === step ? "bg-violet text-white" : i < step ? "bg-accent/30" : "bg-line"}`}>{i + 1}. {s}</li>))}
      </ol>
      <div className="space-y-4">
        {step === 0 && (<div><label className={label} htmlFor="service">Which service are you interested in? *</label><select {...f("service")}><option value="">Select…</option>{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></div>)}
        {step === 1 && (<>
          <div><label className={label} htmlFor="problem">What currently happens, and what should improve? *</label><textarea rows={4} {...f("problem")} /></div>
          <div><label className={label} htmlFor="outcome">Desired outcome</label><textarea rows={3} {...f("outcome")} /></div></>)}
        {step === 2 && (<div><label className={label} htmlFor="systems">CRM, databases, applications, APIs, or workflows involved</label><textarea rows={4} {...f("systems")} /></div>)}
        {step === 3 && (<>
          <div><label className={label} htmlFor="deployment">Deployment preference</label><select {...f("deployment")}><option value="">No preference</option><option>AUROZEN-managed</option><option>Client-managed cloud</option><option>Client-owned servers</option><option>Not sure</option></select></div>
          <div><label className={label} htmlFor="security">Security constraints and stakeholders</label><textarea rows={3} {...f("security")} /></div></>)}
        {step === 4 && (<div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="name">Name *</label><input {...f("name")} /></div>
          <div><label className={label} htmlFor="email">Business email *</label><input type="email" {...f("email")} /></div>
          <div><label className={label} htmlFor="company">Company</label><input {...f("company")} /></div>
          <div><label className={label} htmlFor="country">Country</label><input {...f("country")} /></div></div>)}
        {step === 5 && (<div className="rounded-lg border border-line bg-surface-2 p-5 text-sm"><h2 className="mb-2 font-semibold">Review your inquiry</h2>
          {Object.entries(data).map(([k, v]) => (<p key={k}><span className="font-medium capitalize">{k.replace(/_/g, " ")}:</span> {v}</p>))}
          {(() => { const open = [["systems", "Current systems and APIs"], ["outcome", "Desired outcome"], ["deployment", "Deployment preference"], ["security", "Security constraints and stakeholders"]].filter(([k]) => !data[k]); return open.length ? (<div className="mt-3"><p className="font-medium">Still to discuss</p><ul className="list-disc pl-5 text-muted">{open.map(([k, l]) => <li key={k}>{l}</li>)}</ul></div>) : null; })()}
          <p className="mt-3 text-xs text-muted">This is a local preview and is not sent until you submit. It is not a proposal or a feasibility guarantee. We use it only to respond to your inquiry. See our Privacy Policy.</p></div>)}
      </div>
      {state === "error" && <p role="alert" className="mt-3 text-sm text-red-600">{msg}</p>}
      <div className="mt-6 flex gap-3">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-md border border-line px-5 py-3 text-sm">Back</button>}
        {step < 5 ? (
          <button disabled={!valid} onClick={() => setStep(step + 1)} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-40">Next</button>
        ) : (
          <button disabled={state === "sending"} onClick={submit} className="rounded-md bg-violet px-5 py-3 text-sm font-medium text-white disabled:opacity-60">Submit inquiry</button>
        )}
      </div>
    </div>
  );
}
