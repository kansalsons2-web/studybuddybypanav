import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, BarChart3, ChevronDown, Plus, Trash2 } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { TEST_TYPES, type Test } from "@/lib/jee-types";
import { today } from "@/lib/jee-utils";
import { useTestTags } from "@/lib/test-tags-hooks";
import { R2_WARNING, TAGS, TAG_BY_CODE, TAG_GROUPS, type QuestionTag } from "@/lib/test-tags";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/tests")({
  component: TestsPage,
  head: () => ({
    meta: [
      { title: "Mock Tests · JEE Command Center" },
      {
        name: "description",
        content: "Log JEE mock tests and tag every question to find where you lose marks.",
      },
      { property: "og:title", content: "Mock Tests · JEE Command Center" },
      {
        property: "og:description",
        content: "Root-cause analysis for every JEE mock test: R/W/U tagging and score trends.",
      },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"] as const;
type SubjectKey = "physics" | "chemistry" | "mathematics";
const SUBJECT_KEYS: { label: string; key: SubjectKey }[] = [
  { label: "Physics", key: "physics" },
  { label: "Chemistry", key: "chemistry" },
  { label: "Mathematics", key: "mathematics" },
];

const emptyForm = () => ({
  test_date: today(),
  name: "",
  test_type: "JEE Main",
  score: 0,
  max_marks: 300,
  physics: 0,
  chemistry: 0,
  mathematics: 0,
  percentile: "",
  estimated_rank: "",
  time_taken_minutes: "",
  physics_correct: 0,
  physics_incorrect: 0,
  physics_unanswered: 0,
  chemistry_correct: 0,
  chemistry_incorrect: 0,
  chemistry_unanswered: 0,
  mathematics_correct: 0,
  mathematics_incorrect: 0,
  mathematics_unanswered: 0,
});

const num = (v: string) => (v.trim() === "" ? null : Number(v));

function TestsPage() {
  const jee = useJee();
  const { tests } = jee.data;
  const { tags, addTag, deleteTag } = useTestTags();
  const [open, setOpen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [f, setF] = useState(emptyForm());

  const sorted = [...tests].sort((a, b) => b.test_date.localeCompare(a.test_date));

  async function add() {
    if (!f.name.trim()) return;
    const { percentile, estimated_rank, time_taken_minutes, ...rest } = f;
    await jee.addTest({
      ...rest,
      percentile: num(percentile),
      estimated_rank: num(estimated_rank),
      time_taken_minutes: num(time_taken_minutes),
    });
    setOpen(false);
    setF(emptyForm());
  }

  const avgPct =
    tests.length > 0
      ? Math.round((tests.reduce((a, t) => a + t.score / t.max_marks, 0) / tests.length) * 100)
      : 0;

  return (
    <>
      <PageHeader title="Mock Tests" subtitle={`${tests.length} tests · ${avgPct}% average`}>
        <Button variant="outline" onClick={() => setShowAnalysis((v) => !v)}>
          <BarChart3 className="mr-1.5 size-4" /> Analysis
        </Button>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 size-4" /> Add test
        </Button>
      </PageHeader>

      {showAnalysis && <AnalysisPanel tests={tests} tags={tags} />}

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/40">
          <Empty text="No tests logged yet. Add your first mock test." />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sorted.map((t) => (
            <TestCard
              key={t.id}
              test={t}
              tags={tags.filter((x) => x.test_id === t.id)}
              onDelete={() => jee.deleteTest(t.id)}
              addTag={addTag}
              deleteTag={deleteTag}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
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
                <Select value={f.test_type} onValueChange={(v) => setF({ ...f, test_type: v })}>
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
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Time taken (min, optional)
                </label>
                <input
                  type="number"
                  value={f.time_taken_minutes}
                  onChange={(e) => setF({ ...f, time_taken_minutes: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Percentile (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={f.percentile}
                  onChange={(e) => setF({ ...f, percentile: e.target.value })}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Estimated rank (optional)
                </label>
                <input
                  type="number"
                  value={f.estimated_rank}
                  onChange={(e) => setF({ ...f, estimated_rank: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SUBJECT_KEYS.map(({ label, key }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{label}</label>
                  <input
                    type="number"
                    value={f[key]}
                    onChange={(e) => setF({ ...f, [key]: Number(e.target.value) })}
                    className={fieldClass}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2 rounded-xl border border-border p-3">
              <div className="text-xs font-medium text-muted-foreground">
                Question counts per subject (optional)
              </div>
              {SUBJECT_KEYS.map(({ label, key }) => (
                <div key={key} className="grid grid-cols-4 items-center gap-2">
                  <span className="text-xs text-foreground">{label}</span>
                  {(["correct", "incorrect", "unanswered"] as const).map((k) => {
                    const field = `${key}_${k}` as keyof typeof f;
                    return (
                      <input
                        key={k}
                        type="number"
                        placeholder={k}
                        value={f[field] as number}
                        onChange={(e) => setF({ ...f, [field]: Number(e.target.value) })}
                        className="h-9 w-full rounded-lg border border-border bg-input px-2 text-xs text-foreground outline-none focus:border-accent"
                      />
                    );
                  })}
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

function TestCard({
  test: t,
  tags,
  onDelete,
  addTag,
  deleteTag,
}: {
  test: Test;
  tags: QuestionTag[];
  onDelete: () => void;
  addTag: (v: {
    test_id: string;
    question_number: number;
    subject: string;
    tag: string;
    note: string;
  }) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}) {
  const pct = Math.round((t.score / t.max_marks) * 100);
  const [expanded, setExpanded] = useState(false);
  const [q, setQ] = useState({ question_number: 1, subject: "Physics", tag: "W1", note: "" });

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
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
            onClick={onDelete}
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

      {(t.percentile != null || t.estimated_rank != null || t.time_taken_minutes != null) && (
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
          {t.percentile != null && <Pill tone="teal">{t.percentile} %ile</Pill>}
          {t.estimated_rank != null && <Pill tone="gold">AIR ~{t.estimated_rank}</Pill>}
          {t.time_taken_minutes != null && <Pill>{t.time_taken_minutes} min</Pill>}
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <SubjectScore label="Physics" value={t.physics} />
        <SubjectScore label="Chemistry" value={t.chemistry} />
        <SubjectScore label="Maths" value={t.mathematics} />
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40"
      >
        <span>Question tags ({tags.length})</span>
        <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min={1}
              value={q.question_number}
              onChange={(e) => setQ({ ...q, question_number: Number(e.target.value) })}
              placeholder="Q no."
              className="h-9 rounded-lg border border-border bg-input px-2 text-xs text-foreground outline-none focus:border-accent"
            />
            <Select value={q.subject} onValueChange={(v) => setQ({ ...q, subject: v })}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={q.tag} onValueChange={(v) => setQ({ ...q, tag: v })}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TAG_GROUPS.map((g) => (
                <SelectGroup key={g}>
                  <SelectLabel>{g}</SelectLabel>
                  {TAGS.filter((x) => x.group === g).map((x) => (
                    <SelectItem key={x.code} value={x.code}>
                      {x.code} · {x.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {q.tag === "R2" && (
            <p className="flex items-start gap-1.5 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-2 text-[11px] text-destructive">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0" /> {R2_WARNING}
            </p>
          )}
          <input
            value={q.note}
            onChange={(e) => setQ({ ...q, note: e.target.value })}
            placeholder="Note (optional)"
            className="h-9 w-full rounded-lg border border-border bg-input px-2 text-xs text-foreground outline-none focus:border-accent"
          />
          <Button
            size="sm"
            className="w-full"
            onClick={async () => {
              await addTag({ test_id: t.id, ...q });
              setQ({ ...q, question_number: q.question_number + 1, note: "" });
            }}
          >
            <Plus className="mr-1.5 size-3.5" /> Add tag
          </Button>

          {tags.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground">No questions tagged yet.</p>
          ) : (
            <ul className="space-y-1.5">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="flex items-center gap-2 rounded-lg bg-secondary/40 px-2.5 py-2 text-xs"
                >
                  <span className="w-8 shrink-0 tabular-nums text-muted-foreground">
                    Q{tag.question_number}
                  </span>
                  <Pill tone={TAG_BY_CODE.get(tag.tag)?.analyzeAs === "Right" ? "gold" : "danger"}>
                    {tag.tag}
                  </Pill>
                  <span className="min-w-0 flex-1 truncate text-foreground">
                    {tag.note || TAG_BY_CODE.get(tag.tag)?.label}
                  </span>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function AnalysisPanel({ tests, tags }: { tests: Test[]; tags: QuestionTag[] }) {
  const withPct = [...tests]
    .filter((t) => t.percentile != null)
    .sort((a, b) => a.test_date.localeCompare(b.test_date));

  const sections = SUBJECT_KEYS.map(({ label, key }) => {
    const correct = tests.reduce((a, t) => a + (t[`${key}_correct`] ?? 0), 0);
    const incorrect = tests.reduce((a, t) => a + (t[`${key}_incorrect`] ?? 0), 0);
    const unanswered = tests.reduce((a, t) => a + (t[`${key}_unanswered`] ?? 0), 0);
    const attempted = correct + incorrect;
    return {
      label,
      correct,
      incorrect,
      unanswered,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      total: correct + incorrect + unanswered,
    };
  }).filter((s) => s.total > 0);

  const counts = new Map<string, number>();
  for (const t of tags) counts.set(t.tag, (counts.get(t.tag) ?? 0) + 1);
  const maxCount = Math.max(1, ...counts.values());

  const empty = withPct.length === 0 && sections.length === 0 && tags.length === 0;

  return (
    <div className="mb-6 space-y-6 rounded-2xl border border-border bg-card/40 p-5">
      <h2 className="font-display text-lg font-semibold text-foreground">Analysis</h2>

      {empty ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Log a percentile, section counts, or tag some questions to unlock your analysis.
        </p>
      ) : (
        <>
          {withPct.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Percentile trend
              </h3>
              <div className="flex h-32 items-end gap-2">
                {withPct.map((t) => (
                  <div key={t.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] tabular-nums text-accent">{t.percentile}</span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary to-accent"
                      style={{ height: `${Math.max(4, Number(t.percentile))}%` }}
                    />
                    <span className="w-full truncate text-center text-[10px] text-muted-foreground">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Section-wise accuracy
              </h3>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground">{s.label}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {s.correct} correct · {s.incorrect} wrong · {s.unanswered} left ·{" "}
                        <span className="text-accent">{s.accuracy}%</span>
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Bar value={s.accuracy} max={100} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tags.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Where did I lose marks?
              </h3>
              <div className="space-y-4">
                {(["Wrong", "Unattempted", "Right"] as const).map((group) => {
                  const rows = TAGS.filter((x) => x.analyzeAs === group)
                    .map((x) => ({ ...x, count: counts.get(x.code) ?? 0 }))
                    .filter((x) => x.count > 0)
                    .sort((a, b) => b.count - a.count);
                  if (rows.length === 0) return null;
                  return (
                    <div key={group}>
                      <div className="mb-2 text-xs font-semibold text-foreground">{group}</div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {rows.map((r) => (
                          <div
                            key={r.code}
                            className="rounded-xl border border-border bg-background/40 p-3"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground">
                                {r.code} · {r.label}
                              </span>
                              <span className="font-display font-bold tabular-nums text-primary">
                                {r.count}
                              </span>
                            </div>
                            <div className="mt-1.5">
                              <Bar value={r.count} max={maxCount} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
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
