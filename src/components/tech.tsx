import { cn } from "@/lib/utils";

export function TechCorners({ className }: { className?: string }) {
  const corner = "absolute w-3 h-3 stroke-[var(--color-ink)]";
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <svg className={cn(corner, "top-0 left-0")} viewBox="0 0 12 12" fill="none">
        <path d="M0 0 H12 M0 0 V12" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </svg>
      <svg className={cn(corner, "top-0 right-0")} viewBox="0 0 12 12" fill="none">
        <path d="M12 0 H0 M12 0 V12" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="0" r="1.5" fill="currentColor" />
      </svg>
      <svg className={cn(corner, "bottom-0 left-0")} viewBox="0 0 12 12" fill="none">
        <path d="M0 12 H12 M0 12 V0" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <svg className={cn(corner, "bottom-0 right-0")} viewBox="0 0 12 12" fill="none">
        <path d="M12 12 H0 M12 12 V0" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function TechRuler({
  ticks = 20,
  className,
}: {
  ticks?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex h-3 w-full items-end", className)} aria-hidden>
      {Array.from({ length: ticks }).map((_, i) => (
        <div
          key={i}
          className="flex-1 border-l border-[var(--color-rule)]"
          style={{ height: i % 5 === 0 ? "100%" : "40%" }}
        />
      ))}
      <div className="border-l border-[var(--color-rule)]" style={{ height: "100%" }} />
    </div>
  );
}

export function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-[var(--color-mono)]", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M12 0v24M0 12h24"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

export function TechLabel({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "tech-label",
        accent && "text-[var(--color-accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
