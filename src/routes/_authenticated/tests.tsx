import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { TEST_TYPES } from "@/lib/jee-types";
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

export const Route = createFileRoute("/_authenticated/tests")({
  component: TestsPage,
  head: () => ({
    meta: [
      { title: "Mock Tests · JEE Command Center" },
      { name: "description", content: "Track JEE Main and Advanced mock test scores." },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function TestsPage() {
  const jee = useJee();
  const { tests } = jee.data;
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    test_date: today(),
    name: "",
    test_type: "JEE Main",
    score: 0,
    max_marks: 300,
    physics: 0,
    chemistry: 0,
    mathematics: 0,
  });

  const sorted = [...tests].sort((a, b) => b.test_date.localeCompare(a.test_date));

  async function add() {
    if (!f.name.trim()) return;
    await jee.addTest(f);
    setOpen(false);
    setF({ ...f, name: "" });
  }

  const avgPct =
    tests.length > 0
      ? Math.round((tests.reduce((a, t) => a + t.score / t.max_marks, 0) / tests.length) * 100)
      : 0;

  return (
    <>
      <PageHeader
        title="Mock Tests"
        subtitle={`${tests.length} tests · ${avgPct}% average`}
      >
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 size-4" /> Add test
        </Button>
      </PageHeader>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/40">
          <Empty text="No tests logged yet. Add your first mock test." />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sorted.map((t) => {
            const pct = Math.round((t.score / t.max_marks) * 100);
            return (
              <div key={t.id} className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display text-base font-semibold text-foreground">{t.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(t.test_date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill tone={t.test_type === "JEE Advanced" ? "gold" : "teal"}>{t.test_type}</Pill>
                    <button
                      onClick={() => jee.deleteTest(t.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-end gap-2">
                  <span className="font-display text-3xl font-bold text-primary">{t.score}</span>
                  <span className="mb-1 text-sm text-muted-foreground">/ {t.max_marks}</span>
                  <span className="ml-auto font-display text-lg font-bold text-accent">{pct}%</span>
                </div>
                <div className="mt-2">
                  <Bar value={t.score} max={t.max_marks} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <SubjectScore label="Physics" value={t.physics} />
                  <SubjectScore label="Chemistry" value={t.chemistry} />
                  <SubjectScore label="Maths" value={t.mathematics} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add mock test</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <input
                  value={f.name}
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                  placeholder="e.g. Allen Major Test 4"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Date</label>
                <input
                  type="date"
                  value={f.test_date}
                  onChange={(e) => setF({ ...f, test_date: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Type</label>
                <Select
                  value={f.test_type}
                  onValueChange={(v) => setF({ ...f, test_type: v })}
                >
                  <SelectTrigger className={fieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_TYPES.map((x) => (
                      <SelectItem key={x} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Max marks</label>
                <input
                  type="number"
                  value={f.max_marks}
                  onChange={(e) => setF({ ...f, max_marks: Number(e.target.value) })}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Score</label>
                <input
                  type="number"
                  value={f.score}
                  onChange={(e) => setF({ ...f, score: Number(e.target.value) })}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["physics", "chemistry", "mathematics"] as const).map((k) => (
                <div key={k} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {(k[0]?.toUpperCase() ?? "") + k.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={f[k]}
                    onChange={(e) => setF({ ...f, [k]: Number(e.target.value) })}
                    className={fieldClass}
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={add}>Add test</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SubjectScore({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-2 py-1.5">
      <div className="font-display text-lg font-bold tabular-nums text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
