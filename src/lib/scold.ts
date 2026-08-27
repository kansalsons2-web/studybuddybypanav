// Tough-love accountability nudges, shown only when there's something real to
// flag (planned tasks existed and weren't finished). These are meant to read
// like a strict but fair coach — blunt about the gap, never insulting about
// the person. Kept separate from quotes.ts, which is purely positive.
import type { Task } from "./jee-types";

export type ScoldLevel = "none" | "mild" | "firm" | "hard";

export type ScoldSituation = {
  level: ScoldLevel;
  headline: string;
  detail: string;
};

const MILD_LINES = [
  "A couple of things were left on the table yesterday. Today is the make-up day.",
  "Small miss yesterday. It only matters if it becomes a pattern — don't let it.",
  "Yesterday's plan and yesterday's result didn't quite match. Close the gap today.",
];

const FIRM_LINES = [
  "You planned {planned} task(s) for yesterday and finished {done}. That gap is what costs rank — not the syllabus.",
  "Half the day's work doesn't get half the result. Finish what's left before adding anything new.",
  "Those tasks are still sitting there unfinished. Nobody else is going to clear them for you.",
];

const HARD_LINES = [
  "Several days in a row now with tasks left undone. At this pace the target rank stays a wish, not a plan.",
  "This is the exact pattern that turns into regret on results day. Change it this week, not next week.",
  "You set this target yourself. You're also the one missing it. Fix the routine before it fixes your rank for you.",
];

function pick(lines: string[], seedKey: string) {
  // Deterministic per-day pick so the message stays stable across re-renders.
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) hash = (hash * 31 + seedKey.charCodeAt(i)) >>> 0;
  return lines[hash % lines.length]!;
}

export function evaluateYesterday(tasks: Task[], todayIso: string) {
  const y = new Date(todayIso + "T00:00:00");
  y.setDate(y.getDate() - 1);
  const yesterdayIso = y.toISOString().slice(0, 10);
  const yTasks = tasks.filter((t) => t.task_date === yesterdayIso);
  const done = yTasks.filter((t) => t.done).length;
  return { yesterdayIso, planned: yTasks.length, done, missed: yTasks.length - done };
}

/** Consecutive days (ending yesterday) where tasks were planned and not all finished. */
export function consecutiveMissedDays(tasks: Task[], todayIso: string, maxLookback = 14) {
  let count = 0;
  for (let i = 1; i <= maxLookback; i++) {
    const d = new Date(todayIso + "T00:00:00");
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const dayTasks = tasks.filter((t) => t.task_date === iso);
    if (dayTasks.length === 0) break; // no plan that day — don't hold it against them
    if (dayTasks.every((t) => t.done)) break;
    count++;
  }
  return count;
}

/**
 * Builds a scold situation from yesterday's task completion plus a streak of
 * consecutive missed days. Returns level "none" when there's nothing to flag
 * — no tasks were planned yesterday, or everything got done.
 */
export function buildScold(params: {
  planned: number;
  done: number;
  missed: number;
  consecutiveMissDays: number;
  dateKey: string;
}): ScoldSituation {
  const { planned, done, missed, consecutiveMissDays, dateKey } = params;
  if (planned === 0 || missed <= 0) {
    return { level: "none", headline: "", detail: "" };
  }
  if (consecutiveMissDays >= 3) {
    return {
      level: "hard",
      headline: `${consecutiveMissDays} days in a row with unfinished tasks`,
      detail: pick(HARD_LINES, dateKey),
    };
  }
  if (missed >= Math.ceil(planned / 2)) {
    return {
      level: "firm",
      headline: `Yesterday: ${done}/${planned} tasks done`,
      detail: pick(FIRM_LINES, dateKey)
        .replace("{planned}", String(planned))
        .replace("{done}", String(done)),
    };
  }
  return {
    level: "mild",
    headline: `Yesterday: ${missed} task${missed === 1 ? "" : "s"} left unfinished`,
    detail: pick(MILD_LINES, dateKey),
  };
}

