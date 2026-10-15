"use client";
import Link from "next/link";
import { useState } from "react";

function Slider({ id, label, value, min, max, step = 1, unit, onChange }: { id: string; label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between"><label htmlFor={id} className="text-sm font-medium">{label}</label><span className="font-mono text-sm text-accent">{value}{unit}</span></div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
    </div>
  );
}

// Time-only estimate from the visitor's own inputs. No money, no promised results.
export function RoiCalculator() {
  const [tasks, setTasks] = useState(120);
  const [mins, setMins] = useState(6);
  const [auto, setAuto] = useState(50);
  const [people, setPeople] = useState(2);
  const weekly = (tasks * mins) / 60;
  const saved = (weekly * auto) / 100;
  const month = saved * 4.33;
  const ftePct = Math.min(100, Math.round((saved / (people * 40)) * 100));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="card space-y-6 p-6">
        <Slider id="t" label="Repetitive tasks per week" value={tasks} min={10} max={1000} step={10} unit="" onChange={setTasks} />
        <Slider id="m" label="Minutes per task" value={mins} min={1} max={60} unit=" min" onChange={setMins} />
        <Slider id="p" label="People doing this work" value={people} min={1} max={20} unit="" onChange={setPeople} />
        <Slider id="a" label="Share you expect could be automated" value={auto} min={10} max={90} step={5} unit="%" onChange={setAuto} />
        <p className="text-xs text-muted">You set these numbers. How much can be automated depends on the process, data, and tools, and is established in discovery.</p>
      </div>
      <div className="theme-dark relative overflow-hidden rounded-3xl p-8">
        <p className="text-sm text-ink/55">With your assumptions</p>
        <p className="mt-2 font-display text-7xl leading-none text-ink">{saved.toFixed(1)}<span className="ml-2 font-sans text-lg text-ink/50">hours / week</span></p>
        <p className="mt-3 text-ink/70">About {Math.round(month)} hours a month of manual work could move off your team's plate.</p>
        <div className="mt-8">
          <div className="flex justify-between text-xs text-ink/50"><span>Share of the team's weekly capacity</span><span>{ftePct}%</span></div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${ftePct}%` }} /></div>
        </div>
        <p className="mt-8 text-xs text-ink/45">An illustration of your own inputs, not a prediction, guarantee, or quote.</p>
        <Link href="/book-consultation" className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">Test this in a consultation</Link>
      </div>
    </div>
  );
}
