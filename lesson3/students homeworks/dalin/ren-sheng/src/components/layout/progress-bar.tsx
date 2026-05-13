"use client";

import { useUserStore } from "@/stores/useUserStore";
import { MODULES } from "@/data/modules";

export function ProgressBar() {
  const completed = useUserStore((s) => s.completedModules);
  const hydrated = useUserStore((s) => s.hydrated);
  const ratio = hydrated ? completed.length / MODULES.length : 0;
  return (
    <div className="h-0.5 bg-bg-subtle relative overflow-hidden" aria-hidden>
      <div
        className="h-full bg-accent transition-all duration-500"
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  );
}
