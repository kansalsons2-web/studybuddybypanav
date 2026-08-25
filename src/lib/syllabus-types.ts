// Client-safe types for the syllabus + preferences layer.

export type TopicProgress = {
  id: string;
  user_id: string;
  topic_key: string;
  subject: string;
  chapter_key: string;
  status: string;
  theory_done: boolean;
  attempts: number;
  correct: number;
  minutes_spent: number;
  revision_count: number;
  last_studied: string | null;
  last_revised: string | null;
  created_at?: string;
  updated_at?: string;
};

export type UserPreferences = {
  user_id: string;
  exam_focus: string;
  target_percentile: number;
  target_branch: string;
  prep_level: string;
  daily_hours: number;
  strongest_subject: string;
  weakest_subject: string;
  onboarding_complete: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SyllabusState = {
  progress: TopicProgress[];
  preferences: UserPreferences;
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  user_id: "",
  exam_focus: "Both",
  target_percentile: 99.5,
  target_branch: "Computer Science",
  prep_level: "Beginner",
  daily_hours: 6,
  strongest_subject: "Physics",
  weakest_subject: "Mathematics",
  onboarding_complete: false,
};

export const EXAM_FOCUS = ["JEE Main", "JEE Advanced", "Both"] as const;
export const PREP_LEVELS = ["Beginner", "Intermediate", "Advanced", "Revision phase"] as const;
export const BRANCHES = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Electronics",
  "Chemical Engineering",
  "Civil Engineering",
  "Aerospace",
  "Undecided",
] as const;

export type PreferencesInput = Omit<UserPreferences, "user_id" | "created_at" | "updated_at">;
export type TopicProgressInput = {
  topic_key: string;
  subject: string;
  chapter_key: string;
  status?: string;
  theory_done?: boolean;
  add_minutes?: number;
  mark_revised?: boolean;
};
