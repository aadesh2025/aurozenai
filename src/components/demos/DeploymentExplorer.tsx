"use client";
import Link from "next/link";
import { useState } from "react";

const MODELS = [
  { id: "client", name: "Client-managed infrastructure", flow: ["Your users", "Your servers / cloud", "AI services (as agreed)"], run: "Components run in your environment.", you: "Infrastructure, access, security policies.", us: "Build, deploy guidance, documentation.", maint: "Agreed support covers updates and troubleshooting.", sec: "You control the network and data location.", limit: "Needs your infrastructure team's involvement." },
  { id: "aurozen", name: "AUROZEN-managed infrastructure", flow: ["Your users", "AUROZEN-managed hosting", "Your business APIs"], run: "Components run in hosting we operate.", you: "Provide API access and content.", us: "Operate, monitor, and update the system.", maint: "Under an agreed support arrangement.", sec: "Access and data handling must be documented and agreed.", limit: "Only where we can support the arrangement." },
  { id: "embed", name: "Inside an existing client application", flow: ["Your application", "Integration layer", "AI components"], run: "AI features are added to software you already use.", you: "Application access and release process.", us: "Build and integrate the components.", maint: "Changes follow your release cycle.", sec: "Depends on your application's controls.", limit: "Feasibility depends on available APIs." },
  { id: "hybrid", name: "Hybrid", flow: ["Your systems", "Split components", "Managed services"], run: "Sensitive parts stay with you; others are hosted elsewhere.", you: "Define what must stay in your environment.", us: "Design the split and secure connections.", maint: "Shared responsibilities defined in writing.", sec: "More boundaries to secure and document.", limit: "More design and coordination effort." },
];

export function DeploymentExplorer() {
  const [id, setId] = useState("client");
  const m = MODELS.find((x) => x.id === id)!;
  const rows = [["Where it runs", m.run], ["Client provides", m.you], ["AUROZEN provides", m.us], ["Maintenance", m.maint], ["Security", m.sec], ["Limitations", m.limit]];
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Deployment model">
        {MODELS.map((x) => <button key={x.id} role="radio" aria-checked={id === x.id} onClick={() => setId(x.id)} className={`rounded-full border px-4 py-1.5 text-sm ${id === x.id ? "border-violet bg-violet text-white" : "border-line bg-surface-2"}`}>{x.name}</button>)}
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-2" aria-live="polite">
        <div className="flex flex-col items-stretch gap-1 rounded-xl theme-dark p-6 text-ink">
          <p className="font-mono text-xs text-accent">Illustrative architecture</p>
          {m.flow.map((f, i) => (<div key={f}><div className="rounded-lg border border-ink/15 bg-ink/5 px-4 py-3 text-center text-sm">{f}</div>{i < m.flow.length - 1 && <div className="mx-auto h-4 w-px bg-accent" />}</div>))}
        </div>
        <dl className="space-y-3 text-sm">{rows.map(([k, v]) => <div key={k} className="rounded-lg border border-line bg-surface-2 p-3"><dt className="font-medium">{k}</dt><dd className="text-muted">{v}</dd></div>)}</dl>
      </div>
      <p className="mt-4 text-xs text-muted">Models are illustrative. Availability depends on what we can support for your project. <Link href="/services/ai-integration" className="text-accent">AI Integration</Link> · <Link href="/services/ai-support-maintenance" className="text-accent">Support</Link></p>
    </div>
  );
}
