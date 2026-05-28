import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TechLabel } from "@/components/tech";
import { useDocs, statusToken, STATUS_LABELS, type Doc, type DocStatus } from "@/lib/docs-store";

export const Route = createFileRoute("/app/docs/")({
  component: DocsList,
});

type ViewKey = "folder" | "agent" | "decision" | "outdated" | "recent";

const VIEWS: { key: ViewKey; label: string }[] = [
  { key: "folder", label: "By folder" },
  { key: "agent", label: "Ready for agent" },
  { key: "decision", label: "Needs decision" },
  { key: "outdated", label: "Outdated" },
  { key: "recent", label: "Recently changed" },
];

function applyView(docs: Doc[], view: ViewKey, query: string): Doc[] {
  let list = docs;
  if (view === "agent") list = list.filter((d) => d.status === "ready-for-agent" || d.status === "in-progress");
  if (view === "decision") list = list.filter((d) => d.status === "needs-decision");
  if (view === "outdated") list = list.filter((d) => d.status === "blocked" || d.status === "needs-review");
  if (view === "recent") list = [...list].sort((a, b) => (a.updated < b.updated ? 1 : -1));
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.path.toLowerCase().includes(q) ||
        d.folder.toLowerCase().includes(q),
    );
  }
  return list;
}

function DocsList() {
  const docs = useDocs();
  const [view, setView] = useState<ViewKey>("folder");
  const [query, setQuery] = useState("");
  const filtered = applyView(docs, view, query);

  const groupedByFolder = filtered.reduce<Record<string, Doc[]>>((acc, d) => {
    (acc[d.folder] ||= []).push(d);
    return acc;
  }, {});

  return (
    <main className="px-5 pb-24 pt-8">
      <section className="grid grid-cols-12 gap-6 border-b border-[var(--color-rule)] pb-10">
        <div className="col-span-12 md:col-span-8">
          <TechLabel accent>POINTER / WORKSPACE — DOCS</TechLabel>
          <h1 className="mt-3 font-serif text-[64px] leading-[0.95] tracking-tight text-foreground md:text-[88px]">
            Your <em className="italic">Docs</em>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Documentação operacional do repo. Decisões, planos e contexto para humanos e agentes —
            versionado no Git.
          </p>
        </div>
        <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-4 md:items-end md:justify-end">
          <TechLabel>+ NOVO DOC</TechLabel>
          <Link
            to="/app/docs/new"
            className="group relative inline-flex h-12 items-center gap-3 bg-foreground px-6 text-[14px] font-medium text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
          >
            Criar doc
            <span className="font-mono">→</span>
          </Link>
        </div>
      </section>

      {/* Toolbar */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-rule)] pb-4">
        <div className="flex flex-wrap items-center gap-1">
          {VIEWS.map((v) => {
            const active = v.key === view;
            return (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`tech-label flex items-center gap-2 border px-3 py-2 transition ${
                  active
                    ? "border-foreground bg-foreground text-[var(--color-primary-foreground)]"
                    : "border-[var(--color-rule)] hover:border-foreground hover:text-foreground"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs..."
          className="h-9 w-64 border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 text-[13px] outline-none placeholder:text-[var(--color-mono)] focus:border-foreground"
        />
      </section>

      {/* List */}
      <section className="mt-8 space-y-10">
        {Object.entries(groupedByFolder).map(([folder, list]) => (
          <div key={folder}>
            <div className="mb-3 flex items-center gap-3">
              <TechLabel>{folder.toUpperCase()}</TechLabel>
              <span className="h-px flex-1 bg-[var(--color-rule)]" />
              <span className="tech-label opacity-70">{list.length} DOCS</span>
            </div>
            <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {list.map((d) => (
                <DocRow key={d.id} doc={d} />
              ))}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="border border-dashed border-[var(--color-rule)] p-12 text-center">
            <p className="font-serif text-2xl text-muted-foreground">Nenhum doc encontrado.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function DocRow({ doc }: { doc: Doc }) {
  return (
    <li>
      <Link
        to="/app/docs/$docId"
        params={{ docId: doc.id }}
        className="group grid grid-cols-12 items-center gap-4 px-2 py-4 transition hover:bg-[var(--color-paper)]"
      >
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-[11px] text-[var(--color-mono)]">{doc.path}</p>
          <h3 className="mt-1 font-serif text-[22px] leading-tight text-foreground group-hover:text-[var(--color-accent)]">
            {doc.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-[13px] text-muted-foreground">{doc.summary}</p>
        </div>
        <div className="col-span-6 flex flex-wrap items-center gap-2 md:col-span-3">
          <StatusPill status={doc.status} />
          <span className="tech-label border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1">
            {doc.type}
          </span>
        </div>
        <div className="col-span-6 flex items-center justify-end gap-3 md:col-span-2">
          <span className="tech-label whitespace-nowrap">{doc.updated}</span>
          <span className="font-mono text-[var(--color-mono)] transition group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}

export function StatusPill({ status }: { status: DocStatus }) {
  return (
    <span
      className="tech-label inline-flex items-center gap-2 border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1"
      style={{ color: statusToken(status) }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: statusToken(status) }}
      />
      {STATUS_LABELS[status].toUpperCase()}
    </span>
  );
}
