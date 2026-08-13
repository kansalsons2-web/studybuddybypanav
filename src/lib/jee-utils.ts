// Pure client-side helpers for date math and study-time formatting.
import type { StudySession } from "./jee-types";

export const today = () => new Date().toISOString().slice(0, 10);

export const fmt = (m: number) =>
  `${Math.floor(m / 60)}h ${String(Math.round(m % 60)).padStart(2, "0")}m`;

export const fmtShort = (m: number) =>
  m >= 60 ? `${(m / 60).toFixed(1)}h` : `${Math.round(m)}m`;

export const daysTo = (d: string) =>
  Math.max(0, Math.ceil((new Date(d + "T00:00:00").getTime() - Date.now()) / 86400000));

export const minsForDate = (sessions: StudySession[], d: string) =>
  sessions.filter((s) => s.study_date === d).reduce((a, s) => a + s.duration_minutes, 0);

export const totalMinutes = (sessions: StudySession[]) =>
  sessions.reduce((a, s) => a + s.duration_minutes, 0);

export const weekStart = () => {
  const d = new Date();
  const day = d.getDay() || 7; // Monday = 1
  d.setDate(d.getDate() - day + 1);
  return d.toISOString().slice(0, 10);
};

export const weekMinutes = (sessions: StudySession[]) =>
  sessions.filter((s) => s.study_date >= weekStart()).reduce((a, s) => a + s.duration_minutes, 0);

export const monthMinutes = (sessions: StudySession[]) => {
  const m = today().slice(0, 7);
  return sessions.filter((s) => s.study_date.startsWith(m)).reduce((a, s) => a + s.duration_minutes, 0);
};

export const subjectMinutes = (sessions: StudySession[], subject: string) =>
  sessions.filter((s) => s.subject === subject).reduce((a, s) => a + s.duration_minutes, 0);

/** Consecutive-day streak ending today (or yesterday). */
export const streak = (sessions: StudySession[]) => {
  const days = [...new Set(sessions.map((s) => s.study_date))].sort().reverse();
  let s = 0;
  for (let i = 0; i < days.length; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (days[i] === d.toISOString().slice(0, 10)) s++;
    else break;
  }
  return s;
};

/** Minutes per day for the last `n` days, oldest first. */
export const lastNDays = (sessions: StudySession[], n: number) => {
  const out: { date: string; minutes: number }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, minutes: minsForDate(sessions, key) });
  }
  return out;
};
