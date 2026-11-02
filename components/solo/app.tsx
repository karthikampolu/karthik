"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock, ListChecks, Settings as Cog, UserRound } from "lucide-react";
import { SystemProvider, useSystem } from "./store";
import { LevelFlash, Popups } from "./ui";
import Status from "./status";
import Quests from "./quests";
import Schedule from "./schedule";
import Stats from "./stats";
import Settings from "./settings";
import { isComplete, questsFor } from "./state";

const TABS = [
  { id: "status", label: "Status", Icon: UserRound },
  { id: "quests", label: "Quests", Icon: ListChecks },
  { id: "schedule", label: "Schedule", Icon: Clock },
  { id: "stats", label: "Stats", Icon: BarChart3 },
  { id: "settings", label: "Settings", Icon: Cog },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function SystemApp() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sololevling-sw.js", { scope: "/sololevling" })
      .then(async () => {
        // Hand the worker every asset this page loaded so the app opens offline next time.
        const reg = await navigator.serviceWorker.ready;
        const urls = [location.pathname, ...performance.getEntriesByType("resource").map((e) => e.name)].filter(
          (u) => u.startsWith("/") || u.startsWith(location.origin),
        );
        reg.active?.postMessage({ type: "cache", urls });
      })
      .catch(() => {
        /* offline support is optional */
      });
  }, []);

  return (
    <SystemProvider>
      <Shell />
    </SystemProvider>
  );
}

function Shell() {
  const [tab, setTab] = useState<TabId>("status");
  const { state } = useSystem();
  const { game: g, today } = state;
  const log = g.days[today];
  const left = log ? questsFor(g.settings, today).filter((q) => !isComplete(g.settings, q, log, today)).length : 0;
  const pen = log?.penalties.filter((p) => !p.cleared).length ?? 0;

  return (
    <div className="solo-root">
      <div className="relative mx-auto max-w-md px-4 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[calc(16px+env(safe-area-inset-top))]">
        <header className="mb-4 flex items-center justify-between">
          <p className="sys-title text-[13px]">◆ System</p>
          <p className="sys-mono text-[11px] text-[color:var(--sys-dim)]">{today}</p>
        </header>
        <div>
          {tab === "status" && <Status />}
          {tab === "quests" && <Quests />}
          {tab === "schedule" && <Schedule />}
          {tab === "stats" && <Stats />}
          {tab === "settings" && <Settings />}
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--sys-line)] bg-[#030812]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
        aria-label="Screens"
      >
        <div className="mx-auto grid max-w-md grid-cols-5">
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id;
            const badge = id === "quests" ? pen || left : 0;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTab(id);
                  window.scrollTo({ top: 0 });
                }}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-[64px] flex-col items-center justify-center gap-1 transition ${
                  active ? "text-[color:var(--sys-accent)]" : "text-[color:var(--sys-dim)]"
                }`}
              >
                {active && <span className="absolute inset-x-3 top-0 h-[2px] bg-[color:var(--sys-accent)] shadow-[0_0_10px_#38bdf8]" />}
                <Icon size={21} strokeWidth={active ? 2.2 : 1.7} />
                <span className="sys-mono text-[10px] uppercase tracking-[0.1em]">{label}</span>
                {badge > 0 && (
                  <span
                    className={`sys-mono absolute right-[18%] top-2 min-w-[18px] px-1 text-[10px] leading-[18px] ${
                      pen ? "bg-[#e11d48] text-white" : "bg-[#0ea5e9] text-[#031022]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <LevelFlash />
      <Popups />
    </div>
  );
}
