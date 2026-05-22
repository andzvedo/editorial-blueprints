# Plano: Polimento Editorial + Technical Drawings — pointer.design

## Visão

Refinar a landing page existente mantendo a estrutura atual (hero, pilares, processo, infraestrutura, waitlist, footer) e elevando-a com uma linguagem visual coerente que combine:

- **Editorial**: tipografia serifada de display com hierarquia forte, numeração de seções, kickers, generosa entrelinha, tratamento de texto como conteúdo de revista.
- **Technical Drawings**: grade visível, marcas de cota, crosshairs, linhas tracejadas de construção, legendas tipo "ESPEC", "REV. 01", coordenadas, ticks, callouts com leader lines.

A página continua leve, monocromática, com o laranja como único acento — fiel ao print enviado.

## Sistema de design

**Tipografia**

- Display serif para títulos (ex: PP Editorial New, Tiempos Headline ou GT Super) — pesos Black/Bold, tracking apertado, leading 0.95.
- Sans mono para metadados, numeração, legendas técnicas (ex: JetBrains Mono ou IBM Plex Mono) — uppercase, tracking +0.1em, tamanho pequeno (10–11px).
- Sans neutra para corpo (ex: Inter ou Söhne) — 14–15px, leading confortável.

**Paleta (tokens em `src/styles.css`, formato oklch)**

- `--background`: off-white quente (papel técnico)
- `--foreground`: quase preto (tinta)
- `--muted-foreground`: cinza médio para legendas
- `--accent`: laranja vivo (CTA + marcas técnicas)
- `--rule`: cinza claro para linhas de grade e construção
- `--paper`: tom levemente mais escuro para blocos "blueprint"

**Linhas e ornamentos técnicos**

- Borders 1px sólidos e tracejados (`border-dashed`) para divisões.
- Crosshair SVG reutilizável nos cantos de cards e seções.
- Tick marks horizontais como réguas entre seções.
- Leader lines com label (número + descrição) apontando para elementos-chave.
- Numeração `01 //`, `02 //` em mono uppercase laranja.

## Mudanças por seção

**Nav**

- Adicionar mini-marca de versão "v0.1 — BETA" em mono ao lado do logo.
- Substituir underline do hover por um tick mark animado abaixo do link.
- CTA Waitlist: manter laranja, adicionar seta `→` com micro-translação no hover.

**Hero**

- Adicionar grid de fundo sutil (linhas a cada 80px) só nesta seção.
- Kicker `POINTER.DESIGN — BETA PRIVADA` ganha bullet quadrado laranja.
- Título: confirmar serif display, leading 0.92, com uma palavra-chave (ex: "NARRATIVA") em itálico para variação editorial.
- Bloco do diagrama à direita vira um "technical drawing" real: envelope/wireframe em SVG com cotas (setas com medidas tipo `← 240mm →`), labels "ESPEC. CR-01", "REV.01", coordenadas no canto, crosshair, e tracejados de construção. Esse é o elemento âncora da identidade.
- Lista de bullets abaixo do CTA vira tabela técnica com colunas: índice mono, label, status (●).

**Pilares (3 colunas)**

- Numeração `01 // CARACTER. UNIC.` em mono laranja, maior peso visual.
- Adicionar crosshair SVG nos 4 cantos de cada coluna ao hover.
- Divisores verticais tracejados em vez de sólidos.

**Briefing / Estrutura / Lançamento (processo em 5 passos)**

- Adicionar régua horizontal com ticks numerados 01–05 acima dos cards, conectando-os como um eixo de timeline.
- Cada card ganha pequeno selo mono no topo (`STEP 03 / 05`).
- Linha pontilhada conectando os steps.

**Lógica Clara / Velocidade na Edge**

- Bloco de métricas (LEVE, 98+, WCAG AA, LIGHTHOUSE 100) vira "ficha técnica": grid com bordas finas, label mono em cima, valor display embaixo, separadores tracejados.
- Adicionar mini-callouts com leader lines saindo de cada métrica explicando o que ela mede.

**Garanta sua vaga (waitlist)**

- Input com border inferior única (estilo formulário técnico), label flutuante em mono uppercase.
- Botão laranja full-width mantém, mas com canto inferior-direito chanfrado (clip-path) — detalhe technical drawing.
- Adicionar abaixo um "FORM REV. 01 — CAMPO OBRIGATÓRIO" em mono cinza.

**Footer**

- Adicionar régua de coordenadas no topo (`00 ───── 100`).
- Colunas com headers em mono uppercase já existem; reforçar com numeração `A/`, `B/`, `C/`.
- Bloco "FEITO PARA DESIGNERS" ganha moldura tracejada com crosshairs nos cantos.

## Microinterações

- Hover em CTAs: seta translada 2px, sem mudança de cor.
- Hover em cards: crosshairs nos cantos aparecem (opacity 0→1, 200ms).
- Scroll: rulers laterais (já presentes no print como ícones circulares) viram indicadores de posição com tick mark animado.
- Sem fade-ins genéricos; só movimento que reforce a metáfora técnica.

## Detalhes técnicos (para implementação)

- Tokens novos em `src/styles.css`: `--accent`, `--rule`, `--paper`, `--mono-foreground`.
- Componente `<TechCorners />` SVG reutilizável para crosshairs.
- Componente `<TechRuler />` para réguas horizontais com ticks.
- Componente `<LeaderLine label value />` para callouts.
- Importar fontes via Google Fonts ou self-hosted no `__root.tsx` head.
- Manter responsividade: em mobile, esconder ornamentos de margem (réguas laterais, crosshairs) e simplificar a tabela técnica do hero para lista.

## Fora de escopo

- Não mexer em backend, rotas, dados ou lógica.
- Não trocar a estrutura de seções nem a copy.
- Não adicionar novas páginas.

## Pergunta antes de implementar

Confirma a fonte display serif? Posso ir com **PP Editorial New** (visual do print) ou prefere uma alternativa gratuita do Google Fonts como **Fraunces** ou **Instrument Serif** — ambas combinam com editorial + technical.