import { createFileRoute, Link } from "@tanstack/react-router";
import { TechCorners, TechLabel } from "@/components/tech";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/settings")({
  component: WorkspaceSettings,
  staticData: { crumb: "Workspace settings" },
});

type Language = "en" | "pt";
const LANG_KEY = "pointer.workspace.lang";

function WorkspaceSettings() {
  const [lang, setLang] = useState<Language>("en");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? window.localStorage.getItem(LANG_KEY)
      : null) as Language | null;
    if (stored === "en" || stored === "pt") setLang(stored);
  }, []);

  function save() {
    window.localStorage.setItem(LANG_KEY, lang);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <main className="px-5 pb-24 pt-8">
      {/* Header */}
      <section className="grid grid-cols-12 gap-6 border-b border-[var(--color-rule)] pb-10">
        <div className="col-span-12 md:col-span-8">
          <TechLabel accent>POINTER / WORKSPACE — SETTINGS</TechLabel>
          <h1 className="mt-3 font-serif text-[64px] leading-[0.95] tracking-tight text-foreground md:text-[80px]">
            Workspace <em className="italic">settings</em>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Preferências deste workspace se aplicam a todos os membros do estúdio.
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-2 md:col-span-4 md:items-end md:justify-end">
          <TechLabel>ORG / andre-s-organization</TechLabel>
          <TechLabel>REV · 01</TechLabel>
        </div>
      </section>

      {/* Sections */}
      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-14">
        {/* Language */}
        <SectionLabel n="01">Language</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Language</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Choose the language for this workspace. All members see the same UI language.
          </p>

          <div className="mt-6 space-y-2">
            {[
              { v: "en" as const, label: "English", hint: "Default" },
              { v: "pt" as const, label: "Português", hint: "Brasil" },
            ].map((opt) => {
              const active = lang === opt.v;
              return (
                <label
                  key={opt.v}
                  className={`flex cursor-pointer items-center justify-between border px-4 py-3 transition ${
                    active
                      ? "border-foreground bg-[var(--color-paper)]"
                      : "border-[var(--color-rule)] hover:border-foreground/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        active ? "border-foreground" : "border-[var(--color-rule)]"
                      }`}
                    >
                      {active && <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />}
                    </span>
                    <span className="font-serif text-[17px] text-foreground">{opt.label}</span>
                  </span>
                  <span className="tech-label">{opt.hint}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={save}
              className="inline-flex h-11 items-center gap-3 bg-foreground px-6 text-[13px] font-medium uppercase tracking-wider text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
              style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
            >
              Save
              <span className="font-mono">→</span>
            </button>
            {saved && (
              <span className="tech-label flex items-center gap-2 text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                SAVED
              </span>
            )}
          </div>
        </div>

        {/* Integrations */}
        <SectionLabel n="02">Integrations</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Integrations</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Studio keys — connect GitHub and Vercel in one place. Manage OAuth connections here
            instead of repeating setup for each new project.
          </p>

          <div className="relative mt-6 border border-[var(--color-rule)] bg-[var(--color-paper)] p-6">
            <TechCorners />
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              <div className="flex-1">
                <p className="font-serif text-[18px] text-foreground">
                  GitHub and Vercel are connected to this workspace.
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  You can create a new project or return to the dashboard.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/app/new"
                className="inline-flex h-10 items-center gap-2 bg-foreground px-5 text-[12px] font-medium uppercase tracking-wider text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
                style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
              >
                Create new project
                <span className="font-mono">→</span>
              </Link>
              <Link
                to="/app"
                className="inline-flex h-10 items-center gap-2 border border-foreground px-5 text-[12px] font-medium uppercase tracking-wider text-foreground transition hover:bg-foreground hover:text-[var(--color-primary-foreground)]"
              >
                Dashboard
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px border-t border-dashed border-[var(--color-rule)] pt-4">
              <ConnRow label="GITHUB" value="andre-s-organization" />
              <ConnRow label="VERCEL" value="pointer-studio" />
            </div>
          </div>
        </div>

        {/* Members */}
        <SectionLabel n="03">Members</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Members</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Convide colaboradores para este workspace. Permissões são definidas por papel.
          </p>

          <div className="mt-6 divide-y divide-[var(--color-rule)] border border-[var(--color-rule)]">
            {[
              { name: "André Azevedo", email: "andre@pointer.design", role: "OWNER" },
              { name: "Convidar membro", email: "name@email.com", role: "INVITE", muted: true },
            ].map((m) => (
              <div
                key={m.email}
                className={`flex items-center justify-between px-5 py-4 ${m.muted ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] font-mono text-[11px] uppercase">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="font-serif text-[16px] text-foreground">{m.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <span className="tech-label border border-[var(--color-rule)] px-2 py-1">
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger */}
        <SectionLabel n="04">Danger zone</SectionLabel>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[28px] leading-tight text-foreground">Danger zone</h2>
          <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
            Ações irreversíveis. Tenha certeza antes de prosseguir.
          </p>
          <div className="mt-6 flex items-center justify-between border border-dashed border-[var(--color-accent)]/50 bg-[var(--color-paper)] px-5 py-4">
            <div>
              <p className="font-serif text-[16px] text-foreground">Delete workspace</p>
              <p className="text-[13px] text-muted-foreground">
                Remove permanentemente todos os sites e membros.
              </p>
            </div>
            <button className="tech-label border border-[var(--color-accent)] px-3 py-2 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-foreground)]">
              DELETE
            </button>
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

function ConnRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <span className="tech-label">{label}</span>
      <span className="font-mono text-[12px] text-foreground">{value}</span>
    </div>
  );
}
