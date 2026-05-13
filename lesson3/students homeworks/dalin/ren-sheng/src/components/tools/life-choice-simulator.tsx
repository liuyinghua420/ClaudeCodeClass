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
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

interface PathConfig {
  label: string;
  meanReturn: number;
  volatility: number;
  ruinProb: number;
}

function simulate(config: PathConfig, paths: number, years: number): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < paths; i++) {
    const trajectory: number[] = [100];
    let value = 100;
    let ruined = false;
    for (let y = 0; y < years; y++) {
      if (ruined) {
        trajectory.push(0);
        continue;
      }
      if (Math.random() < config.ruinProb / years) {
        value = 0;
        ruined = true;
      } else {
        // Box-Muller for gaussian
        const u1 = Math.max(Math.random(), 1e-9);
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const r = config.meanReturn + config.volatility * z;
        value = Math.max(0, value * (1 + r));
      }
      trajectory.push(value);
    }
    result.push(trajectory);
  }
  return result;
}

function summarize(paths: number[][]) {
  const finals = paths.map((p) => p[p.length - 1]).sort((a, b) => a - b);
  const ruinCount = finals.filter((v) => v === 0).length;
  return {
    p5: finals[Math.floor(finals.length * 0.05)],
    p50: finals[Math.floor(finals.length * 0.5)],
    p95: finals[Math.floor(finals.length * 0.95)],
    mean: finals.reduce((a, b) => a + b, 0) / finals.length,
    ruinRate: ruinCount / finals.length,
  };
}

const PATH_COUNT = 100;

export function LifeChoiceSimulator() {
  const [years, setYears] = useState(5);
  const [aMean, setAMean] = useState(20);
  const [aVol, setAVol] = useState(15);
  const [aRuin, setARuin] = useState(2);
  const [bMean, setBMean] = useState(8);
  const [bVol, setBVol] = useState(5);
  const [bRuin, setBRuin] = useState(0);
  const [seed, setSeed] = useState(0);

  const result = useMemo(() => {
    void seed;
    const cfgA: PathConfig = { label: "A", meanReturn: aMean / 100, volatility: aVol / 100, ruinProb: aRuin / 100 };
    const cfgB: PathConfig = { label: "B", meanReturn: bMean / 100, volatility: bVol / 100, ruinProb: bRuin / 100 };
    const a = simulate(cfgA, PATH_COUNT, years);
    const b = simulate(cfgB, PATH_COUNT, years);

    const points: { year: number; [k: string]: number }[] = [];
    for (let y = 0; y <= years; y++) {
      const row: { year: number; [k: string]: number } = { year: y };
      a.forEach((p, i) => { row[`a${i}`] = p[y]; });
      b.forEach((p, i) => { row[`b${i}`] = p[y]; });
      points.push(row);
    }
    return {
      points,
      a: summarize(a),
      b: summarize(b),
    };
  }, [years, aMean, aVol, aRuin, bMean, bVol, bRuin, seed]);

  const showA = result.a;
  const showB = result.b;
  const aBetter = showA.mean > showB.mean;
  const bSafer = showB.p5 > showA.p5;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <aside className="space-y-6">
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
        <div className="space-y-4">
          <h4 className="text-h3 text-data-1">选项 A · 高风险路径</h4>
          <Slider label="预期年回报" value={aMean} min={-10} max={50} step={1} unit="%" format={(v) => v.toString()} onChange={setAMean} />
          <Slider label="波动率" value={aVol} min={0} max={50} step={1} unit="%" format={(v) => v.toString()} onChange={setAVol} />
          <Slider label="毁灭性风险 (5 年内)" value={aRuin} min={0} max={20} step={1} unit="%" format={(v) => v.toString()} onChange={setARuin} />
        </div>
        <div className="space-y-4">
          <h4 className="text-h3 text-data-2">选项 B · 稳健路径</h4>
          <Slider label="预期年回报" value={bMean} min={-10} max={50} step={1} unit="%" format={(v) => v.toString()} onChange={setBMean} />
          <Slider label="波动率" value={bVol} min={0} max={50} step={1} unit="%" format={(v) => v.toString()} onChange={setBVol} />
          <Slider label="毁灭性风险 (5 年内)" value={bRuin} min={0} max={20} step={1} unit="%" format={(v) => v.toString()} onChange={setBRuin} />
        </div>

        <Button onClick={() => setSeed((s) => s + 1)} variant="secondary" className="w-full">
          重新运行 100 次模拟
        </Button>
      </aside>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <PathStat label="选项 A" data={showA} color="rgb(var(--data-1))" />
          <PathStat label="选项 B" data={showB} color="rgb(var(--data-2))" />
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-4 md:p-6">
          <h4 className="text-sm text-text-muted mb-3">100 次平行宇宙模拟,初始值 = 100</h4>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={result.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="year" stroke="rgb(var(--text-muted))" tickFormatter={(v) => `${v}y`} />
              <YAxis stroke="rgb(var(--text-muted))" />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => formatNumber(v)}
              />
              <Legend
                payload={[
                  { value: "选项 A", type: "line", color: "rgb(var(--data-1))" },
                  { value: "选项 B", type: "line", color: "rgb(var(--data-2))" },
                ]}
              />
              {Array.from({ length: PATH_COUNT }).map((_, i) => (
                <Line
                  key={`a${i}`}
                  type="monotone"
                  dataKey={`a${i}`}
                  stroke="rgb(var(--data-1))"
                  strokeOpacity={0.18}
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
              {Array.from({ length: PATH_COUNT }).map((_, i) => (
                <Line
                  key={`b${i}`}
                  type="monotone"
                  dataKey={`b${i}`}
                  stroke="rgb(var(--data-2))"
                  strokeOpacity={0.18}
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Callout variant="insight">
          {aBetter && bSafer
            ? `A 的期望收益更高 (${formatNumber(showA.mean)} vs ${formatNumber(showB.mean)}),但 B 在最坏 5% 下更安全 (${formatNumber(showB.p5)} vs ${formatNumber(showA.p5)})。这是典型的"决策质量与单次结果分离"的场景:平均值不是你能体验到的,你体验到的是某一条路径。`
            : aBetter
              ? `A 在平均值与下行风险上都强于 B。但在 ${(showA.ruinRate * 100).toFixed(0)}% 的"平行宇宙"中,A 完全归零 — 这是平均值掩盖不了的尾部风险。`
              : `B 在期望与安全性上都不输给 A。这通常意味着 A 的"高回报"是被"高风险 + 毁灭可能性"换来的 — 用塔勒布的话说:"脆弱"的高收益。`}
        </Callout>

        <p className="text-xs text-text-muted leading-relaxed italic">
          说明:每次"重新运行"都会产生 100 条新的随机路径。你选的不是"哪条路径",
          你选的是"哪个分布" — 这正是决策的本质。
        </p>
      </div>
    </div>
  );
}

function PathStat({ label, data, color }: { label: string; data: ReturnType<typeof summarize>; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        <span className="text-sm font-semibold text-text-primary">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <div className="text-text-muted">期望值</div>
          <div className="font-mono font-semibold text-text-primary">{formatNumber(data.mean)}</div>
        </div>
        <div>
          <div className="text-text-muted">中位</div>
          <div className="font-mono font-semibold text-text-primary">{formatNumber(data.p50)}</div>
        </div>
        <div>
          <div className="text-text-muted">最差 5%</div>
          <div className="font-mono font-semibold text-warn">{formatNumber(data.p5)}</div>
        </div>
        <div>
          <div className="text-text-muted">最好 5%</div>
          <div className="font-mono font-semibold text-data-1">{formatNumber(data.p95)}</div>
        </div>
        {data.ruinRate > 0 && (
          <div className="col-span-2 mt-1">
            <div className="text-text-muted">出局率</div>
            <div className="font-mono font-semibold text-warn">{(data.ruinRate * 100).toFixed(1)}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
