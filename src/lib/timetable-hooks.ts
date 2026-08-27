import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { addSlot, deleteSlot, getTimetableState, setSlotCompletion } from "./timetable.functions";
import type { SlotInput, TimetableState } from "./timetable-types";

export const timetableQueryOptions = queryOptions({
  queryKey: ["timetable"],
  queryFn: () => getTimetableState(),
});

export function completionKey(slotId: string, date: string) {
  return `${slotId}__${date}`;
}

export function useTimetable() {
  const { data } = useSuspenseQuery(timetableQueryOptions);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["timetable"] });

  const addM = useMutation({ mutationFn: (v: SlotInput) => addSlot({ data: v }) });
  const delM = useMutation({ mutationFn: (id: string) => deleteSlot({ data: { id } }) });
  const compM = useMutation({
    mutationFn: (v: { slot_id: string; completion_date: string; done: boolean }) =>
      setSlotCompletion({ data: v }),
  });

  const state = data as TimetableState;
  const byCompletion = new Map(
    state.completions.map((c) => [completionKey(c.slot_id, c.completion_date), c]),
  );

  return {
    ...state,
    byCompletion,
    addSlot: async (v: SlotInput) => {
      await addM.mutateAsync(v);
      await invalidate();
    },
    deleteSlot: async (id: string) => {
      await delM.mutateAsync(id);
      await invalidate();
    },
    setSlotCompletion: async (slotId: string, date: string, done: boolean) => {
      await compM.mutateAsync({ slot_id: slotId, completion_date: date, done });
      await invalidate();
    },
  };
}

