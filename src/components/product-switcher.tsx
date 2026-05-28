import { Link, useRouterState } from "@tanstack/react-router";

export function ProductSwitcher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active: "sites" | "docs" = pathname.startsWith("/app/docs") ? "docs" : "sites";

  return (
    <div className="hidden items-center gap-0 border border-[var(--color-rule)] bg-[var(--color-paper)] md:flex">
      <Link
        to="/app"
        className={`tech-label px-3 py-1.5 transition ${
          active === "sites"
            ? "bg-foreground text-[var(--color-primary-foreground)]"
            : "text-[var(--color-mono)] hover:text-foreground"
        }`}
      >
        SITES
      </Link>
      <span className="h-5 w-px bg-[var(--color-rule)]" />
      <Link
        to="/app/docs"
        className={`tech-label px-3 py-1.5 transition ${
          active === "docs"
            ? "bg-foreground text-[var(--color-primary-foreground)]"
            : "text-[var(--color-mono)] hover:text-foreground"
        }`}
      >
        DOCS
      </Link>
    </div>
  );
}
