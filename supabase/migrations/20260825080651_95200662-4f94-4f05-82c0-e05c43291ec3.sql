CREATE TABLE public.user_topic_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_key text NOT NULL,
  subject text NOT NULL DEFAULT '',
  chapter_key text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Not Started',
  theory_done boolean NOT NULL DEFAULT false,
  attempts integer NOT NULL DEFAULT 0,
  correct integer NOT NULL DEFAULT 0,
  minutes_spent integer NOT NULL DEFAULT 0,
  revision_count integer NOT NULL DEFAULT 0,
  last_studied date,
  last_revised date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, topic_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_topic_progress TO authenticated;
GRANT ALL ON public.user_topic_progress TO service_role;
ALTER TABLE public.user_topic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own topic progress" ON public.user_topic_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX user_topic_progress_user_idx ON public.user_topic_progress(user_id);
CREATE TRIGGER update_user_topic_progress_updated_at BEFORE UPDATE ON public.user_topic_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_focus text NOT NULL DEFAULT 'Both',
  target_percentile numeric NOT NULL DEFAULT 99.5,
  target_branch text NOT NULL DEFAULT 'Computer Science',
  prep_level text NOT NULL DEFAULT 'Beginner',
  daily_hours numeric NOT NULL DEFAULT 6,
  strongest_subject text NOT NULL DEFAULT 'Physics',
  weakest_subject text NOT NULL DEFAULT 'Mathematics',
  onboarding_complete boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own preferences" ON public.user_preferences FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.study_sessions ADD COLUMN IF NOT EXISTS chapter text NOT NULL DEFAULT '';
ALTER TABLE public.study_sessions ADD COLUMN IF NOT EXISTS topic_key text NOT NULL DEFAULT '';
ALTER TABLE public.study_sessions ADD COLUMN IF NOT EXISTS session_goal text NOT NULL DEFAULT '';
ALTER TABLE public.study_sessions ADD COLUMN IF NOT EXISTS notes text NOT NULL DEFAULT '';