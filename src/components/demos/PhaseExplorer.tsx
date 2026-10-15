"use client";
import { useState } from "react";
import { PHASES } from "@/lib/site";

const DETAIL: Record<string, { you: string; we: string; out: string }> = {
  Discover: { you: "Walk us through the process and goals.", we: "Interview, map the workflow, collect requirements.", out: "A shared problem statement." },
  Assess: { you: "Share access to systems and sample data.", we: "Check feasibility, risks, and integration limits.", out: "Findings and viable approaches." },
  Design: { you: "Review and approve the plan.", we: "Architecture, permissions, workflow, test plan.", out: "A design you can sign off on." },
  Build: { you: "Answer questions as they come up.", we: "Implement the agreed system.", out: "Working components." },
  Integrate: { you: "Provide credentials and API access.", we: "Connect to your existing tools.", out: "End-to-end flow in a test setup." },
  Validate: { you: "Try it with real scenarios.", we: "Test normal and failure cases, fix issues.", out: "Test results against agreed criteria." },
  Deploy: { you: "Confirm the target environment.", we: "Release to the agreed environment and document it.", out: "A live, documented system." },
  Support: { you: "Report issues and requests.", we: "Maintain, monitor, and improve as agreed.", out: "Ongoing reliability." },
};

export function PhaseExplorer() {
  const [i, setI] = useState(0);
  const p = PHASES[i];
  const d = DETAIL[p.name];
  return (
    <div>
      <div className="relative mb-8">
        <div className="absolute left-0 right-0 top-[11px] h-px bg-line" aria-hidden />
        <div className="absolute left-0 top-[11px] h-px bg-accent transition-all duration-500" style={{ width: `${(i / (PHASES.length - 1)) * 100}%` }} aria-hidden />
        <ol className="relative flex justify-between">
          {PHASES.map((x, k) => (
            <li key={x.name}>
              <button onClick={() => setI(k)} aria-current={k === i} className="group flex flex-col items-center gap-2">
                <span className={`h-[23px] w-[23px] rounded-full border-2 transition-all ${k <= i ? "border-accent bg-accent" : "border-line bg-paper"} ${k === i ? "scale-125" : ""}`} />
                <span className={`hidden text-xs sm:block ${k === i ? "text-ink" : "text-muted"}`}>{x.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]" aria-live="polite">
        <div>
          <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")} / 08</p>
          <h3 className="mt-2 font-display text-5xl text-ink">{p.name}</h3>
          <p className="mt-3 text-muted">{p.text}</p>
          <div className="mt-5 flex gap-2">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-30">Back</button>
            <button disabled={i === PHASES.length - 1} onClick={() => setI(i + 1)} className="rounded-full bg-ink px-4 py-2 text-sm text-paper disabled:opacity-30">Next phase</button>
          </div>
        </div>
        <dl className="grid gap-3 sm:grid-cols-3">
          {([["You", d.you], ["We", d.we], ["Result", d.out]] as const).map(([k, v]) => (
            <div key={k} className="card p-5"><dt className="text-xs text-muted">{k}</dt><dd className="mt-2 text-sm leading-relaxed text-ink/85">{v}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  );
}
