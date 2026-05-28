import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TechCorners, TechLabel } from "@/components/tech";
import { docsStore, type Doc } from "@/lib/docs-store";

export const Route = createFileRoute("/app/docs/new")({
  component: NewDoc,
});

type Template = {
  key: string;
  type: string;
  title: string;
  description: string;
  folder: string;
  bodyHint: string;
};

const TEMPLATES: Template[] = [
  {
    key: "prd",
    type: "PRD",
    title: "PRD — Product Requirements",
    description: "Tese, problema, hipóteses, escopo e critérios de aceite.",
    folder: "product",
    bodyHint: "Tese · Problema · Hipóteses · Escopo · Critérios",
  },
  {
    key: "spec",
    type: "SPEC",
    title: "Technical Spec",
    description: "Arquitetura, contratos, riscos e plano de migração.",
    folder: "product-development",
    bodyHint: "Visão técnica · Trade-offs · Plano",
  },
  {
    key: "decision",
    type: "DECISION",
    title: "Decision Log",
    description: "Contexto, opções, decisão tomada e consequências.",
    folder: "decisions",
    bodyHint: "Contexto · Opções · Decisão · Consequências",
  },
  {
    key: "plan",
    type: "PLAN",
    title: "Implementation Plan",
    description: "Tarefas detalhadas com owner, prontas para handoff de agente.",
    folder: "product-development",
    bodyHint: "Objetivo · Tasks · Acceptance criteria",
  },
  {
    key: "blank",
    type: "MDX",
    title: "Blank",
    description: "Comece do zero com um documento MDX vazio.",
    folder: "docs",
    bodyHint: "—",
  },
];

function NewDoc() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string>("prd");
  const [title, setTitle] = useState("");

  function create() {
    const tpl = TEMPLATES.find((t) => t.key === picked)!;
    const finalTitle = title.trim() || tpl.title;
    const id = `${tpl.key}-${Date.now().toString(36)}`;
    const slug = finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const doc: Doc = {
      id,
      path: `docs/${tpl.folder}/${slug}.md`,
      folder: tpl.folder,
      title: finalTitle,
      summary: tpl.description,
      status: "scoping",
      type: tpl.type,
      updated: "HOJE",
      body: [
        { kind: "h", text: tpl.title },
        { kind: "p", text: `Template: ${tpl.bodyHint}` },
      ],
    };
    docsStore.add(doc);
    navigate({ to: "/app/docs/$docId", params: { docId: id } });
  }

  return (
    <main className="px-5 pb-24 pt-8">
      <section className="border-b border-[var(--color-rule)] pb-8">
        <TechLabel accent>POINTER / DOCS — NEW</TechLabel>
        <h1 className="mt-3 font-serif text-[56px] leading-[0.95] tracking-tight md:text-[72px]">
          Novo <em className="italic">documento</em>
        </h1>
        <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
          Escolha um template. O documento será criado no repo conectado e aparece na Docs List.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((t) => {
          const active = picked === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setPicked(t.key)}
              className={`group relative border p-6 text-left transition ${
                active
                  ? "border-foreground bg-[var(--color-card)]"
                  : "border-[var(--color-rule)] bg-[var(--color-card)] hover:border-foreground"
              }`}
            >
              {active && <TechCorners />}
              <TechLabel accent={active}>{t.type}</TechLabel>
              <h3 className="mt-3 font-serif text-[24px] leading-tight">{t.title}</h3>
              <p className="mt-2 text-[13px] text-muted-foreground">{t.description}</p>
              <p className="mt-4 font-mono text-[11px] text-[var(--color-mono)]">
                docs/{t.folder}/…
              </p>
            </button>
          );
        })}
      </section>

      <section className="mt-10 grid grid-cols-12 gap-6 border-t border-[var(--color-rule)] pt-8">
        <div className="col-span-12 md:col-span-8">
          <TechLabel>TÍTULO</TechLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex.: Onboarding error mapping"
            className="mt-2 h-14 w-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 font-serif text-[24px] outline-none placeholder:text-[var(--color-mono)] focus:border-foreground"
          />
        </div>
        <div className="col-span-12 flex items-end md:col-span-4 md:justify-end">
          <button
            onClick={create}
            className="inline-flex h-12 items-center gap-3 bg-foreground px-6 text-[14px] font-medium text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-accent)]"
            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
          >
            Criar e abrir editor
            <span className="font-mono">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
