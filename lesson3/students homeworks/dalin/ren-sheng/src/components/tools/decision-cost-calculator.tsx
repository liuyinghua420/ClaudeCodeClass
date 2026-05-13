"use client";

import { useState, useMemo } from "react";
import { SegmentedControl } from "@/components/ui/slider";
import { Callout } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";

type Reversibility = "yes" | "no";
type Duration = "week" | "month" | "year" | "lifetime";
type Scope = "self" | "family" | "team" | "company";

const DURATION_LABELS: Record<Duration, string> = {
  week: "一周内",
  month: "一个月",
  year: "一年",
  lifetime: "一生",
};

const SCOPE_LABELS: Record<Scope, string> = {
  self: "仅自己",
  family: "家人",
  team: "团队",
  company: "公司",
};

function calc(reversibility: Reversibility, duration: Duration, scope: Scope) {
  // Type 1 / Type 2 判定 (Bezos)
  const isType1 = reversibility === "no" || duration === "lifetime";
  const score =
    (reversibility === "no" ? 3 : 0) +
    ({ week: 0, month: 1, year: 2, lifetime: 4 }[duration]) +
    ({ self: 0, family: 1, team: 2, company: 3 }[scope]);

  let timeBudget: string;
  let advice: string;
  let warn = false;

  if (score <= 2) {
    timeBudget = "5–30 分钟";
    advice = "这是一个典型的 Type 2 决策 (双向门)。错了可以回头,等于 Type 1 标准对待它,你在浪费决策预算。";
  } else if (score <= 5) {
    timeBudget = "1–3 天";
    advice = "中等可逆性,适度调研后即可拍板。比起'再多想一天',更应'先做小步,看反馈再调整'。";
  } else if (score <= 8) {
    timeBudget = "1–2 周";
    advice = "重要决策,值得做正式调研、咨询 2-3 位有经验者、写下决策日志。";
  } else {
    timeBudget = "1 个月以上 + 多人决策";
    advice = "这是 Type 1 决策 (单向门)。投入时间是必要成本,慢比错重要。";
    warn = true;
  }

  // 过度决策警告
  const overthinking = !isType1 && duration === "week" && scope === "self";

  return { isType1, timeBudget, advice, warn, overthinking };
}

export function DecisionCostCalculator() {
  const [reversibility, setReversibility] = useState<Reversibility>("yes");
  const [duration, setDuration] = useState<Duration>("month");
  const [scope, setScope] = useState<Scope>("self");

  const result = useMemo(() => calc(reversibility, duration, scope), [
    reversibility,
    duration,
    scope,
  ]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <h3 className="text-h3 text-text-primary mb-1.5">这个决定可以撤回吗?</h3>
          <p className="text-sm text-text-muted mb-4">
            Bezos 的"双向门"思维:可逆 = Type 2,不可逆 = Type 1。
          </p>
          <SegmentedControl
            value={reversibility}
            options={[
              { value: "yes", label: "可以,损失不大" },
              { value: "no", label: "不可逆 / 代价巨大" },
            ]}
            onChange={setReversibility}
          />
        </div>

        <div>
          <h3 className="text-h3 text-text-primary mb-1.5">这个决定影响多久?</h3>
          <p className="text-sm text-text-muted mb-4">
            影响越长,值得的投入时间越多。
          </p>
          <SegmentedControl
            value={duration}
            options={[
              { value: "week", label: DURATION_LABELS.week },
              { value: "month", label: DURATION_LABELS.month },
              { value: "year", label: DURATION_LABELS.year },
              { value: "lifetime", label: DURATION_LABELS.lifetime },
            ]}
            onChange={setDuration}
          />
        </div>

        <div>
          <h3 className="text-h3 text-text-primary mb-1.5">影响多少人?</h3>
          <p className="text-sm text-text-muted mb-4">
            涉及他人时,需要考虑他们的输入与同意。
          </p>
          <SegmentedControl
            value={scope}
            options={[
              { value: "self", label: SCOPE_LABELS.self },
              { value: "family", label: SCOPE_LABELS.family },
              { value: "team", label: SCOPE_LABELS.team },
              { value: "company", label: SCOPE_LABELS.company },
            ]}
            onChange={setScope}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-accent/20 bg-accent/5 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={
                "px-3 py-1 rounded-full text-xs font-semibold " +
                (result.isType1
                  ? "bg-warn/20 text-warn"
                  : "bg-data-1/20 text-data-1")
              }
            >
              {result.isType1 ? "Type 1 · 单向门" : "Type 2 · 双向门"}
            </span>
            <span className="text-meta">Bezos 决策类型</span>
          </div>
          <div className="text-meta uppercase tracking-wider mb-1.5 text-text-muted">
            建议投入时间
          </div>
          <div className="text-display text-accent mb-6 font-mono">
            {result.timeBudget}
          </div>
          <p className="text-text-secondary leading-relaxed">{result.advice}</p>
        </div>

        {result.overthinking && (
          <Callout variant="warn">
            <strong>警告:你可能在过度决策。</strong>
            <br />
            这是一个仅影响自己、可逆、短期的小事。如果你已经反复想了超过 30 分钟,
            <strong>停止调研,直接做</strong>,把节省的脑力留给真正的 Type 1 决策。
          </Callout>
        )}

        <div className="rounded-xl bg-bg-subtle p-5 text-sm text-text-secondary leading-relaxed">
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-data-1 mt-0.5 shrink-0" />
            <span>
              <strong>对 Type 2:</strong> 用速度作为优势。70% 信息就动,边做边调。
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warn mt-0.5 shrink-0" />
            <span>
              <strong>对 Type 1:</strong> 慢比错重要。多视角咨询,写决策日志,等情绪平复 24 小时再行动。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
