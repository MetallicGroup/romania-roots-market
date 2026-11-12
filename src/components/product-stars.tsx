import { useId } from "react";

/** 5 steluțe aurii (sparkle 4-puncte) — colț dreapta-sus pe poza produsului */
export function ProductStars({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      className={`pointer-events-none absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 ${className}`}
      aria-label="5 stele"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <GoldSparkle key={i} gradId={`goldSparkle-${uid}-${i}`} className="h-3 w-3 drop-shadow-sm sm:h-3.5 sm:w-3.5" />
      ))}
    </div>
  );
}

function GoldSparkle({ className, gradId }: { className?: string; gradId: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6C8" />
          <stop offset="35%" stopColor="#F5D76E" />
          <stop offset="70%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#A67C00" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 1.2c.35 3.9 2.2 6.7 5.9 8.2-3.7 1.5-5.55 4.3-5.9 8.2-.35-3.9-2.2-6.7-5.9-8.2C9.8 7.9 11.65 5.1 12 1.2z"
      />
      <path
        fill="#FFF8DC"
        opacity="0.55"
        d="M12 3.5c.2 2.6 1.3 4.4 3.6 5.5-2.3 1.1-3.4 2.9-3.6 5.5-.2-2.6-1.3-4.4-3.6-5.5 2.3-1.1 3.4-2.9 3.6-5.5z"
      />
    </svg>
  );
}
