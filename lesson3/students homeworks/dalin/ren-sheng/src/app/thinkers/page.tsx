import Link from "next/link";
import { THINKERS } from "@/data/thinkers";
import { MODULES } from "@/data/modules";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "思想家专题 — 人生算法",
  description: "12 位塑造人生算法概念的思想家:芒格、纳瓦尔、巴菲特、Dalio、Kahneman、Taleb、Bezos 等。",
};

export default function ThinkersPage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-8 pb-16">
      <div className="pt-12 md:pt-16 pb-10 border-b border-border">
        <h1 className="text-h1 text-text-primary mb-3">思想家</h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
          12 位塑造了"人生算法"概念体系的思想家,横跨 18 世纪到 21 世纪,
          覆盖心理学、行为经济学、决策科学、投资、概率论。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {THINKERS.map((t) => {
          const moduleTitles = t.modules
            .map((slug) => MODULES.find((m) => m.slug === slug)?.title)
            .filter(Boolean);
          return (
            <Link
              key={t.slug}
              href={`/thinkers/${t.slug}`}
              className="group rounded-xl border border-border bg-bg-card p-6 hover:border-accent hover:shadow-lg transition-all flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ background: t.accent }}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-h3 text-text-primary mb-0.5 truncate">
                    {t.name}
                  </h3>
                  <p className="text-xs text-text-muted truncate">{t.role}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent shrink-0 mt-1" />
              </div>
              <p className="text-text-secondary text-[0.95rem] leading-relaxed flex-1">
                {t.oneLine}
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs pt-3 border-t border-border">
                {moduleTitles.map((name) => (
                  <span key={name} className="text-accent">#{name}</span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
