import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getSyllabusState, savePreferences, setTopicProgress } from "./syllabus.functions";
import type { PreferencesInput, SyllabusState, TopicProgressInput } from "./syllabus-types";
import { SYLLABUS, STATUS_WEIGHT } from "./syllabus-data";

export const syllabusQueryOptions = queryOptions({
  queryKey: ["syllabus"],
  queryFn: () => getSyllabusState(),
});

export function useSyllabus() {
  const { data } = useSuspenseQuery(syllabusQueryOptions);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["syllabus"] });

  const progressM = useMutation({
    mutationFn: (v: TopicProgressInput) => setTopicProgress({ data: v }),
  });
  const prefsM = useMutation({ mutationFn: (v: PreferencesInput) => savePreferences({ data: v }) });

  const state = data as SyllabusState;
  const byTopic = new Map(state.progress.map((p) => [p.topic_key, p]));

  return {
    ...state,
    byTopic,
    setTopicProgress: async (v: TopicProgressInput) => {
      await progressM.mutateAsync(v);
      await invalidate();
    },
    savePreferences: async (v: PreferencesInput) => {
      await prefsM.mutateAsync(v);
      await invalidate();
    },
  };
}

/** Completion 0-1 for a set of topic keys, from status weights. */
export function completionFor(keys: string[], byTopic: Map<string, { status: string }>) {
  if (keys.length === 0) return 0;
  const sum = keys.reduce((a, k) => a + (STATUS_WEIGHT[byTopic.get(k)?.status ?? ""] ?? 0), 0);
  return sum / keys.length;
}

export function subjectCompletion(byTopic: Map<string, { status: string }>) {
  return SYLLABUS.map((s) => {
    const keys = s.chapters.flatMap((c) => c.topics.map((t) => t.key));
    return { subject: s.name, pct: Math.round(completionFor(keys, byTopic) * 100), total: keys.length };
  });
}
