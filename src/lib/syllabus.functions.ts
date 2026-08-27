import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ChapterProgress, SyllabusState, UserPreferences } from "./syllabus-types";
import { DEFAULT_PREFERENCES } from "./syllabus-types";

export const getSyllabusState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [p, pref] = await Promise.all([
      supabase.from("user_chapter_progress").select("*"),
      supabase.from("user_preferences").select("*").eq("user_id", userId).maybeSingle(),
    ]);
    const state: SyllabusState = {
      progress: (p.data as ChapterProgress[] | null) ?? [],
      preferences:
        (pref.data as UserPreferences | null) ?? { ...DEFAULT_PREFERENCES, user_id: userId },
    };
    return state;
  });

export const setChapterProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        chapter_key: z.string().min(1),
        subject: z.string(),
        class_level: z.string(),
        notes_done: z.boolean().optional(),
        lectures_done: z.boolean().optional(),
        dpp_done: z.boolean().optional(),
        module_done: z.boolean().optional(),
        revision_done: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("user_chapter_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("chapter_key", data.chapter_key)
      .maybeSingle();
    const prev = existing as ChapterProgress | null;

    const row = {
      user_id: userId,
      chapter_key: data.chapter_key,
      subject: data.subject,
      class_level: data.class_level,
      notes_done: data.notes_done ?? prev?.notes_done ?? false,
      lectures_done: data.lectures_done ?? prev?.lectures_done ?? false,
      dpp_done: data.dpp_done ?? prev?.dpp_done ?? false,
      module_done: data.module_done ?? prev?.module_done ?? false,
      revision_done: data.revision_done ?? prev?.revision_done ?? false,
      last_updated: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    };

    await supabase.from("user_chapter_progress").upsert(row, { onConflict: "user_id,chapter_key" });
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
