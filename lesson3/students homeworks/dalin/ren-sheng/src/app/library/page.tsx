"use client";

import { useState, useMemo } from "react";
import { LIBRARY, LIBRARY_TYPE_LABELS, type LibraryItem } from "@/data/library";
import { MODULES } from "@/data/modules";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterModule, setFilterModule] = useState<string>("all");
  const [filterLang, setFilterLang] = useState<string>("all");

  const filtered = useMemo(() => {
    return LIBRARY.filter((item) => {
      if (filterType !== "all" && item.type !== filterType) return false;
      if (filterModule !== "all" && !item.modules.includes(filterModule)) return false;
      if (filterLang !== "all" && item.language !== filterLang) return false;
      return true;
    });
  }, [filterType, filterModule, filterLang]);

  const types = ["all", ...Object.keys(LIBRARY_TYPE_LABELS)];

  return (
    <div className="max-w-content mx-auto px-4 md:px-8 pb-16">
      <div className="pt-12 md:pt-16 pb-10 border-b border-border">
        <h1 className="text-h1 text-text-primary mb-3">延伸阅读</h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
          {LIBRARY.length} 项精选资源,覆盖经典书籍、原始论文、关键演讲与持续更新的站点。
          每一条都标注了所属维度与一句价值描述,而非简单堆砌书单。
        </p>
      </div>

      {/* 筛选 */}
      <div className="my-8 flex flex-wrap gap-6 text-sm">
        <FilterRow
          label="类型"
          value={filterType}
          options={[
            { value: "all", label: "全部" },
            ...types.filter((t) => t !== "all").map((t) => ({
              value: t,
              label: LIBRARY_TYPE_LABELS[t as LibraryItem["type"]],
            })),
          ]}
          onChange={setFilterType}
        />
        <FilterRow
          label="模块"
          value={filterModule}
          options={[
            { value: "all", label: "全部" },
            ...MODULES.map((m) => ({ value: m.slug, label: m.title })),
          ]}
          onChange={setFilterModule}
        />
        <FilterRow
          label="语言"
          value={filterLang}
          options={[
            { value: "all", label: "全部" },
            { value: "zh", label: "中文" },
            { value: "en", label: "英文" },
          ]}
          onChange={setFilterLang}
        />
      </div>

      <div className="text-meta mb-4 text-text-muted">
        共 {filtered.length} 项
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <LibraryCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-text-muted">
            没有匹配的资源
          </div>
        )}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-text-muted text-sm">{label}:</span>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
            value === opt.value
              ? "border-accent bg-accent text-white"
              : "border-border bg-bg-card text-text-secondary hover:border-accent"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function LibraryCard({ item }: { item: LibraryItem }) {
  const moduleNames = item.modules
    .map((slug) => MODULES.find((m) => m.slug === slug)?.title)
    .filter(Boolean);

  const Wrapper: React.ElementType = item.url ? "a" : "div";
  const wrapperProps = item.url
    ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      className={cn(
        "rounded-xl border border-border bg-bg-card p-5 block transition-all",
        item.url && "hover:border-accent hover:shadow-md cursor-pointer group"
      )}
      {...wrapperProps}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-xs">
            <span className="px-2 py-0.5 rounded bg-bg-subtle text-text-secondary font-medium">
              {LIBRARY_TYPE_LABELS[item.type]}
            </span>
            {item.year && (
              <span className="text-text-muted font-mono">{item.year}</span>
            )}
            {item.duration && (
              <span className="text-text-muted">· {item.duration}</span>
            )}
          </div>
          <h3 className="text-h3 text-text-primary mb-0.5 group-hover:text-accent transition-colors">
            {item.title}
            {item.url && (
              <ExternalLink className="inline w-3.5 h-3.5 ml-1.5 opacity-50 group-hover:opacity-100" />
            )}
          </h3>
          <p className="text-sm text-text-muted">
            {item.author}
          </p>
        </div>
      </div>
      <p className="text-text-secondary leading-relaxed text-[0.95rem] mb-3">
        {item.hook}
      </p>
      <div className="flex flex-wrap gap-1.5 text-xs">
        {moduleNames.map((name) => (
          <span key={name} className="text-accent">#{name}</span>
        ))}
        {item.tags.map((tag) => (
          <span key={tag} className="text-text-muted">#{tag}</span>
        ))}
      </div>
    </Wrapper>
  );
}
