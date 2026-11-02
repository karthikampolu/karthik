"use client";

import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import {
  addSet,
  challenge,
  clearPenalty,
  isSunday,
  loadGame,
  questsFor,
  rollover,
  saveGame,
  setKm,
  todayKey,
  toggleQuest,
  undoSet,
  type Game,
  type SysEvent,
} from "./state";
import { play } from "./sound";

export type Popup = SysEvent & { id: number };

type AppState = { game: Game; today: string; popups: Popup[]; seq: number; flash: number };

export type Action =
  | { type: "tick"; today: string }
  | { type: "toggle"; id: string }
  | { type: "addSet"; id: string; reps: number }
  | { type: "undoSet"; id: string }
  | { type: "km"; id: string; km: number }
  | { type: "clearPenalty"; id: string }
  | { type: "update"; fn: (g: Game) => Game }
  | { type: "replace"; game: Game }
  | { type: "dismiss" };

function greeting(g: Game, today: string): SysEvent {
  const s = g.settings;
  const c = challenge(s, today);
  const lines = [c.started ? (c.over ? "Challenge window complete." : `Day ${c.day} / ${c.total}`) : `The challenge begins on ${s.start}.`];
  lines.push(`${questsFor(s, today).length} quests assigned.`);
  if (isSunday(today)) lines.push("Recovery Day: no run, half the workout reps.");
  const pen = g.days[today]?.penalties.filter((p) => !p.cleared).length ?? 0;
  if (pen > 0) lines.push(`${pen} penalty quest${pen === 1 ? "" : "s"} must be cleared first.`);
  lines.push("Failure to complete will result in a penalty.");
  return { kind: "daily", title: "[DAILY QUEST HAS ARRIVED]", lines };
}

/** Roll over to `today` if needed and greet once per day. */
function arrive(state: AppState, today: string): AppState {
  const r = rollover(state.game, today);
  let game = r.game;
  const events: SysEvent[] = [];
  if (game.greeted !== today) {
    events.push(greeting(game, today));
    game = { ...game, greeted: today };
  }
  events.push(...r.events);
  return push({ ...state, game, today }, events);
}

function push(state: AppState, events: SysEvent[]): AppState {
  if (events.length === 0) return state;
  let seq = state.seq;
  let flash = state.flash;
  const popups = [...state.popups];
  for (const e of events) {
    seq += 1;
    popups.push({ ...e, id: seq });
    if (e.kind === "level") flash = seq;
  }
  return { ...state, popups, seq, flash };
}

function reducer(state: AppState, a: Action): AppState {
  const { game, today } = state;
  switch (a.type) {
    case "tick":
      return a.today === today ? state : arrive(state, a.today);
    case "toggle": {
      const r = toggleQuest(game, a.id, today);
      return push({ ...state, game: r.game }, r.events);
    }
    case "addSet": {
      const r = addSet(game, a.id, today, a.reps);
      return push({ ...state, game: r.game }, r.events);
    }
    case "undoSet": {
      const r = undoSet(game, a.id, today);
      return push({ ...state, game: r.game }, r.events);
    }
    case "km":
      return { ...state, game: setKm(game, a.id, today, a.km).game };
    case "clearPenalty": {
      const r = clearPenalty(game, a.id, today);
      return push({ ...state, game: r.game }, r.events);
    }
    case "update":
      return { ...state, game: a.fn(game) };
    case "replace":
      return arrive({ ...state, game: a.game }, today);
    case "dismiss":
      return { ...state, popups: state.popups.slice(1) };
  }
}

function init(): AppState {
  const today = todayKey();
  // `today` starts empty so arrive() runs the rollover and the daily greeting.
  return arrive({ game: loadGame(), today: "", popups: [], seq: 0, flash: 0 }, today);
}

const Ctx = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  // Only ever rendered on the client (the app is loaded with ssr: false).
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => saveGame(state.game), [state.game]);

  useEffect(() => {
    const check = () => dispatch({ type: "tick", today: todayKey() });
    const id = setInterval(check, 30_000);
    const onVis = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const head = state.popups[0];
  useEffect(() => {
    if (head && !state.game.settings.muted) play(head.kind);
    // Play once per pop-up, keyed by its id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [head?.id]);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useSystem() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSystem outside SystemProvider");
  return v;
}
