import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const matches = useMatches();
  const crumbs = matches
    .filter((m) => m.staticData && (m.staticData as { crumb?: string }).crumb)
    .map((m) => (m.staticData as { crumb: string }).crumb);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-foreground">
      <TopBar crumbs={crumbs} />
      <Outlet />
      <BottomRule />
    </div>
  );
}

function PointerMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M4 4 L20 12 L13 13 L12 20 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M2 2 L6 6 M22 2 L18 6 M2 22 L6 18" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function TopBar({ crumbs }: { crumbs: string[] }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-rule)] bg-[var(--color-background)]/95 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-5">
        <Link to="/app" className="flex items-center gap-3 text-foreground">
          <PointerMark />
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] font-mono text-[10px] uppercase">
            P
          </span>
          <Link to="/app" className="font-serif text-[15px] hover:text-[var(--color-accent)]">
            People &amp; Design
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="tech-label">/</span>
              <span className="font-serif text-[15px] text-foreground">{c}</span>
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="tech-label hidden md:inline">WS / 001 — ACTIVE</span>
          <div className="h-8 w-8 rounded-full border border-[var(--color-rule)] bg-[linear-gradient(135deg,var(--color-accent),oklch(0.7_0.15_60))]" />
        </div>
      </div>
    </header>
  );
}

function BottomRule() {
  return (
    <div className="border-t border-[var(--color-rule)]">
      <div className="flex items-center justify-between px-5 py-3 tech-label">
        <span>POINTER / WORKSPACE REV. 01</span>
        <span>© 2026 — BUILT FOR INDEPENDENT CREATORS</span>
      </div>
    </div>
  );
}
