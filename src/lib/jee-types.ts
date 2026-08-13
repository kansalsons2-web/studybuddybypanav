// Client-safe types, defaults, and option lists for JEE Command Center.
// No server-only imports live here so it can be imported from anywhere.

export type Profile = {
  id: string;
  name: string;
  daily_target: number;
  weekly_target: number;
  monthly_target: number;
  target_rank: string;
  college: string;
  mains_date: string;
  advanced_date: string;
  created_at?: string;
  updated_at?: string;
};

export type StudySession = {
  id: string;
  user_id: string;
  study_date: string;
  duration_minutes: number;
  subject: string;
  topic: string;
  study_type: string;
  created_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  task_date: string;
  name: string;
  subject: string;
  priority: string;
  estimate_minutes: number;
  done: boolean;
  created_at: string;
};

export type Goal = {
  id: string;
  user_id: string;
  kind: string;
  name: string;
  subject: string;
  done: boolean;
  created_at: string;
};

export type Test = {
  id: string;
  user_id: string;
  test_date: string;
  name: string;
  test_type: string;
  score: number;
  max_marks: number;
  physics: number;
  chemistry: number;
  mathematics: number;
  created_at: string;
};

export type JeeData = {
  profile: Profile;
  sessions: StudySession[];
  tasks: Task[];
  goals: Goal[];
  tests: Test[];
};

export const DEFAULT_PROFILE: Profile = {
  id: "",
  name: "",
  daily_target: 8,
  weekly_target: 50,
  monthly_target: 200,
  target_rank: "AIR 1",
  college: "IIT Delhi",
  mains_date: "2028-01-20",
  advanced_date: "2028-05-20",
};

export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Other"] as const;
export const GOAL_SUBJECTS = ["Physics", "Chemistry", "Mathematics", "General"] as const;
export const STUDY_TYPES = [
  "Lecture",
  "Theory",
  "Problem Practice",
  "Revision",
  "Mock Test",
  "Analysis",
] as const;
export const PRIORITIES = ["High", "Normal", "Low"] as const;
export const GOAL_KINDS = ["weekly", "monthly"] as const;
export const TEST_TYPES = ["JEE Main", "JEE Advanced"] as const;

export type ProfileInput = Omit<Profile, "id" | "created_at" | "updated_at">;
export type SessionInput = {
  study_date: string;
  duration_minutes: number;
  subject: string;
  topic: string;
  study_type: string;
};
export type TaskInput = {
  task_date: string;
  name: string;
  subject: string;
  priority: string;
  estimate_minutes: number;
};
export type GoalInput = { kind: string; name: string; subject: string };
export type TestInput = {
  test_date: string;
  name: string;
  test_type: string;
  score: number;
  max_marks: number;
  physics: number;
  chemistry: number;
  mathematics: number;
};
