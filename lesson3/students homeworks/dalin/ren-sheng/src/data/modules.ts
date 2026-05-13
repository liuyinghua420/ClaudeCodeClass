export interface ModuleMeta {
  slug: string;
  number: number;
  title: string;
  englishTitle: string;
  hook: string;
  coreQuestion: string;
  duration: string;
  level: "基础" | "进阶" | "高级";
  toolSlug?: string;
  toolName?: string;
}

export const MODULES: ModuleMeta[] = [
  {
    slug: "cognition",
    number: 1,
    title: "认知",
    englishTitle: "Cognition",
    hook: "你眼中的世界,决定你看到什么。",
    coreQuestion: "你做决策时,在多大程度上是被偏差驱动的?",
    duration: "10 分钟",
    level: "基础",
    toolSlug: "bias-test",
    toolName: "偏差自检测试",
  },
  {
    slug: "decision",
    number: 2,
    title: "决策",
    englishTitle: "Decision",
    hook: "在不确定中行动的方法论。",
    coreQuestion: "这件事值得你花多少时间想清楚?",
    duration: "12 分钟",
    level: "基础",
    toolSlug: "decision-cost",
    toolName: "决策成本计算器",
  },
  {
    slug: "compounding",
    number: 3,
    title: "复利",
    englishTitle: "Compounding",
    hook: "时间的魔法,与时间的陷阱。",
    coreQuestion: "你正走在哪一条复利曲线上?",
    duration: "10 分钟",
    level: "基础",
    toolSlug: "compound-simulator",
    toolName: "复利成长模拟器",
  },
  {
    slug: "choice",
    number: 4,
    title: "选择",
    englishTitle: "Choice",
    hook: "你不是在选 A,你在放弃所有的非 A。",
    coreQuestion: "你正在选择的真实代价是什么?",
    duration: "12 分钟",
    level: "进阶",
    toolSlug: "opportunity-cost",
    toolName: "机会成本对比器",
  },
  {
    slug: "feedback",
    number: 5,
    title: "反馈",
    englishTitle: "Feedback",
    hook: "好结果未必来自好决策。",
    coreQuestion: "你在区分'决策质量'与'运气'吗?",
    duration: "10 分钟",
    level: "进阶",
    toolSlug: "decision-journal",
    toolName: "决策日志练习",
  },
  {
    slug: "long-term",
    number: 6,
    title: "长期主义",
    englishTitle: "Long-term",
    hook: "慢就是快,反过来也成立。",
    coreQuestion: "你在哪一段曲线上,正想要放弃?",
    duration: "10 分钟",
    level: "进阶",
    toolSlug: "long-term-feedback",
    toolName: "长期反馈曲线",
  },
  {
    slug: "risk",
    number: 7,
    title: "风险",
    englishTitle: "Risk",
    hook: "不要在能赢的游戏里出局。",
    coreQuestion: "你在区分'波动'与'毁灭'吗?",
    duration: "12 分钟",
    level: "高级",
    toolSlug: "ruin-risk",
    toolName: "风险毁灭模拟器",
  },
];

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getNextModule(slug: string): ModuleMeta | undefined {
  const idx = MODULES.findIndex((m) => m.slug === slug);
  if (idx === -1 || idx === MODULES.length - 1) return undefined;
  return MODULES[idx + 1];
}

export function getPrevModule(slug: string): ModuleMeta | undefined {
  const idx = MODULES.findIndex((m) => m.slug === slug);
  if (idx <= 0) return undefined;
  return MODULES[idx - 1];
}
