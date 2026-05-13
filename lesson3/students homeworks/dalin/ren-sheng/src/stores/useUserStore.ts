"use client";

import { create } from "zustand";
import {
  loadState,
  saveState,
  type PersistedState,
  type Reflection,
  type BiasResult,
  type ToolHistoryEntry,
  type DecisionLog,
} from "@/lib/storage";

interface UserState extends PersistedState {
  hydrated: boolean;
  hydrate: () => void;
  markModuleCompleted: (slug: string) => void;
  isModuleCompleted: (slug: string) => boolean;
  addReflection: (r: Omit<Reflection, "id" | "createdAt">) => void;
  removeReflection: (id: string) => void;
  setBiasResult: (r: BiasResult) => void;
  pushToolHistory: (entry: Omit<ToolHistoryEntry, "savedAt">) => void;
  addDecisionLog: (d: Omit<DecisionLog, "id" | "createdAt" | "reviewAt"> & { reviewAt?: string }) => void;
  removeDecisionLog: (id: string) => void;
  reset: () => void;
  loadFromImport: (state: PersistedState) => void;
}

const INITIAL: PersistedState = {
  version: 1,
  completedModules: [],
  reflections: [],
  biasResults: null,
  toolHistory: [],
  decisionJournal: [],
  lastVisitedAt: null,
};

function persist(state: PersistedState) {
  saveState(state);
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useUserStore = create<UserState>((set, get) => ({
  ...INITIAL,
  hydrated: false,
  hydrate: () => {
    const loaded = loadState();
    if (loaded) {
      set({ ...loaded, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },
  markModuleCompleted: (slug) => {
    const current = get();
    if (current.completedModules.includes(slug)) return;
    const next = {
      ...current,
      completedModules: [...current.completedModules, slug],
      lastVisitedAt: new Date().toISOString(),
    };
    set(next);
    persist(stripState(next));
  },
  isModuleCompleted: (slug) => get().completedModules.includes(slug),
  addReflection: (r) => {
    const reflection: Reflection = {
      ...r,
      id: uid(),
      createdAt: new Date().toISOString(),
    };
    const current = get();
    const next = { ...current, reflections: [reflection, ...current.reflections] };
    set(next);
    persist(stripState(next));
  },
  removeReflection: (id) => {
    const current = get();
    const next = { ...current, reflections: current.reflections.filter((r) => r.id !== id) };
    set(next);
    persist(stripState(next));
  },
  setBiasResult: (r) => {
    const current = get();
    const next = { ...current, biasResults: r };
    set(next);
    persist(stripState(next));
  },
  pushToolHistory: (entry) => {
    const item: ToolHistoryEntry = { ...entry, savedAt: new Date().toISOString() };
    const current = get();
    const trimmed = [item, ...current.toolHistory].slice(0, 30);
    const next = { ...current, toolHistory: trimmed };
    set(next);
    persist(stripState(next));
  },
  addDecisionLog: (d) => {
    const reviewAt = d.reviewAt ?? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    const log: DecisionLog = {
      ...d,
      id: uid(),
      createdAt: new Date().toISOString(),
      reviewAt,
    };
    const current = get();
    const next = { ...current, decisionJournal: [log, ...current.decisionJournal] };
    set(next);
    persist(stripState(next));
  },
  removeDecisionLog: (id) => {
    const current = get();
    const next = { ...current, decisionJournal: current.decisionJournal.filter((d) => d.id !== id) };
    set(next);
    persist(stripState(next));
  },
  reset: () => {
    set({ ...INITIAL, hydrated: true });
    persist(INITIAL);
  },
  loadFromImport: (state) => {
    set({ ...state, hydrated: true });
    persist(state);
  },
}));

function stripState(s: UserState | PersistedState): PersistedState {
  return {
    version: 1,
    completedModules: s.completedModules,
    reflections: s.reflections,
    biasResults: s.biasResults,
    toolHistory: s.toolHistory,
    decisionJournal: s.decisionJournal,
    lastVisitedAt: s.lastVisitedAt,
  };
}
