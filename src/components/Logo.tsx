import { useId } from "react";

// Vector recreation of the AUROZEN "A" mark. Colors follow the active theme (see --logo-* tokens).
export function LogoMark({ size = 32 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="10" y1="0" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--logo-a)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--logo-b)" }} />
          <stop offset="1" style={{ stopColor: "var(--logo-c)" }} />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        fill={`url(#g${id})`}
        d="M41 3H59L97 96H73C70 84 61 74 50 72C39 74 30 84 27 96H3L41 3ZM50 24L67 63C61 60 55 60 51 63V74H49V63C45 60 39 60 33 63L50 24Z"
      />
      <path d="M50 30V96" style={{ stroke: "var(--paper)" }} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 30, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-ink">
      <LogoMark size={size} />
      {wordmark && (
        <span className="font-ui text-[15px] font-medium uppercase tracking-[0.28em]">
          Aurozen <span className="opacity-50">AI</span>
        </span>
      )}
    </span>
  );
}
