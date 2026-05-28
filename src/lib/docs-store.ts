import { useEffect, useSyncExternalStore } from "react";

export type DocStatus =
  | "idea"
  | "scoping"
  | "needs-decision"
  | "ready-for-agent"
  | "in-progress"
  | "needs-review"
  | "blocked"
  | "validated"
  | "done"
  | "archived";

export const STATUS_LABELS: Record<DocStatus, string> = {
  "idea": "Idea",
  "scoping": "Scoping",
  "needs-decision": "Needs Decision",
  "ready-for-agent": "Ready for Agent",
  "in-progress": "In Progress",
  "needs-review": "Needs Human Review",
  "blocked": "Blocked",
  "validated": "Validated",
  "done": "Done",
  "archived": "Archived",
};

export type DocTask = {
  id: string;
  label: string;
  owner: "agent" | "human";
  done: boolean;
};

export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "decision"; tag: string; text: string }
  | { kind: "checklist"; tasks: DocTask[] }
  | { kind: "figma"; note: string }
  | { kind: "agentTask"; goal: string; files: string[] };

export type Doc = {
  id: string;
  path: string;
  folder: string;
  title: string;
  summary: string;
  status: DocStatus;
  type: string;
  updated: string;
  body: DocBlock[];
  linkedSiteId?: string;
};

const STORAGE_KEY = "pointer.docs.v1";

const SEED: Doc[] = [
  {
    id: "github-error-mapping",
    path: "docs/product-development/engineering/to-do/github-error-mapping.md",
    folder: "product-development",
    title: "Platform GitHub error mapping",
    summary:
      "Map all technical GitHub/API failures into human-readable UI states before the onboarding flow is tested with real users.",
    status: "ready-for-agent",
    type: "TASK",
    updated: "MAI 27, 2026",
    linkedSiteId: "andreazevedo",
    body: [
      { kind: "h", text: "Problem" },
      {
        kind: "p",
        text: "Errors are still too technical. Users may see GitHub, Vercel or permission failures without knowing what action is required to fix the flow.",
      },
      {
        kind: "decision",
        tag: "Human approved",
        text: "Keep technical details available for debugging, but always show a plain-language message and one clear recovery action first.",
      },
      {
        kind: "checklist",
        tasks: [
          { id: "t1", label: "List current GitHub error sources", owner: "human", done: true },
          { id: "t2", label: "Group errors by user action", owner: "human", done: true },
          { id: "t3", label: "Define UI copy for missing permissions", owner: "human", done: true },
          { id: "t4", label: "Implement user-friendly error mapper", owner: "agent", done: false },
          { id: "t5", label: "Add E2E coverage for permission failure", owner: "agent", done: false },
          { id: "t6", label: "Review final messages with human", owner: "human", done: false },
        ],
      },
      {
        kind: "figma",
        note: "Error states should follow the same tone and hierarchy defined in the onboarding flow.",
      },
      {
        kind: "agentTask",
        goal: "Implement the error mapping helper and cover the main failure states with tests.",
        files: [
          "apps/platform/app/api/sites/[id]/content/route.ts",
          "apps/platform/app/sites/[siteSlug]/content/content-editor.tsx",
          "apps/platform/lib/editor/platform-content-adapters.ts",
        ],
      },
    ],
  },
  {
    id: "orchestration-prd",
    path: "docs/product/PRODUCT-DEVELOPMENT-ORCHESTRATION-PRD.md",
    folder: "product",
    title: "Product Development Orchestration PRD",
    summary:
      "Validate Pointer as the context and decision layer between product, design, research and code.",
    status: "needs-decision",
    type: "PRD",
    updated: "MAI 28, 2026",
    body: [
      { kind: "h", text: "Tese" },
      {
        kind: "p",
        text: "Pointer transforma documentação .md/.mdx do repo em uma interface viva para decisão, planejamento, execução e aprendizado de produto.",
      },
      {
        kind: "decision",
        tag: "Pendente",
        text: "Manter Docs e Sites como produtos distintos no mesmo workspace, conectados por CodeReference e DesignReference cruzados.",
      },
    ],
  },
  {
    id: "editor-v2-validation",
    path: "docs/design-and-product/UI-design/editor-v2-validation.md",
    folder: "design-and-product",
    title: "Editor v2 UX validation plan",
    summary:
      "Plan usability testing for the Docs Editor and Execution Panel before implementation.",
    status: "needs-review",
    type: "UX",
    updated: "MAI 24, 2026",
    body: [
      { kind: "h", text: "Plano" },
      {
        kind: "p",
        text: "Rodar 6 sessões moderadas com founders técnicos usando agentes para validar os blocos de execução.",
      },
    ],
  },
  {
    id: "agent-harness",
    path: "docs/guides/AGENT-HARNESS.md",
    folder: "guides",
    title: "Agent Harness",
    summary: "Operational guide for agents working inside the Pointer monorepo.",
    status: "validated",
    type: "GUIDE",
    updated: "MAI 12, 2026",
    body: [
      { kind: "h", text: "Setup" },
      { kind: "p", text: "Agents devem ler MAP.md antes de qualquer alteração estrutural." },
    ],
  },
  {
    id: "platform-v2-runbook",
    path: "docs/operations/PLATFORM-V2-RUNBOOK.md",
    folder: "operations",
    title: "Platform V2 runbook",
    summary: "External setup checklist for Clerk, GitHub, Vercel, Neon and smoke testing.",
    status: "blocked",
    type: "OPS",
    updated: "ABR 30, 2026",
    body: [
      { kind: "h", text: "Bloqueio" },
      { kind: "p", text: "Aguardando aprovação financeira do plano Vercel Pro." },
    ],
  },
];

const listeners = new Set<() => void>();
let cache: Doc[] | null = null;

function read(): Doc[] {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = SEED;
    return cache;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cache = JSON.parse(raw) as Doc[];
    } else {
      cache = SEED;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    }
  } catch {
    cache = SEED;
  }
  return cache!;
}

function write(next: Doc[]) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

export const docsStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): Doc[] {
    return read();
  },
  getServerSnapshot(): Doc[] {
    return SEED;
  },
  add(doc: Doc) {
    write([doc, ...read()]);
  },
  get(id: string): Doc | undefined {
    return read().find((d) => d.id === id);
  },
  update(id: string, patch: Partial<Doc>) {
    write(read().map((d) => (d.id === id ? { ...d, ...patch } : d)));
  },
  toggleTask(docId: string, taskId: string) {
    write(
      read().map((d) => {
        if (d.id !== docId) return d;
        return {
          ...d,
          body: d.body.map((b) =>
            b.kind === "checklist"
              ? {
                  ...b,
                  tasks: b.tasks.map((t) =>
                    t.id === taskId ? { ...t, done: !t.done } : t,
                  ),
                }
              : b,
          ),
        };
      }),
    );
  },
};

export function useDocs(): Doc[] {
  const data = useSyncExternalStore(
    docsStore.subscribe,
    docsStore.getSnapshot,
    docsStore.getServerSnapshot,
  );
  useEffect(() => {
    listeners.forEach((l) => l());
  }, []);
  return data;
}

export function readiness(doc: Doc): { pct: number; done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const b of doc.body) {
    if (b.kind === "checklist") {
      total += b.tasks.length;
      done += b.tasks.filter((t) => t.done).length;
    }
  }
  if (total === 0) return { pct: 0, done: 0, total: 0 };
  return { pct: Math.round((done / total) * 100), done, total };
}

export function statusToken(status: DocStatus): string {
  switch (status) {
    case "ready-for-agent":
    case "in-progress":
      return "var(--status-agent)";
    case "needs-decision":
    case "scoping":
      return "var(--status-decision)";
    case "needs-review":
      return "var(--status-review)";
    case "validated":
    case "done":
      return "var(--status-done)";
    case "blocked":
      return "var(--status-blocked)";
    default:
      return "var(--color-mono)";
  }
}
