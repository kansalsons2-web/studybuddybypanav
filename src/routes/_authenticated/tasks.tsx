import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { PRIORITIES, SUBJECTS } from "@/lib/jee-types";
import { today } from "@/lib/jee-utils";
import { Empty, PageHeader, Pill } from "@/components/jee/ui";
import { ScoldBanner } from "@/components/jee/scold-banner";
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

export const Route = createFileRoute("/_authenticated/tasks")({
  component: TasksPage,
  head: () => ({
    meta: [
      { title: "Tasks · JEE Command Center" },
      { name: "description", content: "Plan and complete today's study tasks." },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function TasksPage() {
  const jee = useJee();
  const { tasks } = jee.data;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(today());
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [priority, setPriority] = useState("Normal");
  const [estimate, setEstimate] = useState(30);

  const dayTasks = tasks
    .filter((t) => t.task_date === date)
    .sort((a, b) => Number(a.done) - Number(b.done) || a.priority.localeCompare(b.priority));

  const done = dayTasks.filter((t) => t.done).length;

  async function add() {
    if (!name.trim()) return;
    await jee.addTask({
      task_date: date,
      name: name.trim(),
      subject,
      priority,
      estimate_minutes: estimate,
    });
    setName("");
    setOpen(false);
  }

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle={`${done}/${dayTasks.length} done for ${new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground outline-none focus:border-accent"
        />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 size-4" /> Add task
        </Button>
      </PageHeader>

      {/* Accountability nudge — only renders when yesterday's tasks were left unfinished */}
      <ScoldBanner />

      <div className="rounded-2xl border border-border bg-card/40 p-2">
        {dayTasks.length === 0 ? (
          <Empty text="No tasks for this day. Add one to stay on track." />
        ) : (
          <ul className="divide-y divide-border">
            {dayTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-3 py-3">
                <button
                  onClick={() => jee.toggleTask(t.id, !t.done)}
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    t.done
                      ? "border-accent bg-accent text-background"
                      : "border-border text-transparent hover:border-accent"
                  }`}
                >
                  <Check className="size-3.5" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {t.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{t.subject}</span>·<span>{t.estimate_minutes} min</span>
                  </div>
                </div>
                <Pill tone={t.priority === "High" ? "gold" : t.priority === "Low" ? "default" : "teal"}>
                  {t.priority}
                </Pill>
                <button
                  onClick={() => jee.deleteTask(t.id)}
                  className="ml-1 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Task</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Finish Laws of Motion DPP"
                className={fieldClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Estimate (min)</label>
                <input
                  type="number"
                  min={1}
                  value={estimate}
                  onChange={(e) => setEstimate(Number(e.target.value))}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((x) => (
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
            <Button onClick={add}>Add task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

