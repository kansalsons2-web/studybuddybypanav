import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { useJee } from "@/lib/jee-hooks";
import { fmt, minsForDate, today } from "@/lib/jee-utils";
import { PageHeader } from "@/components/jee/ui";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/calendar")({
  component: CalendarPage,
  head: () => ({
    meta: [
      { title: "Calendar · JEE Command Center" },
      { name: "description", content: "A heat-map of your study days." },
    ],
  }),
});

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function intensity(mins: number) {
  if (mins <= 0) return "bg-secondary/40";
  if (mins < 60) return "bg-accent/25";
  if (mins < 120) return "bg-accent/45";
  if (mins < 240) return "bg-accent/70";
  return "bg-accent";
}

function CalendarPage() {
  const { sessions } = useJee().data;
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const { year, month } = cursor;
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthTotal = sessions
    .filter((s) => s.study_date.startsWith(monthKey))
    .reduce((a, s) => a + s.duration_minutes, 0);
  const studyDays = new Set(
    sessions.filter((s) => s.study_date.startsWith(monthKey)).map((s) => s.study_date),
  ).size;

  const tdy = today();

  function move(delta: number) {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  return (
    <>
      <PageHeader title="Calendar" subtitle="A heat-map of your study days.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => move(-1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-[8rem] text-center text-sm font-semibold text-foreground">
            {new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <Button variant="outline" size="icon" onClick={() => move(1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-muted-foreground">
            {WEEKDAYS.map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dateStr = `${monthKey}-${String(day).padStart(2, "0")}`;
              const mins = minsForDate(sessions, dateStr);
              const isToday = dateStr === tdy;
              return (
                <div
                  key={i}
                  title={`${dateStr} · ${fmt(mins)}`}
                  className={`relative aspect-square rounded-lg p-1.5 text-[11px] ${intensity(mins)} ${
                    isToday ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <span className={mins > 120 ? "font-semibold text-background" : "text-foreground/70"}>
                    {day}
                  </span>
                  {mins > 0 && (
                    <span className="absolute bottom-1 right-1.5 text-[9px] tabular-nums text-foreground/50">
                      {Math.round(mins)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="font-display text-2xl font-bold text-primary">{fmt(monthTotal)}</div>
            <div className="text-xs text-muted-foreground">Studied this month</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="font-display text-2xl font-bold text-accent">{studyDays}</div>
            <div className="text-xs text-muted-foreground">Active study days</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Intensity</div>
            <div className="flex items-center gap-1.5">
              {["bg-secondary/40", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"].map((c) => (
                <div key={c} className={`size-4 rounded ${c}`} />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
              <span>0</span>
              <span>4h+</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
