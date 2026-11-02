/** Tiny synthesized sound effects (no audio files, so they work offline). */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.08) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = a.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export type Sfx = "quest" | "level" | "penalty" | "warning" | "daily" | "info" | "tap";

export function play(sfx: Sfx) {
  switch (sfx) {
    case "tap":
      tone(880, 0, 0.05, "square", 0.03);
      break;
    case "quest":
    case "info":
      tone(660, 0, 0.12, "triangle");
      tone(990, 0.09, 0.18, "triangle");
      break;
    case "daily":
      tone(523, 0, 0.15, "sine");
      tone(784, 0.12, 0.15, "sine");
      tone(1047, 0.24, 0.3, "sine");
      break;
    case "level":
      [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.08, 0.25, "triangle", 0.07));
      break;
    case "penalty":
    case "warning":
      tone(196, 0, 0.25, "sawtooth", 0.06);
      tone(147, 0.22, 0.35, "sawtooth", 0.06);
      break;
  }
}
