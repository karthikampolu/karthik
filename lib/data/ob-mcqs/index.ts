import type { Mcq, SetId, UnitId } from "@/lib/exam-prep/types";
import { buildSet } from "@/lib/exam-prep/build";
import { samplePaper } from "./sample-paper";
import { u1 } from "./u1";
import { u2 } from "./u2";
import { u3 } from "./u3";
import { u4a } from "./u4a";
import { u4b } from "./u4b";
import { u5 } from "./u5";
import { u6 } from "./u6";

export { UNITS } from "./units";

/** Questions are identified by position, so only ever append to a unit file. */
export const BANK_BY_SET: Record<SetId, Mcq[]> = {
  u1: buildSet("u1", u1),
  u2: buildSet("u2", u2),
  u3: buildSet("u3", u3),
  u4: buildSet("u4", [...u4a, ...u4b]),
  u5: buildSet("u5", u5),
  u6: buildSet("u6", u6),
  sp: buildSet("sp", samplePaper),
};

export const UNIT_IDS: UnitId[] = ["u1", "u2", "u3", "u4", "u5", "u6"];
