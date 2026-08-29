import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { useSyllabus, subjectCompletion, chapterCompletion } from "@/lib/syllabus-hooks";
import {
  CHAPTERS,
  CHAPTER_COUNT,
  CHECK_FIELDS,
  CLASS_LEVELS,
  SYLLABUS_VERSION,
  SUBJECTS,
  type ClassLevel,
} from "@/lib/syllabus-data";
import { Bar, PageHeader, Pill } from "@/components/jee/ui";

export const Route = createFileRoute("/_authenticated/syllabus")({
  component: SyllabusPage,
  head: () => ({
    meta: [
      { title: "Syllabus · JEE Command Center" },
      {
        name: "description",
        content: "Chapter-wise JEE syllabus checklist: notes, lectures, DPPs, modules, revision.",
      },
      { property: "og:title", content: "Syllabus · JEE Command Center" },
      {
        property: "og:description",
        content: "Track every JEE chapter across notes, lectures, DPPs, modules and revision.",
      },
    ],
  }),
});

type Filter = ClassLevel | "All";

function SyllabusPage() {
  const syllabus = useSyllabus();
  const [activeSubject, setActiveSubject] = useState<string>(SUBJECTS[0]);
  const [filter, setFilter] = useState<Filter>("All");

  const bySubject = subjectCompletion(syllabus.byChapter);
  const overallPct = Math.round(
    (CHAPTERS.reduce((a, c) => a + chapterCompletion(syllabus.byChapter.get(c.key)), 0) /
      CHAPTER_COUNT) *
      100,
  );

  const chapters = CHAPTERS.filter(
    (c) => c.subject === activeSubject && (filter === "All" || c.classLevel === filter),
  );

  return (
    <>
      <PageHeader
        title="Syllabus"
        subtitle={`${CHAPTER_COUNT} chapters · ${overallPct}% complete · ${SYLLABUS_VERSION}`}
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {bySubject.map((s) => (
          <button
            key={s.subject}
            onClick={() => setActiveSubject(s.subject)}
            className={`rounded-2xl border p-4 text-left transition-colors ${
              activeSubject === s.subject
                ? "border-accent bg-accent/10"
                : "border-border bg-card/40 hover:border-accent/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-foreground">{s.subject}</span>
              <span className="font-display text-lg font-bold tabular-nums text-accent">
                {s.pct}%
              </span>
            </div>
            <div className="mt-2">
              <Bar value={s.pct} max={100} />
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">{s.total} chapters</div>
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["All", ...CLASS_LEVELS] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {chapters.map((c) => {
          const row = syllabus.byChapter.get(c.key);
          const pct = Math.round(chapterCompletion(row) * 100);
          return (
            <div key={c.key} className="rounded-2xl border border-border bg-card/40 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="min-w-0 flex-1 text-sm font-medium text-foreground">{c.name}</span>
                <Pill tone={c.classLevel === "Class 11" ? "teal" : "gold"}>{c.classLevel}</Pill>
                <span className="w-20">
                  <Bar value={pct} max={100} />
                </span>
                <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                  {pct}%
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHECK_FIELDS.map((f) => {
                  const on = Boolean(row?.[f.key]);
                  return (
                    <button
                      key={f.key}
                      onClick={() =>
                        syllabus.setChapterProgress({
                          chapter_key: c.key,
                          subject: c.subject,
                          class_level: c.classLevel,
                          [f.key]: !on,
                        })
                      }
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        on
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/40"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5" /> Progress saves automatically as you tap each chip.
      </p>
    </>
  );
}
