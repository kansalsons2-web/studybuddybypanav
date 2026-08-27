import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getSyllabusState, savePreferences, setChapterProgress } from "./syllabus.functions";
import type {
  ChapterProgress,
  ChapterProgressInput,
  PreferencesInput,
  SyllabusState,
} from "./syllabus-types";
import { CHAPTERS, CHECK_FIELDS } from "./syllabus-data";

export const syllabusQueryOptions = queryOptions({
  queryKey: ["syllabus"],
  queryFn: () => getSyllabusState(),
});

export function useSyllabus() {
  const { data } = useSuspenseQuery(syllabusQueryOptions);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["syllabus"] });

  const progressM = useMutation({
    mutationFn: (v: ChapterProgressInput) => setChapterProgress({ data: v }),
  });
  const prefsM = useMutation({ mutationFn: (v: PreferencesInput) => savePreferences({ data: v }) });

  const state = data as SyllabusState;
  const byChapter = new Map(state.progress.map((p) => [p.chapter_key, p]));

  return {
    ...state,
    byChapter,
    setChapterProgress: async (v: ChapterProgressInput) => {
      await progressM.mutateAsync(v);
      await invalidate();
    },
    savePreferences: async (v: PreferencesInput) => {
      await prefsM.mutateAsync(v);
      await invalidate();
    },
  };
}

/** Fraction 0-1 of the 5 checkboxes done for one chapter. */
export function chapterCompletion(row: ChapterProgress | undefined) {
  if (!row) return 0;
  const done = CHECK_FIELDS.filter((f) => row[f.key]).length;
  return done / CHECK_FIELDS.length;
}

export function completionFor(keys: string[], byChapter: Map<string, ChapterProgress>) {
  if (keys.length === 0) return 0;
  return keys.reduce((a, k) => a + chapterCompletion(byChapter.get(k)), 0) / keys.length;
}

export function subjectCompletion(byChapter: Map<string, ChapterProgress>) {
  const subjects = [...new Set(CHAPTERS.map((c) => c.subject))];
  return subjects.map((subject) => {
    const keys = CHAPTERS.filter((c) => c.subject === subject).map((c) => c.key);
    return {
      subject,
      pct: Math.round(completionFor(keys, byChapter) * 100),
      total: keys.length,
    };
  });
}
