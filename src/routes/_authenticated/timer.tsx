import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Plus, Square } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { STUDY_TYPES, SUBJECTS } from "@/lib/jee-types";
import { fmt, today } from "@/lib/jee-utils";
import { PageHeader, Stat } from "@/components/jee/ui";
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

export const Route = createFileRoute("/_authenticated/timer")({
  component: TimerPage,
  head: () => ({
    meta: [
      { title: "Study Timer · JEE Command Center" },
      { name: "description", content: "Run a focused study session and log it automatically." },
    ],
  }),
});

const STORAGE_KEY = "jee.timer.v1";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function TimerPage() {
  const jee = useJee();
  const { sessions } = jee.data;

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState("Physics");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Lecture");
  const [manualOpen, setManualOpen] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  // { base: accumulated seconds, startedAt: epoch ms | null }
  const state = useRef<{ base: number; startedAt: number | null }>({ base: 0, startedAt: null });

  const compute = () => {
    const { base, startedAt } = state.current;
    return base + (startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0);
  };

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state.current, subject, topic, type }));
    } catch {
      /* ignore */
    }
  };

  // Restore any timer that was running before reload / backgrounding.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        base?: number;
        startedAt?: number | null;
        subject?: string;
        topic?: string;
        type?: string;
      };
      state.current = { base: saved.base ?? 0, startedAt: saved.startedAt ?? null };
      if (saved.subject) setSubject(saved.subject);
      if (saved.topic) setTopic(saved.topic);
      if (saved.type) setType(saved.type);
      setSeconds(compute());
      setRunning(Boolean(saved.startedAt));
    } catch {
      /* ignore */
    }
  }, []);

  // Tick from wall-clock time so throttled/background tabs stay accurate.
  useEffect(() => {
    if (!running) return;
    const tick = () => setSeconds(compute());
    tick();
    ref.current = setInterval(tick, 1000);
    const onVisible = () => tick();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      if (ref.current) clearInterval(ref.current);
      ref.current = null;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [running]);

  function start() {
    state.current = { base: state.current.base, startedAt: Date.now() };
    setRunning(true);
    persist();
  }

  function pause() {
    state.current = { base: compute(), startedAt: null };
    setSeconds(state.current.base);
    setRunning(false);
    persist();
  }

  function reset() {
    state.current = { base: 0, startedAt: null };
    setSeconds(0);
    setRunning(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  // Keep meta fields in sync with storage while a session is live.
  useEffect(() => {
    if (state.current.startedAt || state.current.base > 0) persist();
     
  }, [subject, topic, type]);

  const mins = Math.round(seconds / 60);
  const tdy = today();
  const todayMins = sessions
    .filter((s) => s.study_date === tdy)
    .reduce((a, s) => a + s.duration_minutes, 0);

  async function stop() {
    const total = Math.round(compute() / 60);
    setRunning(false);
    state.current = { base: compute(), startedAt: null };
    if (total >= 1) {
      await jee.addSession({
        study_date: tdy,
        duration_minutes: total,
        subject,
        topic: topic.trim() || "General",
        study_type: type,
      });
      reset();
    } else {
      persist();
    }
  }

  // manual entry
  const [mDate, setMDate] = useState(tdy);
  const [mMins, setMMins] = useState(60);
  const [mSubject, setMSubject] = useState("Physics");
  const [mTopic, setMTopic] = useState("");
  const [mType, setMType] = useState("Lecture");

  async function saveManual() {
    if (mMins <= 0) return;
    await jee.addSession({
      study_date: mDate,
      duration_minutes: mMins,
      subject: mSubject,
      topic: mTopic.trim() || "General",
      study_type: mType,
    });
    setManualOpen(false);
  }

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const clock = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <>
      <PageHeader title="Study Timer" subtitle="Run a focused session and log it automatically.">
        <Button variant="outline" onClick={() => setManualOpen(true)}>
          <Plus className="mr-1.5 size-4" /> Log manually
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timer dial */}
        <div className="lg:col-span-2">
          <div className="mission-gradient relative overflow-hidden rounded-2xl p-8 text-center">
            <div className="gold-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl" />
            <div className="relative">
              <div className="font-display text-6xl font-bold tabular-nums text-foreground sm:text-7xl">
                {clock}
              </div>
              <div className="mt-2 text-sm text-foreground/60">
                {running ? "Recording…" : "Ready"}
              </div>
              <div className="mt-6 flex justify-center gap-3">
                {!running ? (
                  <Button size="lg" onClick={start} className="h-12 px-6">
                    <Play className="mr-1.5 size-4" /> Start
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" onClick={pause} className="h-12 px-6">
                    <Pause className="mr-1.5 size-4" /> Pause
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={stop}
                  disabled={seconds < 60}
                  className="h-12 px-6"
                >
                  <Square className="mr-1.5 size-4" /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Session meta */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="mb-4 font-display text-sm font-semibold text-foreground">Session details</h2>
          <div className="space-y-4">
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
              <label className="text-xs font-medium text-muted-foreground">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Rotational Motion"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Study type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STUDY_TYPES.map((x) => (
                    <SelectItem key={x} value={x}>
                      {x}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat value={fmt(todayMins)} label="Logged today" accent="gold" />
        <Stat value={mins} label="Current session (min)" accent="teal" />
        <Stat
          value={sessions.filter((x) => x.study_date === tdy).length}
          label="Sessions today"
        />
      </div>

      {/* Manual dialog */}
      <Dialog open={manualOpen} onOpenChange={setManualOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log a past session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Date</label>
                <input
                  type="date"
                  value={mDate}
                  onChange={(e) => setMDate(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Minutes</label>
                <input
                  type="number"
                  min={1}
                  value={mMins}
                  onChange={(e) => setMMins(Number(e.target.value))}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Select value={mSubject} onValueChange={setMSubject}>
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
              <label className="text-xs font-medium text-muted-foreground">Topic</label>
              <input
                value={mTopic}
                onChange={(e) => setMTopic(e.target.value)}
                placeholder="Topic"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Study type</label>
              <Select value={mType} onValueChange={setMType}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STUDY_TYPES.map((x) => (
                    <SelectItem key={x} value={x}>
                      {x}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManualOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveManual}>Save session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
