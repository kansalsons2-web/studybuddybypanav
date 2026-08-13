import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Flag, GraduationCap, Rocket, Target } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { daysTo } from "@/lib/jee-utils";
import { PageHeader, Pill } from "@/components/jee/ui";

export const Route = createFileRoute("/_authenticated/roadmap")({
  component: RoadmapPage,
  head: () => ({
    meta: [
      { title: "Roadmap · JEE Command Center" },
      { name: "description", content: "Your JEE preparation roadmap to exam day." },
    ],
  }),
});

const PHASES = [
  {
    icon: BookOpen,
    title: "Foundation",
    window: "Now → 12 months out",
    focus: "NCERT mastery, build conceptual base across Physics, Chemistry, Maths.",
    tone: "teal" as const,
  },
  {
    icon: Target,
    title: "Intensive practice",
    window: "12 → 6 months out",
    focus: "DPPs, chapter-wise problem banks, first subject-wise mocks.",
    tone: "gold" as const,
  },
  {
    icon: Rocket,
    title: "Full-length mocks",
    window: "6 → 3 months out",
    focus: "Full JEE Main + Advanced mocks, error analysis, speed building.",
    tone: "teal" as const,
  },
  {
    icon: Flag,
    title: "Final revision",
    window: "3 months → exam",
    focus: "Revision notes, formula sheets, targeted weak-area drills.",
    tone: "gold" as const,
  },
];

function RoadmapPage() {
  const { profile } = useJee().data;
  const mainsDays = daysTo(profile.mains_date);
  const advDays = daysTo(profile.advanced_date);

  return (
    <>
      <PageHeader
        title="Roadmap"
        subtitle={`Target ${profile.target_rank} · ${profile.college}`}
      />

      <div className="mission-gradient relative mb-6 overflow-hidden rounded-2xl p-6">
        <div className="gold-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl" />
        <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Checkpoint icon={GraduationCap} value={profile.college} label="Dream college" />
          <Checkpoint icon={Flag} value={profile.target_rank} label="Target rank" />
          <Checkpoint icon={Flag} value={`${mainsDays}d`} label="to JEE Main" />
          <Checkpoint icon={Flag} value={`${advDays}d`} label="to Advanced" />
        </div>
      </div>

      <div className="space-y-4">
        {PHASES.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-border bg-card/40 p-5"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${
                    p.tone === "gold" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                {i < PHASES.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-border" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-base font-semibold text-foreground">{p.title}</h2>
                  <Pill tone={p.tone}>{p.window}</Pill>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.focus}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Update your exam dates in Settings to keep this roadmap accurate.
      </p>
    </>
  );
}

function Checkpoint({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Flag;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto size-5 text-primary-foreground/70" />
      <div className="mt-1 font-display text-lg font-bold text-primary-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-primary-foreground/50">{label}</div>
    </div>
  );
}
