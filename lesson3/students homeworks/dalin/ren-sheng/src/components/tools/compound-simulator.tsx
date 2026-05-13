"use client";

import { useMemo, useState } from "react";
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
import { Slider, NumberInput } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export function CompoundSimulator() {
  const [principal, setPrincipal] = useState(100);
  const [dailyRate, setDailyRate] = useState(0.5); // 百分比, 每天
  const [years, setYears] = useState(10);
  const [interruptionDays, setInterruptionDays] = useState(0);

  const data = useMemo(() => {
    const days = years * 365;
    const r = dailyRate / 100;
    const arr: { day: number; year: number; compound: number; linear: number; interrupted?: number }[] = [];
    let v = principal;
    let interrupted = principal;
    let interruptedActive = interruptionDays > 0;
    const linearTotal = principal * (1 + r * days);
    for (let d = 0; d <= days; d++) {
      v = principal * Math.pow(1 + r, d);
      if (interruptedActive) {
        if (d < days * 0.4 || d > days * 0.4 + interruptionDays) {
          interrupted = interrupted * (1 + r);
        }
      }
      const linear = principal + (linearTotal - principal) * (d / days);
      if (d % Math.max(1, Math.floor(days / 80)) === 0 || d === days) {
        arr.push({
          day: d,
          year: +(d / 365).toFixed(2),
          compound: +v.toFixed(4),
          linear: +linear.toFixed(4),
          interrupted: interruptionDays > 0 ? +interrupted.toFixed(4) : undefined,
        });
      }
    }
    return arr;
  }, [principal, dailyRate, years, interruptionDays]);

  const finalCompound = data[data.length - 1]?.compound ?? principal;
  const finalLinear = data[data.length - 1]?.linear ?? principal;
  const ratio = finalCompound / principal;

  const tenXYear = useMemo(() => {
    if (dailyRate <= 0) return null;
    const r = dailyRate / 100;
    const days = Math.log(10) / Math.log(1 + r);
    return days / 365;
  }, [dailyRate]);

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <aside className="space-y-6">
        <NumberInput
          label="起始值"
          value={principal}
          min={1}
          step={1}
          onChange={setPrincipal}
        />
        <Slider
          label="每日变化率"
          value={dailyRate}
          min={-2}
          max={2}
          step={0.05}
          unit="%"
          format={(v) => v.toFixed(2)}
          onChange={setDailyRate}
          hint="每天 0.27% ≈ 年化 1.01^365 = 37.78x"
        />
        <Slider
          label="时间跨度"
          value={years}
          min={1}
          max={30}
          step={1}
          unit=" 年"
          format={(v) => v.toString()}
          onChange={setYears}
        />
        <Slider
          label="中断天数 (40% 时间点处停止)"
          value={interruptionDays}
          min={0}
          max={365}
          step={5}
          unit=" 天"
          format={(v) => v.toString()}
          onChange={setInterruptionDays}
          hint="模拟"中断 30 天"对最终值的影响"
        />
      </aside>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="终值" value={formatNumber(finalCompound)} />
          <Stat label="增长倍数" value={`${ratio.toFixed(2)}x`} accent />
          <Stat
            label="到达 10x 所需"
            value={tenXYear ? `${tenXYear.toFixed(1)} 年` : "—"}
          />
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-4 md:p-6">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis
                dataKey="year"
                stroke="rgb(var(--text-muted))"
                tickFormatter={(v) => `${v}y`}
              />
              <YAxis
                stroke="rgb(var(--text-muted))"
                tickFormatter={(v) => formatNumber(v, 0)}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                formatter={(v: number) => formatNumber(v)}
                labelFormatter={(v) => `第 ${v} 年`}
              />
              <Legend />
              <ReferenceLine y={principal} stroke="rgb(var(--text-muted))" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="linear"
                name="线性增长 (你以为的)"
                stroke="rgb(var(--data-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="compound"
                name="复利 (实际)"
                stroke="rgb(var(--data-1))"
                strokeWidth={2.5}
                dot={false}
              />
              {interruptionDays > 0 && (
                <Line
                  type="monotone"
                  dataKey="interrupted"
                  name={`中断 ${interruptionDays} 天`}
                  stroke="rgb(var(--warn))"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Callout variant="insight">
          {dailyRate < 0
            ? `每天 ${dailyRate.toFixed(2)}% 的"负复利"在 ${years} 年后,把 ${principal} 缩到 ${formatNumber(finalCompound)} — 比线性恶化恐怖得多。这就是坏习惯的真实代价。`
            : dailyRate < 0.1
              ? `${dailyRate.toFixed(2)}% 的微小积累,${years} 年后达到 ${ratio.toFixed(2)}x。曲线在最后阶段才显著上扬 — 这正是大多数人放弃的时间点之后。`
              : `${dailyRate.toFixed(2)}% 在 ${years} 年后达到 ${ratio.toFixed(2)}x。注意线性预期 (${(finalLinear / principal).toFixed(2)}x) 与真实复利的差距 — 直觉欺骗了大多数人。`}
        </Callout>

        {interruptionDays > 0 && (
          <Callout variant="warn">
            一次 {interruptionDays} 天的中断,在 {years} 年后让你比"持续投入"少了
            约 {(((finalCompound - (data[data.length - 1]?.interrupted ?? 0)) / finalCompound) * 100).toFixed(1)}%。
            复利不能暂停 — 中断的真实代价是"未来的复利",而不是中断那几天本身。
          </Callout>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div
        className={
          "text-2xl font-mono font-semibold " +
          (accent ? "text-accent" : "text-text-primary")
        }
      >
        {value}
      </div>
    </div>
  );
}
