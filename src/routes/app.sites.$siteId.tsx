import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { TechCorners, TechLabel } from "@/components/tech";
import { PublishPopover } from "@/components/publish-popover";
import { useState } from "react";
import { sitesStore, useSites } from "@/lib/sites-store";

export const Route = createFileRoute("/app/sites/$siteId")({
  component: SiteEditor,
});

type Doc = {
  slug: string;
  title: string;
  group: "work" | "pages" | "projects";
  status?: "draft" | "published";
  company?: string;
  role?: string;
  year?: string;
  tags?: string[];
};

const DOCS: Doc[] = [
  { slug: "blink-mobile", title: "Blink Mobile App — User Flow", group: "work", status: "published", company: "Blink", role: "Product Designer", year: "2024", tags: ["UX Research", "Mobile", "B2C"] },
  { slug: "blink", title: "Designing a More Confident Restaurant Booking Experience", group: "work", status: "draft", company: "Blackbird.ai", role: "Product Designer", year: "2024", tags: ["UX Research", "B2B", "SaaS", "Business Intelligence", "AI/ML", "Data visualization"] },
  { slug: "blink-admin", title: "MaaS Account — Manage users and access", group: "work", status: "published", company: "MaaS", role: "Lead Designer", year: "2023", tags: ["B2B", "Admin", "Permissions"] },
  { slug: "blink-marketing", title: "Turning Onboarding into a Value moment", group: "work", status: "published", company: "Blink", role: "Product Designer", year: "2023", tags: ["Onboarding", "Growth"] },
  { slug: "about-me", title: "About me", group: "pages", status: "published" },
];

type Tab = "content" | "theme" | "settings";

function SiteEditor() {
  const { siteId } = useParams({ from: "/app/sites/$siteId" });
  const [tab, setTab] = useState<Tab>("content");
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>("blink");
  const [publishOpen, setPublishOpen] = useState(false);

  const filtered = DOCS.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));
  const groups = {
    work: filtered.filter((d) => d.group === "work"),
    pages: filtered.filter((d) => d.group === "pages"),
    projects: filtered.filter((d) => d.group === "projects"),
  };
  const active = DOCS.find((d) => d.slug === activeSlug) ?? null;

  return (
    <div className="border-t border-[var(--color-rule)]">
      {/* Site context bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-rule)] bg-[var(--color-paper)]/50 px-5 py-3">
        <div className="flex items-center gap-3">
          <Link to="/app" className="tech-label hover:text-foreground">
            ← VOLTAR
          </Link>
          <span className="tech-label">/</span>
          <span className="font-serif text-[16px] italic text-foreground">{siteId}</span>
          <span className="font-mono text-[11px] text-[var(--color-accent)]">↗ {siteId}.pointer.design</span>
        </div>
        <div className="flex items-center gap-3">
          <TechLabel>● ALL CHANGES SAVED</TechLabel>
          <button className="tech-label border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 hover:border-foreground">↶</button>
          <button className="tech-label border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 hover:border-foreground">↷</button>
          <button className="tech-label border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 hover:border-foreground hover:text-foreground">
            ↗ PREVIEW
          </button>
          <div className="relative">
            <button
              onClick={() => setPublishOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-2 bg-[var(--color-accent)] px-4 text-[12px] font-medium uppercase tracking-wider text-[var(--color-accent-foreground)] transition hover:bg-foreground"
              style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
            >
              Publish ↗
            </button>
            <PublishPopover open={publishOpen} onClose={() => setPublishOpen(false)} siteId={siteId} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[var(--color-rule)] bg-[var(--color-background)] px-5">
        {(["content", "theme", "settings"] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-3 font-mono text-[12px] uppercase tracking-wider transition ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              {active && (
                <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-[var(--color-accent)]" />
              )}
            </button>
          );
        })}
        <span className="ml-auto tech-label">EDITOR · REV. 01</span>
      </div>

      {/* Body */}
      {tab === "content" && (
        <div className="grid min-h-[calc(100vh-14rem)] grid-cols-12">
          {/* Sidebar */}
          <aside className="col-span-12 border-r border-[var(--color-rule)] bg-[var(--color-paper)]/40 md:col-span-3">
            <div className="border-b border-[var(--color-rule)] p-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[12px] text-muted-foreground">⌕</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full border border-[var(--color-rule)] bg-[var(--color-card)] py-2 pl-8 pr-3 font-mono text-[12px] text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
              </div>
            </div>

            <FileGroup
              label="Work"
              count={groups.work.length}
              docs={groups.work}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
            <FileGroup
              label="Pages"
              count={groups.pages.length}
              docs={groups.pages}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
            <FileGroup
              label="Projects"
              count={groups.projects.length}
              docs={groups.projects}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
          </aside>

          {/* Editor / preview */}
          <section className="col-span-12 p-8 md:col-span-9">
            {active ? <DocEditor doc={active} /> : <EmptyState />}
          </section>
        </div>
      )}

      {tab === "theme" && <ThemePanel />}
      {tab === "settings" && <SettingsPanel siteId={siteId} />}
    </div>
  );
}

function FileGroup({
  label,
  count,
  docs,
  activeSlug,
  onSelect,
}: {
  label: string;
  count: number;
  docs: Doc[];
  activeSlug: string | null;
  onSelect: (s: string) => void;
}) {
  return (
    <div className="border-b border-[var(--color-rule)]">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="tech-label">
          {label} <span className="font-mono opacity-60">({count})</span>
        </span>
        <button className="flex h-6 w-6 items-center justify-center border border-[var(--color-rule)] bg-[var(--color-card)] font-mono text-[12px] hover:border-foreground hover:text-foreground">
          +
        </button>
      </div>
      <ul>
        {docs.map((d, i) => {
          const active = d.slug === activeSlug;
          return (
            <li key={d.slug}>
              <button
                onClick={() => onSelect(d.slug)}
                className={`flex w-full items-start gap-3 border-t border-dashed border-[var(--color-rule)] px-4 py-3 text-left transition ${
                  active ? "bg-[var(--color-card)]" : "hover:bg-[var(--color-card)]/60"
                }`}
              >
                <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={`block truncate text-[13px] ${active ? "font-medium text-foreground" : "text-foreground/85"}`}>
                      {d.title}
                    </span>
                    {d.status === "draft" && (
                      <span className="tech-label border border-[var(--color-rule)] px-1.5 py-0.5">
                        DRAFT
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-[var(--color-accent)]">
                    /{d.slug}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        {docs.length === 0 && (
          <li className="px-4 py-6 text-center font-mono text-[11px] text-muted-foreground">
            — vazio —
          </li>
        )}
      </ul>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative flex h-full min-h-[480px] items-center justify-center border border-dashed border-[var(--color-rule)] bg-[var(--color-paper)]/30">
      <TechCorners />
      <div className="text-center">
        <span className="font-mono text-3xl text-muted-foreground">←</span>
        <p className="mt-3 font-serif text-[20px] italic text-foreground">
          Selecione um arquivo da lista ao lado
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">para ver o preview aqui.</p>
      </div>
    </div>
  );
}

function DocEditor({ doc }: { doc: Doc }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Metadata rail */}
      <aside className="col-span-12 lg:col-span-3">
        <div className="border-b border-[var(--color-rule)] pb-3">
          <TechLabel>METADATA — REV. 01</TechLabel>
        </div>
        {["Publishing", "Project", "Results", "Media"].map((s) => (
          <button
            key={s}
            className="flex w-full items-center justify-between border-b border-[var(--color-rule)] py-3 text-left font-serif text-[15px] text-foreground hover:text-[var(--color-accent)]"
          >
            {s}
            <span className="font-mono text-[12px] text-muted-foreground">▾</span>
          </button>
        ))}
        <div className="mt-6 border border-dashed border-[var(--color-rule)] p-3">
          <TechLabel>SHEET A · 1/1</TechLabel>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            Salvo automaticamente. Última revisão há 2 min.
          </p>
        </div>
      </aside>

      {/* Main canvas */}
      <article className="relative col-span-12 border border-[var(--color-rule)] bg-[var(--color-card)] p-8 lg:col-span-9">
        <TechCorners />
        <div className="flex items-center justify-between border-b border-dashed border-[var(--color-rule)] pb-3">
          <TechLabel accent>● EDIT MODE</TechLabel>
          <TechLabel>← 240 MM →</TechLabel>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <button className="tech-label mb-3 inline-flex items-center gap-2 border border-[var(--color-rule)] bg-foreground px-2 py-1 text-[var(--color-primary-foreground)]">
              ✎ EDIT TITLE
            </button>
            <h1 className="font-serif text-[44px] leading-[1.02] tracking-tight text-foreground">
              {doc.title}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div
              className="aspect-[4/3] w-full bg-[linear-gradient(135deg,oklch(0.72_0.18_300),oklch(0.45_0.22_300))]"
              style={{ boxShadow: "inset 0 0 0 1px var(--color-rule)" }}
            />
            <div className="mt-2 flex items-center justify-between">
              <TechLabel>COVER · 4:3</TechLabel>
              <button className="tech-label hover:text-foreground">REPLACE ↗</button>
            </div>
          </div>
        </div>

        {/* Spec table */}
        <div className="mt-10 grid grid-cols-12 gap-6 border-t border-dashed border-[var(--color-rule)] pt-6">
          {[
            { k: "Company", v: doc.company ?? "—" },
            { k: "Role", v: doc.role ?? "—" },
            { k: "Year", v: doc.year ?? "—" },
          ].map((f) => (
            <div key={f.k} className="col-span-12 md:col-span-4">
              <TechLabel accent>■ {f.k.toUpperCase()}</TechLabel>
              <p className="mt-2 font-serif text-[18px] text-foreground">{f.v}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {doc.tags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {doc.tags.map((t) => (
              <span
                key={t}
                className="border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] text-foreground"
              >
                {t}
              </span>
            ))}
            <button className="border border-dashed border-[var(--color-rule)] px-3 py-1 font-mono text-[11px] text-muted-foreground hover:border-foreground hover:text-foreground">
              + add tag
            </button>
          </div>
        )}

        <div className="mt-10 border-t border-dashed border-[var(--color-rule)] pt-3 flex items-center justify-between">
          <TechLabel>BODY · CONTENT BELOW</TechLabel>
          <TechLabel>SCALE 1 : 1</TechLabel>
        </div>
      </article>
    </div>
  );
}

function ThemePanel() {
  return (
    <section className="p-8">
      <div className="border-b border-[var(--color-rule)] pb-4">
        <TechLabel accent>02 // THEME — VARIABLES</TechLabel>
        <h2 className="mt-2 font-serif text-[32px] text-foreground">
          Sistema visual <em className="italic">opinionado</em>
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {[
          { k: "Display", v: "Instrument Serif" },
          { k: "Body", v: "Inter" },
          { k: "Mono", v: "JetBrains Mono" },
          { k: "Accent", v: "Pointer Orange" },
        ].map((f) => (
          <div key={f.k} className="col-span-12 border border-[var(--color-rule)] bg-[var(--color-card)] p-5 md:col-span-3">
            <TechLabel>{f.k.toUpperCase()}</TechLabel>
            <p className="mt-3 font-serif text-[22px] text-foreground">{f.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SettingsPanel({ siteId }: { siteId: string }) {
  const sites = useSites();
  const site = sites.find((s) => s.id === siteId);
  const navigate = useNavigate();
  const [confirmUnpublish, setConfirmUnpublish] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const status = site?.status ?? "draft";
  const url = site?.url ?? `${siteId}.pointer.design`;
  const name = site?.name ?? siteId;
  const githubUrl = `https://github.com/pointer/${siteId}`;
  const vercelUrl = `https://vercel.com/pointer-studio/${siteId}`;

  const info: { k: string; v: string }[] = [
    { k: "Project ID", v: siteId },
    { k: "Name", v: name },
    { k: "Domain", v: url },
    { k: "Created", v: "MAR 12, 2026" },
    { k: "Last published", v: site?.updated ?? "—" },
    { k: "Pages", v: "5" },
  ];

  const history = [
    { date: "MAI 21, 2026 · 14:32", commit: "a1b2c3d", author: "andre", label: "LIVE" as const },
    { date: "MAI 18, 2026 · 09:14", commit: "9f8e7d6", author: "andre", label: "PREVIOUS" as const },
    { date: "MAI 12, 2026 · 18:02", commit: "5c4b3a2", author: "andre", label: "PREVIOUS" as const },
    { date: "ABR 28, 2026 · 11:47", commit: "0e1d2c3", author: "andre", label: "PREVIOUS" as const },
  ];

  const statusDot =
    status === "live"
      ? "bg-[var(--color-accent)]"
      : status === "draft"
      ? "bg-muted-foreground"
      : "bg-foreground/40";

  function unpublish() {
    sitesStore.update(siteId, { status: "draft" });
    setConfirmUnpublish(false);
  }
  function archive() {
    sitesStore.update(siteId, { status: "archived" });
    setConfirmArchive(false);
    navigate({ to: "/app" });
  }

  return (
    <main className="px-5 pb-24 pt-8">
      {/* Header */}
      <section className="grid grid-cols-12 gap-6 border-b border-[var(--color-rule)] pb-10">
        <div className="col-span-12 md:col-span-8">
          <TechLabel accent>POINTER / SITE — SETTINGS</TechLabel>
          <h1 className="mt-3 font-serif text-[56px] leading-[0.95] tracking-tight text-foreground md:text-[72px]">
            Site <em className="italic">settings</em>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Configurações deste site — informações, integrações, status de publicação e histórico.
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-2 md:col-span-4 md:items-end md:justify-end">
          <TechLabel>SITE / {siteId}</TechLabel>
          <TechLabel>REV · 01</TechLabel>
        </div>
      </section>

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-14">
        {/* §01 Site info */}
        <SectionLabel n="01">Site info</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Site info</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Ficha técnica deste site dentro do workspace.
          </p>
          <div className="relative mt-6 border border-[var(--color-rule)] bg-[var(--color-paper)] p-6">
            <TechCorners />
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
              {info.map((f) => (
                <div
                  key={f.k}
                  className="flex items-center justify-between border-b border-dashed border-[var(--color-rule)] px-1 py-3"
                >
                  <span className="tech-label">{f.k.toUpperCase()}</span>
                  <span className="font-mono text-[12px] text-foreground">{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* §02 Integrations */}
        <SectionLabel n="02">Integrations</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Integrations</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Este site herda as conexões do workspace. Acesse diretamente o repositório no GitHub ou o projeto na Vercel.
          </p>
          <div className="relative mt-6 border border-[var(--color-rule)] bg-[var(--color-paper)] p-6">
            <TechCorners />
            <div className="divide-y divide-dashed divide-[var(--color-rule)]">
              <ExternalRow label="GITHUB" value={`pointer/${siteId}`} href={githubUrl} />
              <ExternalRow label="VERCEL" value={`pointer-studio/${siteId}`} href={vercelUrl} />
            </div>
          </div>
        </div>

        {/* §03 Status & Publishing */}
        <SectionLabel n="03">Status</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Status & publishing</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Controle se este site está online. Despublicar tira do ar sem apagar conteúdo — você pode publicar novamente a qualquer momento.
          </p>

          <div className="relative mt-6 border border-[var(--color-rule)] bg-[var(--color-paper)] p-6">
            <TechCorners />
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3">
                <span className={`mt-2 h-2 w-2 rounded-full ${statusDot}`} />
                <div>
                  <p className="font-serif text-[18px] text-foreground">
                    {status === "live" && "Site online"}
                    {status === "draft" && "Site fora do ar"}
                    {status === "archived" && "Site arquivado"}
                  </p>
                  {status === "live" ? (
                    <a
                      href={`https://${url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block font-mono text-[12px] text-[var(--color-accent)] hover:underline"
                    >
                      ↗ {url}
                    </a>
                  ) : (
                    <p className="mt-1 font-mono text-[12px] text-muted-foreground">{url}</p>
                  )}
                </div>
              </div>
              <span className="tech-label border border-[var(--color-rule)] px-2 py-1">
                {status.toUpperCase()}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px border-t border-dashed border-[var(--color-rule)] pt-4">
              <div className="flex items-center justify-between px-1 py-2">
                <span className="tech-label">VISIBILITY</span>
                <span className="font-mono text-[12px] text-foreground">PUBLIC</span>
              </div>
              <div className="flex items-center justify-between px-1 py-2">
                <span className="tech-label">LAST DEPLOY</span>
                <span className="font-mono text-[12px] text-foreground">{site?.updated ?? "—"}</span>
              </div>
            </div>

            {status === "live" && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {!confirmUnpublish ? (
                  <button
                    onClick={() => setConfirmUnpublish(true)}
                    className="inline-flex h-10 items-center gap-2 border border-foreground px-5 text-[12px] font-medium uppercase tracking-wider text-foreground transition hover:bg-foreground hover:text-[var(--color-primary-foreground)]"
                  >
                    Unpublish site
                  </button>
                ) : (
                  <>
                    <span className="tech-label">Confirmar? Site sairá do ar.</span>
                    <button
                      onClick={unpublish}
                      className="inline-flex h-10 items-center gap-2 bg-foreground px-5 text-[12px] font-medium uppercase tracking-wider text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
                      style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                    >
                      Sim, despublicar
                    </button>
                    <button
                      onClick={() => setConfirmUnpublish(false)}
                      className="tech-label hover:text-foreground"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* §04 Version history */}
        <SectionLabel n="04">Version history</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Version history</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Histórico das últimas publicações deste site.
          </p>
          <div className="mt-6 divide-y divide-[var(--color-rule)] border border-[var(--color-rule)]">
            {history.map((h, i) => (
              <div key={h.commit} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(history.length - i).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-serif text-[15px] text-foreground">{h.date}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {h.commit} · @{h.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`tech-label border px-2 py-1 ${
                      h.label === "LIVE"
                        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "border-[var(--color-rule)]"
                    }`}
                  >
                    {h.label}
                  </span>
                  <button className="tech-label hover:text-foreground">↗ VIEW</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* §05 Danger zone */}
        <SectionLabel n="05">Danger zone</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Danger zone</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Arquivar move o site para fora do dashboard ativo. O conteúdo é preservado e pode ser restaurado depois.
          </p>
          <div className="mt-6 flex items-center justify-between gap-6 border border-dashed border-[var(--color-accent)]/50 bg-[var(--color-paper)] px-5 py-4">
            <div>
              <p className="font-serif text-[16px] text-foreground">Archive site</p>
              <p className="text-[13px] text-muted-foreground">
                Tira o site do ar e remove da lista ativa. Diferente de deletar — pode ser restaurado.
              </p>
            </div>
            {!confirmArchive ? (
              <button
                onClick={() => setConfirmArchive(true)}
                className="tech-label border border-[var(--color-accent)] px-3 py-2 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-foreground)]"
              >
                ARCHIVE
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfirmArchive(false)}
                  className="tech-label hover:text-foreground"
                >
                  Cancelar
                </button>
                <button
                  onClick={archive}
                  className="tech-label border border-[var(--color-accent)] bg-[var(--color-accent)] px-3 py-2 text-[var(--color-primary-foreground)]"
                >
                  CONFIRMAR ARCHIVE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="col-span-12 md:col-span-3 md:col-start-1">
      <div className="sticky top-20 space-y-2 border-l border-[var(--color-rule)] pl-4">
        <TechLabel>§ {n}</TechLabel>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {children}
        </p>
      </div>
    </div>
  );
}

function ExternalRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between px-1 py-3"
    >
      <span className="tech-label">{label}</span>
      <span className="flex items-center gap-2 font-mono text-[12px] text-foreground group-hover:text-[var(--color-accent)]">
        {value}
        <span className="font-mono">↗</span>
      </span>
    </a>
  );
}
