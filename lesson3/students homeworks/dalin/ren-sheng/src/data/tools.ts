export interface ToolMeta {
  slug: string;
  name: string;
  moduleSlug: string;
  description: string;
  ahaMoment: string;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "bias-test",
    name: "偏差自检测试",
    moduleSlug: "cognition",
    description: "用经典心理学题目让你亲身体验自己的认知偏差。",
    ahaMoment: "你以为自己理性,其实不是。",
  },
  {
    slug: "decision-cost",
    name: "决策成本计算器",
    moduleSlug: "decision",
    description: "判断一个决定值得花多少时间想 — 区分 Type 1 / Type 2 决策。",
    ahaMoment: "大部分人对小事过度纠结,对大事草率决定。",
  },
  {
    slug: "compound-simulator",
    name: "复利成长模拟器",
    moduleSlug: "compounding",
    description: "看到每天 1% 与每天 0% 在 10 年后的真实差距。",
    ahaMoment: "复利的拐点出现得很晚 — 大多数人在拐点前放弃。",
  },
  {
    slug: "opportunity-cost",
    name: "机会成本对比器",
    moduleSlug: "choice",
    description: "把'看不见的成本'可视化 — 你不是在放松 1 小时。",
    ahaMoment: "机会成本不是另一选项的价值,是另一选项复利后的价值。",
  },
  {
    slug: "decision-journal",
    name: "决策日志练习",
    moduleSlug: "feedback",
    description: "记录一次真实决策,3 个月后回看,让结果偏差无所遁形。",
    ahaMoment: "你的判断,不是事后归因里那么准。",
  },
  {
    slug: "long-term-feedback",
    name: "长期反馈曲线",
    moduleSlug: "long-term",
    description: "看到主观感受与客观成果的曲线为何不重合 — 以及放弃高发期。",
    ahaMoment: "努力曲线与成果曲线之间,藏着所有放弃。",
  },
  {
    slug: "life-choice",
    name: "人生选择模拟器",
    moduleSlug: "choice",
    description: "在 100 个平行宇宙中看 A / B 两条路径的分布,而非单点。",
    ahaMoment: "决策质量,与单次结果之间,横亘着运气。",
  },
  {
    slug: "ruin-risk",
    name: "风险毁灭模拟器",
    moduleSlug: "risk",
    description: "演示哪怕只有 1% 的毁灭风险,长期下来也会让你出局。",
    ahaMoment: "期望值为正 ≠ 长期生存。",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
