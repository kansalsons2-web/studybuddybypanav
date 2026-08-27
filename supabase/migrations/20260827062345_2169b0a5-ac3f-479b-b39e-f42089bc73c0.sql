CREATE TABLE public.timetable_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week int NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  subject text NOT NULL DEFAULT 'Physics',
  label text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.timetable_slots TO authenticated;
GRANT ALL ON public.timetable_slots TO service_role;
ALTER TABLE public.timetable_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own timetable slots" ON public.timetable_slots
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX timetable_slots_user_idx ON public.timetable_slots(user_id);

CREATE TABLE public.timetable_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id uuid NOT NULL REFERENCES public.timetable_slots(id) ON DELETE CASCADE,
  completion_date date NOT NULL DEFAULT current_date,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slot_id, completion_date)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.timetable_completions TO authenticated;
GRANT ALL ON public.timetable_completions TO service_role;
ALTER TABLE public.timetable_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own timetable completions" ON public.timetable_completions
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX timetable_completions_user_idx ON public.timetable_completions(user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_timetable_completions_updated_at
  BEFORE UPDATE ON public.timetable_completions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();