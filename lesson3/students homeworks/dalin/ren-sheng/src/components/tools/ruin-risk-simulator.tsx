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
  ReferenceLine,
} from "recharts";
import { Slider, SegmentedControl } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

type Strategy = "all-in" | "kelly" | "half-kelly" | "quarter-kelly";

const STRATEGY_LABELS: Record<Strategy, string> = {
  "all-in": "全押",
  kelly: "凯利",
  "half-kelly": "半凯利",
  "quarter-kelly": "1/4 凯利",
};

function calculateKelly(p: number, b: number) {
  return (b * p - (1 - p)) / b;
}

function getFraction(strategy: Strategy, kellyOptimal: number) {
  if (strategy === "all-in") return 1;
  if (strategy === "kelly") return Math.max(0, kellyOptimal);
  if (strategy === "half-kelly") return Math.max(0, kellyOptimal / 2);
  return Math.max(0, kellyOptimal / 4);
}

const PATH_COUNT = 100;

function simulatePaths(p: number, b: number, fraction: number, rounds: number): number[][] {
  const paths: number[][] = [];
  for (let i = 0; i < PATH_COUNT; i++) {
    const path: number[] = [100];
    let v = 100;
    for (let r = 0; r < rounds; r++) {
      if (v <= 1) {
        path.push(0);
        continue;
      }
      const win = Math.random() < p;
      const stake = v * fraction;
      v = win ? v - stake + stake * (1 + b) : v - stake;
      v = Math.max(0, v);
      path.push(v);
    }
    paths.push(path);
  }
  return paths;
}

export function RuinRiskSimulator() {
  const [winRate, setWinRate] = useState(60);
  const [oddsRatio, setOddsRatio] = useState(2);
  const [strategy, setStrategy] = useState<Strategy>("half-kelly");
  const [rounds, setRounds] = useState(100);
  const [seed, setSeed] = useState(0);

  const p = winRate / 100;
  const kellyOptimal = calculateKelly(p, oddsRatio);
  const fraction = getFraction(strategy, kellyOptimal);
  const expectedValue = p * oddsRatio - (1 - p);

  const result = useMemo(() => {
    void seed;
    const paths = simulatePaths(p, oddsRatio, fraction, rounds);
    const points: { round: number; [k: string]: number }[] = [];
    for (let r = 0; r <= rounds; r++) {
      const row: { round: number; [k: string]: number } = { round: r };
      paths.forEach((path, i) => {
        row[`p${i}`] = path[r];
      });
      points.push(row);
    }
    const finals = paths.map((p) => p[p.length - 1]);
    const ruinCount = finals.filter((v) => v < 1).length;
    const sorted = [...finals].sort((a, b) => a - b);
    return {
      points,
      ruinRate: ruinCount / PATH_COUNT,
      median: sorted[Math.floor(sorted.length / 2)],
      mean: finals.reduce((a, b) => a + b, 0) / finals.length,
      best: sorted[sorted.length - 1],
      worst: sorted[0],
    };
  }, [p, oddsRatio, fraction, rounds, seed]);

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <aside className="space-y-6">
        <Slider
          label="胜率 (p)"
          value={winRate}
          min={1}
          max={99}
          step={1}
          unit="%"
          format={(v) => v.toString()}
          onChange={setWinRate}
        />
        <Slider
          label="盈亏比 (b)"
          value={oddsRatio}
          min={0.1}
          max={10}
          step={0.1}
          unit=":1"
          format={(v) => v.toFixed(1)}
          onChange={setOddsRatio}
          hint="赢得到 b 倍,输全损"
        />
        <Slider
          label="局数"
          value={rounds}
          min={10}
          max={500}
          step={10}
          unit=" 局"
          format={(v) => v.toString()}
          onChange={setRounds}
        />
        <SegmentedControl
          label="仓位策略"
          value={strategy}
          options={[
            { value: "all-in", label: STRATEGY_LABELS["all-in"] },
            { value: "kelly", label: STRATEGY_LABELS.kelly },
            { value: "half-kelly", label: STRATEGY_LABELS["half-kelly"] },
            { value: "quarter-kelly", label: STRATEGY_LABELS["quarter-kelly"] },
          ]}
          onChange={setStrategy}
        />
        <Button onClick={() => setSeed((s) => s + 1)} variant="secondary" className="w-full">
          重新模拟 100 条路径
        </Button>
      </aside>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="单局期望值" value={`${(expectedValue * 100).toFixed(1)}%`} accent={expectedValue > 0} />
          <Stat label="凯利最优仓位" value={`${(kellyOptimal * 100).toFixed(1)}%`} />
          <Stat label="实际仓位" value={`${(fraction * 100).toFixed(1)}%`} />
          <Stat
            label="出局率"
            value={`${(result.ruinRate * 100).toFixed(0)}%`}
            warn={result.ruinRate > 0.05}
          />
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-4 md:p-6">
          <h4 className="text-sm text-text-muted mb-3">100 条路径,初始资金 = 100</h4>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={result.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis
                dataKey="round"
                stroke="rgb(var(--text-muted))"
                tickFormatter={(v) => v.toString()}
              />
              <YAxis
                stroke="rgb(var(--text-muted))"
                tickFormatter={(v) => formatNumber(v, 0)}
                scale="symlog"
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => formatNumber(v)}
              />
              <ReferenceLine y={100} stroke="rgb(var(--text-muted))" strokeDasharray="3 3" />
              {Array.from({ length: PATH_COUNT }).map((_, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={`p${i}`}
                  stroke="rgb(var(--data-1))"
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

        <Callout variant={result.ruinRate > 0.3 ? "warn" : "insight"}>
          {expectedValue <= 0 ? (
            <>
              <strong>这是一个负期望值游戏。</strong>
              单局期望值 = {(expectedValue * 100).toFixed(2)}%,长期下来一定输 — 仓位策略只能延缓出局,不能阻止它。
            </>
          ) : strategy === "all-in" ? (
            <>
              期望值正 ({(expectedValue * 100).toFixed(1)}%),但全押让你
              <strong className="text-warn"> {(result.ruinRate * 100).toFixed(0)}% 概率出局</strong>。
              这就是巴菲特说的"不要丢失什么是无法承担丢失的"的反例 — 数学上有利可图,实际上长期出局。
            </>
          ) : strategy === "kelly" && kellyOptimal > 0.4 ? (
            <>
              凯利仓位 {(kellyOptimal * 100).toFixed(0)}% 已经偏激进。
              现实中胜率与盈亏比是<em>估计</em>,估错一点就放大风险。这是为什么大多数顶级投资者用半凯利甚至 1/4 凯利。
            </>
          ) : (
            <>
              {STRATEGY_LABELS[strategy]} 策略下,出局率 {(result.ruinRate * 100).toFixed(0)}%,中位数 {formatNumber(result.median)}。
              即使期望值为正,仓位是决定"能否长期生存"的关键变量。
            </>
          )}
        </Callout>

        <Callout variant="warn">
          <strong>免责声明:</strong>
          本模拟器仅用于教育目的,不构成投资、理财或其他专业建议。
          凯利公式假设你能精确知道胜率与盈亏比,在现实中这两个值都是估计。
        </Callout>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
  warn = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div
        className={
          "text-xl font-mono font-semibold " +
          (warn ? "text-warn" : accent ? "text-accent" : "text-text-primary")
        }
      >
        {value}
      </div>
    </div>
  );
}
