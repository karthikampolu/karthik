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
