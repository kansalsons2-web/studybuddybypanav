import { createFileRoute } from "@tanstack/react-router";

import { useJee } from "@/lib/jee-hooks";
import { SUBJECTS, STUDY_TYPES } from "@/lib/jee-types";
import {
  fmt,
  lastNDays,
  monthMinutes,
  streak,
  subjectMinutes,
  today,
  totalMinutes,
  weekMinutes,
} from "@/lib/jee-utils";
import { PageHeader, Stat } from "@/components/jee/ui";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics · JEE Command Center" },
      { name: "description", content: "Study analytics across subjects and time." },
    ],
  }),
});

function AnalyticsPage() {
  const { sessions } = useJee().data;

  const total = totalMinutes(sessions);
  const wk = weekMinutes(sessions);
  const mo = monthMinutes(sessions);
  const sk = streak(sessions);
  const tdy = today();

  const series = lastNDays(sessions, 14);
  const maxDay = Math.max(60, ...series.map((d) => d.minutes));

  const subjectTotals = SUBJECTS.map((s) => ({
    subject: s,
    mins: subjectMinutes(sessions, s),
  })).sort((a, b) => b.mins - a.mins);
  const maxSubject = Math.max(1, ...subjectTotals.map((x) => x.mins));

  const typeTotals = STUDY_TYPES.map((t) => ({
    type: t,
    mins: sessions.filter((s) => s.study_type === t).reduce((a, s) => a + s.duration_minutes, 0),
  })).filter((x) => x.mins > 0);
  const maxType = Math.max(1, ...typeTotals.map((x) => x.mins));

  return (
    <>
      <PageHeader title="Analytics" subtitle="Where your hours actually go." />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={fmt(total)} label="All time" accent="gold" />
        <Stat value={fmt(wk)} label="This week" accent="teal" />
        <Stat value={fmt(mo)} label="This month" />
        <Stat value={sk} label="Day streak" accent="gold" />
      </div>

      {/* 14-day chart */}
      <div className="mb-6 rounded-2xl border border-border bg-card/40 p-5">
        <h2 className="mb-4 font-display text-sm font-semibold text-foreground">Last 14 days</h2>
        <div className="flex h-40 items-end gap-1.5">
          {series.map((d) => {
            const h = Math.max(2, Math.round((d.minutes / maxDay) * 100));
            const isToday = d.date === tdy;
            return (
              <div key={d.date} className="flex flex-1 flex-col items-center justify-end">
                <div className="mb-1 text-[10px] tabular-nums text-muted-foreground">
                  {d.minutes > 0 ? Math.round(d.minutes) : ""}
                </div>
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isToday ? "bg-primary" : "bg-accent/60"
                  }`}
                  style={{ height: `${h}%` }}
                  title={`${d.date}: ${fmt(d.minutes)}`}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>{new Date((series[0]?.date ?? tdy) + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          <span>Today</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject breakdown */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="mb-4 font-display text-sm font-semibold text-foreground">By subject</h2>
          <div className="space-y-3">
            {subjectTotals.map((s) => {
              const pct = total > 0 ? Math.round((s.mins / total) * 100) : 0;
              return (
                <div key={s.subject}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-foreground">{s.subject}</span>
                    <span className="text-muted-foreground">
                      {fmt(s.mins)} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${Math.round((s.mins / maxSubject) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study type breakdown */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="mb-4 font-display text-sm font-semibold text-foreground">By study type</h2>
          {typeTotals.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">No sessions logged yet.</div>
          ) : (
            <div className="space-y-3">
              {typeTotals.map((t) => (
                <div key={t.type}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-foreground">{t.type}</span>
                    <span className="text-muted-foreground">{fmt(t.mins)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.round((t.mins / maxType) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
