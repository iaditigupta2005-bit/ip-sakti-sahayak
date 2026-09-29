import { useSyncExternalStore } from "react";

// Frontend-only, in-memory demo activity (lasts for the browser session tab; no persistence).
type Activity = { questions: string[]; searches: string[]; sources: string[] };
let state: Activity = { questions: [], searches: [], sources: [] };
const subs = new Set<() => void>();
const EMPTY: Activity = { questions: [], searches: [], sources: [] };

export function recordActivity(kind: keyof Activity, value: string) {
  const v = value.trim();
  if (!v) return;
  state = { ...state, [kind]: [v, ...state[kind].filter(x => x !== v)].slice(0, 3) };
  subs.forEach(fn => fn());
}

export function useDemoActivity() {
  return useSyncExternalStore(
    cb => { subs.add(cb); return () => subs.delete(cb); },
    () => state,
    () => EMPTY,
  );
}
