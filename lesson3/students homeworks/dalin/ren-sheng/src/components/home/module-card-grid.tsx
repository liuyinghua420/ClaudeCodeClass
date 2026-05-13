"use client";

import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { ModuleMeta } from "@/data/modules";

const ICONS = ["👁", "⚖", "↗", "⚡", "↺", "∞", "△"];

export function ModuleCardGrid({ modules }: { modules: ModuleMeta[] }) {
  const completed = useUserStore((s) => s.completedModules);
  const hydrated = useUserStore((s) => s.hydrated);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {modules.map((m, i) => {
        const isDone = hydrated && completed.includes(m.slug);
        return (
          <Link
            key={m.slug}
            href={`/m/${m.slug}`}
            className="group relative rounded-xl border border-border bg-bg-card p-5 hover:border-accent hover:shadow-lg transition-all duration-200 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-meta font-mono text-text-muted">
                  {String(m.number).padStart(2, "0")}
                </span>
                <span
                  className="text-xl font-serif text-accent"
                  aria-hidden
                >
                  {ICONS[i % ICONS.length]}
                </span>
              </div>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-data-1" aria-label="已完成" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-h3 text-text-primary mb-1.5">{m.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {m.hook}
              </p>
              <p className="text-xs text-text-muted italic leading-relaxed">
                {m.coreQuestion}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border">
              <span>{m.duration}</span>
              <span className="px-2 py-0.5 rounded bg-bg-subtle text-text-secondary">
                {m.level}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
