"use client";

import { useRef, useState } from "react";
import { Download, Plus, Trash2, Upload, Volume2, VolumeX } from "lucide-react";
import { Label, NumField, Panel, TextField } from "./ui";
import { useSystem } from "./store";
import { STAT_KEYS, isGame, newGame, todayKey, type Game, type Settings as S, type StatKey } from "./state";

export default function Settings() {
  const { state, dispatch } = useSystem();
  const g = state.game;
  const s = g.settings;
  const update = (fn: (g: Game) => Game) => dispatch({ type: "update", fn });
  const setS = (patch: Partial<S>) => update((x) => ({ ...x, settings: { ...x.settings, ...patch } }));

  return (
    <div className="space-y-4">
      <Panel title="Player">
        <div className="space-y-3">
          <TextField label="Name" value={g.player.name} onChange={(name) => update((x) => ({ ...x, player: { ...x.player, name } }))} />
          <button type="button" className="sys-btn flex w-full items-center justify-center gap-2" onClick={() => setS({ muted: !s.muted })} aria-pressed={!s.muted}>
            {s.muted ? <VolumeX size={16} /> : <Volume2 size={16} />} Sound effects {s.muted ? "off" : "on"}
          </button>
        </div>
      </Panel>

      <Panel title="Dates">
        <div className="grid grid-cols-2 gap-2">
          <TextField label="Challenge start" type="date" value={s.start} onChange={(start) => start && setS({ start })} />
          <TextField label="Challenge end" type="date" value={s.end} onChange={(end) => end && setS({ end })} />
          <TextField label="NISM exam" type="date" value={s.nismDate} onChange={(nismDate) => nismDate && setS({ nismDate })} />
        </div>
        <p className="sys-mono mt-2 text-[11px] text-[color:var(--sys-faint)]">Deep work counts as NISM up to the exam date, then Projects.</p>
      </Panel>

      <Panel title="Targets">
        <Label>Workout reps (per exercise per day)</Label>
        <div className="mb-3 grid grid-cols-3 gap-2">
          <NumField label="Start" value={s.reps.base} onChange={(base) => setS({ reps: { ...s.reps, base } })} />
          <NumField label="+ per week" value={s.reps.step} onChange={(step) => setS({ reps: { ...s.reps, step } })} />
          <NumField label="Cap" value={s.reps.cap} onChange={(cap) => setS({ reps: { ...s.reps, cap } })} />
        </div>
        <Label>Run distance (km)</Label>
        <div className="mb-3 grid grid-cols-3 gap-2">
          <NumField label="Week 1" step={0.1} value={s.run.startKm} onChange={(startKm) => setS({ run: { ...s.run, startKm } })} />
          <NumField label="Final" step={0.1} value={s.run.endKm} onChange={(endKm) => setS({ run: { ...s.run, endKm } })} />
          <NumField label="By week" value={s.run.weeks} onChange={(weeks) => setS({ run: { ...s.run, weeks: Math.max(1, Math.round(weeks)) } })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <NumField label="Weight start (kg)" step={0.1} value={s.weight.start} onChange={(start) => setS({ weight: { ...s.weight, start } })} />
          <NumField label="Weight target (kg)" step={0.1} value={s.weight.target} onChange={(target) => setS({ weight: { ...s.weight, target } })} />
          <NumField label="Chess start" value={s.chess.start} onChange={(start) => setS({ chess: { ...s.chess, start } })} />
          <NumField label="Chess target" value={s.chess.target} onChange={(target) => setS({ chess: { ...s.chess, target } })} />
          <NumField label="CGPA target" step={0.1} value={s.cgpaTarget} onChange={(cgpaTarget) => setS({ cgpaTarget })} />
        </div>
      </Panel>

      <QuestEditor />
      <ScheduleEditor />
      <DataPanel />
      <InstallPanel />
    </div>
  );
}

function QuestEditor() {
  const { state, dispatch } = useSystem();
  const quests = state.game.settings.quests;
  const setQuests = (fn: (q: S["quests"]) => S["quests"]) =>
    dispatch({ type: "update", fn: (x) => ({ ...x, settings: { ...x.settings, quests: fn(x.settings.quests) } }) });
  const patch = (id: string, p: Partial<S["quests"][number]>) => setQuests((qs) => qs.map((q) => (q.id === id ? { ...q, ...p } : q)));

  return (
    <Panel title="Quests">
      <p className="mb-3 text-[13px] text-[color:var(--sys-dim)]">Changes apply from now on. Turning a quest off removes it from today and future days.</p>
      <div className="space-y-3">
        {quests.map((q) => (
          <div key={q.id} className={`border border-[color:var(--sys-line)]/50 p-2.5 ${q.enabled ? "" : "opacity-50"}`}>
            <div className="flex gap-2">
              <input className="sys-input flex-1" value={q.name} onChange={(e) => patch(q.id, { name: e.target.value })} aria-label="Quest name" />
              <button type="button" className={`sys-btn !px-3 ${q.enabled ? "is-primary" : ""}`} onClick={() => patch(q.id, { enabled: !q.enabled })} aria-pressed={q.enabled}>
                {q.enabled ? "On" : "Off"}
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <NumField label="XP" value={q.xp} onChange={(xp) => patch(q.id, { xp: Math.max(0, Math.round(xp)) })} />
              <label className="block">
                <Label>Stat</Label>
                <select className="sys-input sys-mono" value={q.stat} onChange={(e) => patch(q.id, { stat: e.target.value as StatKey })}>
                  {STAT_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <NumField label="+Stat" value={q.statGain} onChange={(statGain) => patch(q.id, { statGain: Math.max(0, Math.round(statGain)) })} />
            </div>
            {q.id.startsWith("custom-") && (
              <button type="button" className="sys-mono mt-2 flex items-center gap-1 text-[11px] text-[color:var(--sys-red)]" onClick={() => setQuests((qs) => qs.filter((x) => x.id !== q.id))}>
                <Trash2 size={13} /> Delete quest
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="sys-btn mt-3 flex w-full items-center justify-center gap-2"
        onClick={() => setQuests((qs) => [...qs, { id: `custom-${Date.now()}`, name: "New quest", kind: "check", xp: 10, stat: "INT", statGain: 1, enabled: true }])}
      >
        <Plus size={16} /> Add quest
      </button>
    </Panel>
  );
}

function ScheduleEditor() {
  const { state, dispatch } = useSystem();
  const schedule = state.game.settings.schedule;
  const setSchedule = (fn: (b: S["schedule"]) => S["schedule"]) =>
    dispatch({ type: "update", fn: (x) => ({ ...x, settings: { ...x.settings, schedule: fn(x.settings.schedule) } }) });

  return (
    <Panel title="Schedule">
      <div className="space-y-1.5">
        {schedule.map((b, i) => (
          <div key={i} className="flex gap-1.5">
            <input
              className="sys-input sys-mono w-[7.5rem] !px-2"
              type="time"
              value={b.time}
              aria-label={`Time for ${b.label}`}
              onChange={(e) => e.target.value && setSchedule((bs) => bs.map((x, k) => (k === i ? { ...x, time: e.target.value } : x)))}
            />
            <input
              className="sys-input flex-1"
              value={b.label}
              aria-label="Block name"
              onChange={(e) => setSchedule((bs) => bs.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))}
            />
            <button type="button" className="p-2 text-[color:var(--sys-faint)] hover:text-[color:var(--sys-red)]" onClick={() => setSchedule((bs) => bs.filter((_, k) => k !== i))} aria-label={`Delete ${b.label}`}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="sys-btn mt-3 flex w-full items-center justify-center gap-2" onClick={() => setSchedule((bs) => [...bs, { time: "12:00", label: "New block" }])}>
        <Plus size={16} /> Add block
      </button>
    </Panel>
  );
}

function DataPanel() {
  const { state, dispatch } = useSystem();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state.game, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `system-backup-${todayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMsg("Backup downloaded.");
  };

  const importData = async (f: File) => {
    try {
      const parsed = JSON.parse(await f.text());
      if (!isGame(parsed)) throw new Error("bad");
      dispatch({ type: "replace", game: { ...newGame(), ...parsed, settings: { ...newGame().settings, ...parsed.settings } } });
      setMsg("Backup restored.");
    } catch {
      setMsg("That file isn't a valid System backup.");
    }
  };

  return (
    <Panel title="Data">
      <p className="mb-3 text-[13px] text-[color:var(--sys-dim)]">Everything is stored on this device only. Export a backup every week, or before clearing your browser.</p>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="sys-btn flex items-center justify-center gap-2" onClick={exportData}>
          <Download size={16} /> Export
        </button>
        <button type="button" className="sys-btn flex items-center justify-center gap-2" onClick={() => file.current?.click()}>
          <Upload size={16} /> Import
        </button>
      </div>
      <input
        ref={file}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void importData(f);
          e.target.value = "";
        }}
      />
      {!confirmReset ? (
        <button type="button" className="sys-btn is-danger mt-2 w-full" onClick={() => setConfirmReset(true)}>
          Reset all progress
        </button>
      ) : (
        <div className="mt-2 border border-[color:var(--sys-red)] p-3">
          <p className="mb-2 text-[13.5px] text-[#fecdd3]">This erases your level, quests, logs and trackers on this device. Export first if unsure.</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="sys-btn" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="sys-btn is-danger"
              onClick={() => {
                dispatch({ type: "replace", game: newGame() });
                setConfirmReset(false);
                setMsg("Progress reset.");
              }}
            >
              Erase
            </button>
          </div>
        </div>
      )}
      {msg && (
        <p className="sys-mono mt-2 text-[12px] text-[color:var(--sys-accent)]" role="status">
          {msg}
        </p>
      )}
    </Panel>
  );
}

function InstallPanel() {
  return (
    <Panel title="Install on your phone">
      <div className="space-y-3 text-[14px] leading-snug">
        <div>
          <p className="sys-mono mb-0.5 text-[12px] text-[color:var(--sys-accent)]">Android (Chrome)</p>
          <p>Open this page → ⋮ menu → “Add to Home screen” or “Install app”.</p>
        </div>
        <div>
          <p className="sys-mono mb-0.5 text-[12px] text-[color:var(--sys-accent)]">iPhone (Safari)</p>
          <p>Open this page in Safari → Share button → “Add to Home Screen”.</p>
        </div>
        <p className="text-[12.5px] text-[color:var(--sys-dim)]">After the first load it works offline. On iPhone, the home-screen app keeps its own storage, separate from Safari: use it from the icon, or move data across with Export and Import.</p>
      </div>
    </Panel>
  );
}
