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

/** A full model answer for a 10-mark question, laid out the way it should be written. */
export type ModelAnswer = {
  /** Opening lines: define the topic. */
  intro: string;
  /** Headed points, in the order they should be written. */
  sections: { h: string; points: string[] }[];
  /** Optional comparison table to draw in the answer. */
  table?: { caption: string; columns: string[]; rows: string[][] };
  /** What to sketch, if a diagram earns marks here. */
  diagram?: string;
  conclusion: string;
};

export type PartBQuestion = {
  /** Stable slug, used by predicted papers and saved drafts. */
  id: string;
  q: string;
  unit: string;
  /** How likely a question on this topic seems, from the sample paper and the syllabus. */
  chance: "Very likely" | "Likely" | "Possible";
  /** Skeleton of a full-marks answer: one line per heading to write about. */
  outline: string[];
  /** A concrete example to anchor the answer. */
  example?: string;
  /** Full model answer. */
  model?: ModelAnswer;
  /** "numerical" shows the model as a worked solution and drops the word-count targets. */
  kind?: "theory" | "numerical";
};

/** A complete predicted paper: a fixed Part A and five Part B questions. */
export type PredictedPaper = {
  id: string;
  title: string;
  /** Exactly 30 question ids from the unit bank. */
  partA: string[];
  /** Five PartBQuestion ids; the student attempts any four. */
  partB: string[];
};

export type GuideContent = {
  FORMAT: { k: string; v: string }[];
  STYLES: { name: string; share: string; tip: string }[];
  PART_B: PartBQuestion[];
  ANSWER_TEMPLATE: string[];
  TIME_PLAN: { part: string; mins: string; note: string }[];
  DAYS: { d: string; t: string; s: string }[];
  MARKING_MATH: string[];
  PAPERS: PredictedPaper[];
  /** Explains the unit blueprint table; a generic line is shown when absent. */
  BLUEPRINT_NOTE?: string;
  /** Ranked list of the numericals to master first (numerical subjects only). */
  FOCUS?: { topic: string; unit: string; chance: "Very likely" | "Likely" | "Possible"; why: string }[];
  /** One-page formula sheet, grouped by topic. */
  FORMULAS?: { group: string; items: { name: string; f: string }[] }[];
  /** Closing note about where the answers come from. */
  SOURCE_NOTE: string;
};
