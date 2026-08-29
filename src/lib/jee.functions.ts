import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { DEFAULT_PROFILE, type JeeData, type Profile } from "./jee-types";

// Loads everything the command center needs in one round trip, scoped to the
// signed-in user by RLS.
export const getJeeData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [p, s, t, g, x] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("study_sessions").select("*").order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").order("created_at", { ascending: false }),
      supabase.from("goals").select("*").order("created_at", { ascending: false }),
      supabase.from("tests").select("*").order("created_at", { ascending: false }),
    ]);
    const data: JeeData = {
      profile: (p.data as Profile | null) ?? { ...DEFAULT_PROFILE, id: userId },
      sessions: (s.data as JeeData["sessions"]) ?? [],
      tasks: (t.data as JeeData["tasks"]) ?? [],
      goals: (g.data as JeeData["goals"]) ?? [],
      tests: (x.data as JeeData["tests"]) ?? [],
    };
    return data;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        name: z.string(),
        daily_target: z.number(),
        weekly_target: z.number(),
        monthly_target: z.number(),
        target_rank: z.string(),
        college: z.string(),
        mains_date: z.string(),
        advanced_date: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("profiles").upsert({
      id: context.userId,
      ...data,
      updated_at: new Date().toISOString(),
    });
    return { ok: true };
  });

export const addSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        study_date: z.string(),
        duration_minutes: z.number(),
        subject: z.string(),
        topic: z.string(),
        study_type: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("study_sessions")
      .insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const deleteSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("study_sessions")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const addTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        task_date: z.string(),
        name: z.string(),
        subject: z.string(),
        priority: z.string(),
        estimate_minutes: z.number(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("tasks").insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const toggleTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string(), done: z.boolean() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("tasks")
      .update({ done: data.done })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const deleteTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("tasks")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const addGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ kind: z.string(), name: z.string(), subject: z.string() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("goals").insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const toggleGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string(), done: z.boolean() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("goals")
      .update({ done: data.done })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const deleteGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("goals")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const addTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        test_date: z.string(),
        name: z.string(),
        test_type: z.string(),
        score: z.number(),
        max_marks: z.number(),
        physics: z.number(),
        chemistry: z.number(),
        mathematics: z.number(),
        percentile: z.number().nullable().optional(),
        estimated_rank: z.number().nullable().optional(),
        time_taken_minutes: z.number().nullable().optional(),
        physics_correct: z.number().optional(),
        physics_incorrect: z.number().optional(),
        physics_unanswered: z.number().optional(),
        chemistry_correct: z.number().optional(),
        chemistry_incorrect: z.number().optional(),
        chemistry_unanswered: z.number().optional(),
        mathematics_correct: z.number().optional(),
        mathematics_incorrect: z.number().optional(),
        mathematics_unanswered: z.number().optional(),
      })
      .parse(data),
  )

  .handler(async ({ data, context }) => {
    await context.supabase.from("tests").insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const deleteTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("tests")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });
