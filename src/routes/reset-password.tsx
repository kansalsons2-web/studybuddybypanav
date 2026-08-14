import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password · JEE Command Center" },
      {
        name: "description",
        content: "Set a new password for your JEE Command Center account.",
      },
      { property: "og:title", content: "Reset password · JEE Command Center" },
      {
        property: "og:description",
        content: "Set a new password for your JEE Command Center account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMsg({ kind: "err", text: error.message });
    } else {
      setMsg({ kind: "ok", text: "Password updated. Redirecting…" });
      setTimeout(() => navigate({ to: "/dashboard", replace: true }), 900);
    }
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-foreground">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Open this page from the reset link in your email.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="new-password" className="text-xs font-medium text-muted-foreground">
              New password
            </label>
            <input
              id="new-password"
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
            <p className={`text-xs ${msg.kind === "err" ? "text-destructive" : "text-accent"}`}>
              {msg.text}
            </p>
          )}
          <Button type="submit" disabled={busy} className="h-11 w-full">
            {busy ? "Please wait…" : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
