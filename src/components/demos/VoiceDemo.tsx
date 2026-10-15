"use client";
import { useEffect, useRef, useState } from "react";

const SCRIPT = [
  { who: "Agent", text: "Thanks for calling Northside Clinic. How can I help?" },
  { who: "Caller", text: "Hi, I need to move my appointment to next week." },
  { who: "Agent", text: "Of course. Can I have your name and the date of the current booking?" },
  { who: "Caller", text: "It's Sam Rivera, this Thursday at ten." },
  { who: "Agent", text: "Thanks Sam. I have Tuesday at nine or Wednesday at two. Which suits you?" },
  { who: "Caller", text: "Tuesday at nine." },
  { who: "Agent", text: "Done. You're booked for Tuesday at nine, and a confirmation is on its way. Anything else?" },
];
const TOOLS = ["", "intent: reschedule", "lookup_booking(name, date)", "lookup_booking → found", "get_slots(next_week)", "slot selected", "update_booking() + send_confirmation()"];

export function VoiceDemo() {
  const [i, setI] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const stop = useRef(false);

  useEffect(() => { setSupported(typeof window !== "undefined" && "speechSynthesis" in window); return () => { window.speechSynthesis?.cancel(); }; }, []);

  function speak(k: number) {
    if (stop.current || k >= SCRIPT.length) { setPlaying(false); return; }
    setI(k);
    const u = new SpeechSynthesisUtterance(SCRIPT[k].text);
    u.rate = 1.02;
    u.pitch = SCRIPT[k].who === "Agent" ? 1 : 0.75;
    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
    if (voices.length) u.voice = voices[SCRIPT[k].who === "Agent" ? 0 : Math.min(1, voices.length - 1)];
    u.onend = () => setTimeout(() => speak(k + 1), 350);
    u.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(u);
  }
  const play = () => {
    stop.current = false; window.speechSynthesis?.cancel(); setPlaying(true); setI(-1);
    if (supported) speak(0);
    else { let k = 0; const id = setInterval(() => { setI(k++); if (k >= SCRIPT.length) { clearInterval(id); setPlaying(false); } }, 1800); }
  };
  const halt = () => { stop.current = true; window.speechSynthesis?.cancel(); setPlaying(false); };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <button onClick={playing ? halt : play} className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper" aria-label={playing ? "Stop the sample call" : "Play the sample call"}>
            {playing ? <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="currentColor" /></svg> : <svg width="18" height="18" viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="currentColor" /></svg>}
          </button>
          <div className="flex h-10 flex-1 items-center gap-[3px]" aria-hidden>
            {Array.from({ length: 48 }).map((_, k) => (
              <span key={k} className="w-1 flex-1 rounded-full bg-accent/70 transition-all" style={{ height: playing ? `${20 + Math.abs(Math.sin((k + i * 3) * 0.7)) * 80}%` : "14%", transitionDuration: "250ms" }} />
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">{supported ? "Spoken by your browser's built-in voices. A real deployment uses production speech models." : "Your browser has no speech synthesis; showing captions only."}</p>
        <ol className="mt-5 space-y-2" aria-live="polite">
          {SCRIPT.map((l, k) => (
            <li key={k} className={`rounded-2xl px-4 py-2.5 text-sm transition-all ${k === i ? "bg-ink text-paper" : k < i ? "bg-ink/[0.06] text-ink/70" : "text-ink/25"} ${l.who === "Caller" ? "ml-8" : "mr-8"}`}>
              <span className="mr-2 font-mono text-xs opacity-60">{l.who}</span>{l.text}
            </li>
          ))}
        </ol>
      </div>
      <aside className="theme-dark rounded-3xl p-5 font-mono text-xs leading-relaxed" aria-label="What the system does">
        <p className="text-ink/50">system log (simulated)</p>
        <ul className="mt-3 space-y-2">
          {TOOLS.slice(0, Math.max(i + 1, 0)).map((t, k) => t && <li key={k} className="reveal text-accent">› {t}</li>)}
          {i < 0 && <li className="text-ink/40">waiting for call…</li>}
        </ul>
        <p className="mt-6 border-t border-line pt-3 text-ink/45">Fictional business and caller. No real calendar is changed.</p>
      </aside>
    </div>
  );
}
