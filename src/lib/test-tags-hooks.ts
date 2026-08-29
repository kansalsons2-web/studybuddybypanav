import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { addTestTag, deleteTestTag, getTestTags } from "./test-tags.functions";
import type { QuestionTag, QuestionTagInput } from "./test-tags";

export const testTagsQueryOptions = queryOptions({
  queryKey: ["test-tags"],
  queryFn: () => getTestTags(),
});

export function useTestTags() {
  const { data } = useSuspenseQuery(testTagsQueryOptions);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["test-tags"] });

  const addM = useMutation({ mutationFn: (v: QuestionTagInput) => addTestTag({ data: v }) });
  const delM = useMutation({ mutationFn: (id: string) => deleteTestTag({ data: { id } }) });

  return {
    tags: (data as QuestionTag[]) ?? [],
    addTag: async (v: QuestionTagInput) => {
      await addM.mutateAsync(v);
      await invalidate();
    },
    deleteTag: async (id: string) => {
      await delM.mutateAsync(id);
      await invalidate();
    },
  };
}
