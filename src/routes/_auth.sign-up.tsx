import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TechLabel } from "@/components/tech";
import { authStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) return;
    authStore.startSignUp(email, first, last);
    navigate({ to: "/verify" });
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <TechLabel>SHEET 02 / SIGN UP</TechLabel>
        <h1 className="font-serif text-3xl leading-tight">Criar a tua conta</h1>
        <p className="text-sm text-[var(--color-mono)]">
          Tudo o que precisas para começar o teu site editorial.
        </p>
      </header>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 border border-[var(--color-ink)] bg-[var(--color-ink)] py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-paper)] transition hover:opacity-90"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
        }}
        onClick={() => {
          authStore.startSignUp("design@pointer.dev", "Design", "Pointer");
          authStore.verifyCode("000000");
          navigate({ to: "/setup-workspace" });
        }}
      >
        Continuar com Google
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-rule)]" />
        <TechLabel>OU</TechLabel>
        <div className="h-px flex-1 bg-[var(--color-rule)]" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="NOME · B.01" value={first} onChange={setFirst} placeholder="André" />
          <Field label="APELIDO · B.02" value={last} onChange={setLast} placeholder="Azevedo" />
        </div>
        <Field
          label="E-MAIL · B.03"
          value={email}
          onChange={setEmail}
          placeholder="nome@studio.com"
          type="email"
          required
        />
        <Field
          label="PASSWORD · B.04"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          type="password"
          required
          hint="Mín. 6 caracteres"
        />

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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <TechLabel>{label}</TechLabel>
        {hint && <TechLabel>{hint}</TechLabel>}
      </div>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[var(--color-rule)] bg-transparent px-3 py-3 font-mono text-sm outline-none transition focus:border-[var(--color-ink)]"
      />
    </label>
  );
}
