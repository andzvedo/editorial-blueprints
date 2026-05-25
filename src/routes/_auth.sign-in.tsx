import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TechLabel } from "@/components/tech";
import { authStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function onGoogle() {
    setLoading(true);
    setTimeout(() => {
      authStore.startSignIn("design@pointer.dev");
      authStore.verifyCode("000000");
      const ws = JSON.parse(localStorage.getItem("pointer.auth.v1") || "{}").workspace;
      navigate({ to: ws ? "/app" : "/setup-workspace" });
    }, 600);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    authStore.startSignIn(email);
    navigate({ to: "/verify" });
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <TechLabel>SHEET 01 / SIGN IN</TechLabel>
        <h1 className="font-serif text-3xl leading-tight">Entrar no Pointer</h1>
        <p className="text-sm text-[var(--color-mono)]">
          Bem-vindo de volta. Faz sign-in para continuar.
        </p>
      </header>

      <button
        onClick={onGoogle}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 border border-[var(--color-ink)] bg-[var(--color-ink)] py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-paper)] transition hover:opacity-90 disabled:opacity-60"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
        }}
      >
        <GoogleMark /> {loading ? "A iniciar…" : "Continuar com Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-rule)]" />
        <TechLabel>OU</TechLabel>
        <div className="h-px flex-1 bg-[var(--color-rule)]" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <TechLabel>E-MAIL · A.01</TechLabel>
            <TechLabel accent>OBRIGATÓRIO</TechLabel>
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

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 bg-[var(--color-accent)] py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          Continuar
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-4">
        <TechLabel>NÃO TENS CONTA?</TechLabel>
        <Link
          to="/sign-up"
          className="tech-label underline underline-offset-4 hover:text-[var(--color-accent)]"
        >
          Criar conta →
        </Link>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#fff"
        d="M22 12.2c0-.8-.1-1.4-.2-2H12v3.8h5.6c-.1.9-.8 2.3-2.2 3.2l-.1.1 3.2 2.5h.2c2-1.9 3.3-4.6 3.3-7.6"
      />
      <path fill="#fff" d="M12 22c2.9 0 5.3-1 7.1-2.6l-3.4-2.6c-.9.6-2.1 1-3.7 1-2.8 0-5.2-1.9-6.1-4.5h-.1l-3.3 2.6.1.2C4.3 19.6 7.9 22 12 22" opacity=".9" />
      <path fill="#fff" d="M5.9 13.3c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2v-.2L2.5 6.4l-.1.1C1.5 8.1 1 10 1 12s.5 3.9 1.4 5.5l3.5-2.7" opacity=".7" />
      <path fill="#fff" d="M12 5.4c2 0 3.4.9 4.2 1.6l3.1-3C17.3 2.3 14.9 1 12 1 7.9 1 4.3 3.4 2.4 6.5l3.5 2.7c.9-2.6 3.3-3.8 6.1-3.8" opacity=".85" />
    </svg>
  );
}
