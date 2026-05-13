export interface Thinker {
  slug: string;
  name: string;
  englishName: string;
  initials: string;
  role: string;
  era: string;
  modules: string[];
  oneLine: string;
  coreIdeas: string[];
  works: string[];
  bestQuote: { quote: string; source: string };
  accent: string;
}

export const THINKERS: Thinker[] = [
  {
    slug: "munger",
    name: "查理·芒格",
    englishName: "Charlie Munger",
    initials: "CM",
    role: "伯克希尔哈撒韦副主席 (1924–2023)",
    era: "20–21 世纪",
    modules: ["cognition", "decision"],
    oneLine: "把所有学科的核心思想织成一张网,这是芒格的方法论。",
    coreIdeas: [
      "多元思维模型 (Multidisciplinary Mental Models)",
      "逆向思维:总是反过来想",
      "能力圈:知道自己不知道什么",
      "诉诸利益,而非诉诸理性",
    ],
    works: ["《穷查理宝典》", "USC 法学院演讲 1994", "哈佛毕业演讲 1986"],
    bestQuote: {
      quote: "如果你想说服别人,诉诸利益,而非诉诸理性。",
      source: "《穷查理宝典》",
    },
    accent: "rgb(194, 65, 12)",
  },
  {
    slug: "naval",
    name: "纳瓦尔·拉维肯",
    englishName: "Naval Ravikant",
    initials: "NR",
    role: "AngelList 创始人,投资者",
    era: "21 世纪",
    modules: ["compounding", "long-term"],
    oneLine: "把"如何致富"拆解为可教学的公式 — 特定知识 × 杠杆。",
    coreIdeas: [
      "三种杠杆:资本、人力、代码与媒体 (零边际成本)",
      "特定知识 (Specific Knowledge)",
      "玩长期游戏 (Play Long-term Games)",
      "复利不仅是数学,而是世界观",
    ],
    works: ["《纳瓦尔宝典》", "How to Get Rich (Twitter Threads)", "Naval Podcast"],
    bestQuote: {
      quote: "复利,不仅是数学概念,而是一切因果。",
      source: "《纳瓦尔宝典》",
    },
    accent: "rgb(15, 118, 110)",
  },
  {
    slug: "buffett",
    name: "沃伦·巴菲特",
    englishName: "Warren Buffett",
    initials: "WB",
    role: "伯克希尔哈撒韦董事长",
    era: "20–21 世纪",
    modules: ["long-term", "risk"],
    oneLine: "他的财富 99% 在 60 岁后获得。复利的真实主角。",
    coreIdeas: [
      "能力圈 (Circle of Competence)",
      "安全边际 (Margin of Safety)",
      "长期持有,几乎从不交易",
      "第一原则:不亏钱",
    ],
    works: ["伯克希尔致股东信 (1965-至今)", "《滚雪球》(传记)"],
    bestQuote: {
      quote: "股市是一个把钱从没有耐心的人手里转移到有耐心的人手里的装置。",
      source: "多次股东大会",
    },
    accent: "rgb(124, 58, 237)",
  },
  {
    slug: "dalio",
    name: "Ray Dalio",
    englishName: "Ray Dalio",
    initials: "RD",
    role: "Bridgewater 创始人",
    era: "20–21 世纪",
    modules: ["decision", "feedback"],
    oneLine: "把决策做成"机器" — 一份关于自我反思的极致工程化探索。",
    coreIdeas: [
      "痛苦 + 反思 = 进步",
      "原则:把每个失败抽象成可复用的规则",
      "极度透明 (Radical Transparency)",
      "决策前列出可信度加权",
    ],
    works: ["《Principles》", "《Big Debt Crises》", "Bridgewater 致客户信"],
    bestQuote: {
      quote: "痛苦 + 反思 = 进步。痛苦本身不会让你进步,只有反思会。",
      source: "《Principles》",
    },
    accent: "rgb(217, 119, 6)",
  },
  {
    slug: "kahneman",
    name: "Daniel Kahneman",
    englishName: "Daniel Kahneman",
    initials: "DK",
    role: "诺贝尔经济学奖得主 (2002),心理学家 (1934–2024)",
    era: "20–21 世纪",
    modules: ["cognition", "feedback"],
    oneLine: "他证明了"理性人"是个传说 — 并据此改写了经济学。",
    coreIdeas: [
      "系统 1 (快、自动) vs 系统 2 (慢、刻意)",
      "前景理论 (Prospect Theory)",
      "锚定效应、可得性偏差、损失厌恶",
      "做重大判断后等 24 小时再行动",
    ],
    works: ["《思考,快与慢》", "1974 启发式与偏差论文", "《Noise》"],
    bestQuote: {
      quote: "我们对自己的判断,远不如我们以为的那样可靠。",
      source: "《思考,快与慢》",
    },
    accent: "rgb(45, 212, 191)",
  },
  {
    slug: "taleb",
    name: "Nassim Taleb",
    englishName: "Nassim Nicholas Taleb",
    initials: "NT",
    role: "概率论与风险研究者,前期权交易员",
    era: "21 世纪",
    modules: ["risk", "long-term"],
    oneLine: "区分"波动"与"毁灭",是他写了 5 本书的核心议题。",
    coreIdeas: [
      "黑天鹅:罕见、极端、事后被解释",
      "反脆弱:从波动中获益的系统",
      "Lindy 效应:思想越老越可能再活久",
      "Skin in the Game:利益相关者才能做判断",
    ],
    works: ["《黑天鹅》", "《反脆弱》", "《Skin in the Game》", "《Fooled by Randomness》"],
    bestQuote: {
      quote: "不要丢失什么是无法承担丢失的。",
      source: "《反脆弱》",
    },
    accent: "rgb(220, 38, 38)",
  },
  {
    slug: "bezos",
    name: "Jeff Bezos",
    englishName: "Jeff Bezos",
    initials: "JB",
    role: "Amazon 创始人",
    era: "20–21 世纪",
    modules: ["decision"],
    oneLine: "用 Type 1/Type 2 决策框架,改变了一代企业的决策速度。",
    coreIdeas: [
      "Type 1 (单向门) vs Type 2 (双向门) 决策",
      "70% 信息就行动",
      "Day 1 思维",
      "最小遗憾原则",
    ],
    works: ["Amazon 1997 致股东信", "Amazon 2015 致股东信", "回忆录《Invent and Wander》"],
    bestQuote: {
      quote: "大多数决策都应该在你拥有 70% 你希望拥有的信息时做出。",
      source: "Amazon 致股东信",
    },
    accent: "rgb(167, 139, 250)",
  },
  {
    slug: "marks",
    name: "Howard Marks",
    englishName: "Howard Marks",
    initials: "HM",
    role: "Oaktree Capital 联合创始人",
    era: "20–21 世纪",
    modules: ["risk", "decision"],
    oneLine: "把"风险"与"不确定性"分清楚,是他写备忘录写了 30 年的事。",
    coreIdeas: [
      "第二层思维 (Second-level Thinking)",
      "风险不是波动,是亏损概率",
      "周期不可避免,但可以利用",
      "知道自己不知道什么",
    ],
    works: ["《The Most Important Thing》", "Oaktree Memos (1990-至今)"],
    bestQuote: {
      quote: "经验,是你没得到你想要的之后,得到的东西。",
      source: "Oaktree Memo",
    },
    accent: "rgb(15, 118, 110)",
  },
  {
    slug: "duke",
    name: "Annie Duke",
    englishName: "Annie Duke",
    initials: "AD",
    role: "前世界扑克冠军,决策科学作者",
    era: "21 世纪",
    modules: ["decision", "feedback"],
    oneLine: "她用 20 年赌牌,然后写出最实操的决策日志教材。",
    coreIdeas: [
      "区分决策质量与结果质量",
      ""结果偏差"是反馈训练的最大敌人",
      "决策日志 4 要素",
      ""quitting"也是决策技能",
    ],
    works: ["《Thinking in Bets》", "《How to Decide》", "《Quit》"],
    bestQuote: {
      quote: "我们用结果评判决策,但糟糕决策有时也带来好结果。",
      source: "《Thinking in Bets》",
    },
    accent: "rgb(251, 146, 60)",
  },
  {
    slug: "munger-howard",
    name: "Peter Kaufman",
    englishName: "Peter Kaufman",
    initials: "PK",
    role: "《穷查理宝典》主编",
    era: "21 世纪",
    modules: ["compounding"],
    oneLine: "他提出"五个 1+x"复利系统 — 一个比单一复利更强大的视角。",
    coreIdeas: [
      "多个 (1+x) 系统并行,产生复合复利",
      ""事情的本质"思维:抓住模型的核心",
      "持续学习的纪律",
    ],
    works: ["《穷查理宝典》(主编)"],
    bestQuote: {
      quote: "Three things to do every day: read, learn, and reflect.",
      source: "采访",
    },
    accent: "rgb(124, 58, 237)",
  },
  {
    slug: "dweck",
    name: "Carol Dweck",
    englishName: "Carol Dweck",
    initials: "CD",
    role: "斯坦福心理学教授",
    era: "20–21 世纪",
    modules: ["cognition", "long-term"],
    oneLine: "成长型思维 vs 固定型思维 — 她证明这两种思维的差距在 30 年后惊人。",
    coreIdeas: [
      "成长型思维 (Growth Mindset)",
      "失败是反馈,不是定义",
      "称赞"努力"而非"才能"",
      "能力是可塑的",
    ],
    works: ["《Mindset》", "数十篇心理学论文"],
    bestQuote: {
      quote: "Becoming is better than being.",
      source: "《Mindset》",
    },
    accent: "rgb(45, 212, 191)",
  },
  {
    slug: "franklin",
    name: "本杰明·富兰克林",
    englishName: "Benjamin Franklin",
    initials: "BF",
    role: "美国开国元勋 (1706–1790)",
    era: "18 世纪",
    modules: ["feedback"],
    oneLine: "现代"决策日志"与"自我审计"思想的源头,比所有人早 200 年。",
    coreIdeas: [
      "13 美德每周自我审视",
      "记录每一项的进展",
      "时间最值得珍惜的资源",
    ],
    works: ["《富兰克林自传》"],
    bestQuote: {
      quote: "你热爱生命吗?那就别浪费时间,因为生命就是由时间组成的。",
      source: "《穷理查年鉴》",
    },
    accent: "rgb(217, 119, 6)",
  },
];

export function getThinker(slug: string) {
  return THINKERS.find((t) => t.slug === slug);
}
