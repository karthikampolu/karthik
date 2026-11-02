/**
 * Game state for the "System" progress app. Everything lives in
 * localStorage; these functions are pure so the reducer can replay them.
 */

export type StatKey = "STR" | "AGI" | "INT" | "PER" | "VIT";
export const STAT_KEYS: StatKey[] = ["STR", "AGI", "INT", "PER", "VIT"];
export const STAT_NAMES: Record<StatKey, string> = {
  STR: "Strength",
  AGI: "Agility",
  INT: "Intelligence",
  PER: "Perception",
  VIT: "Vitality",
};

export type QuestKind = "check" | "reps" | "run";
export type QuestDef = {
  id: string;
  name: string;
  kind: QuestKind;
  xp: number;
  stat: StatKey;
  statGain: number;
  enabled: boolean;
  /** Not scheduled on Sundays (recovery day). */
  skipSunday?: boolean;
};

export type Block = { time: string; label: string };
export type Penalty = { id: string; questId: string; name: string; from: string; cleared: boolean };
export type DayLog = {
  done: Record<string, boolean>;
  reps: Record<string, number[]>;
  km: Record<string, number>;
  awarded: Record<string, "xp" | "held">;
  penalties: Penalty[];
  heldXp: number;
};

export type Settings = {
  muted: boolean;
  start: string;
  end: string;
  nismDate: string;
  quests: QuestDef[];
  schedule: Block[];
  reps: { base: number; step: number; cap: number };
  run: { startKm: number; endKm: number; weeks: number };
  weight: { start: number; target: number };
  chess: { start: number; target: number };
  cgpaTarget: number;
};

export type Mark = { id: string; date: string; subject: string; name: string; score: number; max: number };

export type Game = {
  v: 1;
  player: { name: string; xp: number; stats: Record<StatKey, number> };
  settings: Settings;
  days: Record<string, DayLog>;
  /** Last IST date the midnight rollover ran for. */
  processed: string | null;
  streak: number;
  best: number;
  greeted: string | null;
  weights: { date: string; kg: number }[];
  chess: { date: string; rating: number }[];
  nism: { chapters: { id: string; name: string; done: boolean }[]; mocks: { date: string; score: number }[] };
  marks: Mark[];
};

export const DEEP_WORK_ID = "deepwork";

export const DEFAULT_QUESTS: QuestDef[] = [
  { id: "wake", name: "Wake by 6:30", kind: "check", xp: 15, stat: "VIT", statGain: 1, enabled: true },
  { id: "run", name: "Run", kind: "run", xp: 25, stat: "AGI", statGain: 2, enabled: true, skipSunday: true },
  { id: "pushups", name: "Push-ups", kind: "reps", xp: 15, stat: "STR", statGain: 1, enabled: true },
  { id: "situps", name: "Sit-ups", kind: "reps", xp: 15, stat: "STR", statGain: 1, enabled: true },
  { id: "crunches", name: "Crunches", kind: "reps", xp: 15, stat: "STR", statGain: 1, enabled: true },
  { id: "breakfast", name: "Breakfast", kind: "check", xp: 5, stat: "VIT", statGain: 1, enabled: true },
  { id: "snack", name: "5 pm snack", kind: "check", xp: 5, stat: "VIT", statGain: 1, enabled: true },
  { id: "milk", name: "Night milk", kind: "check", xp: 5, stat: "VIT", statGain: 1, enabled: true },
  { id: DEEP_WORK_ID, name: "Deep work 2.5 hrs", kind: "check", xp: 30, stat: "INT", statGain: 2, enabled: true },
  { id: "chess", name: "Chess: 30 min puzzles + 1 rapid + review", kind: "check", xp: 20, stat: "PER", statGain: 2, enabled: true },
  { id: "academics", name: "Academics revision 1.5 hrs", kind: "check", xp: 20, stat: "INT", statGain: 1, enabled: true },
  { id: "projects", name: "Projects 1.5 hrs", kind: "check", xp: 20, stat: "INT", statGain: 1, enabled: true },
  { id: "sleep", name: "Sleep by 11:00", kind: "check", xp: 15, stat: "VIT", statGain: 1, enabled: true },
];

export const DEFAULT_SCHEDULE: Block[] = [
  { time: "06:30", label: "Wake" },
  { time: "06:45", label: "Run" },
  { time: "07:30", label: "Breakfast" },
  { time: "08:00", label: "Deep work" },
  { time: "10:30", label: "Chess" },
  { time: "11:30", label: "Lunch" },
  { time: "12:00", label: "Classes" },
  { time: "17:00", label: "Snack" },
  { time: "17:30", label: "Workout" },
  { time: "18:30", label: "Academics" },
  { time: "20:00", label: "Dinner" },
  { time: "20:30", label: "Projects" },
  { time: "22:00", label: "Chess review" },
  { time: "22:30", label: "Milk" },
  { time: "23:00", label: "Sleep" },
];

/** Placeholder names; rename them in Stats → NISM to match your module. */
export const DEFAULT_CHAPTERS = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

export function newGame(): Game {
  return {
    v: 1,
    player: { name: "Player", xp: 0, stats: { STR: 10, AGI: 10, INT: 10, PER: 10, VIT: 10 } },
    settings: {
      muted: false,
      start: "2026-11-02",
      end: "2027-01-02",
      nismDate: "2026-11-22",
      quests: DEFAULT_QUESTS,
      schedule: DEFAULT_SCHEDULE,
      reps: { base: 50, step: 10, cap: 100 },
      run: { startKm: 2, endKm: 5, weeks: 6 },
      weight: { start: 58, target: 61 },
      chess: { start: 800, target: 1200 },
      cgpaTarget: 9,
    },
    days: {},
    processed: null,
    streak: 0,
    best: 0,
    greeted: null,
    weights: [],
    chess: [],
    nism: { chapters: DEFAULT_CHAPTERS.map((name, i) => ({ id: `c${i + 1}`, name, done: false })), mocks: [] },
    marks: [],
  };
}

/* ------------------------------------------------------------------ */
/*  Dates (always Asia/Kolkata)                                        */
/* ------------------------------------------------------------------ */

const TZ = "Asia/Kolkata";

export function todayKey(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Minutes since midnight in IST. */
export function nowMinutes(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

const utc = (key: string) => Date.UTC(+key.slice(0, 4), +key.slice(5, 7) - 1, +key.slice(8, 10));

export function addDays(key: string, n: number): string {
  return new Date(utc(key) + n * 86400000).toISOString().slice(0, 10);
}

export function diffDays(a: string, b: string): number {
  return Math.round((utc(a) - utc(b)) / 86400000);
}

export const isSunday = (key: string) => new Date(utc(key)).getUTCDay() === 0;

export function fmtDate(key: string): string {
  return new Date(utc(key)).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
}

export const toMinutes = (hhmm: string) => +hhmm.slice(0, 2) * 60 + +hhmm.slice(3, 5);

/* ------------------------------------------------------------------ */
/*  Challenge, targets and quests for a day                            */
/* ------------------------------------------------------------------ */

export function challenge(s: Settings, today: string) {
  const total = diffDays(s.end, s.start);
  const raw = diffDays(today, s.start) + 1;
  return { day: Math.max(0, Math.min(total, raw)), total, started: raw >= 1, over: raw > total };
}

export function weekOf(s: Settings, date: string): number {
  return Math.max(1, Math.floor(diffDays(date, s.start) / 7) + 1);
}

export function repTarget(s: Settings, date: string): number {
  const t = Math.min(s.reps.cap, s.reps.base + (weekOf(s, date) - 1) * s.reps.step);
  return isSunday(date) ? Math.ceil(t / 2) : t;
}

export function runTarget(s: Settings, date: string): number {
  const { startKm, endKm, weeks } = s.run;
  const per = weeks > 1 ? (endKm - startKm) / (weeks - 1) : 0;
  const km = Math.min(endKm, startKm + (weekOf(s, date) - 1) * per);
  return Math.round(km * 10) / 10;
}

export function questsFor(s: Settings, date: string): QuestDef[] {
  return s.quests.filter((q) => q.enabled && !(q.skipSunday && isSunday(date)));
}

export function questLabel(s: Settings, q: QuestDef, date: string): string {
  if (q.id === DEEP_WORK_ID) return `${q.name} · ${date <= s.nismDate ? "NISM" : "Projects"}`;
  if (q.kind === "run") return `${q.name} ${runTarget(s, date)} km`;
  if (q.kind === "reps") return `${q.name} ×${repTarget(s, date)}`;
  return q.name;
}

export const emptyLog = (): DayLog => ({ done: {}, reps: {}, km: {}, awarded: {}, penalties: [], heldXp: 0 });

export const sum = (a: number[] = []) => a.reduce((x, y) => x + y, 0);

export function isComplete(s: Settings, q: QuestDef, log: DayLog, date: string): boolean {
  if (q.kind === "reps") return sum(log.reps[q.id]) >= repTarget(s, date);
  return !!log.done[q.id];
}

/* ------------------------------------------------------------------ */
/*  Levels and ranks                                                   */
/* ------------------------------------------------------------------ */

/** XP needed to go from `level` to `level + 1`. S-Rank (level 50) needs about 12,000 XP: a near-perfect 61 days. */
export const xpForNext = (level: number) => 20 + 9 * level;

export function levelInfo(totalXp: number) {
  let level = 1;
  let rest = totalXp;
  while (rest >= xpForNext(level)) {
    rest -= xpForNext(level);
    level++;
  }
  return { level, into: rest, need: xpForNext(level) };
}

const RANKS = ["E", "D", "C", "B", "A", "S"];
export const rankOf = (level: number) => `${RANKS[Math.min(5, Math.floor(level / 10))]}-Rank`;

/* ------------------------------------------------------------------ */
/*  Events shown as System pop-ups                                     */
/* ------------------------------------------------------------------ */

export type SysEvent = {
  kind: "quest" | "level" | "penalty" | "warning" | "daily" | "info";
  title: string;
  lines: string[];
};

function withLog(g: Game, date: string): DayLog {
  return g.days[date] ?? emptyLog();
}

function setLog(g: Game, date: string, log: DayLog): Game {
  return { ...g, days: { ...g.days, [date]: log } };
}

function levelEvents(before: number, after: number): SysEvent[] {
  const lb = levelInfo(before).level;
  const la = levelInfo(after).level;
  if (la <= lb) return [];
  const lines = [`Level ${lb} → ${la}`];
  if (rankOf(la) !== rankOf(lb)) lines.push(`Title acquired: ${rankOf(la)}`);
  return [{ kind: "level", title: "[LEVEL UP]", lines }];
}

/** Award or revoke a quest's XP and stat so they match its completion state. */
export function reconcile(g: Game, questId: string, date: string): { game: Game; events: SysEvent[] } {
  const q = g.settings.quests.find((x) => x.id === questId);
  if (!q) return { game: g, events: [] };
  const log = withLog(g, date);
  const complete = isComplete(g.settings, q, log, date);
  const awarded = log.awarded[q.id];
  const events: SysEvent[] = [];
  let player = g.player;
  let next = { ...log, awarded: { ...log.awarded } };

  if (complete && !awarded) {
    const blocked = log.penalties.some((p) => !p.cleared);
    const stats = { ...player.stats, [q.stat]: player.stats[q.stat] + q.statGain };
    if (blocked) {
      next.heldXp += q.xp;
      next.awarded[q.id] = "held";
      player = { ...player, stats };
      events.push({
        kind: "quest",
        title: "[QUEST COMPLETE]",
        lines: [questLabel(g.settings, q, date), `+${q.statGain} ${q.stat}`, `+${q.xp} XP held until penalties are cleared`],
      });
    } else {
      next.awarded[q.id] = "xp";
      player = { ...player, xp: player.xp + q.xp, stats };
      events.push({ kind: "quest", title: "[QUEST COMPLETE]", lines: [questLabel(g.settings, q, date), `+${q.xp} XP · +${q.statGain} ${q.stat}`] });
      events.push(...levelEvents(g.player.xp, player.xp));
    }
  } else if (!complete && awarded) {
    const stats = { ...player.stats, [q.stat]: Math.max(0, player.stats[q.stat] - q.statGain) };
    if (awarded === "held") next.heldXp = Math.max(0, next.heldXp - q.xp);
    else player = { ...player, xp: Math.max(0, player.xp - q.xp) };
    player = { ...player, stats };
    delete next.awarded[q.id];
  }
  next = { ...next };
  return { game: { ...setLog(g, date, next), player }, events };
}

export function toggleQuest(g: Game, questId: string, date: string) {
  const log = withLog(g, date);
  const updated = setLog(g, date, { ...log, done: { ...log.done, [questId]: !log.done[questId] } });
  return reconcile(updated, questId, date);
}

export function setKm(g: Game, questId: string, date: string, km: number) {
  const log = withLog(g, date);
  return { game: setLog(g, date, { ...log, km: { ...log.km, [questId]: km } }), events: [] as SysEvent[] };
}

export function addSet(g: Game, questId: string, date: string, reps: number) {
  const log = withLog(g, date);
  const sets = [...(log.reps[questId] ?? []), reps];
  return reconcile(setLog(g, date, { ...log, reps: { ...log.reps, [questId]: sets } }), questId, date);
}

export function undoSet(g: Game, questId: string, date: string) {
  const log = withLog(g, date);
  const sets = (log.reps[questId] ?? []).slice(0, -1);
  return reconcile(setLog(g, date, { ...log, reps: { ...log.reps, [questId]: sets } }), questId, date);
}

export function clearPenalty(g: Game, penaltyId: string, date: string): { game: Game; events: SysEvent[] } {
  const log = withLog(g, date);
  const penalties = log.penalties.map((p) => (p.id === penaltyId ? { ...p, cleared: true } : p));
  let next: DayLog = { ...log, penalties };
  let player = g.player;
  const events: SysEvent[] = [];
  if (penalties.every((p) => p.cleared)) {
    const awarded = Object.fromEntries(Object.entries(next.awarded).map(([k]) => [k, "xp" as const]));
    events.push({
      kind: "info",
      title: "[PENALTY CLEARED]",
      lines: next.heldXp > 0 ? [`Held XP released: +${next.heldXp} XP`] : ["Normal XP gain restored."],
    });
    player = { ...player, xp: player.xp + next.heldXp };
    events.push(...levelEvents(g.player.xp, player.xp));
    next = { ...next, awarded, heldXp: 0 };
  }
  return { game: { ...setLog(g, date, next), player }, events };
}

/**
 * Midnight rollover: anything missed yesterday becomes a penalty quest
 * today, and the streak advances or breaks. Runs once per IST date.
 */
export function rollover(g: Game, today: string): { game: Game; events: SysEvent[] } {
  if (g.processed === today) return { game: g, events: [] };
  const events: SysEvent[] = [];
  const s = g.settings;
  const yesterday = addDays(today, -1);
  let { streak, best } = g;
  let penalties: Penalty[] = [];

  if (g.processed && yesterday >= s.start && today <= addDays(s.end, 1)) {
    const opened = !!g.days[yesterday];
    const log = withLog(g, yesterday);
    const missed = questsFor(s, yesterday).filter((q) => !isComplete(s, q, log, yesterday));
    const carried = log.penalties.filter((p) => !p.cleared);
    penalties = [
      ...carried,
      ...missed
        .filter((q) => !carried.some((p) => p.questId === q.id))
        .map((q) => ({ id: `${yesterday}-${q.id}`, questId: q.id, name: questLabel(s, q, yesterday), from: yesterday, cleared: false })),
    ];
    const perfect = opened && missed.length === 0 && carried.length === 0 && g.processed === yesterday;
    if (perfect) {
      streak += 1;
      best = Math.max(best, streak);
    } else if (streak > 0) {
      events.push({ kind: "warning", title: "[WARNING]", lines: [`Streak of ${streak} day${streak === 1 ? "" : "s"} broken.`, "The System does not forgive. Begin again."] });
      streak = 0;
    }
    if (penalties.length > 0) {
      events.push({
        kind: "penalty",
        title: "[PENALTY]",
        lines: [`${penalties.length} quest${penalties.length === 1 ? "" : "s"} failed. Penalty quests issued.`, "Clear them before normal XP counts."],
      });
    }
  }

  const todayLog = withLog(g, today);
  const merged = [...todayLog.penalties, ...penalties.filter((p) => !todayLog.penalties.some((t) => t.id === p.id))];
  const game: Game = { ...setLog(g, today, { ...todayLog, penalties: merged }), processed: today, streak, best };
  return { game, events };
}

/* ------------------------------------------------------------------ */
/*  Storage                                                            */
/* ------------------------------------------------------------------ */

const KEY = "solo-system:v1";

export function isGame(x: unknown): x is Game {
  const g = x as Game;
  return !!g && g.v === 1 && !!g.player && !!g.settings && typeof g.days === "object";
}

export function loadGame(): Game {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isGame(parsed)) return { ...newGame(), ...parsed, settings: { ...newGame().settings, ...parsed.settings } };
    }
  } catch {
    /* fall through to a fresh game */
  }
  return newGame();
}

export function saveGame(g: Game) {
  try {
    localStorage.setItem(KEY, JSON.stringify(g));
  } catch {
    /* storage full or blocked */
  }
}
