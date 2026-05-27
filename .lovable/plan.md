## Goal

Reescrever o painel de Settings dentro do editor do site (`src/routes/app.sites.$siteId.tsx` → componente `SettingsPanel`) aplicando o mesmo padrão visual da página `/app/settings` (header editorial, `SectionLabel` numerado em coluna lateral sticky, blocos com `TechCorners` / `tech-label`, botão "save" com clipPath, divisores rule/dashed).

## Seções (na ordem)

**§ 01 — Site info**
Bloco com `TechCorners` exibindo metadados-base do site:
- Project ID, Name, Domain (`{siteId}.pointer.design`), Created, Last published, Pages count.
Usar grid 2-col de `tech-label` + valor mono, igual ao estilo `ConnRow`.

**§ 02 — Integrations**
Card no estilo do bloco de Integrations do workspace, com dois `ConnRow`-equivalentes clicáveis (`<a target="_blank">`):
- GITHUB → `github.com/pointer/{siteId}` (ícone ↗)
- VERCEL → `vercel.com/pointer-studio/{siteId}` (ícone ↗)
Texto curto explicando que herda as conexões do workspace.

**§ 03 — Status & Publishing**
Card mostrando status atual (LIVE / DRAFT / ARCHIVED) com bolinha colorida + url pública clicável.
Subitem "Visibility" (PUBLIC/PRIVATE, apenas leitura por enquanto).
Botão secundário **Unpublish site** (outline, não destrutivo) com confirm inline (`window.confirm` ou pequeno toggle de confirmação) — apenas tira do ar via `sitesStore.update(id, { status: "draft" })`. Deixar claro no copy que isto é diferente de deletar/arquivar.

**§ 04 — Version history**
Lista mock das últimas publicações (array local), cada linha:
- index `01·02·03…` mono
- data (`MAI 21, 2026 · 14:32`)
- commit-ish (`a1b2c3d`) mono
- autor + label `LIVE` na mais recente, `PREVIOUS` nas demais
- botão `↗ View` (mock)
Estilo: `divide-y` dentro de `border border-[var(--color-rule)]`, igual à lista de Members.

**§ 05 — Danger zone**
Apenas **Archive site**, no mesmo padrão do bloco de delete-workspace (border dashed accent, botão tech-label). Ação chama `sitesStore.update(id, { status: "archived" })` e navega de volta para `/app`. Texto deixa claro que site arquivado pode ser restaurado depois; **nenhuma** opção de delete por enquanto.

## Detalhes técnicos

- Editar somente `src/routes/app.sites.$siteId.tsx`.
- Extrair `SectionLabel` e `ConnRow` locais (copiar o padrão de `app.settings.tsx`) dentro do mesmo arquivo para manter consistência sem criar componentes compartilhados.
- Ler dados reais via `sitesStore.get(siteId)` (fallback a um objeto default se undefined) — usar `useSites()` para reatividade quando status mudar.
- Unpublish/Archive: chamar `sitesStore.update` e, no caso de archive, `useNavigate()` para `/app`.
- Version history: array mock estático derivado de `siteId` (ex: 4 entradas).
- Manter contrato atual: a tab "settings" continua renderizando `<SettingsPanel siteId={siteId} />`.
- Sem mudanças em rotas, store schema ou outros arquivos.

## Fora do escopo

- Botão de deletar site.
- Edição de domínio/visibility.
- Integração real com GitHub/Vercel ou histórico real de deploys.
