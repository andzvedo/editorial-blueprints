import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TechCorners, TechLabel } from "@/components/tech";
import {
  docsStore,
  readiness,
  STATUS_LABELS,
  statusToken,
  useDocs,
  type Doc,
  type DocStatus,
} from "@/lib/docs-store";

import { sitesStore } from "@/lib/sites-store";

export const Route = createFileRoute("/app/docs/$docId")({
  component: DocEditor,
});

const STATUS_ORDER: DocStatus[] = [
  "idea",
  "scoping",
  "needs-decision",
  "ready-for-agent",
  "in-progress",
  "needs-review",
  "blocked",
  "validated",
  "done",
];

function DocEditor() {
  const { docId } = Route.useParams();
  const docs = useDocs();
  const navigate = useNavigate();
  const doc = docs.find((d) => d.id === docId);
  const [contextOpen, setContextOpen] = useState(false);

  useEffect(() => {
    if (!doc && docs.length > 0) {
      navigate({ to: "/app/docs" });
    }
  }, [doc, docs.length, navigate]);

  if (!doc) {
    return (
      <main className="px-5 py-20 text-center">
        <TechLabel>DOC NOT FOUND</TechLabel>
        <p className="mt-4 font-serif text-3xl">Esse documento não existe.</p>
        <Link
          to="/app/docs"
          className="mt-6 inline-block underline decoration-[var(--color-rule)] underline-offset-4 hover:text-[var(--color-accent)]"
        >
          ← Voltar para Docs
        </Link>
      </main>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
      <DocsSidebar docs={docs} activeId={docId} />
      <EditorColumn doc={doc} onOpenContext={() => setContextOpen(true)} />
      <ExecutionPanel doc={doc} onOpenContext={() => setContextOpen(true)} />
      {contextOpen && <AgentContextModal doc={doc} onClose={() => setContextOpen(false)} />}
    </div>
  );
}

/* ───────── Sidebar ───────── */
function DocsSidebar({ docs, activeId }: { docs: Doc[]; activeId: string }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return docs;
    const s = q.toLowerCase();
    return docs.filter(
      (d) => d.title.toLowerCase().includes(s) || d.path.toLowerCase().includes(s),
    );
  }, [docs, q]);

  return (
    <aside className="hidden border-r border-[var(--color-rule)] lg:block">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-auto p-4">
        <div className="flex items-center justify-between">
          <TechLabel>DOCS LIST</TechLabel>
          <Link
            to="/app/docs/new"
            className="font-mono text-[12px] text-[var(--color-mono)] hover:text-[var(--color-accent)]"
          >
            + NEW
          </Link>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="mt-3 h-9 w-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 text-[13px] outline-none placeholder:text-[var(--color-mono)] focus:border-foreground"
        />
        <ul className="mt-4 space-y-1">
          {filtered.map((d) => {
            const active = d.id === activeId;
            return (
              <li key={d.id} className="relative">
                {active && <TechCorners />}
                <Link
                  to="/app/docs/$docId"
                  params={{ docId: d.id }}
                  className={`block border px-3 py-3 transition ${
                    active
                      ? "border-foreground bg-[var(--color-card)]"
                      : "border-transparent hover:bg-[var(--color-paper)]"
                  }`}
                >
                  <p className="truncate font-mono text-[10px] text-[var(--color-mono)]">
                    {d.path}
                  </p>
                  <p className="mt-1 font-serif text-[15px] leading-tight text-foreground">
                    {d.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: statusToken(d.status) }}
                    />
                    <span className="tech-label">{STATUS_LABELS[d.status].toUpperCase()}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

/* ───────── Editor column ───────── */
function EditorColumn({ doc, onOpenContext }: { doc: Doc; onOpenContext: () => void }) {
  const r = readiness(doc);
  const linkedSite = doc.linkedSiteId ? sitesStore.get(doc.linkedSiteId) : undefined;

  return (
    <section className="min-w-0">
      <div className="border-b border-[var(--color-rule)] bg-[var(--color-card)] px-8 pb-8 pt-10">
        <p className="font-mono text-[11px] text-[var(--color-mono)]">{doc.path}</p>
        <h1 className="mt-3 font-serif text-[44px] leading-[1.05] tracking-tight md:text-[56px]">
          {doc.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
          {doc.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={doc.status} />
            <span className="tech-label border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1">
              {doc.type}
            </span>
            <span className="tech-label border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1">
              GIT-BACKED
            </span>
            {linkedSite && (
              <Link
                to="/app/sites/$siteId"
                params={{ siteId: linkedSite.id }}
                className="tech-label inline-flex items-center gap-1 border border-[var(--color-accent)] bg-[var(--color-paper)] px-2 py-1 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-foreground)]"
              >
                ↗ LINKED SITE / {linkedSite.name.slice(0, 18)}
              </Link>
            )}
          </div>
          <TechLabel>TYPE / TO INSERT BLOCK</TechLabel>
        </div>
      </div>

      <article className="space-y-2 px-8 py-10">
        {doc.body.map((b, i) => (
          <BlockRenderer key={i} block={b} docId={doc.id} />
        ))}
      </article>

      <FlowStrip readiness={r.pct} onOpenContext={onOpenContext} />
    </section>
  );
}

/* ───────── Block renderers ───────── */
function BlockRenderer({ block, docId }: { block: Doc["body"][number]; docId: string }) {
  switch (block.kind) {
    case "h":
      return <h2 className="mt-8 font-serif text-[28px] leading-tight">{block.text}</h2>;
    case "p":
      return <p className="text-[15px] leading-relaxed text-foreground/85">{block.text}</p>;
    case "decision":
      return (
        <div
          className="relative my-6 border bg-[var(--color-card)] p-5"
          style={{ borderColor: "var(--status-decision)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <TechLabel className="text-[var(--status-decision)]">◆ DECISION</TechLabel>
            <span className="tech-label border border-[var(--color-rule)] px-2 py-0.5">
              {block.tag.toUpperCase()}
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-foreground">{block.text}</p>
        </div>
      );
    case "checklist": {
      const done = block.tasks.filter((t) => t.done).length;
      return (
        <div className="relative my-6 border border-[var(--color-rule)] bg-[var(--color-card)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <TechLabel>▤ ACTION CHECKLIST</TechLabel>
            <span className="tech-label">
              {done} / {block.tasks.length} DONE
            </span>
          </div>
          <ul className="space-y-2">
            {block.tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => docsStore.toggleTask(docId, t.id)}
                  className="h-4 w-4 cursor-pointer accent-[var(--color-accent)]"
                />
                <span
                  className={`flex-1 text-[14px] ${
                    t.done ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {t.label}
                </span>
                <span
                  className="tech-label px-2 py-0.5"
                  style={{
                    color: t.owner === "agent" ? "var(--status-agent)" : "var(--color-mono)",
                  }}
                >
                  {t.owner.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case "figma":
      return (
        <div className="relative my-6 border border-[var(--color-rule)] bg-[var(--color-card)] p-5">
          <div className="mb-3 flex items-center justify-between">
            <TechLabel>◇ FIGMA EMBED</TechLabel>
            <span className="tech-label">DESIGN REFERENCE</span>
          </div>
          <p className="text-[14px] text-muted-foreground">{block.note}</p>
          <div className="tech-grid mt-3 grid h-48 place-items-center border border-dashed border-[var(--color-rule)] text-[var(--color-mono)]">
            <span className="font-mono text-[12px]">FIGMA FRAME PREVIEW</span>
          </div>
        </div>
      );
    case "agentTask":
      return (
        <div
          className="relative my-6 border bg-[var(--color-card)] p-5"
          style={{ borderColor: "var(--status-agent)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <TechLabel className="text-[var(--status-agent)]">◈ AGENT TASK</TechLabel>
            <span className="tech-label border border-[var(--color-rule)] px-2 py-0.5">
              READY FOR AGENT
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-foreground">
            <strong className="font-medium">Goal:</strong> {block.goal}
          </p>
          <div className="mt-3">
            <TechLabel>RELEVANT FILES</TechLabel>
            <ul className="mt-2 space-y-1 font-mono text-[12px] text-[var(--color-mono)]">
              {block.files.map((f) => (
                <li key={f}>↳ {f}</li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
}

/* ───────── Flow strip ───────── */
function FlowStrip({ readiness, onOpenContext }: { readiness: number; onOpenContext: () => void }) {
  const steps = [
    { label: "Repo docs detected", active: true },
    { label: "Doc opened", active: true },
    { label: "Execution extracted", active: readiness > 0 },
    { label: "Agent context ready", active: readiness >= 50 },
    { label: "PR / review", active: readiness === 100 },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 border-t border-[var(--color-rule)] bg-[var(--color-paper)] p-4 md:grid-cols-5">
      {steps.map((s, i) => (
        <button
          key={i}
          onClick={i === 3 ? onOpenContext : undefined}
          className={`border px-3 py-2 text-left transition ${
            s.active
              ? "border-[var(--color-accent)] bg-[var(--color-card)]"
              : "border-[var(--color-rule)] bg-transparent"
          }`}
        >
          <p className="font-mono text-[10px] text-[var(--color-mono)]">STEP {i + 1}</p>
          <p
            className={`mt-1 text-[12px] leading-tight ${
              s.active ? "text-[var(--color-accent)]" : "text-[var(--color-mono)]"
            }`}
          >
            {s.label}
          </p>
        </button>
      ))}
    </div>
  );
}

/* ───────── Execution panel ───────── */
function ExecutionPanel({ doc, onOpenContext }: { doc: Doc; onOpenContext: () => void }) {
  const r = readiness(doc);
  const detectedTasks = doc.body.flatMap((b) => (b.kind === "checklist" ? b.tasks : []));
  const openActions = detectedTasks.filter((t) => !t.done).length;

  return (
    <aside className="hidden border-l border-[var(--color-rule)] lg:block">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] space-y-4 overflow-auto p-4">
        {/* Status */}
        <section className="relative border border-[var(--color-rule)] bg-[var(--color-card)] p-4">
          <TechCorners />
          <TechLabel>WORK STATUS</TechLabel>
          <select
            value={doc.status}
            onChange={(e) => docsStore.update(doc.id, { status: e.target.value as DocStatus })}
            className="mt-3 h-10 w-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 text-[13px] font-medium outline-none focus:border-foreground"
            style={{ color: statusToken(doc.status) }}
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <div className="mt-4 h-1.5 w-full overflow-hidden bg-[var(--color-rule)]">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${r.pct}%`, background: "var(--color-accent)" }}
            />
          </div>
          <dl className="mt-3 space-y-2 text-[12px]">
            <Metric label="Readiness" value={`${r.pct}%`} />
            <Metric label="Open actions" value={String(openActions)} />
            <Metric label="Human decisions" value="0 pending" />
          </dl>
        </section>

        {/* Detected actions */}
        <section className="border border-[var(--color-rule)] bg-[var(--color-card)] p-4">
          <TechLabel>DETECTED ACTIONS</TechLabel>
          <ul className="mt-3 space-y-2">
            {detectedTasks.slice(0, 4).map((t) => (
              <li
                key={t.id}
                className="border border-[var(--color-rule)] bg-[var(--color-paper)] p-3"
              >
                <p className="text-[13px] font-medium text-foreground">{t.label}</p>
                <p className="mt-1 font-mono text-[10px] text-[var(--color-mono)]">
                  OWNER · {t.owner.toUpperCase()} · {t.done ? "DONE" : "OPEN"}
                </p>
              </li>
            ))}
            {detectedTasks.length === 0 && (
              <li className="text-[12px] text-muted-foreground">
                Nenhuma ação detectada. Adicione um bloco ActionChecklist.
              </li>
            )}
          </ul>
        </section>

        {/* Agent context */}
        <section className="border border-[var(--color-rule)] bg-[var(--color-card)] p-4">
          <TechLabel accent>◈ AGENT CONTEXT BUILDER</TechLabel>
          <pre className="mt-3 max-h-40 overflow-hidden whitespace-pre-wrap bg-[var(--color-ink)] p-3 font-mono text-[10px] leading-relaxed text-[var(--color-background)]">
{`# Agent Context Pack
Goal: ${doc.summary.slice(0, 60)}…
Scope: ${doc.folder}
Status: ${STATUS_LABELS[doc.status]}
Open actions: ${openActions}
Human review: required before merge`}
          </pre>
          <button
            onClick={onOpenContext}
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 bg-foreground text-[12px] font-medium uppercase tracking-wider text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
          >
            Prepare Agent Context →
          </button>
        </section>

        {/* Handoff */}
        <section className="border border-[var(--color-rule)] bg-[var(--color-card)] p-4">
          <TechLabel>HANDOFF</TechLabel>
          <div className="mt-3 space-y-2">
            <HandoffBtn>↗ Copy prompt</HandoffBtn>
            <HandoffBtn>↗ Create GitHub Issue</HandoffBtn>
            <HandoffBtn>↗ Save context in repo</HandoffBtn>
          </div>
        </section>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-1.5 last:border-0">
      <span className="text-[var(--color-mono)]">{label}</span>
      <span className="font-mono text-foreground">{value}</span>
    </div>
  );
}

function HandoffBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="tech-label flex w-full items-center justify-between border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 transition hover:border-foreground hover:text-foreground">
      {children}
    </button>
  );
}

/* ───────── Modal ───────── */
function AgentContextModal({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pack = `# Agent Context Pack

## Goal
${doc.summary}

## Why this matters
Users and agents need full operational context before changing code in ${doc.folder}.

## Current product decision
${doc.body.find((b) => b.kind === "decision")?.kind === "decision"
  ? (doc.body.find((b) => b.kind === "decision") as { text: string }).text
  : "Pending — see decision blocks in the doc."}

## Scope
- Apply changes constrained to files listed below.
- Keep human review explicit before merge.

## Relevant docs
- ${doc.path}

## Relevant code files
${doc.body
  .filter((b) => b.kind === "agentTask")
  .flatMap((b) => (b as { files: string[] }).files)
  .map((f) => `- ${f}`)
  .join("\n") || "- (none declared)"}

## Tasks
${doc.body
  .filter((b) => b.kind === "checklist")
  .flatMap((b) => (b as { tasks: { label: string; done: boolean }[] }).tasks)
  .map((t) => `- [${t.done ? "x" : " "}] ${t.label}`)
  .join("\n") || "- (none)"}

## Human review required
Yes. Review before merge.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden border border-[var(--color-rule)] bg-[var(--color-card)]"
      >
        <TechCorners />
        <header className="flex items-center justify-between gap-3 border-b border-[var(--color-rule)] px-6 py-4">
          <div>
            <TechLabel accent>◈ AGENT CONTEXT PACK</TechLabel>
            <h2 className="mt-1 font-serif text-[24px] leading-tight">{doc.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.clipboard?.writeText(pack)}
              className="tech-label border border-[var(--color-rule)] px-3 py-1.5 hover:border-foreground"
            >
              COPY
            </button>
            <button className="tech-label border border-[var(--color-rule)] px-3 py-1.5 hover:border-foreground">
              CREATE ISSUE
            </button>
            <button className="tech-label bg-foreground px-3 py-1.5 text-[var(--color-primary-foreground)] hover:bg-[var(--color-accent)]">
              SEND TO AGENT →
            </button>
            <button
              onClick={onClose}
              className="tech-label border border-[var(--color-rule)] px-3 py-1.5 hover:border-foreground"
            >
              ×
            </button>
          </div>
        </header>
        <div className="max-h-[70vh] overflow-auto bg-[var(--color-ink)] p-6">
          <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[var(--color-background)]">
            {pack}
          </pre>
        </div>
      </div>
    </div>
  );
}
