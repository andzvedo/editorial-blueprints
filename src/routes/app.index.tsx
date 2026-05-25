import { createFileRoute, Link } from "@tanstack/react-router";
import { TechCorners, TechLabel } from "@/components/tech";
import { useState } from "react";
import { useSites, type Site, type SiteStatus } from "@/lib/sites-store";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const FILTERS: { key: "all" | SiteStatus; label: string; count: (s: Site[]) => number }[] = [
  { key: "all", label: "Todos", count: (s) => s.length },
  { key: "live", label: "Live", count: (s) => s.filter((x) => x.status === "live").length },
  { key: "draft", label: "Rascunho", count: (s) => s.filter((x) => x.status === "draft").length },
  {
    key: "archived",
    label: "Arquivado",
    count: (s) => s.filter((x) => x.status === "archived").length,
  },
];

function Dashboard() {
  const sites = useSites();
  const [filter, setFilter] = useState<"all" | SiteStatus>("all");
  const visible = filter === "all" ? sites : sites.filter((s) => s.status === filter);

  return (
    <main className="px-5 pb-24 pt-8">
      {/* Header */}
      <section className="grid grid-cols-12 gap-6 border-b border-[var(--color-rule)] pb-10">
        <div className="col-span-12 md:col-span-8">
          <TechLabel accent>POINTER / WORKSPACE — INDEX</TechLabel>
          <h1 className="mt-3 font-serif text-[64px] leading-[0.95] tracking-tight text-foreground md:text-[88px]">
            Your <em className="italic">Sites</em>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Gerencie e explore suas obras digitais. Cada site é uma composição — versionada,
            arquivável, recuperável.
          </p>
        </div>
        <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-4 md:items-end md:justify-end">
          <TechLabel>+ NOVA OBRA</TechLabel>
          <Link
            to="/app/new"
            className="group relative inline-flex h-12 items-center gap-3 bg-foreground px-6 text-[14px] font-medium text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
          >
            Criar site
            <span className="font-mono">→</span>
          </Link>
        </div>
      </section>

      {/* Filter bar */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-rule)] pb-4">
        <div className="flex flex-wrap items-center gap-1">
          {FILTERS.map((f) => {
            const active = f.key === filter;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`tech-label flex items-center gap-2 border px-3 py-2 transition ${
                  active
                    ? "border-foreground bg-foreground text-[var(--color-primary-foreground)]"
                    : "border-[var(--color-rule)] hover:border-foreground hover:text-foreground"
                }`}
              >
                {f.label}
                <span className="font-mono text-[10px] opacity-70">{f.count(SITES)}</span>
              </button>
            );
          })}
        </div>
        <div className="tech-label">VIEW · GRID 12COL · A/B SORT</div>
      </section>

      {/* Sites grid */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((s) => (
          <SiteCard key={s.id} site={s} />
        ))}
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: SiteStatus }) {
  if (status === "live") {
    return (
      <span className="tech-label flex items-center gap-2 border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        LIVE
      </span>
    );
  }
  if (status === "draft") {
    return (
      <span className="tech-label border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1">
        RASCUNHO
      </span>
    );
  }
  return (
    <span className="tech-label border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1 opacity-70">
      ARQUIVADO
    </span>
  );
}

function SiteCard({ site }: { site: Site }) {
  const isArchived = site.status === "archived";
  return (
    <article className="group relative border border-[var(--color-rule)] bg-[var(--color-card)]">
      <TechCorners className="opacity-0 transition-opacity group-hover:opacity-100" />
      {/* Preview area */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-rule)] bg-[var(--color-paper)] tech-grid">
        <div className="absolute left-3 top-3">
          <StatusBadge status={site.status} />
        </div>
        <div className="absolute right-3 top-3">
          <span className="tech-label">{site.index}</span>
        </div>
        {/* Faux composition lines */}
        <svg className="absolute inset-0 h-full w-full text-[var(--color-rule)]" aria-hidden>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="currentColor" strokeDasharray="3 3" />
        </svg>
        {site.status === "live" && (
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="font-serif text-[20px] italic text-foreground/80">aa</span>
            <span className="tech-label">SCALE 1 : 4</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[22px] leading-tight text-foreground">{site.name}</h3>
          <span className="tech-label whitespace-nowrap">{site.updated}</span>
        </div>
        <p className="font-mono text-[11px] text-[var(--color-accent)]">↗ {site.url}</p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{site.meta}</p>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-[var(--color-rule)] bg-[var(--color-paper)]/40 px-5 py-3">
        {isArchived ? (
          <button className="tech-label border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 transition hover:border-foreground hover:text-foreground">
            ↺ RESTAURAR
          </button>
        ) : (
          <Link
            to="/app/sites/$siteId"
            params={{ siteId: site.id }}
            className="group/btn inline-flex items-center gap-2 bg-foreground px-4 py-2 text-[12px] font-medium uppercase tracking-wider text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
          >
            Abrir editor
            <span className="font-mono transition-transform group-hover/btn:translate-x-0.5">→</span>
          </Link>
        )}
        <button className="tech-label hover:text-foreground">MAIS OPÇÕES ⋯</button>
      </div>
    </article>
  );
}
