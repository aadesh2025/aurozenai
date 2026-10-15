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
          <linearGradient id="hl" x1="0" x2="1"><stop offset="0" stopColor="#7B5CFF" stopOpacity="0" /><stop offset="0.5" stopColor="#7B5CFF" /><stop offset="1" stopColor="#4CD9E8" stopOpacity="0" /></linearGradient>
        </defs>
        {[...L.map((n) => ({ ...n, x: 112, d: "M112" })), ...R.map((n) => ({ ...n, x: 408, d: "M408" }))].map((n, i) => {
          const path = `M${n.x} ${n.y + 18} C ${n.x < 260 ? 190 : 330} ${n.y + 18}, ${n.x < 260 ? 190 : 330} 130, 260 130`;
          return (
            <g key={i}>
              <path d={path} stroke="#ffffff" strokeOpacity="0.14" fill="none" />
              <circle r="2.6" fill="#4CD9E8">
                <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={path} keyPoints={n.x < 260 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          );
        })}
        <rect x="196" y="88" width="128" height="84" rx="14" fill="#0d0d14" stroke="url(#hl)" strokeWidth="1.5" />
        <rect x="196" y="88" width="128" height="84" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="260" y="124" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk)">AUROZEN AI</text>
        <text x="260" y="144" textAnchor="middle" fill="#9a9aab" fontSize="10" fontFamily="var(--font-jetbrains)">agents · rag · workflows</text>
        {[...L.map((n) => ({ ...n, x: 12 })), ...R.map((n) => ({ ...n, x: 408 }))].map((n) => (
          <g key={n.t}>
            <rect x={n.x} y={n.y} width="100" height="36" rx="10" fill="#101016" stroke="#ffffff" strokeOpacity="0.12" />
            <text x={n.x + 50} y={n.y + 23} textAnchor="middle" fill="#e8e8ef" fontSize="12">{n.t}</text>
          </g>
        ))}
      </svg>
      <p className="px-2 pb-1 pt-2 text-xs text-ink/35">Illustrative architecture. Not a client deployment.</p>
    </div>
  );
}
