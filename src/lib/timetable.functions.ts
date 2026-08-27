import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { TimetableCompletion, TimetableSlot, TimetableState } from "./timetable-types";

export const getTimetableState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const [s, c] = await Promise.all([
      supabase
        .from("timetable_slots")
        .select("*")
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true }),
      // Completions are only ever queried for a handful of recent dates client
      // side, but capping the round trip keeps this cheap for long-running users.
      supabase
        .from("timetable_completions")
        .select("*")
        .order("completion_date", { ascending: false })
        .limit(500),
    ]);
    const state: TimetableState = {
      slots: (s.data as TimetableSlot[] | null) ?? [],
      completions: (c.data as TimetableCompletion[] | null) ?? [],
    };
    return state;
  });

export const addSlot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        day_of_week: z.number().min(0).max(6),
        start_time: z.string().min(1),
        end_time: z.string().min(1),
        subject: z.string(),
        label: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("timetable_slots").insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const deleteSlot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("timetable_slots")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const setSlotCompletion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        slot_id: z.string(),
        completion_date: z.string(),
        done: z.boolean(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase.from("timetable_completions").upsert(
      {
        user_id: context.userId,
        slot_id: data.slot_id,
        completion_date: data.completion_date,
        done: data.done,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slot_id,completion_date" },
    );
    return { ok: true };
  });

