"use client";

import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/card";
import { useUserStore } from "@/stores/useUserStore";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  bias: BiasKey;
  prompt: string;
  options: { label: string; isBiased: boolean }[];
  explanation: string;
}

type BiasKey = "anchoring" | "framing" | "availability" | "lossAversion" | "conjunction";

const BIAS_LABELS: Record<BiasKey, string> = {
  anchoring: "锚定效应",
  framing: "框架效应",
  availability: "可得性偏差",
  lossAversion: "损失厌恶",
  conjunction: "合取谬误",
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    bias: "conjunction",
    prompt:
      "Linda 31 岁,单身,直率,聪明。她大学主修哲学,关心社会公正,曾参加反核游行。请问以下哪个描述更可能?",
    options: [
      { label: "Linda 是一名银行出纳员。", isBiased: false },
      { label: "Linda 是一名银行出纳员,并且是女权主义运动的积极分子。", isBiased: true },
    ],
    explanation:
      "这是经典的"合取谬误":两个条件同时成立的概率,永远不可能高于其中任何一个单独成立的概率。直觉认为"和描述更匹配的"更可能,但数学上必然相反。",
  },
  {
    id: "q2",
    bias: "anchoring",
    prompt:
      "你被告知去年某个国家的人口约为 6500 万。你估计今年的人口大概是多少?",
    options: [
      { label: "大约 6500–7000 万", isBiased: true },
      { label: "我无法在没有更多数据的情况下估计", isBiased: false },
    ],
    explanation:
      ""6500 万"作为锚点,会显著影响你的估计 — 即使你知道这只是去年数据。锚定效应在谈判、报价、绩效评估中极其常见。"对抗它"的方法不是"避免被锚",而是"主动设定自己的锚"。",
  },
  {
    id: "q3",
    bias: "framing",
    prompt:
      "在两个手术方案中:A: 100 个患者中 90 个能存活;B: 100 个患者中 10 个会死亡。你更倾向哪个?",
    options: [
      { label: "A 听起来更好,选 A。", isBiased: true },
      { label: "两个其实是同一件事,无法仅凭表述选择。", isBiased: false },
    ],
    explanation:
      "A 和 B 在数学上完全等价,但表述方式 (90 存活 vs 10 死亡) 显著影响选择。这是"框架效应"。在医疗、投资、政治宣传中,同样数据用不同框架,可以引导出完全相反的结论。",
  },
  {
    id: "q4",
    bias: "lossAversion",
    prompt:
      "选 A: 确定拿到 ¥800;选 B: 85% 概率拿到 ¥1000,15% 概率什么都没有。你选?",
    options: [
      { label: "A,确定的更稳。", isBiased: true },
      { label: "B,期望值是 ¥850 > ¥800,长期看更优。", isBiased: false },
    ],
    explanation:
      "B 的期望值 = ¥850,数学上更优。但大多数人选 A,因为"损失厌恶":失去的痛苦 ≈ 得到同等数额的快乐 × 2。这意味着我们系统性地高估"确定性的价值"。在重复性决策中 (投资、合作),长期总是 B 赢。",
  },
  {
    id: "q5",
    bias: "availability",
    prompt:
      "在美国,以下哪种死因导致的死亡人数更多?",
    options: [
      { label: "鲨鱼袭击,因为新闻里经常报道。", isBiased: true },
      { label: "梯子摔落,虽然不常上新闻但实际更频繁。", isBiased: false },
    ],
    explanation:
      "梯子事故每年导致几百人死亡,鲨鱼袭击不到 1 人。但媒体报道频率与实际频率严重脱钩,人脑用"想得起来的频率"代替"真实频率",这就是可得性偏差。它让我们恐惧错的东西,忽略对的风险。",
  },
];

interface Answer {
  questionId: string;
  selected: number;
  isBiased: boolean;
}

export function BiasSelfTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const setBiasResult = useUserStore((s) => s.setBiasResult);

  const isDone = step >= QUESTIONS.length;
  const current = QUESTIONS[step];

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    const q = QUESTIONS[step];
    setAnswers([...answers, { questionId: q.id, selected: idx, isBiased: q.options[idx].isBiased }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setStep(step + 1);
    if (step + 1 >= QUESTIONS.length) {
      const scores: Record<string, number> = {};
      answers.forEach((a) => {
        const q = QUESTIONS.find((qq) => qq.id === a.questionId);
        if (!q) return;
        scores[q.bias] = (scores[q.bias] ?? 0) + (a.isBiased ? 1 : 0);
      });
      setBiasResult({ scores, takenAt: new Date().toISOString() });
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setShowExplanation(false);
  };

  if (isDone) {
    const scores: Record<BiasKey, number> = {
      anchoring: 0,
      framing: 0,
      availability: 0,
      lossAversion: 0,
      conjunction: 0,
    };
    answers.forEach((a) => {
      const q = QUESTIONS.find((qq) => qq.id === a.questionId);
      if (q && a.isBiased) scores[q.bias] += 1;
    });
    const data = (Object.keys(scores) as BiasKey[]).map((k) => ({
      bias: BIAS_LABELS[k],
      score: scores[k],
      fullMark: 1,
    }));
    const totalBiased = answers.filter((a) => a.isBiased).length;

    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={data}>
                <PolarGrid stroke="rgb(var(--border))" />
                <PolarAngleAxis
                  dataKey="bias"
                  tick={{ fontSize: 12, fill: "rgb(var(--text-secondary))" }}
                />
                <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
                <Radar
                  name="你"
                  dataKey="score"
                  stroke="rgb(var(--accent))"
                  fill="rgb(var(--accent))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-meta uppercase tracking-wider text-text-muted mb-1">你的偏差地图</div>
            <h3 className="text-h2 text-text-primary mb-3">
              5 题中,你被偏差影响了 <span className="text-accent">{totalBiased}</span> 次
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {totalBiased <= 1
                ? "你识别偏差的能力不错。但要警惕:在这种结构化测试里识别 ≠ 在真实生活中识别。"
                : totalBiased <= 3
                  ? "中位水平 — 这意味着你和大多数人一样。重要的是:已知偏差的存在,你才有机会"叫醒系统 2"。"
                  : "你和经典实验里的大多数人一样,深受系统 1 的"代笔"影响。这不是问题 — 知道这一点,本身就是认知升级的开始。"}
            </p>
          </div>
          <div className="rounded-xl bg-bg-subtle p-5 text-sm text-text-secondary leading-relaxed">
            <p className="font-medium text-text-primary mb-2">下一步建议</p>
            <p>
              {Object.entries(scores).filter(([, v]) => v > 0).slice(0, 1).map(([k]) =>
                `你在「${BIAS_LABELS[k as BiasKey]}」上较为敏感。在做谈判、定价、风险判断时,主动停下,问自己:"我是不是被这个偏差影响了?"`
              )[0] ?? "保持对所有偏差的警觉,在做重大判断前主动叫醒系统 2。"}
            </p>
          </div>
          <Button onClick={handleRestart} variant="secondary">重新测试</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-meta mb-2">
        题 {step + 1} / {QUESTIONS.length}
      </div>
      <div className="h-1 bg-bg-subtle rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((step + (showExplanation ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-border bg-bg-card p-6 md:p-8 mb-6">
        <p className="text-h3 text-text-primary leading-relaxed mb-8 font-serif">
          {current.prompt}
        </p>
        <div className="space-y-3">
          {current.options.map((opt, idx) => {
            const lastAnswer = answers[answers.length - 1];
            const isSelected = showExplanation && lastAnswer?.questionId === current.id && lastAnswer.selected === idx;
            const isCorrectChoice = !opt.isBiased;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  showExplanation
                    ? isCorrectChoice
                      ? "border-data-1 bg-data-1/10"
                      : isSelected
                        ? "border-warn bg-warn/10"
                        : "border-border opacity-60"
                    : "border-border hover:border-accent hover:bg-bg-subtle"
                )}
              >
                <div className="flex items-start gap-3">
                  {showExplanation && (
                    <span className="mt-0.5 shrink-0">
                      {isCorrectChoice ? (
                        <Check className="w-5 h-5 text-data-1" />
                      ) : isSelected ? (
                        <X className="w-5 h-5 text-warn" />
                      ) : (
                        <span className="w-5 h-5 inline-block" />
                      )}
                    </span>
                  )}
                  <span className="text-text-primary leading-relaxed">{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <Callout variant="insight">
          <strong>解释 · {BIAS_LABELS[current.bias]}</strong>
          <br />
          {current.explanation}
          <div className="mt-4">
            <Button onClick={handleNext}>{step === QUESTIONS.length - 1 ? "看我的偏差地图" : "下一题"}</Button>
          </div>
        </Callout>
      )}
    </div>
  );
}
