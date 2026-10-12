export type UnitId = "u1" | "u2" | "u3" | "u4" | "u5" | "u6";
export type SetId = UnitId | "sp";
export type Level = "easy" | "medium" | "hard";

/**
 * Compact authoring format, one array per question:
 * [topic, level, question, [A, B, C, D], answerIndex, explanation, note?]
 * `note` is only used where a question is genuinely ambiguous.
 */
export type Row = [
  topic: string,
  level: "e" | "m" | "h",
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  why: string,
  note?: string,
];

export type Mcq = {
  id: string;
  set: SetId;
  topic: string;
  level: Level;
  q: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  why: string;
  note?: string;
};

export type UnitMeta = {
  id: UnitId;
  short: string;
  name: string;
  co: string;
  /** Syllabus topics, straight from the course outline. */
  syllabus: string;
  /** How many Part A MCQs I expect from this unit in a 30-question paper. */
  expected: number;
  /** How many of the 30 in the uploaded sample paper came from this unit. */
  inSample: number;
};

/* ------------------------------------------------------------------ */
/*  Exam guide content                                                  */
/* ------------------------------------------------------------------ */

export type PartBQuestion = {
  q: string;
  unit: string;
  /** How likely a question on this topic seems, from the sample paper and the syllabus. */
  chance: "Very likely" | "Likely" | "Possible";
  /** Skeleton of a full-marks answer: one line per heading to write about. */
  outline: string[];
  /** A concrete example to anchor the answer. */
  example?: string;
};

export type GuideContent = {
  FORMAT: { k: string; v: string }[];
  STYLES: { name: string; share: string; tip: string }[];
  PART_B: PartBQuestion[];
  ANSWER_TEMPLATE: string[];
  TIME_PLAN: { part: string; mins: string; note: string }[];
  DAYS: { d: string; t: string; s: string }[];
  MARKING_MATH: string[];
  /** Closing note about where the answers come from. */
  SOURCE_NOTE: string;
};
