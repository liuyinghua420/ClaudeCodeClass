const STORAGE_VERSION = 1;
const STORAGE_KEY = "ren-sheng:v1";

export interface PersistedState {
  version: number;
  completedModules: string[];
  reflections: Reflection[];
  biasResults: BiasResult | null;
  toolHistory: ToolHistoryEntry[];
  decisionJournal: DecisionLog[];
  lastVisitedAt: string | null;
}

export interface Reflection {
  id: string;
  moduleSlug: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface BiasResult {
  scores: Record<string, number>;
  takenAt: string;
}

export interface ToolHistoryEntry {
  toolSlug: string;
  params: Record<string, unknown>;
  summary: string;
  savedAt: string;
}

export interface DecisionLog {
  id: string;
  decision: string;
  predictedOutcome: string;
  predictedProbability: number;
  reasoning: string;
  unknowns: string;
  createdAt: string;
  reviewAt: string;
}

export function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (parsed.version !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function exportJSON(state: PersistedState): string {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text: string): PersistedState | null {
  try {
    const parsed = JSON.parse(text) as PersistedState;
    if (typeof parsed !== "object" || parsed === null) return null;
    if (parsed.version !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getStorageUsage(): { used: number; quota: number; ratio: number } {
  if (typeof window === "undefined") return { used: 0, quota: 0, ratio: 0 };
  let used = 0;
  for (const key in window.localStorage) {
    const v = window.localStorage.getItem(key);
    if (v) used += v.length + key.length;
  }
  const quota = 5 * 1024 * 1024;
  return { used, quota, ratio: used / quota };
}
