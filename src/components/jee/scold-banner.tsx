import { AlertTriangle } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { today } from "@/lib/jee-utils";
import { buildScold, consecutiveMissedDays, evaluateYesterday } from "@/lib/scold";

const LEVEL_STYLES: Record<string, string> = {
  mild: "border-primary/30 bg-primary/10",
  firm: "border-destructive/40 bg-destructive/10",
  hard: "border-destructive/60 bg-destructive/15",
};

/** Shows nothing when yesterday's plan was fully completed (or nothing was planned). */
export function ScoldBanner() {
  const { data } = useJee();
  const tdy = today();
  const { planned, done, missed } = evaluateYesterday(data.tasks, tdy);
  const streak = consecutiveMissedDays(data.tasks, tdy);
  const situation = buildScold({ planned, done, missed, consecutiveMissDays: streak, dateKey: tdy });

  if (situation.level === "none") return null;

  return (
    <div
      className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${LEVEL_STYLES[situation.level]}`}
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
          {situation.headline}
        </div>
        <p className="mt-1 text-sm text-foreground/90">{situation.detail}</p>
      </div>
    </div>
  );
}

