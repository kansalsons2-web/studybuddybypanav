import type { ReactNode } from "react";

/** Page title + optional action row. */
export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/** Compact stat tile. */
export function Stat({
  value,
  label,
  accent,
}: {
  value: ReactNode;
  label: string;
  accent?: "gold" | "teal";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4">
      <div
        className={`font-display text-2xl font-bold tabular-nums ${
          accent === "gold" ? "text-primary" : accent === "teal" ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

/** Gradient progress bar. */
export function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return <div className="py-10 text-center text-sm text-muted-foreground">{text}</div>;
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "gold" | "teal" | "danger";
}) {
  const tones = {
    default: "border-border text-muted-foreground",
    gold: "border-primary/40 text-primary",
    teal: "border-accent/40 text-accent",
    danger: "border-destructive/40 text-destructive",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Section wrapper used on every page for consistent card styling. */
export function Section({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm">{children}</div>
  );
}
