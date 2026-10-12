"use client";

import { useCallback, useEffect, useState } from "react";
import type { Level, Mcq, SetId, UnitId } from "@/lib/exam-prep/types";
import type { Bank } from "@/components/exam-prep/bank";

/* ------------------------------------------------------------------ */
/*  Seeded randomness (so a question's option order is stable per      */
/*  session but different every visit)                                  */
/* ------------------------------------------------------------------ */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffled<T>(arr: T[], seed: number): T[] {
  const r = rng(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  Option shuffling                                                    */
/* ------------------------------------------------------------------ */

/** Options that refer to other options by position can't be reordered. */
const POSITIONAL = /\b(all|none) of (the )?above\b|\bboth (\(?[a-d]\)?)\b|\bneither of\b|\(\s?[a-d]\s?\)/i;

export type Shown = { options: string[]; correct: number };

export function present(q: Mcq, session: number): Shown {
  if (q.options.some((o) => POSITIONAL.test(o))) {
    return { options: [...q.options], correct: q.answer };
  }
  const order = shuffled([0, 1, 2, 3], hash(q.id) ^ session);
  return {
    options: order.map((i) => q.options[i]),
    correct: order.indexOf(q.answer),
  };
}

export const LETTERS = ["A", "B", "C", "D"] as const;

/* ------------------------------------------------------------------ */
/*  Progress storage                                                    */
/* ------------------------------------------------------------------ */

export type Rec = { n: number; c: number; last: boolean };
export type Progress = Record<string, Rec>;

export type MockResult = {
  t: number;
  score: number;
  max: number;
  correct: number;
  wrong: number;
  skipped: number;
  minutes: number;
};


function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / full storage: progress just won't persist */
  }
}

/**
 * Progress and mock history for one subject, kept in localStorage under
 * `${storageKey}:progress:v1` and `${storageKey}:mocks:v1`.
 */
export function useProgress(storageKey: string) {
  const PROGRESS_KEY = `${storageKey}:progress:v1`;
  const MOCKS_KEY = `${storageKey}:mocks:v1`;
  const [progress, setProgress] = useState<Progress>({});
  const [mocks, setMocks] = useState<MockResult[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(read<Progress>(PROGRESS_KEY, {}));
    setMocks(read<MockResult[]>(MOCKS_KEY, []));
    setReady(true);
  }, [PROGRESS_KEY, MOCKS_KEY]);

  const record = useCallback((results: { id: string; correct: boolean }[]) => {
    setProgress((prev) => {
      const next = { ...prev };
      for (const { id, correct } of results) {
        const cur = next[id] ?? { n: 0, c: 0, last: false };
        next[id] = { n: cur.n + 1, c: cur.c + (correct ? 1 : 0), last: correct };
      }
      write(PROGRESS_KEY, next);
      return next;
    });
  }, [PROGRESS_KEY]);

  const addMock = useCallback((m: MockResult) => {
    setMocks((prev) => {
      const next = [...prev, m].slice(-30);
      write(MOCKS_KEY, next);
      return next;
    });
  }, [MOCKS_KEY]);

  const reset = useCallback(() => {
    setProgress({});
    setMocks([]);
    write(PROGRESS_KEY, {});
    write(MOCKS_KEY, []);
  }, [PROGRESS_KEY, MOCKS_KEY]);

  return { progress, mocks, ready, record, addMock, reset };
}

/* ------------------------------------------------------------------ */
/*  Mock paper                                                          */
/* ------------------------------------------------------------------ */

export const MOCK_SIZE = 30;
export const MARK_RIGHT = 1;
export const MARK_WRONG = -0.25;

/** Roughly what a Part A paper feels like: more easy/medium, a few hard. */
const LEVEL_MIX: [Level, number][] = [
  ["easy", 0.4],
  ["medium", 0.42],
  ["hard", 0.18],
];

/**
 * Builds a 30-question paper that follows the predicted unit blueprint
 * (see UNITS[].expected). With `preferUnseen`, questions you have not
 * answered yet are picked first so each mock stays fresh.
 */
export function buildMock(bank: Bank, progress: Progress, preferUnseen: boolean, seed: number): Mcq[] {
  const r = rng(seed);
  const picked: Mcq[] = [];

  for (const unit of bank.units) {
    const pool = shuffled(bank.bySet[unit.id], seed ^ hash(unit.id));
    const ordered = preferUnseen
      ? [...pool.filter((q) => !progress[q.id]), ...pool.filter((q) => progress[q.id])]
      : pool;
    const used = new Set<string>();

    for (let i = 0; i < unit.expected; i++) {
      const x = r();
      let acc = 0;
      let want: Level = "medium";
      for (const [lvl, w] of LEVEL_MIX) {
        acc += w;
        if (x <= acc) {
          want = lvl;
          break;
        }
      }
      const pick =
        ordered.find((q) => !used.has(q.id) && q.level === want) ??
        ordered.find((q) => !used.has(q.id));
      if (pick) {
        used.add(pick.id);
        picked.push(pick);
      }
    }
  }

  // Top up if a unit had too few questions available.
  if (picked.length < MOCK_SIZE) {
    const have = new Set(picked.map((q) => q.id));
    for (const q of shuffled(bank.unitBank, seed + 1)) {
      if (picked.length >= MOCK_SIZE) break;
      if (!have.has(q.id)) picked.push(q);
    }
  }

  return shuffled(picked, seed + 7);
}

export function scoreOf(correct: number, wrong: number) {
  return correct * MARK_RIGHT + wrong * MARK_WRONG;
}

/* ------------------------------------------------------------------ */
/*  Stats                                                               */
/* ------------------------------------------------------------------ */

export type Tally = { total: number; attempted: number; mastered: number; wrongNow: number; n: number; c: number };

export function tally(qs: Mcq[], progress: Progress): Tally {
  const t: Tally = { total: qs.length, attempted: 0, mastered: 0, wrongNow: 0, n: 0, c: 0 };
  for (const q of qs) {
    const p = progress[q.id];
    if (!p) continue;
    t.attempted++;
    t.n += p.n;
    t.c += p.c;
    if (p.last) t.mastered++;
    else t.wrongNow++;
  }
  return t;
}

export type UnitFilter = UnitId | "sp" | "all";
export type StatusFilter = "all" | "unseen" | "wrong" | "mastered";
export type LevelFilter = Level | "all";

export function poolFor(
  bank: Bank,
  unit: UnitFilter,
  level: LevelFilter,
  status: StatusFilter,
  progress: Progress
): Mcq[] {
  const base = unit === "all" ? bank.unitBank : bank.bySet[unit];
  return base.filter((q) => {
    if (level !== "all" && q.level !== level) return false;
    const p = progress[q.id];
    if (status === "unseen") return !p;
    if (status === "wrong") return !!p && !p.last;
    if (status === "mastered") return !!p && p.last;
    return true;
  });
}

export function weakTopics(bank: Bank, progress: Progress, limit = 8) {
  const by = new Map<string, { n: number; c: number; unit: SetId }>();
  for (const q of bank.unitBank) {
    const p = progress[q.id];
    if (!p) continue;
    const key = `${q.set}|${q.topic}`;
    const cur = by.get(key) ?? { n: 0, c: 0, unit: q.set };
    by.set(key, { n: cur.n + p.n, c: cur.c + p.c, unit: q.set });
  }
  return [...by.entries()]
    .map(([key, v]) => ({ topic: key.split("|")[1], unit: v.unit, n: v.n, acc: v.c / v.n }))
    .filter((t) => t.n >= 2 && t.acc < 0.75)
    .sort((a, b) => a.acc - b.acc || b.n - a.n)
    .slice(0, limit);
}
