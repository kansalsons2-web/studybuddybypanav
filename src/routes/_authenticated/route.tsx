import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
  useMatch,
} from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Map,
  type LucideIcon,
  Settings,
  Target,
  Timer,
} from "lucide-react";
import { useState } from "react";

import { jeeQueryOptions } from "@/lib/jee-hooks";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(jeeQueryOptions),
  component: AuthenticatedShell,
});

type NavItem = { to: string; label: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/timer", label: "Study Timer", icon: Timer },
  { to: "/tasks", label: "Tasks", icon: ListTodo },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/tests", label: "Tests", icon: ClipboardCheck },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/settings", label: "Settings", icon: Settings },
];

const MOBILE_NAV: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/timer", label: "Timer", icon: Timer },
  { to: "/tasks", label: "Tasks", icon: ListTodo },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/analytics", label: "Stats", icon: BarChart3 },
];

function useIsActive(to: string) {
  const match = useMatch({ to: to as "/dashboard", strict: false });
  return !!match;
}

function AuthenticatedShell() {
  const { user } = Route.useRouteContext();
  const router = useRouter();
  const qc = useQueryClient();

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl lg:flex">
        <div className="flex flex-col gap-1 p-5">
          <div className="font-display text-lg font-bold leading-tight text-sidebar-foreground">
            JEE COMMAND
            <br />
            CENTER
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            AIR 1 · IIT Delhi
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => (
            <NavLink key={item.to} item={item} />
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 truncate px-2 text-xs text-muted-foreground">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link to="/dashboard" className="font-display text-base font-bold text-foreground">
          JEE Command
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/10 hover:text-foreground"
        >
          <LogOut className="size-4" /> Log out
        </button>
      </header>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-[1400px] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-sidebar/95 px-2 py-1.5 backdrop-blur-xl lg:hidden">
        {MOBILE_NAV.map((item) => (
          <MobileNavLink key={item.to} item={item} />
        ))}
      </nav>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const active = useIsActive(item.to);
  const Icon = item.icon;
  return (
    <Link
      to={item.to as "/dashboard"}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
      }`}
    >
      <Icon className={`size-[18px] ${active ? "text-accent" : ""}`} strokeWidth={active ? 2.4 : 2} />
      {item.label}
    </Link>
  );
}

function MobileNavLink({ item }: { item: NavItem }) {
  const active = useIsActive(item.to);
  const Icon = item.icon;
  return (
    <Link
      to={item.to as "/dashboard"}
      className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors ${
        active ? "text-accent" : "text-muted-foreground"
      }`}
    >
      <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
      {item.label}
    </Link>
  );
}
