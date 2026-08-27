import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarClock, Check, Plus, Trash2 } from "lucide-react";

import { useTimetable, completionKey } from "@/lib/timetable-hooks";
import { DAYS, DAY_SHORT } from "@/lib/timetable-types";
import { SUBJECTS } from "@/lib/jee-types";
import { today } from "@/lib/jee-utils";
import { Bar, Empty, PageHeader, Pill } from "@/components/jee/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/timetable")({
  component: TimetablePage,
  head: () => ({
    meta: [
      { title: "Timetable · JEE Command Center" },
      { name: "description", content: "Your weekly study timetable, tracked day by day." },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function fmtTime(t: string) {
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr} ${period}`;
}

function TimetablePage() {
  const tt = useTimetable();
  const [date, setDate] = useState(today());
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(new Date(today() + "T00:00:00").getDay());
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [subject, setSubject] = useState("Physics");
  const [label, setLabel] = useState("");

  const dayOfWeek = new Date(date + "T00:00:00").getDay();
  const daySlots = tt.slots
    .filter((s) => s.day_of_week === dayOfWeek)
    .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));

  const doneToday = daySlots.filter((s) => tt.byCompletion.get(completionKey(s.id, date))?.done).length;

  // Rolling 7-day follow rate across all recurring slots.
  const weekStats = useMemo(() => {
    let planned = 0;
    let done = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const dow = d.getDay();
      const slotsForDay = tt.slots.filter((s) => s.day_of_week === dow);
      planned += slotsForDay.length;
      done += slotsForDay.filter((s) => tt.byCompletion.get(completionKey(s.id, iso))?.done).length;
    }
    return { planned, done };
  }, [tt.slots, tt.byCompletion]);

  async function addSlot() {
    await tt.addSlot({ day_of_week: day, start_time: startTime, end_time: endTime, subject, label: label.trim() });
    setLabel("");
    setOpen(false);
  }

  return (
    <>
      <PageHeader
        title="Timetable"
        subtitle={`${doneToday}/${daySlots.length} blocks followed on ${new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}`}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground outline-none focus:border-accent"
        />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 size-4" /> Add block
        </Button>
      </PageHeader>

      <div className="mb-6 rounded-2xl border border-border bg-card/40 p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarClock className="size-4 text-accent" /> This week's follow rate
          </div>
          <span className="text-xs text-muted-foreground">
            {weekStats.done}/{weekStats.planned} blocks
          </span>
        </div>
        <Bar value={weekStats.done} max={Math.max(1, weekStats.planned)} />
      </div>

      <div className="rounded-2xl border border-border bg-card/40 p-2">
        {daySlots.length === 0 ? (
          <Empty text="No blocks scheduled for this day. Add one to build your timetable." />
        ) : (
          <ul className="divide-y divide-border">
            {daySlots.map((slot) => {
              const done = tt.byCompletion.get(completionKey(slot.id, date))?.done ?? false;
              return (
                <li key={slot.id} className="flex items-center gap-3 px-3 py-3">
                  <button
                    onClick={() => tt.setSlotCompletion(slot.id, date, !done)}
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      done
                        ? "border-accent bg-accent text-background"
                        : "border-border text-transparent hover:border-accent"
                    }`}
                  >
                    <Check className="size-3.5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {slot.label || slot.subject}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {fmtTime(slot.start_time)} – {fmtTime(slot.end_time)}
                    </div>
                  </div>
                  <Pill tone="teal">{slot.subject}</Pill>
                  <button
                    onClick={() => tt.deleteSlot(slot.id)}
                    className="ml-1 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h2 className="mb-3 mt-8 font-display text-sm font-semibold text-foreground">Weekly template</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DAYS.map((name, idx) => {
          const slots = tt.slots
            .filter((s) => s.day_of_week === idx)
            .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));
          return (
            <div key={name} className="rounded-2xl border border-border bg-card/40 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {DAY_SHORT[idx]}
              </div>
              {slots.length === 0 ? (
                <div className="text-xs text-muted-foreground/70">No blocks</div>
              ) : (
                <ul className="space-y-1.5">
                  {slots.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="min-w-0 truncate text-foreground">{s.label || s.subject}</span>
                      <span className="shrink-0 text-muted-foreground">{fmtTime(s.start_time)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add timetable block</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Physics DPP block"
                className={fieldClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Day</label>
                <Select value={String(day)} onValueChange={(v) => setDay(Number(v))}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d, idx) => (
                      <SelectItem key={d} value={String(idx)}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((x) => (
                      <SelectItem key={x} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Start time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">End time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addSlot}>Add block</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

