import { createFileRoute } from "@tanstack/react-router";
import { BlueprintDiagram } from "@/components/blueprint-diagram";
import { TechCorners, TechLabel, TechRuler } from "@/components/tech";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Produto", href: "#produto" },
  { label: "Processo", href: "#processo" },
  { label: "Exemplos", href: "#exemplos" },
  { label: "Termos", href: "#termos" },
];

const pillars = [
  {
    n: "01",
    kicker: "CARÁCTER ÚNICO",
    title: "Layouts editoriais",
    body: "Estrutura tipográfica como base. Cada case study merece composição, escala e ritmo — não um template revestido.",
  },
  {
    n: "02",
    kicker: "OWNERSHIP",
    title: "Ownership real",
    body: "Conteúdo em MDX no seu próprio repositório. Sem lock-in, sem CMS proprietário — exporta quando quiser.",
  },
  {
    n: "03",
    kicker: "PUBLISH",
    title: "Publicação gerida",
    body: "Workflow editorial: rascunho, preview, validação, publicação. Sem dependência do caminho crítico.",
  },
];

const steps = [
  {
    n: "01",
    title: "Workspace",
    sub: "Layouts e templates",
    body: "Cria o briefing, escolhe a base estrutural e inicia o teu site.",
  },
  {
    n: "02",
    title: "Sítio + repositório",
    sub: "Template e pipeline",
    body: "Provisionamento do site, repositório Git e integrações conectadas ao seu domínio.",
  },
  {
    n: "03",
    title: "Edição com preview",
    sub: "Editor com MDX",
    body: "Compõe páginas, visualiza em tempo real, controla components e conteúdo.",
  },
  {
    n: "04",
    title: "Draft + validação",
    sub: "Revisão guiada",
    body: "Cada draft passa por validações editoriais antes de virar release pública.",
  },
  {
    n: "05",
    title: "Publicação",
    sub: "Deploy técnico",
    body: "Push to deploy na edge com cache estável e métricas observáveis.",
  },
];

const metrics = [
  { label: "Leve", value: "BASELINE 0", note: "Sem JS desnecessário" },
  { label: "Build", value: "98+", note: "Score médio" },
  { label: "WCAG", value: "AA", note: "Acessibilidade" },
  { label: "Lighthouse", value: "100", note: "Performance" },
];

function SideRail({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none fixed top-0 ${
        side === "left" ? "left-0" : "right-0"
      } z-10 hidden h-screen w-6 flex-col items-center justify-between border-${
        side === "left" ? "r" : "l"
      } border-dashed border-[var(--color-rule)] py-6 md:flex`}
      aria-hidden
    >
      <span className="tech-label rotate-180" style={{ writingMode: "vertical-rl" }}>
        POINTER · REV.01
      </span>
      <span className="tech-label" style={{ writingMode: "vertical-rl" }}>
        SHEET 01 / 04
      </span>
    </div>
  );
}

function Index() {
  const [email, setEmail] = useState("");
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SideRail side="left" />
      <SideRail side="right" />

      {/* NAV */}
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <a href="/" className="flex items-baseline gap-3">
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-accent)]" aria-hidden>◆</span>
              <span className="font-serif text-lg tracking-tight">Pointer.Design</span>
            </span>
            <TechLabel className="hidden sm:inline">v0.1 — BETA</TechLabel>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative tech-label text-foreground transition-opacity hover:opacity-100"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 bg-[var(--color-accent)] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)]"
          >
            Waitlist
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-7">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 bg-[var(--color-accent)]" />
              <TechLabel accent>POINTER.DESIGN — BETA PRIVADA</TechLabel>
            </div>

            <h1 className="font-serif text-[64px] leading-[0.92] tracking-[-0.02em] text-[var(--color-ink)] md:text-[96px]">
              Sites pessoais
              <br />
              técnicos.
              <br />
              Controle a sua{" "}
              <em className="italic text-[var(--color-accent)]">narrativa</em>.
            </h1>

            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Sistema opinionado de personal websites para designers: case studies em
              MDX, editor com preview e publicação gerida — com ownership pleno, sem
              lock-in.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-3 bg-[var(--color-ink)] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-background)]"
              >
                Entrar na waitlist
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#produto"
                className="group inline-flex items-center gap-3 border border-[var(--color-ink)] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em]"
              >
                Ver o produto
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            {/* tech table */}
            <div className="mt-12 max-w-md border-t border-dashed border-[var(--color-rule)]">
              {[
                ["01", "Publicação com brief", "DOMÍNIO PRÓPRIO"],
                ["02", "Performance na edge", "WCAG AA"],
              ].map(([n, label, status]) => (
                <div
                  key={n}
                  className="grid grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-dashed border-[var(--color-rule)] py-2.5"
                >
                  <span className="tech-label">{n}</span>
                  <span className="text-sm">{label}</span>
                  <span className="tech-label flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <BlueprintDiagram />
          </div>
        </div>
        <TechRuler className="opacity-50" ticks={40} />
      </section>

      {/* PILLARS */}
      <section id="produto" className="border-b border-[var(--color-border)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              className={`group relative p-8 md:p-12 ${
                i < pillars.length - 1 ? "md:border-r md:border-dashed md:border-[var(--color-rule)]" : ""
              } border-b border-dashed border-[var(--color-rule)] md:border-b-0`}
            >
              <div className="mb-6 flex items-center gap-2">
                <TechLabel accent>{p.n} //</TechLabel>
                <TechLabel>{p.kicker}</TechLabel>
              </div>
              <h3 className="font-serif text-3xl leading-[1.05] tracking-tight text-[var(--color-ink)]">
                {p.title}
              </h3>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <div className="pointer-events-none absolute inset-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <TechCorners />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="processo" className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10">
          <TechLabel accent>LÓGICA OPERACIONAL</TechLabel>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] md:text-6xl">
            Briefing.
            <br />
            Estrutura.
            <br />
            Lançamento.
          </h2>

          <div className="mt-16 hidden md:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-3 h-px bg-[var(--color-rule)]" />
              <div className="grid grid-cols-5 gap-6">
                {steps.map((s) => (
                  <div key={s.n} className="relative">
                    <div className="absolute left-0 top-0 h-6 w-px bg-[var(--color-accent)]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-6">
              {steps.map((s) => (
                <article key={s.n} className="relative">
                  <TechLabel accent>STEP {s.n} / 05</TechLabel>
                  <h4 className="mt-4 font-serif text-xl leading-tight text-[var(--color-ink)]">
                    {s.title}
                  </h4>
                  <TechLabel className="mt-1 block">{s.sub}</TechLabel>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* mobile */}
          <div className="mt-12 space-y-8 md:hidden">
            {steps.map((s) => (
              <article key={s.n} className="border-l-2 border-[var(--color-accent)] pl-4">
                <TechLabel accent>STEP {s.n} / 05</TechLabel>
                <h4 className="mt-2 font-serif text-2xl text-[var(--color-ink)]">{s.title}</h4>
                <TechLabel className="mt-1 block">{s.sub}</TechLabel>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-paper)]">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <TechLabel accent>INFRAESTRUTURA CORE</TechLabel>
            <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] md:text-6xl">
              Lógica clara.
              <br />
              Velocidade na <em className="italic">edge</em>.
            </h2>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Microapp com blocos editoriais, build e publicação gerida. Pensado para
              sites observáveis e otimizados para busca — sem dependências
              desnecessárias no caminho crítico.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-px bg-[var(--color-rule)] md:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="relative bg-[var(--color-paper)] p-4">
                  <TechLabel>{m.label}</TechLabel>
                  <div className="mt-2 font-serif text-3xl leading-none text-[var(--color-ink)]">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {m.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="space-y-8 border-l border-dashed border-[var(--color-rule)] pl-6">
              {[
                {
                  k: "Camada de apresentação",
                  v: "Templates editoriais em React, themes e componentes públicos.",
                },
                {
                  k: "Blocos modulares",
                  v: "Registry oficial com blocos ajustáveis para case studies e ensaios.",
                },
                {
                  k: "Deploy na edge",
                  v: "Push to deploy, edge cache estável e domínio próprio com SSL.",
                },
              ].map((item) => (
                <div key={item.k}>
                  <TechLabel accent>{item.k}</TechLabel>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{item.v}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* WAITLIST */}
      <section
        id="waitlist"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 md:grid-cols-12 md:px-10">
          <div className="md:col-span-6">
            <TechLabel accent>ACESSO À BETA PRIVADA</TechLabel>
            <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] md:text-7xl">
              Garanta a
              <br />
              sua{" "}
              <em className="italic text-[var(--color-accent)]">vaga</em>.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Cohort limitada de designers e estúdios. Convite e instruções de acesso
              por email após aprovação.
            </p>
          </div>

          <form
            className="md:col-span-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="block">
              <TechLabel>Contacto de email técnico</TechLabel>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@exemplo.com"
                className="mt-2 w-full border-b border-[var(--color-ink)] bg-transparent py-3 font-serif text-2xl placeholder:text-muted-foreground focus:outline-none focus:border-[var(--color-accent)]"
              />
            </label>
            <button
              type="submit"
              className="group mt-8 flex w-full items-center justify-center gap-3 bg-[var(--color-accent)] py-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              Pedir acesso
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <div className="mt-3 flex items-center justify-between">
              <TechLabel>FORM REV. 01 — CAMPO OBRIGATÓRIO</TechLabel>
              <a href="#" className="tech-label underline">
                Já tem convite? Entrar
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <TechRuler ticks={60} className="opacity-40" />
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span>
              <span className="font-serif text-lg">Pointer.Design</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              Sites pessoais com precisão editorial. Performance na edge e ownership
              real do conteúdo.
            </p>
          </div>
          {[
            { title: "A / Sistema", items: ["Arquitetura", "Case studies", "Processo"] },
            { title: "B / Lab", items: ["Roadmap", "Changelog", "Contacto"] },
            { title: "C / Legal", items: ["Termos", "Privacidade"] },
          ].map((col) => (
            <div key={col.title} className="md:col-span-2">
              <TechLabel>{col.title}</TechLabel>
              <ul className="mt-4 space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-[var(--color-accent)]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-dashed border-[var(--color-rule)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
            <div className="relative inline-block p-4">
              <TechCorners className="text-[var(--color-mono)]" />
              <div className="font-serif text-base text-[var(--color-ink)]">
                Feito para designers.
                <br />
                <em className="italic text-[var(--color-accent)]">Construído com precisão.</em>
              </div>
              <TechLabel className="mt-2 block">© 2026 POINTER.DESIGN</TechLabel>
            </div>
            <TechLabel>
              N 41.157° · W 008.629° · BUILD 0.1.4
            </TechLabel>
          </div>
        </div>
      </footer>
    </div>
  );
}
