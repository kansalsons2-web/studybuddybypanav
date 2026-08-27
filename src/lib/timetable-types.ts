// Client-safe types for the weekly timetable layer.

export type TimetableSlot = {
  id: string;
  user_id: string;
  day_of_week: number; // 0 = Sunday .. 6 = Saturday
  start_time: string; // "HH:MM" or "HH:MM:SS"
  end_time: string;
  subject: string;
  label: string;
  created_at: string;
};

export type TimetableCompletion = {
  id: string;
  user_id: string;
  slot_id: string;
  completion_date: string;
  done: boolean;
};

export type TimetableState = {
  slots: TimetableSlot[];
  completions: TimetableCompletion[];
};

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type SlotInput = {
  day_of_week: number;
  start_time: string;
  end_time: string;
  subject: string;
  label: string;
};

