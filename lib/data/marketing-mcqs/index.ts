import type { Level, Mcq, Row, SetId, UnitId } from "./types";
import { samplePaper } from "./sample-paper";
import { u1 } from "./u1";
import { u2 } from "./u2";
import { u3 } from "./u3";
import { u4 } from "./u4";
import { u5a } from "./u5a";
import { u5b } from "./u5b";
import { u6 } from "./u6";

export { UNITS, UNIT_BY_ID } from "./units";
export type { Level, Mcq, SetId, UnitId } from "./types";

const LEVEL: Record<Row[1], Level> = { e: "easy", m: "medium", h: "hard" };

function build(set: SetId, rows: Row[]): Mcq[] {
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

/** Questions are identified by position, so only ever append to a unit file. */
export const BANK_BY_SET: Record<SetId, Mcq[]> = {
  u1: build("u1", u1),
  u2: build("u2", u2),
  u3: build("u3", u3),
  u4: build("u4", u4),
  u5: build("u5", [...u5a, ...u5b]),
  u6: build("u6", u6),
  sp: build("sp", samplePaper),
};

export const UNIT_IDS: UnitId[] = ["u1", "u2", "u3", "u4", "u5", "u6"];

/** The 500-question unit bank (excludes the sample paper). */
export const UNIT_BANK: Mcq[] = UNIT_IDS.flatMap((id) => BANK_BY_SET[id]);

/** Everything, including the 30 sample-paper questions. */
export const ALL_MCQS: Mcq[] = [...UNIT_BANK, ...BANK_BY_SET.sp];

export const MCQ_BY_ID: Record<string, Mcq> = Object.fromEntries(
  ALL_MCQS.map((q) => [q.id, q])
);
