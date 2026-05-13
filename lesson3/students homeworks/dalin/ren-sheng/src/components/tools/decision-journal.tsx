"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/card";
import { useUserStore } from "@/stores/useUserStore";
import { Slider } from "@/components/ui/slider";
import { Calendar, Check, Trash2, Download } from "lucide-react";

function buildICS(decision: string, reviewAt: string): string {
  const dt = new Date(reviewAt);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const dtStart = fmt(dt);
  const dtEnd = fmt(new Date(dt.getTime() + 30 * 60 * 1000));
  const uid = `${Date.now()}@ren-sheng`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ren-sheng//decision-journal//ZH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:【人生算法】决策复盘 — ${decision.slice(0, 40)}`,
    `DESCRIPTION:回到「我的清单」复盘当时的决策日志,看看实际结果与你预测的差距。`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function DecisionJournal() {
  const journal = useUserStore((s) => s.decisionJournal);
  const addLog = useUserStore((s) => s.addDecisionLog);
  const removeLog = useUserStore((s) => s.removeDecisionLog);

  const [decision, setDecision] = useState("");
  const [predictedOutcome, setPredictedOutcome] = useState("");
  const [probability, setProbability] = useState(60);
  const [reasoning, setReasoning] = useState("");
  const [unknowns, setUnknowns] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    decision.trim().length > 5 &&
    predictedOutcome.trim().length > 5 &&
    reasoning.trim().length > 5;

  const handleSubmit = () => {
    addLog({
      decision: decision.trim(),
      predictedOutcome: predictedOutcome.trim(),
      predictedProbability: probability,
      reasoning: reasoning.trim(),
      unknowns: unknowns.trim(),
    });
    setSubmitted(true);
    setDecision("");
    setPredictedOutcome("");
    setReasoning("");
    setUnknowns("");
    setProbability(60);
  };

  const downloadCalendarReminder = (decision: string, reviewAt: string) => {
    const ics = buildICS(decision, reviewAt);
    downloadICS(ics, `decision-review-${reviewAt.slice(0, 10)}.ics`);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-5">
        <h2 className="text-h2 text-text-primary">写一份决策日志</h2>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            ① 你正在做的决定是什么?
          </label>
          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            rows={2}
            placeholder="一句话写清:你正在决定什么、有哪几个选项..."
            className="w-full p-3 rounded-lg border border-border bg-bg-card text-text-primary text-[0.95rem] focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            ② 你预测最可能的结果?
          </label>
          <textarea
            value={predictedOutcome}
            onChange={(e) => setPredictedOutcome(e.target.value)}
            rows={2}
            placeholder="例:3 个月内拿到第二轮融资,对方接受 X 估值..."
            className="w-full p-3 rounded-lg border border-border bg-bg-card text-text-primary text-[0.95rem] focus:border-accent focus:outline-none"
          />
        </div>

        <Slider
          label="③ 你赋予这个预测多少概率?"
          value={probability}
          min={5}
          max={95}
          step={5}
          unit="%"
          format={(v) => v.toString()}
          onChange={setProbability}
          hint="用百分比强迫自己量化判断,而不是"我觉得很可能""
        />

        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            ④ 你的依据是什么?
          </label>
          <textarea
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            rows={3}
            placeholder="2-3 个事实或推理..."
            className="w-full p-3 rounded-lg border border-border bg-bg-card text-text-primary text-[0.95rem] focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            ⑤ 你不知道什么?
          </label>
          <textarea
            value={unknowns}
            onChange={(e) => setUnknowns(e.target.value)}
            rows={2}
            placeholder="哪些信息是关键但未知的?..."
            className="w-full p-3 rounded-lg border border-border bg-bg-card text-text-primary text-[0.95rem] focus:border-accent focus:outline-none"
          />
        </div>

        <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full">
          保存到我的清单 (3 个月后回看)
        </Button>

        {submitted && (
          <Callout variant="insight">
            <Check className="w-5 h-5 text-data-1 inline mb-1" />
            已保存。
            <strong> 强烈建议导出 .ics 日历提醒</strong> — 浏览器通知不可靠,日历最可靠。
            点击下方任一日志条目右侧的"日历提醒"按钮即可。
          </Callout>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-h2 text-text-primary">
          已记录 <span className="text-accent">{journal.length}</span> 份
        </h2>
        {journal.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-text-muted">
            还没有日志。第一份会出现在这里。
          </div>
        ) : (
          <div className="space-y-3">
            {journal.map((log) => {
              const reviewDate = new Date(log.reviewAt);
              const isPastReview = reviewDate < new Date();
              return (
                <div
                  key={log.id}
                  className="rounded-xl border border-border bg-bg-card p-4 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-text-primary line-clamp-2">
                      {log.decision}
                    </p>
                    <button
                      onClick={() => removeLog(log.id)}
                      className="text-text-muted hover:text-warn opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      aria-label="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-text-secondary mb-2 leading-relaxed">
                    <strong>预测:</strong> {log.predictedOutcome}
                    <span className="ml-2 text-accent font-mono">
                      ({log.predictedProbability}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>
                      记于 {new Date(log.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          isPastReview ? "text-accent font-semibold" : "text-text-muted"
                        }
                      >
                        {isPastReview ? "可以复盘了" : `复盘于 ${reviewDate.toLocaleDateString("zh-CN")}`}
                      </span>
                      <button
                        onClick={() => downloadCalendarReminder(log.decision, log.reviewAt)}
                        className="text-data-1 hover:text-data-2 inline-flex items-center gap-1"
                        title="下载日历提醒 (.ics)"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Callout variant="info">
          <strong>3 个月后,请回到这里。</strong>
          看看实际结果与你当时预测的差距 — 你会发现,自己的判断远没有事后回忆里那么准。
          这就是反馈训练的真正价值。
        </Callout>
      </div>
    </div>
  );
}
