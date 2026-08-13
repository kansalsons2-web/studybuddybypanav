import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BarChart3, CalendarDays, Flame, ListTodo, Target, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "JEE Command Center · Track your way to an IIT" },
      {
        name: "description",
        content:
          "A focused study command center for JEE aspirants — timer, tasks, goals, analytics, and a roadmap to AIR 1.",
      },
      { property: "og:title", content: "JEE Command Center" },
      {
        property: "og:description",
        content:
          "A focused study command center for JEE aspirants — timer, tasks, goals, analytics, and a roadmap to AIR 1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function LandingPage() {
  const navigate = useNavigate();
  // Signed-in visitors skip the pitch.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mission-gradient absolute inset-0" />
      <div className="gold-glow pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/20 opacity-30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6">
        <header className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-primary-foreground">
            JEE Command Center
          </span>
          <Link to="/auth">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              Sign in
            </Button>
          </Link>
        </header>

        <main className="flex flex-1 flex-col justify-center py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs font-medium text-primary-foreground/80">
              <Flame className="size-3.5 text-primary" /> Built for serious JEE aspirants
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-primary-foreground sm:text-6xl">
              Engineer your rank.
              <br />
              <span className="text-primary">One focused day</span> at a time.
            </h1>
            <p className="mt-5 max-w-lg text-base text-primary-foreground/70 sm:text-lg">
              A mission control for your JEE prep — track every study session, hit daily targets,
              build streaks, and watch your progress add up to an IIT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg" className="h-12 px-6 text-base">
                  Start tracking — free
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-primary-foreground/20 bg-primary-foreground/5 px-6 text-base text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Feat icon={Timer} label="Study timer" />
            <Feat icon={ListTodo} label="Daily tasks" />
            <Feat icon={Target} label="Goals" />
            <Feat icon={BarChart3} label="Analytics" />
            <Feat icon={CalendarDays} label="Calendar" />
            <Feat icon={Flame} label="Streaks" />
          </div>
        </main>

        <footer className="py-6 text-xs text-primary-foreground/40">
          Your data stays yours. Secured with row-level isolation.
        </footer>
      </div>
    </div>
  );
}

function Feat({ icon: Icon, label }: { icon: typeof Timer; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-4 text-center">
      <Icon className="size-5 text-primary-foreground/80" />
      <span className="text-[11px] font-medium text-primary-foreground/70">{label}</span>
    </div>
  );
}
