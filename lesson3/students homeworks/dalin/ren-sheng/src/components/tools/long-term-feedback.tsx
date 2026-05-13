"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";

const ACTIVITIES = [
  { id: "fitness", label: "健身", subjFn: subjectiveFast, objFn: objectiveSlow },
  { id: "skill", label: "学习一项技能", subjFn: subjectiveFast, objFn: objectiveSlow },
  { id: "writing", label: "写作 / 输出", subjFn: subjectiveSlow, objFn: objectiveSlow },
  { id: "investing", label: "投资", subjFn: subjectiveFlat, objFn: objectiveCompound },
  { id: "relationship", label: "建立关系", subjFn: subjectiveSlow, objFn: objectiveSudden },
];

function subjectiveFast(t: number) {
  return 80 * (1 - Math.exp(-t / 0.3)) - 30 * Math.exp(-Math.pow((t - 1.2) / 0.6, 2));
}
function subjectiveSlow(t: number) {
  return 30 * (1 - Math.exp(-t / 0.8)) + 5 * Math.sin(t * 4);
}
function subjectiveFlat(t: number) {
  return 25 + 10 * Math.sin(t * 3);
}

function objectiveSlow(t: number) {
  return 100 * Math.pow(t / 5, 1.7);
}
function objectiveCompound(t: number) {
  return 100 * (Math.pow(1.5, t) - 1) / (Math.pow(1.5, 5) - 1);
}
function objectiveSudden(t: number) {
  return Math.max(0, 100 * (1 / (1 + Math.exp(-2 * (t - 2.5)))));
}

export function LongTermFeedback() {
  const [activityId, setActivityId] = useState("skill");
  const [hoursPerDay, setHoursPerDay] = useState(1);

  const activity = ACTIVITIES.find((a) => a.id === activityId)!;

  const data = useMemo(() => {
    const arr = [];
    const factor = hoursPerDay;
    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * 5;
      arr.push({
        year: +t.toFixed(2),
        subjective: Math.max(0, activity.subjFn(t) * Math.sqrt(factor)),
        objective: Math.max(0, activity.objFn(t) * factor),
      });
    }
    return arr;
  }, [activity, hoursPerDay]);

  const dropPoints = [
    { x: 0.25, label: "3 个月" },
    { x: 1, label: "1 年" },
    { x: 3, label: "3 年" },
  ];

  const finalObj = data[data.length - 1].objective;
  const finalSubj = data[data.length - 1].subjective;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      <aside className="space-y-6">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">活动</label>
          <select
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-border bg-bg-card text-text-primary"
          >
            {ACTIVITIES.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        </div>
        <Slider
          label="每天投入"
          value={hoursPerDay}
          min={0.25}
          max={3}
          step={0.25}
          unit=" 小时"
          format={(v) => v.toFixed(2)}
          onChange={setHoursPerDay}
        />

        <div className="rounded-xl bg-bg-subtle p-4 text-xs text-text-secondary leading-relaxed">
          <p className="font-semibold text-text-primary mb-2">两条曲线的含义</p>
          <p className="mb-2"><span className="inline-block w-3 h-0.5 bg-data-1 align-middle mr-1.5" /><strong>主观感受</strong>: 你"感受到"的进步</p>
          <p><span className="inline-block w-3 h-0.5 bg-data-2 align-middle mr-1.5" /><strong>客观成果</strong>: 你"实际"的水平</p>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-bg-card p-4 md:p-6">
          <h4 className="text-sm text-text-muted mb-1">5 年时间窗口</h4>
          <p className="text-xs text-text-muted mb-4 italic">
            红色虚线标记的是常见"放弃高发期" — 主观感受最低、但客观水平正在加速积累的时段
          </p>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis
                dataKey="year"
                stroke="rgb(var(--text-muted))"
                tickFormatter={(v) => `${v}y`}
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
              />
              <YAxis stroke="rgb(var(--text-muted))" />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                labelFormatter={(v) => `第 ${v} 年`}
                formatter={(v: number) => v.toFixed(1)}
              />
              <Legend />
              {dropPoints.map((p, i) => (
                <ReferenceLine
                  key={i}
                  x={p.x}
                  stroke="rgb(var(--warn))"
                  strokeDasharray="3 3"
                  label={{ value: p.label, position: "top", fontSize: 11, fill: "rgb(var(--warn))" }}
                />
              ))}
              <Line
                type="monotone"
                dataKey="subjective"
                name="主观感受"
                stroke="rgb(var(--data-1))"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="objective"
                name="客观成果"
                stroke="rgb(var(--data-2))"
                strokeWidth={2.5}
                strokeDasharray="5 3"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <div className="text-xs text-text-muted mb-1">5 年后 · 客观水平</div>
            <div className="text-2xl font-mono font-semibold text-data-2">{finalObj.toFixed(0)}</div>
          </div>
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <div className="text-xs text-text-muted mb-1">5 年后 · 主观感受</div>
            <div className="text-2xl font-mono font-semibold text-data-1">{finalSubj.toFixed(0)}</div>
          </div>
        </div>

        <Callout variant="insight">
          注意 3 个月、1 年、3 年这三个红色标记 — 这些是放弃高发期。
          它们的共同特征是:<strong>主观感受低于客观水平</strong>。
          人是被"感受"驱动的,所以"感觉没进步"会让你想停下,而你的真实水平此时正在静悄悄地积累。
          能跨过这些点的人,不是更努力,而是<strong>识别这是放弃高发期,选择不放弃</strong>。
        </Callout>

        <p className="text-xs text-text-muted leading-relaxed italic">
          模型说明:本工具用启发式曲线模拟,数值不构成精确预测,只为帮助你建立"主观感受与客观成果不重合"这一直觉。
        </p>
      </div>
    </div>
  );
}
