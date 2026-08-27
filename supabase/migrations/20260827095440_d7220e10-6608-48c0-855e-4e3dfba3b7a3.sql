DROP TABLE IF EXISTS public.user_topic_progress;

CREATE TABLE public.user_chapter_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  chapter_key TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_level TEXT NOT NULL,
  notes_done BOOLEAN NOT NULL DEFAULT false,
  lectures_done BOOLEAN NOT NULL DEFAULT false,
  dpp_done BOOLEAN NOT NULL DEFAULT false,
  module_done BOOLEAN NOT NULL DEFAULT false,
  revision_done BOOLEAN NOT NULL DEFAULT false,
  last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, chapter_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_chapter_progress TO authenticated;
GRANT ALL ON public.user_chapter_progress TO service_role;
ALTER TABLE public.user_chapter_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chapter progress" ON public.user_chapter_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.tests
  ADD COLUMN IF NOT EXISTS percentile NUMERIC,
  ADD COLUMN IF NOT EXISTS estimated_rank INTEGER;

CREATE TABLE public.mock_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  correct INTEGER NOT NULL DEFAULT 0,
  incorrect INTEGER NOT NULL DEFAULT 0,
  unanswered INTEGER NOT NULL DEFAULT 0,
  time_minutes INTEGER NOT NULL DEFAULT 0,
  conceptual_errors INTEGER NOT NULL DEFAULT 0,
  calculation_errors INTEGER NOT NULL DEFAULT 0,
  silly_mistakes INTEGER NOT NULL DEFAULT 0,
  time_management_errors INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (test_id, subject)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mock_sections TO authenticated;
GRANT ALL ON public.mock_sections TO service_role;
ALTER TABLE public.mock_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own mock sections" ON public.mock_sections
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);