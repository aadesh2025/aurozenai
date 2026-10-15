// Hero diagram: business systems feeding one orchestration layer. Signals travel along the lines.
const L = [
  { y: 46, t: "CRM" },
  { y: 118, t: "Email" },
  { y: 190, t: "Documents" },
];
const R = [
  { y: 46, t: "Voice" },
  { y: 118, t: "Support desk" },
  { y: 190, t: "Databases" },
];

export function SystemDiagram() {
  return (
    <div className="card p-3 sm:p-5">
      <svg viewBox="0 0 520 260" role="img" aria-label="Diagram: business systems connected through an AUROZEN AI orchestration layer" className="w-full">
        <defs>
          <linearGradient id="hl" x1="0" x2="1"><stop offset="0" stopColor="#7B5CFF" stopOpacity="0" /><stop offset="0.5" stopColor="#7B5CFF" /><stop offset="1" stopColor="#A493FF" stopOpacity="0" /></linearGradient>
        </defs>
        {[...L.map((n) => ({ ...n, x: 116, d: "M116" })), ...R.map((n) => ({ ...n, x: 404, d: "M404" }))].map((n, i) => {
          const path = `M${n.x} ${n.y + 18} C ${n.x < 260 ? 190 : 330} ${n.y + 18}, ${n.x < 260 ? 190 : 330} 130, 260 130`;
          return (
            <g key={i}>
              <path d={path} style={{ stroke: "var(--line)" }} fill="none" />
              <circle r="2.6" fill="#A493FF">
                <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={path} keyPoints={n.x < 260 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          );
        })}
        <rect x="196" y="88" width="128" height="84" rx="14" style={{ fill: "var(--surface-2)" }} stroke="url(#hl)" strokeWidth="1.5" />
        <rect x="196" y="88" width="128" height="84" rx="14" fill="none" style={{ stroke: "var(--line)" }} />
        <text x="260" y="124" textAnchor="middle" style={{ fill: "var(--ink)" }} fontSize="17" fontWeight="600" fontFamily="var(--font-space-grotesk)">AUROZEN AI</text>
        <text x="260" y="144" textAnchor="middle" style={{ fill: "var(--muted)" }} fontSize="11" fontFamily="var(--font-jetbrains)">agents · rag · workflows</text>
        {[...L.map((n) => ({ ...n, x: 4 })), ...R.map((n) => ({ ...n, x: 406 }))].map((n) => (
          <g key={n.t}>
            <rect x={n.x} y={n.y} width="110" height="40" rx="10" style={{ fill: "var(--surface-2)", stroke: "var(--line)" }} />
            <text x={n.x + 55} y={n.y + 25} textAnchor="middle" style={{ fill: "var(--ink)" }} fontSize="14.5">{n.t}</text>
          </g>
        ))}
      </svg>
      <p className="px-2 pb-1 pt-2 text-xs text-ink/35">Illustrative architecture. Not a client deployment.</p>
    </div>
  );
}
