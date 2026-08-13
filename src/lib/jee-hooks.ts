import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addGoal,
  addSession,
  addTask,
  addTest,
  deleteGoal,
  deleteSession,
  deleteTask,
  deleteTest,
  getJeeData,
  saveProfile,
  toggleGoal,
  toggleTask,
} from "./jee.functions";
import type {
  GoalInput,
  JeeData,
  ProfileInput,
  SessionInput,
  TaskInput,
  TestInput,
} from "./jee-types";

export const jeeQueryOptions = queryOptions({
  queryKey: ["jee"],
  queryFn: () => getJeeData(),
});

export function useJeeData() {
  return useSuspenseQuery(jeeQueryOptions);
}

/**
 * Single hook pages use. Suspense-loads the full dataset (ensured by the
 * _authenticated layout loader) and exposes typed mutation helpers that
 * invalidate the cache on success.
 */
export function useJee() {
  const { data } = useSuspenseQuery(jeeQueryOptions);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["jee"] });

  const profile = useMutation({ mutationFn: (v: ProfileInput) => saveProfile({ data: v }) });
  const session = useMutation({ mutationFn: (v: SessionInput) => addSession({ data: v }) });
  const removeSession = useMutation({ mutationFn: (id: string) => deleteSession({ data: { id } }) });
  const task = useMutation({ mutationFn: (v: TaskInput) => addTask({ data: v }) });
  const toggleT = useMutation({
    mutationFn: (v: { id: string; done: boolean }) => toggleTask({ data: v }),
  });
  const removeTask = useMutation({ mutationFn: (id: string) => deleteTask({ data: { id } }) });
  const goal = useMutation({ mutationFn: (v: GoalInput) => addGoal({ data: v }) });
  const toggleG = useMutation({
    mutationFn: (v: { id: string; done: boolean }) => toggleGoal({ data: v }),
  });
  const removeGoal = useMutation({ mutationFn: (id: string) => deleteGoal({ data: { id } }) });
  const test = useMutation({ mutationFn: (v: TestInput) => addTest({ data: v }) });
  const removeTest = useMutation({ mutationFn: (id: string) => deleteTest({ data: { id } }) });

  const run = <T,>(m: { mutateAsync: (v: T) => Promise<unknown> }) => async (v: T) => {
    await m.mutateAsync(v);
    await invalidate();
  };

  return {
    data: data as JeeData,
    saveProfile: run(profile),
    addSession: run(session),
    deleteSession: run(removeSession),
    addTask: run(task),
    toggleTask: (id: string, done: boolean) => toggleT.mutateAsync({ id, done }).then(invalidate),
    deleteTask: run(removeTask),
    addGoal: run(goal),
    toggleGoal: (id: string, done: boolean) => toggleG.mutateAsync({ id, done }).then(invalidate),
    deleteGoal: run(removeGoal),
    addTest: run(test),
    deleteTest: run(removeTest),
  };
}
