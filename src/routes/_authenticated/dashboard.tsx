import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookMarked,
  CalendarClock,
  CalendarDays,
  Flame,
  ListTodo,
  Target,
  Timer as TimerIcon,
  TrendingUp,
} from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import {
  daysTo,
  fmt,
  lastNDays,
  minsForDate,
  monthMinutes,
  streak,
  today,
  weekMinutes,
  weekStart,
} from "@/lib/jee-utils";
import { Bar, Empty, PageHeader, Pill, Stat } from "@/components/jee/ui";
import { ScoldBanner } from "@/components/jee/scold-banner";
import { OWNER_NAME, quoteOfTheDay } from "@/lib/quotes";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard · JEE Command Center" },
      { name: "description", content: "Your study mission control overview." },
    ],
  }),
});

function DashboardPage() {
  const { data } = useJee();
  const { profile, sessions, tasks, goals } = data;

  const tdy = today();
  const todayMins = minsForDate(sessions, tdy);
  const weekMins = weekMinutes(sessions);
  const monthMins = monthMinutes(sessions);
  const sk = streak(sessions);
  const dailyTarget = profile.daily_target * 60;
  const weeklyTarget = profile.weekly_target * 60;

  const todayTasks = tasks.filter((x) => x.task_date === tdy);
  const doneTasks = todayTasks.filter((x) => x.done).length;
  const activeGoals = goals.filter((g) => !g.done);

  const series = lastNDays(sessions, 14);
  const maxDay = Math.max(60, ...series.map((d) => d.minutes));
  const mainsDays = daysTo(profile.mains_date);
  const advDays = daysTo(profile.advanced_date);
  const dailyQuote = quoteOfTheDay();

  return (
    <>
      <PageHeader
        title={`Welcome, ${profile.name || OWNER_NAME}`}
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      >
        <Link to="/timer">
          <Button>
            <TimerIcon className="mr-1.5 size-4" /> Start session
          </Button>
        </Link>
      </PageHeader>

      {/* Accountability nudge — only renders when yesterday's tasks were left unfinished */}
      <ScoldBanner />

      {/* Daily motivation */}
      <Link
        to="/coach"
        className="mb-6 block rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 to-accent/10 p-4 transition-colors hover:border-primary/50"
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          Coach · Quote of the day
        </div>
        <p className="mt-1.5 text-sm font-medium text-foreground">"{dailyQuote.text}"</p>
        <p className="mt-1 text-xs text-muted-foreground">— {dailyQuote.author}</p>
      </Link>

      {/* Mission countdown */}
      <div className="mission-gradient relative mb-6 overflow-hidden rounded-2xl p-6">
        <div className="gold-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
              Mission countdown
            </div>
            <div className="mt-1 font-display text-3xl font-bold text-foreground">
              JEE Main in {mainsDays} days
            </div>
            <div className="text-sm text-foreground/60">
              JEE Advanced in {advDays} days · Target {profile.target_rank}, {profile.college}
            </div>
          </div>
          <div className="flex gap-6">
            <Countdown n={mainsDays} label="to Mains" />
            <Countdown n={advDays} label="to Advanced" />
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={fmt(todayMins)} label="Today" accent="gold" />
        <Stat value={fmt(weekMins)} label="This week" accent="teal" />
        <Stat value={sk} label="Day streak" accent="gold" />
        <Stat value={`${doneTasks}/${todayTasks.length}`} label="Tasks today" accent="teal" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today progress */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-foreground">Today's progress</h2>
            <Pill tone={todayMins >= dailyTarget ? "gold" : "default"}>
              {todayMins >= dailyTarget ? "Target hit" : `${Math.round((todayMins / dailyTarget) * 100)}%`}
            </Pill>
          </div>
          <div className="mb-2 flex items-end justify-between">
            <span className="font-display text-2xl font-bold text-foreground">{fmt(todayMins)}</span>
            <span className="text-xs text-muted-foreground">/ {fmt(dailyTarget)}</span>
          </div>
          <Bar value={todayMins} max={dailyTarget} />
          <div className="mt-4 flex items-end justify-between">
            <span className="text-xs text-muted-foreground">Week: {fmt(weekMins)}</span>
            <span className="text-xs text-muted-foreground">/ {fmt(weeklyTarget)}</span>
          </div>
          <div className="mt-1.5">
            <Bar value={weekMins} max={weeklyTarget} />
          </div>
        </div>

        {/* 14-day chart */}
        <div className="rounded-2xl border border-border bg-card/40 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-accent" />
            <h2 className="font-display text-sm font-semibold text-foreground">Last 14 days</h2>
          </div>
          <div className="flex h-32 items-end gap-1.5">
            {series.map((d) => {
              const h = Math.max(2, Math.round((d.minutes / maxDay) * 100));
              const isToday = d.date === tdy;
              return (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      isToday
                        ? "bg-gradient-to-t from-primary to-primary"
                        : "bg-gradient-to-t from-accent/40 to-accent/70"
                    }`}
                    style={{ height: `${h}%` }}
                    title={`${d.date}: ${fmt(d.minutes)}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>{new Date(series[0]?.date ?? today()).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Today tasks */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <ListTodo className="size-4 text-accent" /> Today's tasks
            </h2>
            <Link to="/tasks">
              <Button variant="ghost" size="sm">All</Button>
            </Link>
          </div>
          {todayTasks.length === 0 ? (
            <Empty text="No tasks scheduled for today." />
          ) : (
            <ul className="space-y-2">
              {todayTasks.slice(0, 5).map((task) => (
                <li key={task.id} className="flex items-center gap-3 text-sm">
                  <span
                    className={`size-2 rounded-full ${task.done ? "bg-accent" : "bg-muted-foreground/40"}`}
                  />
                  <span className={task.done ? "text-muted-foreground line-through" : "text-foreground"}>
                    {task.name}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">{task.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Active goals */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <Target className="size-4 text-primary" /> Active goals
            </h2>
            <Link to="/goals">
              <Button variant="ghost" size="sm">All</Button>
            </Link>
          </div>
          {activeGoals.length === 0 ? (
            <Empty text="No active goals. Set one!" />
          ) : (
            <ul className="space-y-2">
              {activeGoals.slice(0, 5).map((g) => (
                <li key={g.id} className="flex items-center gap-3 text-sm">
                  <Target className="size-3.5 text-primary" />
                  <span className="text-foreground">{g.name}</span>
                  <Pill tone={g.kind === "weekly" ? "teal" : "gold"}>{g.kind}</Pill>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <MiniLink to="/syllabus" icon={BookMarked} label="Syllabus" />
        <MiniLink to="/timetable" icon={CalendarClock} label="Timetable" />
        <MiniLink to="/analytics" icon={TrendingUp} label="Analytics" />
        <MiniLink to="/calendar" icon={CalendarDays} label="Calendar" />
        <MiniLink to="/tests" icon={Flame} label="Mock tests" />
        <MiniLink to="/roadmap" icon={Target} label="Roadmap" />
      </div>
    </>
  );
}

function Countdown({ n, label }: { n: number; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold tabular-nums text-foreground">{n}</div>
      <div className="text-[10px] uppercase tracking-wider text-foreground/60">days {label}</div>
    </div>
  );
}

function MiniLink({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof TimerIcon;
  label: string;
}) {
  return (
    <Link
      to={to as "/dashboard"}
      className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
    >
      <Icon className="size-4 text-accent" />
      {label}
    </Link>
  );
}

