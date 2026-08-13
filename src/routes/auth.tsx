import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Flame, Target, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in · JEE Command Center" },
      {
        name: "description",
        content: "Sign in to your JEE Command Center study tracker.",
      },
      { property: "og:title", content: "Sign in · JEE Command Center" },
      {
        property: "og:description",
        content: "Sign in to your JEE Command Center study tracker.",
      },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  // Already signed in? Bounce to the dashboard.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ kind: "err", text: error.message });
      else navigate({ to: "/dashboard", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setMsg({ kind: "err", text: error.message });
      else if (data.session) navigate({ to: "/dashboard", replace: true });
      else setMsg({ kind: "ok", text: "Check your email to confirm your account, then sign in." });
    }
    setBusy(false);
  }

  async function handleMagic() {
    if (!email) return setMsg({ kind: "err", text: "Enter your email first." });
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setMsg(
      error
        ? { kind: "err", text: error.message }
        : { kind: "ok", text: "Magic link sent — check your email." },
    );
    setBusy(false);
  }

  async function handleGoogle() {
    const { lovable } = await import("@/integrations/lovable");
    await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="mission-gradient relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
        <div className="gold-glow pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full opacity-40 blur-3xl" />
        <Link to="/" className="font-display text-xl font-bold text-primary-foreground">
          JEE Command Center
        </Link>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight text-primary-foreground">
            Engineer your rank,
            <br />
            one focused day at a time.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Track every study session, hit daily targets, and visualize your march toward an IIT.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Feature icon={Timer} title="Study timer" />
            <Feature icon={Target} title="Goal tracking" />
            <Feature icon={Flame} title="Daily streaks" />
            <Feature icon={BookOpen} title="Subject analytics" />
          </div>
        </div>
        <p className="text-xs text-primary-foreground/50">Built for serious JEE aspirants.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to resume your mission."
              : "Start tracking your JEE prep today."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {msg && (
              <p
                className={`text-xs ${
                  msg.kind === "err" ? "text-destructive" : "text-accent"
                }`}
              >
                {msg.text}
              </p>
            )}

            <Button type="submit" disabled={busy} className="h-11 w-full">
              {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2.5">
            <button
              onClick={handleGoogle}
              disabled={busy}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              <GoogleIcon /> Continue with Google
            </button>
            <button
              onClick={handleMagic}
              disabled={busy}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Send magic link
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMsg(null);
              }}
              className="font-medium text-accent hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title }: { icon: typeof Timer; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2">
      <Icon className="size-4 text-primary-foreground/80" />
      <span className="text-xs font-medium text-primary-foreground/80">{title}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.16a6.6 6.6 0 0 1 0-4.32V7H2.18a11 11 0 0 0 0 9.84l3.66-2.68z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.5 14.97.5 12 .5A11 11 0 0 0 2.18 7l3.66 2.84C6.71 7.32 9.14 5.39 12 5.39z"
      />
    </svg>
  );
}

// Prevent the route generator from registering this as `/auth` twice if it
// ever reorders — keep a stable default export guard.
export const _routeGuard = redirect;
