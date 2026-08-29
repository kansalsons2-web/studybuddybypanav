import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { QuestionTag } from "./test-tags";

export const getTestTags = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("test_question_tags")
      .select("*")
      .order("question_number", { ascending: true });
    return (data as QuestionTag[] | null) ?? [];
  });

export const addTestTag = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        test_id: z.string(),
        question_number: z.number(),
        subject: z.string(),
        tag: z.string(),
        note: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("test_question_tags")
      .insert({ user_id: context.userId, ...data });
    return { ok: true };
  });

export const deleteTestTag = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("test_question_tags")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });
