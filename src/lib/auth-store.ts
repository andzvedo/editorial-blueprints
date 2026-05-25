import { useSyncExternalStore } from "react";

export type AuthUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  plan: "personal" | "team";
};

export type AuthState = {
  user: AuthUser | null;
  workspace: Workspace | null;
  pending: { email: string; mode: "sign-in" | "sign-up" } | null;
};

const KEY = "pointer.auth.v1";
const listeners = new Set<() => void>();
let cache: AuthState | null = null;

function read(): AuthState {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = { user: null, workspace: null, pending: null };
    return cache;
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as AuthState) : { user: null, workspace: null, pending: null };
  } catch {
    cache = { user: null, workspace: null, pending: null };
  }
  return cache!;
}

function write(next: AuthState) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const authStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): AuthState {
    return read();
  },
  getServerSnapshot(): AuthState {
    return { user: null, workspace: null, pending: null };
  },
  startSignIn(email: string) {
    write({ ...read(), pending: { email, mode: "sign-in" } });
  },
  startSignUp(email: string, firstName: string, lastName: string) {
    const state = read();
    write({
      ...state,
      pending: { email, mode: "sign-up" },
      user: { id: crypto.randomUUID(), email, firstName, lastName },
    });
  },
  /** Mock verification — accepts any 6-digit code */
  verifyCode(code: string): boolean {
    const state = read();
    if (!state.pending) return false;
    if (!/^\d{6}$/.test(code)) return false;
    const user: AuthUser =
      state.user ?? { id: crypto.randomUUID(), email: state.pending.email };
    write({ ...state, user, pending: null });
    return true;
  },
  setupWorkspace(name: string, plan: Workspace["plan"]) {
    const state = read();
    const workspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      slug: slugify(name) || "workspace",
      plan,
    };
    write({ ...state, workspace });
  },
  signOut() {
    write({ user: null, workspace: null, pending: null });
  },
};

export function useAuth(): AuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot,
  );
}
