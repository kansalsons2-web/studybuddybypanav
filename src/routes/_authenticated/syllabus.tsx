import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { useSyllabus, subjectCompletion, completionFor } from "@/lib/syllabus-hooks";
import { SYLLABUS, SYLLABUS_VERSION, TOPIC_STATUSES, TOPIC_COUNT } from "@/lib/syllabus-data";
import { Bar, PageHeader, Pill } from "@/components/jee/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/syllabus")({
  component: SyllabusPage,
  head: () => ({
    meta: [
      { title: "Syllabus · JEE Command Center" },
      {
        name: "description",
        content: "Track every chapter and topic of the JEE syllabus to completion.",
      },
    ],
  }),
});

const STATUS_TONE: Record<string, "default" | "gold" | "teal" | "danger"> = {
  "Not Started": "default",
  Learning: "teal",
  Practicing: "teal",
  "Needs Revision": "danger",
  Strong: "gold",
  Mastered: "gold",
};

function SyllabusPage() {
  const syllabus = useSyllabus();
  const [activeSubject, setActiveSubject] = useState(SYLLABUS[0]!.name);

  const bySubject = subjectCompletion(syllabus.byTopic);
  const overallDone = bySubject.reduce((a, s) => a + Math.round((s.pct / 100) * s.total), 0);

  const subject = SYLLABUS.find((s) => s.name === activeSubject)!;

  return (
    <>
      <PageHeader
        title="Syllabus"
        subtitle={`${overallDone}/${TOPIC_COUNT} topics tracked · ${SYLLABUS_VERSION}`}
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
              <span className="font-display text-lg font-bold tabular-nums text-accent">{s.pct}%</span>
            </div>
            <div className="mt-2">
              <Bar value={s.pct} max={100} />
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">{s.total} topics</div>
          </button>
        ))}
      </div>

      <Accordion type="multiple" className="rounded-2xl border border-border bg-card/40 px-4">
        {subject.chapters.map((chapter) => {
          const keys = chapter.topics.map((t) => t.key);
          const pct = Math.round(completionFor(keys, syllabus.byTopic) * 100);
          return (
            <AccordionItem key={chapter.key} value={chapter.key}>
              <AccordionTrigger>
                <div className="flex flex-1 items-center justify-between gap-3 pr-3">
                  <span className="text-left text-foreground">{chapter.name}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="hidden w-16 sm:inline-block">
                      <Bar value={pct} max={100} />
                    </span>
                    {pct}%
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {chapter.topics.map((topic) => {
                    const status = syllabus.byTopic.get(topic.key)?.status ?? "Not Started";
                    return (
                      <li
                        key={topic.key}
                        className="flex flex-wrap items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5"
                      >
                        <span className="min-w-0 flex-1 text-sm text-foreground">{topic.name}</span>
                        <Pill tone={STATUS_TONE[status] ?? "default"}>{status}</Pill>
                        <Select
                          value={status}
                          onValueChange={(v) =>
                            syllabus.setTopicProgress({
                              topic_key: topic.key,
                              subject: subject.name,
                              chapter_key: chapter.key,
                              status: v,
                            })
                          }
                        >
                          <SelectTrigger className="h-8 w-[150px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TOPIC_STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5" /> Progress saves automatically as you update each topic's status.
      </p>
    </>
  );
}

