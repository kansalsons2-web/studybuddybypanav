// Client-safe types for the chapter checklist + preferences layer.

export type ChapterProgress = {
  id: string;
  user_id: string;
  chapter_key: string;
  subject: string;
  class_level: string;
  notes_done: boolean;
  lectures_done: boolean;
  dpp_done: boolean;
  module_done: boolean;
  revision_done: boolean;
  last_updated: string | null;
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
  progress: ChapterProgress[];
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

export type ChapterProgressInput = {
  chapter_key: string;
  subject: string;
  class_level: string;
  notes_done?: boolean;
  lectures_done?: boolean;
  dpp_done?: boolean;
  module_done?: boolean;
  revision_done?: boolean;
};
