import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SyllabusState, TopicProgress, UserPreferences } from "./syllabus-types";
import { DEFAULT_PREFERENCES } from "./syllabus-types";

export const getSyllabusState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [p, pref] = await Promise.all([
      supabase.from("user_topic_progress").select("*"),
      supabase.from("user_preferences").select("*").eq("user_id", userId).maybeSingle(),
    ]);
    const state: SyllabusState = {
      progress: (p.data as TopicProgress[] | null) ?? [],
      preferences:
        (pref.data as UserPreferences | null) ?? { ...DEFAULT_PREFERENCES, user_id: userId },
    };
    return state;
  });

export const setTopicProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        topic_key: z.string().min(1),
        subject: z.string(),
        chapter_key: z.string(),
        status: z.string().optional(),
        theory_done: z.boolean().optional(),
        add_minutes: z.number().optional(),
        mark_revised: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("user_topic_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("topic_key", data.topic_key)
      .maybeSingle();

    const prev = existing as TopicProgress | null;
    const todayIso = new Date().toISOString().slice(0, 10);

    const row = {
      user_id: userId,
      topic_key: data.topic_key,
      subject: data.subject,
      chapter_key: data.chapter_key,
      status: data.status ?? prev?.status ?? "Not Started",
      theory_done: data.theory_done ?? prev?.theory_done ?? false,
      minutes_spent: (prev?.minutes_spent ?? 0) + (data.add_minutes ?? 0),
      revision_count: (prev?.revision_count ?? 0) + (data.mark_revised ? 1 : 0),
      last_studied: data.add_minutes ? todayIso : (prev?.last_studied ?? null),
      last_revised: data.mark_revised ? todayIso : (prev?.last_revised ?? null),
      updated_at: new Date().toISOString(),
    };

    await supabase.from("user_topic_progress").upsert(row, { onConflict: "user_id,topic_key" });
    return { ok: true };
  });

export const savePreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        exam_focus: z.string(),
        target_percentile: z.number(),
        target_branch: z.string(),
        prep_level: z.string(),
        daily_hours: z.number(),
        strongest_subject: z.string(),
        weakest_subject: z.string(),
        onboarding_complete: z.boolean(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("user_preferences").upsert(
      {
        user_id: context.userId,
        ...data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
    return { ok: true };
  });
