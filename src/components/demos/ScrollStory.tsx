"use client";
import { useEffect, useRef, useState } from "react";

const STAGES = [
  { t: "Incoming channels", d: "Customer inquiries arrive through website chat, email, and phone, each in a different place." },
  { t: "Request classification", d: "A shared layer identifies what each request is about and how urgent it is." },
  { t: "Knowledge retrieval", d: "Relevant passages are retrieved from approved company documents." },
  { t: "Response generation", d: "A model drafts an answer grounded in the retrieved sources." },
  { t: "Business-system integration", d: "Approved actions run in your CRM, calendar, or ticketing system." },
  { t: "Human handoff and monitoring", d: "Uncertain or sensitive cases go to a person; everything is logged and reviewed." },
];
const BOXES = ["Channels", "Classify", "Retrieve", "Respond", "Systems", "Handoff"];

export function ScrollStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ol className="space-y-6 lg:space-y-24 lg:py-16">
        {STAGES.map((s, i) => (
          <li key={s.t} data-i={i} ref={(el) => { refs.current[i] = el; }} className={`rounded-xl border p-5 transition-colors ${active === i ? "border-violet bg-ink/5" : "border-ink/10"}`}>
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <h3 className="font-display text-xl font-semibold">{s.t}</h3>
            <p className="mt-1 text-sm text-ink/70">{s.d}</p>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-ink/10 bg-paper p-6" aria-hidden>
          <p className="mb-4 font-mono text-xs text-ink/50">Illustrative architecture</p>
          <div className="space-y-2">
            {BOXES.map((b, i) => (
              <div key={b}>
                <div className={`rounded-lg border px-4 py-3 text-sm transition-all duration-500 ${i <= active ? "border-accent/70 bg-ink/10 text-ink" : "border-ink/10 text-ink/30"} ${i === active ? "ring-1 ring-violet" : ""}`}>{b}</div>
                {i < BOXES.length - 1 && <div className={`mx-auto h-3 w-px ${i < active ? "bg-accent" : "bg-ink/10"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
