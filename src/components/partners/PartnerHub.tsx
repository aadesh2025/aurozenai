"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COMP_TEXT, ROLES, SCHEDULES, type Role } from "@/lib/partners";

const Tag = ({ children, tone = "" }: { children: React.ReactNode; tone?: string }) => (
  <span className={`rounded-full border border-line px-2.5 py-0.5 text-xs text-muted ${tone}`}>{children}</span>
);

export function RoleCard({ r }: { r: Role }) {
  const open = r.status === "Open for applications";
  return (
    <Link href={`/partners/${r.slug}`} className="card group flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium leading-snug">{r.title}</h3>
        <span className={`mt-1 inline-flex shrink-0 items-center gap-1.5 text-xs ${open ? "text-accent" : "text-muted"}`}><span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-accent" : "bg-muted/50"}`} />{r.status}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{r.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Tag>{r.track}</Tag>
        <Tag>{r.compensation}</Tag>
        {r.beginner && <Tag tone="border-accent/40 text-accent">Beginner-friendly</Tag>}
        {r.remote && <Tag>Remote</Tag>}
      </div>
      <span className="mt-auto pt-5 text-sm text-muted transition-colors group-hover:text-accent">View role →</span>
    </Link>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onClick} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{children}</button>;
}

export function RoleBrowser() {
  const [q, setQ] = useState("");
  const [track, setTrack] = useState("All");
  const [level, setLevel] = useState("All");
  const [comp, setComp] = useState("All");
  const [arr, setArr] = useState("All");
  const list = useMemo(() => ROLES.filter((r) => {
    const t = q.toLowerCase();
    return (!t || [r.title, r.summary, ...r.required, ...r.preferred].join(" ").toLowerCase().includes(t))
      && (track === "All" || r.track === track)
      && (level === "All" || (level === "Beginner-friendly" ? r.beginner : !r.beginner))
      && (comp === "All" || r.compensation === comp)
      && (arr === "All" || r.arrangement.includes(arr as never));
  }), [q, track, level, comp, arr]);
  const row = (label: string, opts: string[], v: string, set: (s: string) => void) => (
    <div className="flex flex-wrap items-center gap-2"><span className="w-24 text-sm text-muted">{label}</span>{["All", ...opts].map((o) => <Chip key={o} on={v === o} onClick={() => set(o)}>{o}</Chip>)}</div>
  );
  return (
    <div>
      <label htmlFor="rs" className="sr-only">Search roles or skills</label>
      <input id="rs" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role or skill, e.g. n8n, outreach, design" className="w-full max-w-lg rounded-full border border-line bg-surface px-5 py-3 text-sm outline-none focus:border-accent" />
      <div className="mt-5 space-y-3">
        {row("Type", ["Business", "Technical", "Creative", "Operations"], track, setTrack)}
        {row("Level", ["Beginner-friendly", "Experienced"], level, setLevel)}
        {row("Work", ["Part-time", "Project-based", "Flexible"], arr, setArr)}
        {row("Pay model", ["Sales commission", "Project-based", "Terms to be agreed"], comp, setComp)}
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">{list.length} role{list.length === 1 ? "" : "s"}. Status labels show whether we are actively evaluating applicants or building a talent network.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.map((r) => <RoleCard key={r.slug} r={r} />)}</div>
      {!list.length && <p className="mt-6 text-muted">No role matches those filters. <Link href="/partners/apply" className="text-accent underline">Register your interest</Link> and tell us what you can do.</p>}
    </div>
  );
}

export function Schedules() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SCHEDULES.map((s) => (
        <div key={s.who} className="card flex flex-col p-6">
          <h3 className="text-lg font-medium">{s.who}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.fit}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">{s.ids.map((id) => { const r = ROLES.find((x) => x.slug === id)!; return <Link key={id} href={`/partners/${id}`} className="rounded-full border border-line px-2.5 py-1 text-xs hover:border-accent hover:text-accent">{r.title}</Link>; })}</div>
        </div>
      ))}
    </div>
  );
}

const INTERESTS: Record<string, (r: Role) => boolean> = {
  "Sales and business development": (r) => r.group.startsWith("Sales"),
  "Client relationships and operations": (r) => r.group.startsWith("Client"),
  "AI and automation": (r) => r.group.startsWith("AI"),
  "Software development": (r) => r.group.startsWith("Software") || r.slug === "ai-integration",
  "Design and creative work": (r) => r.track === "Creative" && r.slug === "ui-ux-design",
  "Marketing and research": (r) => r.group.startsWith("Marketing") || r.slug === "technical-research",
  "Open to different opportunities": () => true,
};
const SKILLS = ["Communication", "Sales or outreach", "Project coordination", "n8n / automation", "APIs and integrations", "Web development", "Machine learning", "Design", "Writing and research", "Testing"];

export function RoleMatcher() {
  const [a, setA] = useState<Record<string, string>>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const set = (k: string) => (v: string) => setA((x) => ({ ...x, [k]: v }));
  const Q: [string, string, string[]][] = [
    ["interest", "What type of work interests you?", Object.keys(INTERESTS)],
    ["exp", "Your current experience?", ["Beginner", "Some practical experience", "Experienced professional", "Specialist or team leader"]],
    ["time", "How much time can you contribute?", ["A few hours per week", "Part-time", "Project-based", "Flexible, depending on the work", "Full-time interest"]],
    ["place", "Preferred working arrangement?", ["Remote", "Hybrid", "Location-dependent is fine"]],
    ["pay", "Which compensation structure would you consider?", ["Commission-based sales", "Project-based compensation", "A separately agreed revenue-sharing arrangement", "Salaried roles only", "Open to discussing suitable arrangements"]],
  ];
  const ready = Q.every(([k]) => a[k]);

  const result = useMemo(() => {
    if (!done) return [];
    const beginner = a.exp === "Beginner";
    return ROLES.map((r) => {
      let s = 0; const why: string[] = [];
      if (INTERESTS[a.interest]?.(r)) { s += 4; why.push("matches your interest"); }
      if (beginner && r.beginner) { s += 3; why.push("beginner-friendly"); }
      if (beginner && !r.beginner) s -= 4;
      if (!beginner && !r.beginner) s += 1;
      if (a.pay === "Commission-based sales" && r.compensation === "Sales commission") { s += 3; why.push("commission-based, as you prefer"); }
      if (a.pay === "Project-based compensation" && r.compensation === "Project-based") { s += 3; why.push("project-based, as you prefer"); }
      if (a.time === "Project-based" && r.arrangement.includes("Project-based")) s += 2;
      if (a.time === "A few hours per week" && r.arrangement.includes("Part-time")) { s += 2; why.push("works with limited hours"); }
      if (a.time === "Part-time" && r.arrangement.includes("Part-time")) s += 2;
      if (a.place === "Remote" && r.remote) s += 1;
      const hay = [...r.required, ...r.preferred, r.title, r.summary].join(" ").toLowerCase();
      skills.forEach((k) => { if (k.toLowerCase().split(/[ /]+/).some((w) => w.length > 3 && hay.includes(w))) { s += 2; why.push(`uses ${k.toLowerCase()}`); } });
      if (r.status === "Open for applications") s += 0.5;
      return { r, s, why };
    }).filter((x) => x.s >= 3).sort((x, y) => y.s - x.s).slice(0, 3);
  }, [done, a, skills]);

  if (done) {
    return (
      <div>
        {a.pay === "Salaried roles only" && <p className="mb-5 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm">Honest note: we cannot offer a guaranteed salary for any role right now. The roles below use commission, project-based, or agreed terms. If a fixed salary is essential, these may not suit you yet.</p>}
        <div className="grid gap-4 md:grid-cols-3">{result.map(({ r, why }) => <div key={r.slug}><RoleCard r={r} /><p className="mt-2 px-1 text-xs text-muted">Why: {[...new Set(why)].join(", ") || "general fit"}</p></div>)}</div>
        {!result.length && <p className="text-muted">No close match from those answers. You can still register your interest.</p>}
        <p className="mt-6 text-xs text-muted">Preliminary and rule-based. Actual opportunities, eligibility, and compensation depend on the specific role. Nothing here is a hiring decision.</p>
        <div className="mt-5 flex gap-3"><button onClick={() => setDone(false)} className="rounded-full border border-line px-5 py-2.5 text-sm">Change answers</button><Link href="/partners/apply" className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Apply to collaborate</Link></div>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-7">
      {Q.map(([k, q, opts]) => (
        <fieldset key={k}><legend className="mb-3 font-ui text-lg">{q}</legend><div className="flex flex-wrap gap-2">{opts.map((o) => <Chip key={o} on={a[k] === o} onClick={() => set(k)(o)}>{o}</Chip>)}</div></fieldset>
      ))}
      <fieldset><legend className="mb-3 font-ui text-lg">Which skills can you contribute? <span className="text-sm text-muted">(choose any)</span></legend><div className="flex flex-wrap gap-2">{SKILLS.map((o) => <Chip key={o} on={skills.includes(o)} onClick={() => setSkills((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]))}>{o}</Chip>)}</div></fieldset>
      <button disabled={!ready} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-40">Show matching roles</button>
    </form>
  );
}

export function CompensationDisclosure() {
  const items = [
    ["Commission-based sales", COMP_TEXT["Sales commission"]],
    ["Project-based technical work", COMP_TEXT["Project-based"]],
    ["Part-time and flexible", "Flexible participation may be possible for suitable roles. It is not a salaried position unless that is explicitly the arrangement offered."],
    ["Future full-time", "As AUROZEN AI grows, suitable contributors may be considered for expanded responsibilities or future full-time opportunities. This depends on business needs, performance, role suitability, and resources. It is not guaranteed."],
    ["Long-term partnership", "Exceptional contributors who show sustained results, reliability, leadership, and long-term commitment may be considered for a deeper business partnership. Any ownership or equity would be discussed separately, need legal structuring and formal agreements, and is not guaranteed or included with any role."],
  ];
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(([h, p]) => (<div key={h} className="grid gap-2 py-6 md:grid-cols-[260px_1fr] md:gap-10"><h3 className="font-ui text-lg">{h}</h3><p className="text-muted">{p}</p></div>))}
      <div className="grid gap-2 py-6 md:grid-cols-[260px_1fr] md:gap-10"><h3 className="font-ui text-lg">Always</h3><p className="text-muted">No application fee. No paid training or starter kits. No unpaid commercial work without clear terms. You are not an employee, contractor, or partner until an arrangement is agreed and documented.</p></div>
    </div>
  );
}
