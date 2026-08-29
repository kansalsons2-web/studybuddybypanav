// Merged JEE post-test root-cause tagging codes (A/B/C + R/W/U frameworks).

export type TagGroup = "Right" | "Wrong" | "Unattempted";

export type TagDef = {
  code: string;
  label: string;
  group: TagGroup;
  /** Group used for loss analysis (R2 counts as Wrong). */
  analyzeAs: TagGroup;
};

export const TAGS: TagDef[] = [
  { code: "R1", label: "Correct, confident & in time", group: "Right", analyzeAs: "Right" },
  { code: "R2", label: "Correct, but guessed / half-hearted", group: "Right", analyzeAs: "Wrong" },
  { code: "R3", label: "Correct, but took too long", group: "Right", analyzeAs: "Right" },
  { code: "W1", label: "Conceptual error", group: "Wrong", analyzeAs: "Wrong" },
  { code: "W2", label: "Calculation / silly error", group: "Wrong", analyzeAs: "Wrong" },
  { code: "W3", label: "Silly or behavioral (misread, rushed, anxiety)", group: "Wrong", analyzeAs: "Wrong" },
  { code: "U1", label: "Question not understood at all", group: "Unattempted", analyzeAs: "Unattempted" },
  { code: "U2", label: "Understood, unsure which concept applies", group: "Unattempted", analyzeAs: "Unattempted" },
  { code: "U3", label: "Understood, forgot the formula/concept", group: "Unattempted", analyzeAs: "Unattempted" },
  { code: "U4", label: "Ran out of time", group: "Unattempted", analyzeAs: "Unattempted" },
  { code: "U5", label: "Skipped — looked too lengthy", group: "Unattempted", analyzeAs: "Unattempted" },
];

export const TAG_GROUPS: TagGroup[] = ["Right", "Wrong", "Unattempted"];

export const TAG_BY_CODE = new Map(TAGS.map((t) => [t.code, t]));

export const R2_WARNING =
  "A lucky guess isn't a solved question — R2 is analysed as a wrong answer.";

export type QuestionTag = {
  id: string;
  user_id: string;
  test_id: string;
  question_number: number;
  subject: string;
  tag: string;
  note: string;
  created_at: string;
};

export type QuestionTagInput = {
  test_id: string;
  question_number: number;
  subject: string;
  tag: string;
  note: string;
};
