import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TechCorners, TechLabel } from "@/components/tech";
import { useMemo, useState } from "react";
import { sitesStore, formatToday, nextIndex } from "@/lib/sites-store";

export const Route = createFileRoute("/app/new")({
  component: NewSite,
  staticData: { crumb: "Criar site" },
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function NewSite() {
  const [name, setName] = useState("");
  const [created, setCreated] = useState<null | { name: string; slug: string }>(null);
  const slug = useMemo(() => slugify(name) || "portfolio-2026", [name]);
  const navigate = useNavigate();

  if (created) {
    return <Success site={created} onOpen={() => navigate({ to: "/app/sites/$siteId", params: { siteId: created.slug } })} />;
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-5xl items-center justify-center px-5 py-12">
      <div className="relative w-full max-w-2xl border border-[var(--color-rule)] bg-[var(--color-card)] p-10">
        <TechCorners />
        {/* Header strip */}
        <div className="flex items-center justify-between border-b border-dashed border-[var(--color-rule)] pb-3">
          <TechLabel accent>NOVO PROJETO — FORM REV. 01</TechLabel>
          <TechLabel>SHEET 01 / 01</TechLabel>
        </div>

        <div className="mt-10 text-center">
          <TechLabel>BRIEF · NOMEAÇÃO</TechLabel>
          <h1 className="mt-4 font-serif text-[56px] leading-[0.95] tracking-tight text-foreground">
            A Tela em <em className="italic">Branco</em>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Qual o nome desta obra? Isso vai gerar seu endereço inicial — pode ser refinado depois.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCreated({ name: name || "Portfolio 2026", slug });
          }}
          className="mx-auto mt-10 max-w-md space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="tech-label block">
              01 // NOME DO PROJETO
            </label>
            <div className="relative">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Portfolio 2026"
                className="w-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 font-serif text-[18px] text-foreground placeholder:font-serif placeholder:italic placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                autoFocus
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">
                {name.length}/40
              </span>
            </div>
            <div className="flex items-center gap-2 border-t border-dashed border-[var(--color-rule)] pt-2 font-mono text-[12px] text-muted-foreground">
              <span className="tech-label">URL</span>
              <span>↗</span>
              <span className="text-foreground">{slug}.pointer.design</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              type="submit"
              className="group inline-flex h-12 items-center gap-3 bg-foreground px-6 text-[14px] font-medium text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
              style={{ clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
            >
              Gerar meu site
              <span className="font-mono transition-transform group-hover:translate-x-1">→</span>
            </button>
            <Link to="/app" className="tech-label hover:text-foreground">
              ← CANCELAR
            </Link>
          </div>
        </form>

        {/* Footer measurement */}
        <div className="mt-10 flex items-center justify-between border-t border-dashed border-[var(--color-rule)] pt-3">
          <TechLabel>← 560 MM →</TechLabel>
          <TechLabel>SCALE 1 : 1</TechLabel>
        </div>
      </div>
    </main>
  );
}

function Success({ site, onOpen }: { site: { name: string; slug: string }; onOpen: () => void }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-5xl items-center justify-center px-5 py-12">
      <div className="relative w-full max-w-2xl border border-[var(--color-rule)] bg-[var(--color-card)] p-10">
        <TechCorners />
        <div className="flex items-center justify-between border-b border-dashed border-[var(--color-rule)] pb-3">
          <TechLabel accent>● BUILD COMPLETE — REV. 01</TechLabel>
          <TechLabel>STATUS · OK</TechLabel>
        </div>

        <div className="mt-10 text-center">
          {/* technical "spark" */}
          <svg className="mx-auto h-12 w-12 text-[var(--color-accent)]" viewBox="0 0 48 48" fill="none" aria-hidden>
            <path d="M24 4 L26 22 L44 24 L26 26 L24 44 L22 26 L4 24 L22 22 Z" stroke="currentColor" strokeWidth="1" />
            <circle cx="24" cy="24" r="2" fill="currentColor" />
          </svg>
          <h1 className="mt-6 font-serif text-[48px] leading-[1] tracking-tight text-foreground">
            Seu site está <em className="italic">pronto</em>.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            O palco está montado. Agora é só contar sua história.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md border border-[var(--color-rule)] bg-[var(--color-paper)]">
          <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-4 py-2">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--color-rule)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-rule)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-rule)]" />
            </div>
            <TechLabel>{site.slug}.pointer.design</TechLabel>
          </div>
          <div className="space-y-2 px-4 py-5">
            <h3 className="font-serif text-[22px] text-foreground">{site.name}</h3>
            <p className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              STATUS · LIVE
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={onOpen}
            className="group inline-flex h-12 items-center gap-3 bg-foreground px-8 text-[14px] font-medium text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
            style={{ clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
          >
            Entrar no editor
            <span className="font-mono transition-transform group-hover:translate-x-1">→</span>
          </button>
          <Link to="/app" className="tech-label hover:text-foreground">
            ← VOLTAR AO DASHBOARD
          </Link>
        </div>
      </div>
    </main>
  );
}
