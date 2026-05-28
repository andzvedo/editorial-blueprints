# PRD — Product Development Orchestration no Pointer

> **Estado:** proposta estratégica para validação com usuários reais  
> **Data:** 28 de maio de 2026  
> **Relacionado:** [`PRODUCT.md`](PRODUCT.md), [`DESIGN-ORCHESTRATION-PRD.md`](DESIGN-ORCHESTRATION-PRD.md), [`../guides/AGENT-HARNESS.md`](../guides/AGENT-HARNESS.md), [`../MAP.md`](../MAP.md)

## 1. Resumo executivo

O Pointer deve explorar uma evolução estratégica: deixar de ser apenas uma plataforma de portfolio/CMS/editor e se tornar uma **camada de contexto e decisão entre produto, design, research e código**.

A oportunidade não é criar mais uma ferramenta de documentação, task management ou agente de codificação. A oportunidade é conectar essas camadas em uma interface operacional, versionada no repositório, que ajude humanos e agentes de IA a construir produtos digitais com mais clareza, contexto e controle.

A tese central:

```txt
Pointer transforma documentação `.md/.mdx` do repo em uma interface viva para decisão, planejamento, execução e aprendizado de produto.
```

O MVP deve validar uma versão simples dessa visão:

```txt
Repo docs → Docs List → MDX Editor Notion-like → Execution Panel → Agent Context Builder → GitHub/agent handoff
```

O objetivo inicial não é automatizar o desenvolvimento de produto. O objetivo é **empoderar human-in-the-loop total**: reduzir sobrecarga, organizar contexto, tornar decisões explícitas e preparar tarefas mais claras para humanos e agentes.

---

## 2. Visão

### 2.1 Visão de longo prazo

O Pointer deve se tornar um **orquestrador de desenvolvimento de produtos digitais**.

Ele deve ajudar times e criadores a conectar:

- estratégia;
- UX Research;
- Product Management;
- design;
- engenharia;
- decisões;
- backlog;
- documentação técnica;
- código real;
- impacto e métricas pós-lançamento.

A visão não é substituir ferramentas especializadas como Figma, GitHub, Linear, Notion, Cursor ou Codex. A visão é criar a camada que conecta o contexto entre elas.

```txt
Research → Insight → Opportunity → Product decision → Design direction → Engineering plan → Code change → Release → Impact → Next cycle
```

### 2.2 Visão de MVP

O primeiro produto validável deve ser menor:

```txt
Uma interface visual para organizar docs `.md/.mdx` de um repo e transformá-los em planos executáveis por humanos e agentes de IA.
```

O MVP deve focar em:

- ler a estrutura real de docs do repo;
- não impor taxonomia fixa;
- editar Markdown/MDX com uma experiência Notion-like;
- reconhecer blocos de ação, decisão, checklist e contexto;
- mostrar progresso do trabalho representado pelo doc;
- preparar contexto para agentes de codificação;
- manter o humano no controle das decisões.

---

## 3. Contexto

O Pointer já tem fundações úteis para essa direção:

- editor MDX compartilhado;
- blocos editoriais autoráveis;
- slash commands;
- integração com GitHub;
- snapshots/drafts;
- checkpoint Git explícito;
- estrutura de platform/workspace;
- documentação interna já usada como plano, backlog e registro de decisões.

A diferença estratégica é mudar o objeto principal:

```txt
Antes: conteúdo de portfolio/site.
Agora: documentação operacional de produto no repo.
```

O produto não deve abandonar a origem do Pointer. A hipótese é que a mesma infraestrutura que hoje edita conteúdo e design pode evoluir para organizar o ciclo completo de desenvolvimento digital.

---

## 4. Problema

### 4.1 Problema macro

O ciclo de desenvolvimento de produtos digitais está cada vez mais fragmentado.

Hoje, o contexto de produto fica espalhado entre:

- Notion ou Google Docs;
- Linear/Jira/GitHub Issues;
- Figma/FigJam;
- Slack/Discord;
- PRs e commits;
- Cursor/Codex/Claude Code;
- analytics e dashboards;
- documentos técnicos no repo.

Com agentes de IA, essa fragmentação piora. Agentes conseguem alterar código, mas normalmente não entendem bem:

- por que algo está sendo feito;
- qual decisão de produto levou à tarefa;
- quais tradeoffs foram considerados;
- qual evidência de pesquisa sustenta a solução;
- quais restrições de design importam;
- qual métrica deveria mudar depois do release;
- quando uma decisão precisa voltar para o humano.

### 4.2 Problema para humanos

Usuários envolvidos em produto precisam tomar decisões melhores, mas enfrentam sobrecarga:

- docs crescem e viram ruído;
- planos ficam desatualizados;
- checklists ficam enterrados em Markdown;
- decisões se perdem em conversas;
- tarefas chegam ao código sem contexto;
- agentes executam rápido, mas podem executar a coisa errada;
- revisar outputs de IA exige reconstruir contexto toda vez.

### 4.3 Problema para agentes

Agentes de codificação precisam de contexto operacional claro.

Um agente costuma receber uma instrução solta:

```txt
Implement this feature.
```

Mas deveria receber:

```txt
Objetivo do produto
Problema do usuário
Decisão aprovada
Arquivos relacionados
Critérios de aceite
Restrições de UX
Critérios de teste
Escopo permitido
Pontos que precisam voltar para decisão humana
```

Sem essa camada, agentes ficam limitados a execução local de código, e não a colaboração real no desenvolvimento de produto.

---

## 5. Usuários-alvo para validação

### 5.1 Perfil primário

**Founders, designers técnicos, PMs e builders usando agentes de IA para construir produtos digitais.**

Características:

- trabalham com GitHub;
- usam Cursor, Codex, Claude Code, Copilot ou similares;
- mantêm docs no repo ou querem manter;
- sentem dificuldade em transformar plano de produto em execução clara;
- precisam revisar decisões antes da IA alterar código;
- trabalham sozinhos ou em times pequenos.

### 5.2 Perfil secundário

**Product studios, freelancers técnicos e agências digitais.**

Características:

- gerenciam múltiplos clientes/projetos;
- precisam manter histórico de decisões;
- sofrem com handoff entre estratégia, design e engenharia;
- poderiam pagar por setup, templates e workflows reutilizáveis.

### 5.3 Perfil futuro

**Times de produto maiores.**

Características:

- já usam Linear/Jira/Notion;
- têm mais necessidade de permissões, auditoria, governança e integração;
- exigem segurança, SSO e controles enterprise.

Esse perfil não deve guiar o MVP inicial.

---

## 6. Hipóteses

### H1 — Docs no repo podem virar uma camada operacional

Usuários que já usam Markdown no repo querem uma interface melhor para navegar, editar e transformar docs em trabalho acionável.

**Sinal de validação:** usuários conectam um repo real e usam a Docs List para encontrar/editar documentação existente.

### H2 — O valor está em contexto e decisão, não só em escrita

Usuários não querem apenas escrever docs. Eles querem entender o que precisa ser decidido, executado, revisado ou validado.

**Sinal de validação:** usuários usam Execution Panel e blocos de ação/decisão como parte do fluxo, não apenas como anotação.

### H3 — Agentes precisam de contexto de produto estruturado

Usuários que usam agentes de código percebem melhoria quando o Pointer gera um contexto mais completo para a tarefa.

**Sinal de validação:** usuários exportam um Agent Context Pack e o usam em Cursor/Codex/Claude Code/OpenCode.

### H4 — Taxonomia aberta é melhor que estrutura imposta

Repos reais já têm estruturas próprias. O Pointer deve descobrir e respeitar a organização existente, sugerindo melhorias sem impor grupos fixos.

**Sinal de validação:** usuários preferem views baseadas no repo real em vez de categorias pré-definidas obrigatórias.

### H5 — Human-in-the-loop é diferencial, não limitação

Usuários querem IA ajudando, mas querem manter controle sobre decisões críticas de produto, design e prioridade.

**Sinal de validação:** usuários valorizam estados como `Needs Decision`, `Ready for Agent`, `Needs Human Review` e `Blocked by Product Decision`.

### H6 — O MVP pode começar sem integração profunda com agentes

Gerar contexto estruturado e criar handoff manual pode ser suficiente para validar valor antes de automação profunda.

**Sinal de validação:** usuários aceitam copiar/exportar contexto para agentes externos no início.

---

## 7. Proposta de solução

### 7.1 Conceito

**Pointer Docs** é uma camada visual sobre documentos `.md/.mdx` de um repo.

Ele transforma documentos em uma interface operacional com:

- lista de docs detectados no repo;
- editor MDX Notion-like;
- blocos especiais de produto e execução;
- painel de status/progresso;
- geração de contexto para agentes;
- persistência em Git.

### 7.2 Estrutura central

```txt
Repository
  └─ Docs List
       ├─ Doc Editor
       ├─ Execution Panel
       ├─ Agent Context Builder
       └─ GitHub sync
```

---

## 8. Componentes principais

### 8.1 Docs List

A Docs List deve substituir a ideia de grupos fixos.

O produto deve detectar documentos a partir do repo:

```txt
/docs
/product
/product-development
/guides
/operations
/specs
/decisions
/research
```

Mas não deve assumir que essas pastas sempre existem.

#### Requisitos

- listar arquivos `.md` e `.mdx` configurados;
- permitir busca;
- permitir filtros por pasta, status, tipo, tags e atividade;
- detectar frontmatter quando existir;
- inferir título pelo heading H1 quando não houver frontmatter;
- mostrar docs com ações pendentes;
- mostrar docs prontos para agente;
- mostrar docs possivelmente desatualizados.

#### Views iniciais sugeridas

Em vez de grupos fixos, usar views flexíveis:

- **By folder**;
- **By status**;
- **Needs decision**;
- **Ready for agent**;
- **Recently changed**;
- **Outdated / needs review**.

### 8.2 Doc Editor

O editor deve usar o MDX Editor completo e preservar os blocos especiais já existentes no Pointer.

A diferença em relação ao Content Editor atual:

```txt
Content Editor atual = renderiza com base no design do site.
Pointer Docs Editor = renderiza com estilo padrão Notion-like.
```

#### Requisitos

- edição `.md/.mdx`;
- renderer padrão limpo, legível e neutro;
- suporte a slash commands;
- suporte a blocos existentes, como `FigmaEmbed`, `Callout`, `Figure`, `TOC`, etc.;
- suporte a blocos novos de execução;
- modo source `.mdx` como escape hatch;
- autosave em snapshot;
- checkpoint Git explícito.

### 8.3 Execution Panel

O status do produto não deve ser status editorial como `Draft`, `Published` ou `Saved`.

O status deve representar o progresso do trabalho descrito pelo documento.

#### Status iniciais

```txt
Idea
Scoping
Needs Decision
Ready for Agent
In Progress
Needs Human Review
Blocked
Validated
Done
Archived
```

#### O painel deve mostrar

- tarefas detectadas;
- decisões pendentes;
- riscos;
- perguntas abertas;
- critérios de aceite;
- links para arquivos de código;
- links para Figma;
- links para issues/PRs;
- estado de prontidão para agente;
- próximos passos sugeridos.

### 8.4 Novos blocos MDX de execução

O MVP precisa criar blocos próprios para transformar Markdown em ação.

#### Blocos P0

```mdx
<ActionChecklist />
<Decision />
<AgentTask />
<AcceptanceCriteria />
<OpenQuestion />
<Risk />
```

#### Blocos P1

```mdx
<ProductRequirement />
<UserInsight />
<ResearchEvidence />
<DesignReference />
<CodeReference />
<MetricTarget />
<ReleaseCheckpoint />
```

#### Exemplo conceitual

```mdx
<AgentTask
  title="Map user-friendly GitHub errors"
  status="ready"
  owner="agent"
  files='[
    "apps/platform/app/api/sites/[id]/content/route.ts",
    "apps/platform/app/sites/[siteSlug]/content/content-editor.tsx"
  ]'
  acceptanceCriteria='[
    "Permission errors are translated into clear UI messages",
    "The user sees the required action",
    "Tests cover missing GitHub permissions"
  ]'
/>
```

### 8.5 Agent Context Builder

O Agent Context Builder é o coração do MVP.

Ele deve transformar o documento atual em um pacote de contexto para agentes.

#### Saída esperada

```md
# Agent Context Pack

## Goal

## Why this matters

## Current product decision

## Scope

## Out of scope

## Relevant docs

## Relevant code files

## Tasks

## Acceptance criteria

## Constraints

## Test commands

## Human review required
```

#### Destinos P0

- copiar para clipboard;
- baixar como Markdown;
- criar GitHub Issue;
- salvar como arquivo no repo.

#### Destinos P1

- abrir em Cursor;
- enviar para Codex;
- enviar para Claude Code;
- enviar para OpenCode;
- criar branch e PR draft;
- MCP para agentes consultarem docs e contexto.

---

## 9. Fluxos principais do MVP

### Fluxo 1 — Conectar repo e descobrir docs

```txt
1. Usuário conecta GitHub.
2. Pointer detecta arquivos `.md/.mdx`.
3. Pointer mostra Docs List baseada na estrutura real.
4. Usuário escolhe um doc existente.
```

### Fluxo 2 — Editar doc operacional

```txt
1. Usuário abre um doc.
2. Editor renderiza em estilo Notion-like.
3. Usuário adiciona bloco ActionChecklist ou Decision.
4. Execution Panel atualiza status e tarefas detectadas.
5. Usuário salva snapshot ou cria checkpoint Git.
```

### Fluxo 3 — Preparar tarefa para agente

```txt
1. Usuário marca uma tarefa como Ready for Agent.
2. Pointer monta Agent Context Pack.
3. Usuário revisa escopo, arquivos e critérios.
4. Usuário exporta/copia contexto.
5. Agente executa fora do Pointer.
6. Usuário volta e marca Needs Review / Done.
```

### Fluxo 4 — Fechar loop humano

```txt
1. Agente cria código/PR.
2. Pointer mostra relação entre doc, task e PR.
3. Usuário revisa contra critérios de aceite.
4. Usuário atualiza decisão, status e próximos passos.
```

---

## 10. Requisitos funcionais

### P0 — Validação inicial

- conectar ou selecionar repo GitHub já autorizado;
- configurar raiz de docs;
- listar `.md/.mdx` em Docs List;
- abrir documento;
- editar Markdown/MDX;
- renderizar estilo padrão Notion-like;
- inserir blocos básicos por slash command;
- detectar checklists Markdown `- [ ]`;
- exibir Execution Panel;
- permitir status manual do doc;
- gerar Agent Context Pack;
- copiar/exportar contexto;
- salvar alterações como snapshot;
- criar checkpoint Git.

### P1 — Produto inicial vendável

- criar novos docs a partir de templates;
- criar GitHub Issue a partir de `AgentTask`;
- linkar doc com issue/PR;
- detectar arquivos relacionados por path citado;
- sugerir status com base nos blocos;
- permitir views salvas na Docs List;
- mostrar docs sem dono/sem próximo passo;
- criar templates de PRD, spec, decision log e implementation plan.

### P2 — Orquestração expandida

- MCP para agentes lerem docs/contexto;
- atualização automática de status via PR/commit;
- detecção de docs desatualizados por mudança de código;
- conexão com Figma para DesignReference;
- conexão com analytics para MetricTarget;
- dashboard de ciclo de produto;
- recomendações de próximo ciclo com base em impacto.

---

## 11. Não-objetivos do MVP

O MVP não deve tentar ser:

- substituto completo do Linear/Jira;
- substituto completo do Notion;
- agente autônomo de desenvolvimento;
- ferramenta enterprise de governança;
- analytics platform;
- Figma replacement;
- page builder;
- sistema completo de CI/CD;
- automação full-agent sem revisão humana.

A proposta inicial deve ser simples:

```txt
Organizar docs do repo → transformar docs em execução → gerar contexto melhor para agentes.
```

---

## 12. Princípios de produto

### 12.1 Respeitar o repo existente

Pointer deve se adaptar à estrutura real do usuário.

Não impor taxonomia rígida.

### 12.2 Human-in-the-loop por padrão

IA deve ajudar a organizar, sintetizar e preparar execução.

Decisões de produto, design e prioridade devem voltar para o humano.

### 12.3 Docs como interface operacional

Docs não devem ser apenas memória.

Docs devem virar:

- decisão;
- tarefa;
- contexto;
- critério de aceite;
- histórico;
- aprendizado.

### 12.4 Código como fonte conectada, não única

O produto deve estar conectado ao codebase real, mas não reduzir tudo a código.

Produto digital envolve pesquisa, design, estratégia, métrica e decisão.

### 12.5 IA como amplificação, não substituição

O valor do Pointer é ajudar humanos a pensar e decidir melhor, não remover humanos do ciclo.

---

## 13. Modelo de dados conceitual

### 13.1 Documento

```ts
type PointerDoc = {
  id: string
  path: string
  title: string
  kind?: string
  status?: PointerDocStatus
  tags?: string[]
  relatedFiles?: string[]
  relatedDocs?: string[]
  relatedIssues?: string[]
  relatedPullRequests?: string[]
  agentReadiness?: 'not-ready' | 'needs-context' | 'ready' | 'blocked'
  updatedAt?: string
}
```

### 13.2 Status

```ts
type PointerDocStatus =
  | 'idea'
  | 'scoping'
  | 'needs-decision'
  | 'ready-for-agent'
  | 'in-progress'
  | 'needs-human-review'
  | 'blocked'
  | 'validated'
  | 'done'
  | 'archived'
```

### 13.3 Action item

```ts
type ActionItem = {
  id: string
  sourceDocPath: string
  title: string
  status: 'todo' | 'ready' | 'doing' | 'review' | 'done' | 'blocked'
  owner?: 'human' | 'agent' | 'team'
  acceptanceCriteria?: string[]
  relatedFiles?: string[]
  relatedIssue?: string
  relatedPullRequest?: string
}
```

---

## 14. Validação com usuários reais

### 14.1 Objetivo da validação

Validar se usuários reais entendem e valorizam a proposta:

```txt
Pointer como camada de contexto e decisão entre produto, design, research e código.
```

Mais especificamente, validar se:

- o problema existe;
- o repo é um bom lugar para a fonte de verdade;
- a Docs List é útil;
- o editor Notion-like reduz fricção;
- o Execution Panel torna docs mais acionáveis;
- o Agent Context Builder melhora o trabalho com agentes;
- o posicionamento gera disposição de uso/pagamento.

### 14.2 Método recomendado

Usar três níveis de validação:

#### Nível 1 — Entrevistas exploratórias

8 a 12 entrevistas com:

- founders técnicos;
- designers técnicos;
- PMs hands-on;
- freelancers/studios;
- devs usando agentes.

Perguntas principais:

- Onde ficam seus planos de produto hoje?
- Como você passa contexto para agentes de IA?
- O que dá errado quando um agente implementa algo?
- Como você registra decisões de produto/design?
- Seus docs ficam atualizados?
- Você usaria uma UI sobre docs do repo?
- O que faria você pagar por isso?

#### Nível 2 — Protótipo navegável

Criar um protótipo com:

- Docs List;
- Doc Editor;
- Execution Panel;
- Agent Context Builder;
- exemplo de doc real;
- export de contexto.

Tarefa de teste:

```txt
Abra um plano existente, entenda o status, transforme uma tarefa em Agent Context Pack e diga se usaria isso no seu fluxo real.
```

#### Nível 3 — Concierge MVP

Com 3 a 5 usuários, fazer manualmente:

- conectar/analisar repo;
- organizar docs existentes;
- criar templates;
- gerar Agent Context Packs;
- acompanhar um ciclo real até PR/review.

### 14.3 Métricas de validação

#### Sinais fortes

- usuário conecta repo real;
- usuário importa docs reais;
- usuário cria/edita mais de um doc;
- usuário gera contexto para um agente;
- usuário usa o contexto fora do Pointer;
- usuário volta para atualizar status;
- usuário pede integração com GitHub Issues/PRs;
- usuário pergunta preço;
- usuário aceita pagar por setup.

#### Métricas quantitativas iniciais

- 60%+ dos entrevistados reconhecem o problema como frequente;
- 40%+ aceitariam testar com repo real;
- 30%+ usam Agent Context Pack em uma tarefa real;
- 3+ usuários completam um ciclo doc → agente → review;
- pelo menos 1 usuário aceita pagar por concierge/setup.

#### Métricas qualitativas

Buscar frases como:

```txt
"Isso resolveria o caos dos meus docs."
"Eu perco muito tempo explicando contexto para o Cursor."
"O agente implementa, mas não entende o produto."
"Eu queria que meus planos virassem tarefas sem perder o porquê."
"Isso é melhor do que jogar tudo no Notion e depois copiar para o GitHub."
```

---

## 15. Riscos

### R1 — Produto parecer amplo demais

Mitigação: começar com um caso claro:

```txt
Repo docs → execution-ready plans → AI agent context
```

### R2 — Usuários preferirem Notion/Linear

Mitigação: posicionar Pointer como camada conectada ao repo e aos agentes, não como substituto genérico.

### R3 — Integração com agentes ser complexa cedo demais

Mitigação: começar com export/copy de contexto antes de automação profunda.

### R4 — Markdown estruturado virar burocracia

Mitigação: permitir Markdown comum e detectar estrutura progressivamente.

### R5 — Taxonomia aberta gerar caos

Mitigação: detectar a estrutura existente, mas oferecer views e sugestões de organização.

---

## 16. Perguntas em aberto

- O arquivo `.md/.mdx` deve carregar status no frontmatter ou em metadata externa?
- O Pointer deve criar um `pointer-docs.config.ts` ou operar sem config inicialmente?
- O Agent Context Pack deve ser salvo no repo ou apenas exportado?
- GitHub Issues deve ser destino inicial ou integração P1?
- Como evitar que blocos MDX especiais dificultem leitura fora do Pointer?
- Quais blocos são essenciais para P0?
- Qual é o primeiro usuário ideal: founder, designer técnico ou product studio?
- O produto deve ser vendido primeiro como cloud, open-source starter ou concierge?

---

## 17. Proposta de MVP de validação

### 17.1 Escopo mínimo

```txt
1 repo
1 docs root
Docs List
MDX Editor Notion-like
ActionChecklist
Decision
AgentTask
Execution Panel
Agent Context Pack export
Git checkpoint
```

### 17.2 Protótipo necessário

O protótipo deve mostrar:

- uma lista real de docs;
- status do trabalho;
- um doc com blocos acionáveis;
- lateral de execução;
- botão `Prepare Agent Context`;
- tela de revisão do contexto;
- export/copy.

### 17.3 Critério para avançar

Avançar para implementação P0 se:

- usuários entendem o produto em menos de 2 minutos;
- pelo menos 5 usuários dizem que isso resolve uma dor real;
- pelo menos 3 usuários aceitam testar com repo real;
- pelo menos 1 usuário aceita pagar por setup/concierge;
- a hipótese de Agent Context Builder mostra valor claro.

---

## 18. Posicionamento inicial

### Versão curta

```txt
Pointer turns repo docs into executable product plans for humans and AI agents.
```

### Versão estratégica

```txt
Pointer is a product development orchestration layer connecting product, design, research and code through versioned docs and human-in-the-loop AI workflows.
```

### Versão em português

```txt
Pointer é uma camada de orquestração de desenvolvimento de produtos digitais, conectando produto, design, pesquisa e código através de documentação versionada e fluxos de IA com o humano no controle.
```

---

## 19. Próximo passo recomendado

Antes de implementar profundamente, criar uma validação em baixa fidelidade:

1. transformar este PRD em roteiro de entrevista;
2. criar protótipo rápido da Docs List + Doc Editor + Execution Panel;
3. testar com 8 a 12 usuários;
4. rodar 3 pilotos concierge com repos reais;
5. só então fechar o escopo técnico P0.

O objetivo é validar se a tese central é forte o suficiente:

```txt
O maior valor do Pointer não é editar docs nem controlar agentes.
É ser a camada de contexto e decisão que permite humanos e agentes construírem produtos digitais com mais clareza.
```
