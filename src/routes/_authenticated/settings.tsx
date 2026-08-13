import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";

import { useJee } from "@/lib/jee-hooks";
import { DEFAULT_PROFILE, type Profile } from "@/lib/jee-types";
import { PageHeader } from "@/components/jee/ui";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings · JEE Command Center" },
      { name: "description", content: "Manage your profile, targets, and exam dates." },
    ],
  }),
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function SettingsPage() {
  const jee = useJee();
  const { profile } = jee.data;
  const [form, setForm] = useState<Profile>({ ...DEFAULT_PROFILE, ...profile });
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save() {
    setBusy(true);
    const { id, created_at, updated_at, ...rest } = form;
    void id;
    void created_at;
    void updated_at;
    await jee.saveProfile(rest);
    setSaved(true);
    setBusy(false);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <PageHeader title="Settings" subtitle="Profile, targets, and exam dates.">
        <Button onClick={save} disabled={busy}>
          <Save className="mr-1.5 size-4" /> {busy ? "Saving…" : "Save"}
        </Button>
      </PageHeader>

      {saved && (
        <div className="mb-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent">
          Profile saved.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Profile">
          <div className="space-y-4">
            <Field label="Name">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className={fieldClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Target rank">
                <input
                  value={form.target_rank}
                  onChange={(e) => set("target_rank", e.target.value)}
                  placeholder="AIR 1"
                  className={fieldClass}
                />
              </Field>
              <Field label="Dream college">
                <input
                  value={form.college}
                  onChange={(e) => set("college", e.target.value)}
                  placeholder="IIT Delhi"
                  className={fieldClass}
                />
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Study targets (hours)">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Daily (hrs)">
              <input
                type="number"
                min={1}
                value={form.daily_target}
                onChange={(e) => set("daily_target", Number(e.target.value))}
                className={fieldClass}
              />
            </Field>
            <Field label="Weekly (hrs)">
              <input
                type="number"
                min={1}
                value={form.weekly_target}
                onChange={(e) => set("weekly_target", Number(e.target.value))}
                className={fieldClass}
              />
            </Field>
            <Field label="Monthly (hrs)">
              <input
                type="number"
                min={1}
                value={form.monthly_target}
                onChange={(e) => set("monthly_target", Number(e.target.value))}
                className={fieldClass}
              />
            </Field>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Used for progress rings on the dashboard and analytics.
          </p>
        </Section>

        <Section title="Exam dates">
          <div className="grid grid-cols-2 gap-3">
            <Field label="JEE Main">
              <input
                type="date"
                value={form.mains_date}
                onChange={(e) => set("mains_date", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="JEE Advanced">
              <input
                type="date"
                value={form.advanced_date}
                onChange={(e) => set("advanced_date", e.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Drives the mission countdown and roadmap phases.
          </p>
        </Section>

        <Section title="About">
          <p className="text-sm text-muted-foreground">
            JEE Command Center keeps your study data private to your account with row-level
            security. Sign out from the sidebar when you're done.
          </p>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <h2 className="mb-4 font-display text-sm font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
