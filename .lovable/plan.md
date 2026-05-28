
## Objetivo

Trazer o **Pointer Docs** (orquestração de produto sobre `.md/.mdx` do repo) para dentro da plataforma, reutilizando a linguagem visual editorial-técnica do Pointer Sites e desenhando uma UX coesa para o usuário transitar entre os dois produtos.

---

## 1. Arquitetura de produto: Sites ↔ Docs

Hoje tudo vive em `/app/*` assumindo Sites. Vamos namespacear por produto:

```
/app                    → redirect para o último produto usado (default: sites)
/app/sites              → dashboard de sites (atual /app)
/app/sites/new
/app/sites/:siteId
/app/docs               → Docs List (novo)
/app/docs/:docId        → Doc Editor + Execution Panel (novo)
/app/docs/new
/app/settings           → workspace settings (compartilhado)
```

**Product Switcher no TopBar** (à esquerda, depois do logo):
- Um toggle segmentado `SITES · DOCS` em estilo `tech-label`, persistindo a escolha em `localStorage` (`pointer:active-product`).
- O breadcrumb e a label "WS / 001 — ACTIVE" continuam iguais; só a linha de navegação muda de contexto.
- O botão "Settings" continua global (workspace abrange ambos).

**Como os dois produtos conversam** (sem misturar workflows):
- **Workspace compartilhado:** mesmo GitHub, mesmo Vercel, mesmos membros, mesmas integrações (já refletido em Site Settings § Integrations).
- **CodeReference cruzado:** um doc pode referenciar arquivos de um site (`sites/:siteId/...`); o Execution Panel mostra um chip `↗ LINKED SITE` que abre o editor do site.
- **DesignReference reverso:** uma página de site pode citar o doc que originou a decisão; no Site Settings (§ Version history) cada publicação pode opcionalmente apontar para um `Decision` doc.
- **Mesma linguagem de status:** Sites usam `live/draft/archived`; Docs usam `idea → … → done`. Diferentes propositadamente — Sites = artefato publicável, Docs = trabalho em andamento. Não unificar.
- **Notificações globais** (futuro, fora do MVP): "3 docs aguardam decisão", "2 sites com deploy pendente" agregadas no TopBar.

---

## 2. Tradução do protótipo HTML para o design system

O protótipo usa paleta clara warm (`#fcfaf6` / `#ca4a00` / Funnel Display). Nosso sistema já tem `--color-paper`, `--color-accent` (laranja) e família serif/mono — **mantemos os tokens atuais** e re-skinnamos o protótipo para:
- bordas `var(--color-rule)` no lugar de `rgba(0,0,0,.1)`;
- `TechCorners` / `TechLabel` no lugar de `.chip` arredondado;
- títulos em `font-serif` italic (consistente com `/app`);
- pílulas de status com a mesma estética dos `StatusBadge` de Sites (quadradas, `tech-label`, dot colorido) — não arredondadas tipo Notion.
- editor body permanece "Notion-like" (legível, neutro), mas o **chrome** (header, toolbar, painéis) usa a linguagem editorial-técnica.

Mapeamento de cores de pílula (status do Doc) → tokens novos em `styles.css`:
- `--status-agent` (laranja/accent), `--status-decision` (amarelo soft), `--status-review` (azul soft), `--status-done` (verde soft), `--status-blocked` (vermelho soft). Todos em `oklch`.

---

## 3. Telas a construir (MVP mockado)

### 3.1 `/app/docs` — Docs List
Layout em 12 colunas igual ao dashboard de Sites:
- Header com `TechLabel accent` "POINTER / WORKSPACE — DOCS", `<h1>` "Your <em>Docs</em>", botão "Novo doc".
- Filter bar replicando estética atual: chips `By folder · Ready for agent · Needs decision · Outdated · Recently changed`.
- Lista agrupada por pasta (`product-development`, `guides`, `operations`…) — não grid de cards, e sim **linhas densas** (mais próximo do protótipo lateral) já que docs são listáveis, não visuais:
  - path mono pequeno + título serif + pílulas de status/tipo + última edição.
- Busca acima da lista.

### 3.2 `/app/docs/:docId` — Doc Editor
Layout em 3 colunas (`docs-list` lateral · `editor` central · `execution-panel` direita), responsivo:
- **Sidebar esquerda** (260px): mini Docs List filtrável, doc ativo destacado com `TechCorners`.
- **Editor central**: header com breadcrumb (`docs/…/file.md`), título grande serif editável, summary, toolbar com slash-hint e pílulas (`MDX`, `Git-backed`, status).
- **Corpo do editor** (mockado, não rich-text real ainda): renderiza blocos estáticos:
  - parágrafos prose;
  - `<Decision>` (card amarelo soft);
  - `<ActionChecklist>` (checkboxes interativos, contador atualiza progress);
  - `<FigmaEmbed>` (placeholder com tech-grid);
  - `<AgentTask>` (card accent).
  - Cada bloco com `block-label` no estilo `tech-label` ao invés do estilo do protótipo.
- **Flow strip** no rodapé do editor: 5 steps (`Repo detected → Doc opened → Execution extracted → Agent context ready → PR/review`), step ativo com cor accent.
- **Execution Panel direita** (320px):
  - Work status (select com as 9 opções), progress bar animada, métricas (Readiness %, Open actions, Human decisions).
  - Detected actions (cards mock).
  - Agent Context Builder: preview em terminal escuro + botão "Prepare Agent Context" que abre modal.
  - Handoff options: Copy prompt / Create GitHub Issue / Save context in repo.
- **Modal Agent Context Pack**: full markdown mockado, botões Copy / Create Issue / Send to Agent.

### 3.3 `/app/docs/new`
Tela simples seguindo padrão de `/app/sites/new`: escolha de template (PRD, Spec, Decision log, Implementation plan, Blank) → cria entry no store mockado e navega para o editor.

---

## 4. Estado mockado

`src/lib/docs-store.ts` espelhando `sites-store.ts`:
- `Doc { id, path, title, summary, folder, status, type, tasks: Task[], decisions, lastEdited, body (mdx string), readiness }`
- `DocStatus = "idea" | "scoping" | "needs-decision" | "ready-for-agent" | "in-progress" | "needs-review" | "blocked" | "validated" | "done" | "archived"`.
- Seed com os 5 docs do protótipo (Platform GitHub error mapping, PRD, Editor v2, Agent Harness, Platform V2 runbook).
- `useDocs()` / `docsStore.get/update` reativo no padrão atual.

---

## 5. Integração de Sites e Docs no TopBar

`src/routes/app.tsx`:
- Adicionar `<ProductSwitcher>` ao lado do `PointerMark`: dois botões em segmento, com underline accent no produto ativo. Usar `useRouterState` para detectar `/app/sites*` vs `/app/docs*`.
- Atualizar o crumb root: `People & Design / Sites` ou `People & Design / Docs`.
- Mover o atual `/app/` (dashboard de sites) para `/app/sites/` (rename de arquivos), e fazer `/app/index` redirecionar (`<Navigate>`) para `/app/sites` ou último produto.

---

## 6. Sincronização landing → produto

A landing já tem o fluxo "Já tem convite? Entrar" → setup-workspace. No final do setup, oferecer **escolha inicial de produto** ("Comece pelo Sites ou pelo Docs?") — dois cards explicando cada um — que define o produto default e leva direto para a tela correspondente.

---

## 7. Detalhes técnicos

**Arquivos criados:**
- `src/lib/docs-store.ts`
- `src/routes/app.docs.index.tsx`
- `src/routes/app.docs.new.tsx`
- `src/routes/app.docs.$docId.tsx`
- `src/components/product-switcher.tsx`
- `src/components/docs/` → `DocsSidebar.tsx`, `DocEditor.tsx`, `ExecutionPanel.tsx`, `AgentContextModal.tsx`, blocos (`DecisionBlock.tsx`, `ChecklistBlock.tsx`, `AgentTaskBlock.tsx`, `FigmaEmbedBlock.tsx`)
- `src/routes/_auth.choose-product.tsx` (passo opcional pós-setup-workspace)

**Arquivos editados:**
- `src/routes/app.tsx` — adicionar `ProductSwitcher`, ajustar crumbs.
- `src/routes/app.index.tsx` → renomeado para `src/routes/app.sites.index.tsx`; criar novo `app.index.tsx` redirect.
- `src/routes/app.new.tsx` → `app.sites.new.tsx`.
- `src/routes/app.sites.$siteId.tsx` (já existe, sem mudança).
- `src/styles.css` — tokens de status (`--status-*`).
- `src/routes/_auth.setup-workspace.tsx` — encadear para `/choose-product` antes de `/app`.

**Fora de escopo (MVP):**
- editor MDX real (rich-text/slash commands funcionais) — mock estático com checkboxes interativos só na ActionChecklist;
- conexão real com GitHub para listar `.md` (continua mockado no store, igual aos Sites);
- export real do Agent Context (modal copia texto estático);
- persistência entre sessões além do que `sites-store` já faz (in-memory + reatividade simples).

---

## 8. Resultado esperado

- `/app/sites` e `/app/docs` coexistem com o mesmo chrome e troca instantânea via Product Switcher.
- Pointer Docs entrega visualmente o protótipo recriado no design system editorial-técnico.
- Usuário entende que workspace, integrações e billing são compartilhados; produtos têm workflows próprios mas se referenciam via CodeReference / DesignReference.
