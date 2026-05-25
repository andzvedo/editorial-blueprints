import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TechLabel } from "@/components/tech";
import { authStore, useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/_auth/setup-workspace")({
  component: Setup,
});

function Setup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<"personal" | "team">("personal");

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      navigate({ to: "/sign-in" });
    }
  }, [user, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return;
    authStore.setupWorkspace(name.trim(), plan);
    navigate({ to: "/app" });
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <TechLabel>SHEET 04 / WORKSPACE</TechLabel>
        <h1 className="font-serif text-3xl leading-tight">Configura o teu workspace</h1>
        <p className="text-sm text-[var(--color-mono)]">
          O teu workspace agrupa sites, membros e definições. Podes mudar depois.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPlan("personal")}
            className={`relative border p-4 text-left transition ${
              plan === "personal"
                ? "border-[var(--color-ink)] bg-[var(--color-background)]"
                : "border-[var(--color-rule)]"
            }`}
          >
            <TechLabel>TIPO · A</TechLabel>
            <div className="mt-2 font-serif text-lg">Pessoal</div>
            <p className="mt-1 text-xs text-[var(--color-mono)]">
              Para um autor individual.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setPlan("team")}
            className={`relative border p-4 text-left transition ${
              plan === "team"
                ? "border-[var(--color-ink)] bg-[var(--color-background)]"
                : "border-[var(--color-rule)]"
            }`}
          >
            <TechLabel>TIPO · B</TechLabel>
            <div className="mt-2 font-serif text-lg">Equipa</div>
            <p className="mt-1 text-xs text-[var(--color-mono)]">
              Para studios com membros.
            </p>
          </button>
        </div>

        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <TechLabel>NOME · D.01</TechLabel>
            <TechLabel accent>OBRIGATÓRIO</TechLabel>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Acme Organization"
            required
            className="w-full border border-[var(--color-rule)] bg-transparent px-3 py-3 font-mono text-sm outline-none transition focus:border-[var(--color-ink)]"
          />
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-mono)]">
            URL · {(name || "workspace").toLowerCase().replace(/\s+/g, "-")}.pointer.design
          </p>
        </label>

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 bg-[var(--color-accent)] py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          Criar workspace
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <p className="border-t border-[var(--color-rule)] pt-4 text-[10px] uppercase tracking-[0.14em] text-[var(--color-mono)]">
        Sessão · {user?.email ?? "—"}
      </p>
    </div>
  );
}
