import { useEffect, useSyncExternalStore } from "react";

export type SiteStatus = "live" | "draft" | "archived";

export type Site = {
  id: string;
  name: string;
  url: string;
  status: SiteStatus;
  meta: string;
  index: string;
  updated: string;
};

const STORAGE_KEY = "pointer.sites.v1";

const SEED: Site[] = [
  {
    id: "andreazevedo",
    name: "Andre Azevedo — Personal Site",
    url: "andre.pointer.design",
    status: "live",
    meta: "Editorial / Case studies — 4 work · 1 page",
    index: "A.01",
    updated: "MAI 21, 2026",
  },
  {
    id: "new-site-9",
    name: "new-site-9",
    url: "new-site-9.pointer.design",
    status: "draft",
    meta: "Pronto para começar no editor",
    index: "A.02",
    updated: "MAI 18, 2026",
  },
  {
    id: "new-site-6",
    name: "new-site-6",
    url: "new-site-6.pointer.design",
    status: "archived",
    meta: "Arquivado — restaure para voltar a editar",
    index: "B.01",
    updated: "ABR 02, 2026",
  },
  {
    id: "new-site-5",
    name: "new-site-5",
    url: "new-site-5.pointer.design",
    status: "archived",
    meta: "Arquivado — restaure para voltar a editar",
    index: "B.02",
    updated: "MAR 28, 2026",
  },
];

const listeners = new Set<() => void>();
let cache: Site[] | null = null;

function read(): Site[] {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = SEED;
    return cache;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cache = JSON.parse(raw) as Site[];
    } else {
      cache = SEED;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    }
  } catch {
    cache = SEED;
  }
  return cache!;
}

function write(next: Site[]) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

export const sitesStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): Site[] {
    return read();
  },
  getServerSnapshot(): Site[] {
    return SEED;
  },
  add(site: Site) {
    write([site, ...read()]);
  },
  get(id: string): Site | undefined {
    return read().find((s) => s.id === id);
  },
  update(id: string, patch: Partial<Site>) {
    write(read().map((s) => (s.id === id ? { ...s, ...patch } : s)));
  },
};

export function useSites(): Site[] {
  const data = useSyncExternalStore(
    sitesStore.subscribe,
    sitesStore.getSnapshot,
    sitesStore.getServerSnapshot,
  );
  // Re-read on mount in case SSR seed differed from localStorage
  useEffect(() => {
    listeners.forEach((l) => l());
  }, []);
  return data;
}

export function formatToday(): string {
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const d = new Date();
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
}

export function nextIndex(sites: Site[]): string {
  const n = sites.length + 1;
  const letter = n > 9 ? "B" : "A";
  return `${letter}.${String(n).padStart(2, "0")}`;
}
