import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TechLabel } from "@/components/tech";
import { authStore, useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/_auth/verify")({
  component: Verify,
});

function Verify() {
  const navigate = useNavigate();
  const { pending, workspace } = useAuth();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pending && typeof window !== "undefined") {
      navigate({ to: "/sign-in" });
    }
  }, [pending, navigate]);

  function setAt(i: number, v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) refs.current[i + 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent) {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (txt.length === 6) {
      e.preventDefault();
      setDigits(txt.split(""));
      refs.current[5]?.focus();
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (!authStore.verifyCode(code)) {
      setError("Código inválido. Usa 6 dígitos (ex: 000000 em desenvolvimento).");
      return;
    }
    navigate({ to: workspace ? "/app" : "/setup-workspace" });
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <TechLabel>SHEET 03 / VERIFY</TechLabel>
        <h1 className="font-serif text-3xl leading-tight">Verifica o teu e-mail</h1>
        <p className="text-sm text-[var(--color-mono)]">
          Enviámos um código de 6 dígitos para{" "}
          <span className="font-mono text-foreground">{pending?.email ?? "—"}</span>
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <TechLabel>CÓDIGO · C.01</TechLabel>
          <TechLabel>6 DÍGITOS</TechLabel>
        </div>
        <div className="flex gap-2" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 flex-1 border border-[var(--color-rule)] bg-transparent text-center font-mono text-xl outline-none transition focus:border-[var(--color-ink)]"
            />
          ))}
        </div>

        {error && (
          <p className="border-l-2 border-[var(--color-destructive)] bg-[var(--color-paper)] px-3 py-2 font-mono text-xs text-[var(--color-destructive)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 bg-[var(--color-accent)] py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-accent-foreground)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          Confirmar
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-4">
        <TechLabel>NÃO RECEBESTE?</TechLabel>
        <Link
          to="/sign-in"
          className="tech-label underline underline-offset-4 hover:text-[var(--color-accent)]"
        >
          Reenviar código
        </Link>
      </div>
    </div>
  );
}
