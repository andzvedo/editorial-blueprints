import { useEffect, useRef, useState } from "react";
import { TechCorners, TechLabel } from "@/components/tech";

type Step = {
  key: string;
  label: string;
  detail: string;
  /** ms */
  duration: number;
};

const STEPS: Step[] = [
  { key: "compile", label: "Compiling sources", detail: "MDX · assets · theme tokens", duration: 1400 },
  { key: "optimize", label: "Optimizing media", detail: "Encoding covers · 4:3 · 2x", duration: 1600 },
  { key: "build", label: "Building static site", detail: "Generating routes & sitemap", duration: 1800 },
  { key: "deploy", label: "Deploying to edge", detail: "Pushing to global network", duration: 1500 },
  { key: "verify", label: "Verifying domain", detail: "SSL · DNS · health checks", duration: 1100 },
];

const TOTAL = STEPS.reduce((s, x) => s + x.duration, 0);

type Phase = "idle" | "running" | "done";

export function PublishPopover({
  open,
  onClose,
  siteId,
}: {
  open: boolean;
  onClose: () => void;
  siteId: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0); // 0..1
  const [currentIdx, setCurrentIdx] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  // Click outside / Esc
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && phase !== "running") onClose();
    }
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node) && phase !== "running") onClose();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose, phase]);

  // Auto start when opened from idle
  useEffect(() => {
    if (open && phase === "idle") {
      start();
    }
    if (!open) {
      // reset for next time, but only when closed
      setPhase("idle");
      setProgress(0);
      setCurrentIdx(0);
      setLog([]);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function start() {
    setPhase("running");
    setProgress(0);
    setCurrentIdx(0);
    setLog([`> pointer publish ${siteId}`]);
    startRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(1, elapsed / TOTAL);
      setProgress(p);

      // figure out current step
      let acc = 0;
      let idx = 0;
      for (let i = 0; i < STEPS.length; i++) {
        acc += STEPS[i].duration;
        if (elapsed < acc) {
          idx = i;
          break;
        }
        idx = i + 1;
      }
      setCurrentIdx(idx);
      setLog((prev) => {
        const expected = STEPS.slice(0, Math.min(idx, STEPS.length)).map(
          (s) => `✓ ${s.label.toLowerCase()} — ok`,
        );
        const next = [prev[0], ...expected];
        return next.length === prev.length ? prev : next;
      });

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        setLog((prev) => [...prev, "✓ deployed", `↗ https://${siteId}.pointer.design`]);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  if (!open) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[420px] origin-top-right border border-[var(--color-rule)] bg-[var(--color-card)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-200"
    >
      <TechCorners />

      {/* notch arrow pointing at button */}
      <span
        aria-hidden
        className="absolute -top-[7px] right-6 h-3 w-3 rotate-45 border-l border-t border-[var(--color-rule)] bg-[var(--color-card)]"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-5 py-3">
        <TechLabel accent>
          {phase === "done" ? "● LIVE" : phase === "running" ? "● PUBLISHING" : "● READY"}
        </TechLabel>
        <span className="font-mono text-[11px] text-muted-foreground">REV. 01 / {pct}%</span>
      </div>

      {/* Title */}
      <div className="px-5 pt-4">
        <p className="font-serif text-[20px] leading-tight text-foreground">
          {phase === "done" ? (
            <>
              Your site is <em className="italic">live</em>.
            </>
          ) : (
            <>
              Publishing <em className="italic">{siteId}</em>
            </>
          )}
        </p>
        <p className="mt-1 font-mono text-[11px] text-[var(--color-accent)]">
          ↗ {siteId}.pointer.design
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-4">
        <div className="relative h-[6px] w-full overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper)]">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--color-accent)] transition-[width] duration-150 ease-linear"
            style={{ width: `${pct}%` }}
          />
          {phase === "running" && (
            <div
              className="absolute inset-y-0 w-12 -translate-x-full animate-[publish-shimmer_1.2s_linear_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ left: `${pct}%` }}
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>00</span>
          <span>BUILD · DEPLOY · VERIFY</span>
          <span>100</span>
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-3 px-5">
        {STEPS.map((s, i) => {
          const done = i < currentIdx || phase === "done";
          const active = i === currentIdx && phase === "running";
          return (
            <li
              key={s.key}
              className="flex items-start gap-3 border-b border-dashed border-[var(--color-rule)] py-2 last:border-b-0"
            >
              <span
                className={`mt-0.5 flex h-4 w-4 items-center justify-center border font-mono text-[10px] ${
                  done
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                    : active
                      ? "border-foreground text-foreground"
                      : "border-[var(--color-rule)] text-muted-foreground"
                }`}
              >
                {done ? "✓" : active ? <Spinner /> : String(i + 1).padStart(2, "0")[1]}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-[13px] ${
                    active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                <span className="block font-mono text-[10px] text-muted-foreground">
                  {s.detail}
                </span>
              </span>
              <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {done ? "OK" : active ? "…" : "—"}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Log */}
      <div className="mx-5 mt-3 max-h-[88px] overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper)]/60 p-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        {log.map((l, i) => (
          <div key={i} className="truncate">
            {l}
          </div>
        ))}
        {phase === "running" && <span className="inline-block h-3 w-1.5 animate-pulse bg-foreground/60 align-middle" />}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--color-rule)] bg-[var(--color-paper)]/40 px-5 py-3">
        <TechLabel>
          {phase === "done" ? "DEPLOY · COMPLETE" : phase === "running" ? "DO NOT CLOSE" : "READY"}
        </TechLabel>
        <div className="flex items-center gap-2">
          {phase === "done" ? (
            <>
              <button
                onClick={onClose}
                className="tech-label border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 hover:border-foreground"
              >
                CLOSE
              </button>
              <a
                href={`https://${siteId}.pointer.design`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 bg-[var(--color-accent)] px-3 text-[12px] font-medium uppercase tracking-wider text-[var(--color-accent-foreground)] hover:bg-foreground"
                style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
              >
                Visit site ↗
              </a>
            </>
          ) : (
            <button
              disabled
              className="tech-label cursor-not-allowed border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 opacity-60"
            >
              PUBLISHING…
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span className="relative inline-block h-2.5 w-2.5">
      <span className="absolute inset-0 animate-spin rounded-full border border-foreground/30 border-t-foreground" />
    </span>
  );
}
