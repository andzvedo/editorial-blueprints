import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TechCorners, TechLabel, TechRuler } from "@/components/tech";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-foreground">
      {/* Top bar */}
      <header className="border-b border-[var(--color-rule)]">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[var(--color-accent)]">◆</span>
            <span className="font-serif text-lg">Pointer.Design</span>
          </Link>
          <TechLabel className="hidden md:inline">
            AUTH / SHEET A.00 — SECURE CHANNEL
          </TechLabel>
          <Link
            to="/"
            className="tech-label underline underline-offset-4 hover:text-[var(--color-accent)]"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Drawing area */}
      <main className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1280px] grid-cols-12 gap-0 px-6 py-10 md:px-10">
        {/* Left technical rail */}
        <aside className="col-span-12 md:col-span-3 md:border-r md:border-[var(--color-rule)] md:pr-6">
          <div className="space-y-4">
            <TechLabel>FIG. A — ACCESS PROTOCOL</TechLabel>
            <p className="font-serif text-2xl leading-tight md:text-3xl">
              Entrada para o teu workspace editorial.
            </p>
            <div className="space-y-2 border-t border-[var(--color-rule)] pt-4">
              <div className="flex justify-between tech-label">
                <span>REV.</span>
                <span>01</span>
              </div>
              <div className="flex justify-between tech-label">
                <span>ESCALA</span>
                <span>1:1</span>
              </div>
              <div className="flex justify-between tech-label">
                <span>UNIDADE</span>
                <span>MM</span>
              </div>
              <div className="flex justify-between tech-label">
                <span>ESTADO</span>
                <span className="text-[var(--color-accent)]">OPEN</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Card area */}
        <section className="col-span-12 mt-8 flex justify-center md:col-span-9 md:mt-0 md:pl-10">
          <div className="w-full max-w-[460px]">
            <TechRuler ticks={24} className="opacity-50" />
            <div className="relative mt-4 border border-[var(--color-rule)] bg-[var(--color-paper)] p-8 md:p-10">
              <TechCorners />
              <Outlet />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <TechLabel>POINTER / AUTH MODULE</TechLabel>
              <TechLabel accent>● SECURE</TechLabel>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-rule)]">
        <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between px-6 tech-label md:px-10">
          <span>POINTER / AUTH REV. 01</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
