import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Target, Trash2 } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { GOAL_KINDS, GOAL_SUBJECTS } from "@/lib/jee-types";
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

export const Route = createFileRoute("/_authenticated/goals")({
  component: GoalsPage,
  head: () => ({
    meta: [
      { title: "Goals · JEE Command Center" },
      { name: "description", content: "Set and complete weekly and monthly goals." },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function GoalsPage() {
  const jee = useJee();
  const { goals, sessions, profile } = jee.data;
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("weekly");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Physics");

  const weekly = goals.filter((g) => g.kind === "weekly");
  const monthly = goals.filter((g) => g.kind === "monthly");

  async function add() {
    if (!name.trim()) return;
    await jee.addGoal({ kind, name: name.trim(), subject });
    setName("");
    setOpen(false);
  }

  const weekTarget = profile.weekly_target * 60;
  const monthTarget = profile.monthly_target * 60;
  const weekDone = goals.filter((g) => g.kind === "weekly" && g.done).length;
  const monthDone = goals.filter((g) => g.kind === "monthly" && g.done).length;

  return (
    <>
      <PageHeader title="Goals" subtitle="Weekly and monthly targets to stay accountable.">
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 size-4" /> New goal
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <GoalColumn
          title="Weekly"
          tone="teal"
          items={weekly}
          onToggle={(g) => jee.toggleGoal(g.id, !g.done)}
          onDelete={(g) => jee.deleteGoal(g.id)}
          progress={weekDone}
          total={weekly.length}
        />
        <GoalColumn
          title="Monthly"
          tone="gold"
          items={monthly}
          onToggle={(g) => jee.toggleGoal(g.id, !g.done)}
          onDelete={(g) => jee.deleteGoal(g.id)}
          progress={monthDone}
          total={monthly.length}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Weekly study target</span>
            <span className="text-muted-foreground">{weekDone}/{weekly.length} goals</span>
          </div>
          <Bar value={weekDone} max={Math.max(1, weekly.length)} />
          <p className="mt-2 text-xs text-muted-foreground">
            Aim for {weekTarget} min across all subjects this week.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Monthly study target</span>
            <span className="text-muted-foreground">{monthDone}/{monthly.length} goals</span>
          </div>
          <Bar value={monthDone} max={Math.max(1, monthly.length)} />
          <p className="mt-2 text-xs text-muted-foreground">
            Aim for {monthTarget} min across all subjects this month.
          </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Goal</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Complete Mechanics chapter"
                className={fieldClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Type</label>
                <Select value={kind} onValueChange={setKind}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GOAL_KINDS.map((x) => (
                      <SelectItem key={x} value={x}>
                        {x[0].toUpperCase() + x.slice(1)}
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
                    {GOAL_SUBJECTS.map((x) => (
                      <SelectItem key={x} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={add}>Add goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function GoalColumn({
  title,
  tone,
  items,
  onToggle,
  onDelete,
  progress,
  total,
}: {
  title: string;
  tone: "teal" | "gold";
  items: { id: string; name: string; subject: string; done: boolean }[];
  onToggle: (g: { id: string }) => void;
  onDelete: (g: { id: string }) => void;
  progress: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-foreground">{title} goals</h2>
        <Pill tone={tone}>
          {progress}/{total}
        </Pill>
      </div>
      {items.length === 0 ? (
        <Empty text={`No ${title.toLowerCase()} goals yet.`} />
      ) : (
        <ul className="space-y-2">
          {items.map((g) => (
            <li key={g.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5">
              <button
                onClick={() => onToggle(g)}
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  g.done
                    ? tone === "gold"
                      ? "border-primary bg-primary text-background"
                      : "border-accent bg-accent text-background"
                    : "border-border text-transparent hover:border-accent"
                }`}
              >
                <Check className="size-3.5" />
              </button>
              <Target className="size-4 text-muted-foreground" />
              <span className={`flex-1 text-sm ${g.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {g.name}
              </span>
              <span className="text-xs text-muted-foreground">{g.subject}</span>
              <button
                onClick={() => onDelete(g)}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
