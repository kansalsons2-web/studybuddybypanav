# JEE Commander — Preparation Command Center

## What exists today (inspected)

- Auth: email + Google, instant sign-in, password reset, protected `_authenticated` layout.
- Database: `profiles`, `study_sessions`, `tasks`, `goals`, `tests` — all with row-level security scoped to the signed-in student.
- Pages: Dashboard, Timer (background-safe), Tasks, Goals, Analytics, Calendar, Tests, Roadmap, Coach, Settings.
- Data layer: one server-function module + a single `useJee()` hook that loads everything at once.

All of this stays. Nothing is deleted, no data is dropped.

## Approach

Build in phases. Each phase ships working, tested screens before the next starts. The current one-big-query data layer gets split into per-feature queries as we go, so new tables (PYQs, mistakes, revision) never slow the dashboard down.

Your uploaded JEE Advanced 2026 syllabus PDF is the only source for chapters/topics — nothing invented.

---

## Phase 1 — Foundation + Syllabus

**Database**
- `syllabus_versions`, `subjects`, `chapters`, `topics` (shared reference data, readable by all signed-in users) seeded from your PDF: Physics, Chemistry (Physical/Organic/Inorganic), Mathematics.
- `user_topic_progress`: per-student status (Not Started / Learning / Practicing / Needs Revision / Strong / Mastered), theory done, attempts, correct, time spent, revision count, last studied, last revised.
- `user_preferences` + new profile fields: target percentile, rank, college, branch, daily study hours, strongest/weakest subject, onboarding complete.

**Pages**
- New `/syllabus`: subject → chapter → topic tree with progress rings, status chips, inline status update, search/filter.
- Onboarding wizard on first login (10 questions) writing to profile + preferences.
- Timer gains chapter/topic selection + session goal + distraction-free Focus Mode; finishing a session updates topic progress automatically.
- Navigation restructured: desktop sidebar grouped into sections; mobile bottom bar = Home, Mission, Syllabus, Practice, Analytics + a "More" sheet.

## Phase 2 — Practice, PYQs, Mistakes, Revision

**Database**
- `question_attempts` (subject/chapter/topic, source, difficulty, correct, time taken, mistake type) — one table powers both PYQ and general practice logging, paginated.
- `mistakes` (question text, category, explanation, correct approach, fixed status, revision due).
- `revision_schedule` (topic, interval index, last revised, next due) driven by spaced repetition.

**Pages**
- `/pyqs`: fast logging (year, exam, chapter, difficulty, correct/incorrect, time), plus accuracy by chapter/year/difficulty and a heatmap.
- `/practice`: quick-log question batches and per-topic accuracy.
- `/mistakes`: mistake book with category breakdown, dominant-pattern detection, review + mark fixed.
- `/revision`: due-today / tomorrow / 3-day / 7-day queue, start-revision action that logs a session and reschedules.
- Weak-area detector (accuracy + recency + mastery) surfaced on the dashboard.

## Phase 3 — Mocks, Readiness, Analytics

**Database**
- Extend mock tests: accuracy, correct/incorrect/unanswered, time spent, percentile, estimated rank, per-section detail (`mock_sections`).

**Pages**
- `/mocks` rebuilt from the existing Tests page (keeps your existing test rows): score/percentile/accuracy trends, subject performance, "Where did I lose marks?" breakdown.
- Readiness Score (0–100) computed from syllabus completion, mastery, PYQ + question accuracy, mock performance, revision and study consistency, weak-chapter count — with an explicit "to reach the next level, do X" list.
- Command Center rebuilt around: countdowns, target, readiness, today's progress, today's mission, top 3 weak areas.
- `/analytics` expanded: study time, accuracy over time, mock trend, subject comparison, chapter mastery, consistency.
- Weekly Review card (auto-generated each week: totals, biggest improvement, biggest weakness, next-week priorities).

## Phase 4 — Daily Mission + Intelligence

**Database**
- `daily_missions` + `mission_items` (time block, subject, chapter, topic, minutes, status: pending/started/done/skipped/rescheduled).

**Pages**
- `/mission`: today's generated plan with Start / Complete / Skip / Reschedule per block; missed items roll forward.
- Plan generator: rule-based, using available hours, exam distance, weak chapters, revision due dates, recent mistakes and PYQ balance. Runs server-side on first open each day.
- Recommendation engine feed ("You haven't revised Rotational Motion in 9 days") on Command Center.
- Rank/percentile trajectory chart from mock history, clearly labelled as an estimate.
- Global search across chapters, topics, PYQs, mistakes, tasks, mocks.
- `/achievements`: streaks, PYQ milestones, study-hour milestones, chapter/syllabus completion.

## Phase 5 — Exam Simulator, PWA, Notifications

- `/simulator`: JEE Main and Advanced modes — realistic duration, sections, question palette, mark-for-review, save & next, negative marking, submit → full analytics saved as a mock. (You supply/enter questions; no question bank is bundled.)
- PWA: manifest, JEE Commander icon, theme colors, standalone display, guarded service worker with offline app shell. Auth and database access stay untouched; no private data cached.
- Notification preferences + in-app reminders; browser push where the device permits.
- Mobile pass: touch targets, responsive charts, no horizontal scroll, lazy-loaded heavy views.

---

## Technical notes

- Every new table gets row-level security scoped to `auth.uid()` plus explicit grants; shared syllabus reference tables are read-only to signed-in users.
- Data layer splits from one `useJee()` query into feature-scoped queries (`syllabus`, `attempts`, `mistakes`, `revision`, `mocks`, `mission`) with pagination on attempt lists. Existing `useJee()` keeps working during the transition.
- Readiness score, weak-area detection and mission generation live in server functions so the formulas stay consistent and the client stays light.
- Charts stay on the existing library; heavy views lazy-load.

## Limitations to expect

- Percentile/rank figures are estimates from your own mock data, not official predictions.
- No licensed PYQ or question bank is included — the trackers record what you solve from your own material.
- Background push notifications only work on devices/browsers that support web push after install.

## Where to start

I'll begin with Phase 1 (syllabus system, onboarding, focus mode, navigation) and check in after it's live before moving to Phase 2.
