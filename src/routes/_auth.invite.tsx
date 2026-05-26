import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TechLabel } from "@/components/tech";
import { authStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_auth/invite")({
  component: InviteAccept,
  validateSearch: (s: Record<string, unknown>) => ({
    code: typeof s.code === "string" ? s.code : undefined,
  }),
});

// Mock allow-list. Any code in this set or matching the PTR-XXXX pattern is accepted.
const VALID_CODES = new Set(["PTR-2026", "POINTER-INVITE", "STUDIO-01", "DEMO"]);
const PATTERN = /^PTR-[A-Z0-9]{3,8}$/i;

function isValid(code: string) {
  const v = code.trim().toUpperCase();
  return VALID_CODES.has(v) || PATTERN.test(v);
}

function InviteAccept() {
  const navigate = useNavigate();
  const { code: initial } = Route.useSearch();
  const [code, setCode] = useState(initial ?? "");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValid(code)) {
      setError("Convite inválido ou expirado. Verifica o código.");
      return;
    }
    if (!email.includes("@")) {
      setError("Indica um e-mail válido.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Indica o teu nome.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const [first, ...rest] = name.trim().split(/\s+/);
      authStore.startSignUp(email.trim(), first, rest.join(" "));
      authStore.verifyCode("000000"); // auto-accept (mock)
      navigate({ to: "/setup-workspace" });
    }, 500);
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <TechLabel>SHEET 00 / INVITE</TechLabel>
        <h1 className="font-serif text-3xl leading-tight">Aceitar convite</h1>
        <p className="text-sm text-[var(--color-mono)]">
          Insere o código que recebeste para entrar no Pointer.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <TechLabel>CÓDIGO DO CONVITE · I.01</TechLabel>
            <TechLabel accent>OBRIGATÓRIO</TechLabel>
          </div>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PTR-2026"
            autoCapitalize="characters"
            className="w-full border border-[var(--color-rule)] bg-transparent px-3 py-3 font-mono text-sm uppercase tracking-[0.18em] outline-none transition focus:border-[var(--color-ink)]"
          />
          <p className="tech-label opacity-70">
            Tenta <span className="text-[var(--color-accent)]">PTR-2026</span> ou{" "}
            <span className="text-[var(--color-accent)]">DEMO</span>
          </p>
        </label>

        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <TechLabel>NOME · I.02</TechLabel>
          </div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Maria Andrade"
            className="w-full border border-[var(--color-rule)] bg-transparent px-3 py-3 font-mono text-sm outline-none transition focus:border-[var(--color-ink)]"
          />
        </label>

        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <TechLabel>E-MAIL · I.03</TechLabel>
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@studio.com"
            className="w-full border border-[var(--color-rule)] bg-transparent px-3 py-3 font-mono text-sm outline-none transition focus:border-[var(--color-ink)]"
          />
        </label>

        {error && (
          <div className="border border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-2 text-xs font-mono text-[var(--color-accent)]">
            ✕ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 bg-[var(--color-accent)] py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)] disabled:opacity-60"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          {loading ? "A validar convite…" : "Aceitar e continuar"}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-4">
        <TechLabel>JÁ TENS CONTA?</TechLabel>
        <Link
          to="/sign-in"
          className="tech-label underline underline-offset-4 hover:text-[var(--color-accent)]"
        >
          Entrar →
        </Link>
      </div>
    </div>
  );
}
