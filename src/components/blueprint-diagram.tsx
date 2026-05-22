import { TechCorners } from "./tech";

export function BlueprintDiagram() {
  return (
    <div className="relative aspect-[4/5] w-full bg-[var(--color-paper)]">
      <TechCorners className="text-[var(--color-mono)]" />

      {/* corner labels */}
      <div className="tech-label absolute right-4 top-4 text-right leading-tight">
        ESPEC. CR-01
        <br />
        ARQUITETURA POINTER
        <br />
        REV. 01 — V0.1
      </div>
      <div className="tech-label absolute left-4 top-4">
        <span className="text-[var(--color-accent)]">◆</span> N 41.157°
        <br />W 008.629°
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* construction grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-[var(--color-rule)]"
            />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#grid)" opacity="0.5" />

        {/* envelope outline */}
        <g
          stroke="currentColor"
          className="text-[var(--color-ink)]"
          strokeWidth="1.2"
          fill="none"
        >
          <path d="M80 180 L320 180 L320 380 L80 380 Z" />
          <path d="M80 180 L200 280 L320 180" strokeDasharray="3 3" />
          {/* inner page */}
          <rect
            x="140"
            y="140"
            width="120"
            height="60"
            stroke="currentColor"
            strokeDasharray="2 2"
            className="text-[var(--color-mono)]"
          />
        </g>

        {/* dimension lines */}
        <g
          stroke="currentColor"
          className="text-[var(--color-mono)]"
          strokeWidth="0.6"
        >
          {/* top horizontal */}
          <path d="M80 120 L320 120" />
          <path d="M80 115 L80 125 M320 115 L320 125" />
          <path d="M80 120 L88 116 M80 120 L88 124" />
          <path d="M320 120 L312 116 M320 120 L312 124" />
          {/* right vertical */}
          <path d="M350 180 L350 380" />
          <path d="M345 180 L355 180 M345 380 L355 380" />
        </g>

        <text
          x="200"
          y="112"
          textAnchor="middle"
          className="fill-[var(--color-mono)]"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
          }}
        >
          ← 240 MM →
        </text>
        <text
          x="358"
          y="285"
          className="fill-[var(--color-mono)]"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
          }}
          transform="rotate(90 358 285)"
        >
          200 MM
        </text>

        {/* center crosshair */}
        <g
          stroke="currentColor"
          className="text-[var(--color-accent)]"
          strokeWidth="0.8"
        >
          <circle cx="200" cy="280" r="6" fill="none" />
          <path d="M200 270 L200 290 M190 280 L210 280" />
        </g>

        {/* leader line + callout */}
        <g
          stroke="currentColor"
          className="text-[var(--color-mono)]"
          strokeWidth="0.6"
        >
          <path d="M260 230 L300 420" strokeDasharray="2 2" />
          <circle cx="260" cy="230" r="2" fill="currentColor" />
        </g>
        <text
          x="240"
          y="438"
          className="fill-[var(--color-ink)]"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
          }}
        >
          A/ CONTENT LAYER
        </text>
      </svg>

      {/* bottom legend */}
      <div className="tech-label absolute bottom-4 left-4 right-4 flex justify-between border-t border-dashed border-[var(--color-rule)] pt-2">
        <span>SCALE 1:1</span>
        <span>SHEET 01 / 04</span>
        <span className="text-[var(--color-accent)]">● APPROVED</span>
      </div>
    </div>
  );
}
