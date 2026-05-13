"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Slider, NumberInput } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";

const PRESETS = [
  { id: "scroll", label: "刷短视频", growthValue: 0 },
  { id: "study", label: "学习一项硬技能", growthValue: 1.05 },
  { id: "exercise", label: "运动 / 健身", growthValue: 1.04 },
  { id: "writing", label: "写作 / 输出", growthValue: 1.06 },
  { id: "deep-work", label: "深度工作", growthValue: 1.07 },
];

export function OpportunityCostComparator() {
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [currentId, setCurrentId] = useState("scroll");
  const [alternativeId, setAlternativeId] = useState("study");
  const [years, setYears] = useState(5);

  const data = useMemo(() => {
    const annualHours = hoursPerDay * 365;
    const totalHours = annualHours * years;
    const current = PRESETS.find((p) => p.id === currentId)!;
    const alt = PRESETS.find((p) => p.id === alternativeId)!;

    const currentValue = totalHours * current.growthValue;
    const altValue = totalHours * Math.pow(alt.growthValue, years);

    return [
      {
        name: `当前选: ${current.label}`,
        value: Math.round(currentValue),
        color: "rgb(var(--data-2))",
      },
      {
        name: `放弃了: ${alt.label}`,
        value: Math.round(altValue),
        color: "rgb(var(--data-1))",
      },
    ];
  }, [hoursPerDay, currentId, alternativeId, years]);

  const ratio = data[1].value / Math.max(data[0].value, 1);
  const totalHours = hoursPerDay * 365 * years;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <aside className="space-y-6">
        <Slider
          label="每天投入时长"
          value={hoursPerDay}
          min={0.5}
          max={4}
          step={0.5}
          unit=" 小时"
          format={(v) => v.toFixed(1)}
          onChange={setHoursPerDay}
          hint="你打算每天花在 A 上的时间"
        />

        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            你正在选 (A)
          </label>
          <select
            value={currentId}
            onChange={(e) => setCurrentId(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-border bg-bg-card text-text-primary"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            你放弃了 (B)
          </label>
          <select
            value={alternativeId}
            onChange={(e) => setAlternativeId(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-border bg-bg-card text-text-primary"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        <Slider
          label="时间跨度"
          value={years}
          min={1}
          max={20}
          step={1}
          unit=" 年"
          format={(v) => v.toString()}
          onChange={setYears}
        />
      </aside>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <div className="text-xs text-text-muted mb-1">投入总时长</div>
            <div className="text-2xl font-mono font-semibold text-text-primary">
              {totalHours.toLocaleString()} 小时
            </div>
          </div>
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <div className="text-xs text-text-muted mb-1">机会成本倍数</div>
            <div className="text-2xl font-mono font-semibold text-accent">
              {ratio.toFixed(2)}x
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-4 md:p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis type="number" stroke="rgb(var(--text-muted))" />
              <YAxis
                dataKey="name"
                type="category"
                width={150}
                stroke="rgb(var(--text-muted))"
                tick={{ fontSize: 13 }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                }}
                formatter={(v: number) => v.toLocaleString()}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Callout variant="insight">
          {ratio > 2
            ? `你不是在"放松 ${hoursPerDay} 小时" — 你是在用 ${years} 年后的 ${data[1].label.replace("放弃了: ", "")} 的复利,交换 ${data[0].label.replace("当前选: ", "")}。前者经过 ${years} 年的复利,价值是后者的 ${ratio.toFixed(2)} 倍。`
            : ratio > 1
              ? `${years} 年后,你放弃的选项的复利价值,是当前选项的 ${ratio.toFixed(2)} 倍。差距还在扩大 — 时间是这个不平等的放大器。`
              : `这两个选项在你设定的参数下,机会成本相近。但请注意:这是数值上的近似,不代表你的"真实生活权重"。`}
        </Callout>

        <p className="text-xs text-text-muted leading-relaxed italic">
          说明:本工具用每日时长 × 增长率 × 年数模拟两类活动的"复利化机会成本"。
          数值不构成精确预测,只为帮助你建立"机会成本不是另一选项的当下价值,而是其复利后的价值"这个直觉。
        </p>
      </div>
    </div>
  );
}
