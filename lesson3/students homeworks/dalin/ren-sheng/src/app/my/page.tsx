"use client";

import { useUserStore } from "@/stores/useUserStore";
import { MODULES, getModule } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/card";
import { exportJSON, importJSON } from "@/lib/storage";
import { useRef, useState } from "react";
import { Download, Upload, Trash2, FileText, Calendar } from "lucide-react";

function buildMarkdown(state: ReturnType<typeof useUserStore.getState>) {
  const date = new Date().toLocaleDateString("zh-CN");
  const lines: string[] = [];
  lines.push(`# 我的人生算法清单`);
  lines.push(``);
  lines.push(`> 导出时间: ${date}`);
  lines.push(``);
  lines.push(`## 学习进度`);
  lines.push(``);
  lines.push(`已完成 ${state.completedModules.length} / ${MODULES.length} 个模块:`);
  lines.push(``);
  for (const slug of state.completedModules) {
    const m = getModule(slug);
    if (m) lines.push(`- ✓ ${m.title} (${m.englishTitle})`);
  }
  lines.push(``);

  if (state.reflections.length > 0) {
    lines.push(`## 我的反思 (${state.reflections.length} 条)`);
    lines.push(``);
    for (const r of state.reflections) {
      const m = getModule(r.moduleSlug);
      lines.push(`### ${m?.title ?? r.moduleSlug} · ${new Date(r.createdAt).toLocaleDateString("zh-CN")}`);
      lines.push(``);
      lines.push(`**问题:** ${r.question}`);
      lines.push(``);
      lines.push(`**我的答案:**`);
      lines.push(``);
      lines.push(r.answer);
      lines.push(``);
    }
  }

  if (state.decisionJournal.length > 0) {
    lines.push(`## 我的决策日志 (${state.decisionJournal.length} 份)`);
    lines.push(``);
    for (const d of state.decisionJournal) {
      lines.push(`### ${d.decision}`);
      lines.push(``);
      lines.push(`- 记录于: ${new Date(d.createdAt).toLocaleDateString("zh-CN")}`);
      lines.push(`- 复盘日: ${new Date(d.reviewAt).toLocaleDateString("zh-CN")}`);
      lines.push(`- **预测结果 (${d.predictedProbability}%):** ${d.predictedOutcome}`);
      lines.push(`- **依据:** ${d.reasoning}`);
      if (d.unknowns) lines.push(`- **未知:** ${d.unknowns}`);
      lines.push(``);
    }
  }

  if (state.biasResults) {
    lines.push(`## 偏差测试结果`);
    lines.push(``);
    lines.push(`测试时间: ${new Date(state.biasResults.takenAt).toLocaleDateString("zh-CN")}`);
    lines.push(``);
    for (const [k, v] of Object.entries(state.biasResults.scores)) {
      lines.push(`- ${k}: 中招 ${v} 次`);
    }
    lines.push(``);
  }

  return lines.join("\n");
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function MyListPage() {
  const state = useUserStore();
  const reset = useUserStore((s) => s.reset);
  const loadFromImport = useUserStore((s) => s.loadFromImport);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const handleExportMd = () => {
    download(`人生算法清单-${new Date().toISOString().slice(0, 10)}.md`, buildMarkdown(state), "text/markdown;charset=utf-8");
  };

  const handleExportJson = () => {
    download(`人生算法-备份-${new Date().toISOString().slice(0, 10)}.json`, exportJSON(state), "application/json;charset=utf-8");
  };

  const handleImport = () => fileInputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const parsed = importJSON(text);
      if (parsed) {
        loadFromImport(parsed);
        setImportMessage("✓ 导入成功");
      } else {
        setImportMessage("× 文件无效或版本不兼容");
      }
      setTimeout(() => setImportMessage(null), 3000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("确认清空所有数据?这个操作无法撤销。")) {
      reset();
    }
  };

  const hasData =
    state.completedModules.length > 0 ||
    state.reflections.length > 0 ||
    state.decisionJournal.length > 0 ||
    state.biasResults !== null;

  return (
    <div className="max-w-content mx-auto px-4 md:px-8 pb-16">
      <div className="pt-12 md:pt-16 pb-10 border-b border-border">
        <h1 className="text-h1 text-text-primary mb-3">我的清单</h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
          所有数据仅存储在你这台浏览器的本地。换设备 / 清缓存会丢失,请定期导出 JSON 作为备份。
        </p>
      </div>

      {/* 工具栏 */}
      <div className="my-8 flex flex-wrap gap-3">
        <Button onClick={handleExportMd} disabled={!hasData}>
          <FileText className="w-4 h-4" />
          导出 Markdown 手册
        </Button>
        <Button onClick={handleExportJson} variant="secondary" disabled={!hasData}>
          <Download className="w-4 h-4" />
          导出 JSON 备份
        </Button>
        <Button onClick={handleImport} variant="secondary">
          <Upload className="w-4 h-4" />
          从 JSON 导入
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFile}
        />
        {hasData && (
          <Button onClick={handleReset} variant="ghost" className="ml-auto text-warn hover:bg-warn/10">
            <Trash2 className="w-4 h-4" />
            清空所有数据
          </Button>
        )}
      </div>

      {importMessage && <Callout variant="insight">{importMessage}</Callout>}

      {!hasData && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-text-muted mb-4">还没有任何数据。</p>
          <Button onClick={() => (window.location.href = "/")}>从首页开始</Button>
        </div>
      )}

      {/* 模块进度 */}
      {state.completedModules.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h2 text-text-primary mb-4">学习进度</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {MODULES.map((m) => {
              const done = state.completedModules.includes(m.slug);
              return (
                <div
                  key={m.slug}
                  className={
                    "rounded-lg border p-3 text-center text-sm " +
                    (done ? "border-accent bg-accent/10 text-accent" : "border-border text-text-muted")
                  }
                >
                  <div className="font-mono text-xs mb-1">{String(m.number).padStart(2, "0")}</div>
                  <div className="font-medium">{m.title}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 反思 */}
      {state.reflections.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h2 text-text-primary mb-4">
            我的反思 <span className="text-text-muted text-base font-normal">({state.reflections.length})</span>
          </h2>
          <div className="space-y-3">
            {state.reflections.map((r) => {
              const m = getModule(r.moduleSlug);
              return (
                <div key={r.id} className="rounded-xl border border-border bg-bg-card p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-bg-subtle text-text-secondary">
                      {m?.title ?? r.moduleSlug}
                    </span>
                    <span className="text-text-muted">
                      {new Date(r.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary italic mb-2">{r.question}</p>
                  <p className="text-text-primary leading-relaxed">{r.answer}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 决策日志 */}
      {state.decisionJournal.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h2 text-text-primary mb-4">
            决策日志 <span className="text-text-muted text-base font-normal">({state.decisionJournal.length})</span>
          </h2>
          <div className="space-y-3">
            {state.decisionJournal.map((d) => {
              const reviewAt = new Date(d.reviewAt);
              const isPast = reviewAt < new Date();
              return (
                <div key={d.id} className="rounded-xl border border-border bg-bg-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-medium text-text-primary">{d.decision}</h3>
                    <span
                      className={
                        "text-xs flex items-center gap-1 shrink-0 " +
                        (isPast ? "text-accent" : "text-text-muted")
                      }
                    >
                      <Calendar className="w-3 h-3" />
                      {isPast ? "可复盘" : reviewAt.toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  <div className="text-sm space-y-1.5 text-text-secondary leading-relaxed">
                    <p>
                      <strong className="text-text-primary">预测:</strong>{" "}
                      {d.predictedOutcome}{" "}
                      <span className="text-accent font-mono">({d.predictedProbability}%)</span>
                    </p>
                    <p>
                      <strong className="text-text-primary">依据:</strong> {d.reasoning}
                    </p>
                    {d.unknowns && (
                      <p>
                        <strong className="text-text-primary">未知:</strong> {d.unknowns}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
