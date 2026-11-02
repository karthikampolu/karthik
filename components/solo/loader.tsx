"use client";

import dynamic from "next/dynamic";

/** The app reads localStorage on first render, so it only runs in the browser. */
const SystemApp = dynamic(() => import("./app"), {
  ssr: false,
  loading: () => (
    <div className="solo-root flex items-center justify-center">
      <p className="sys-title text-[13px]">Connecting to the System…</p>
    </div>
  ),
});

export default function SystemLoader() {
  return <SystemApp />;
}
