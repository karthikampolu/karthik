import type { Level, Mcq, Row, SetId } from "@/lib/exam-prep/types";

const LEVEL: Record<Row[1], Level> = { e: "easy", m: "medium", h: "hard" };

/** Turns authored rows into questions. IDs are positional, so only ever append. */
export function buildSet(set: SetId, rows: Row[]): Mcq[] {
  return rows.map((r, i) => ({
    id: `${set}-${i + 1}`,
    set,
    topic: r[0],
    level: LEVEL[r[1]],
    q: r[2],
    options: r[3],
    answer: r[4],
    why: r[5],
    note: r[6],
  }));
}
