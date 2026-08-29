ALTER TABLE public.tests
  ADD COLUMN IF NOT EXISTS time_taken_minutes integer,
  ADD COLUMN IF NOT EXISTS physics_correct integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS physics_incorrect integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS physics_unanswered integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS chemistry_correct integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS chemistry_incorrect integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS chemistry_unanswered integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mathematics_correct integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mathematics_incorrect integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mathematics_unanswered integer NOT NULL DEFAULT 0;

CREATE TABLE public.test_question_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id uuid NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  question_number integer NOT NULL DEFAULT 1,
  subject text NOT NULL DEFAULT 'Physics',
  tag text NOT NULL CHECK (tag IN ('R1','R2','R3','W1','W2','W3','U1','U2','U3','U4','U5')),
  note text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_question_tags TO authenticated;
GRANT ALL ON public.test_question_tags TO service_role;

ALTER TABLE public.test_question_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own question tags"
ON public.test_question_tags FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_test_question_tags_test ON public.test_question_tags(test_id);