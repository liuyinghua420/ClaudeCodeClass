# 人生算法 — 交互式学习网页

一个让普通人从"听过人生算法"升级到"会用人生算法"的交互式学习产品。
7 个维度的系统讲解,8 个交互式模拟器,一份可带走的算法清单。

## 快速开始

```bash
# 安装依赖 (推荐 pnpm,也支持 npm / yarn)
pnpm install

# 开发模式 (默认 http://localhost:3000)
pnpm dev

# 构建生产版本
pnpm build
pnpm start

# 类型检查
pnpm typecheck
```

## 技术栈

- **Framework**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS + CSS 变量 (双主题)
- **状态**: Zustand + localStorage 持久化
- **图表**: Recharts
- **图标**: Lucide React
- **字体**: Noto Serif SC (标题) + 系统中文 (正文) + Inter (英文)

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── m/[slug]/           # 7 个学习模块
│   ├── tools/[slug]/       # 8 个交互模拟器
│   ├── thinkers/           # 思想家专题
│   ├── library/            # 延伸阅读
│   └── my/                 # 我的清单 (本地存储)
├── components/
│   ├── ui/                 # 基础组件 (Button/Card/Slider/...)
│   ├── layout/             # SiteHeader/SiteFooter/ProgressBar
│   ├── module/             # 模块布局与 Section
│   ├── tools/              # 8 个模拟器组件
│   └── home/               # 首页专属组件
├── content/modules/        # 7 个模块的内容 (TSX)
├── data/                   # 模块、工具、思想家、延伸阅读元数据
├── lib/                    # 工具函数与持久化封装
└── stores/                 # Zustand stores
```

## 7 个模块

1. **认知 (Cognition)** — 心智模型、双系统理论、认知偏差、贝叶斯更新
2. **决策 (Decision)** — 决策质量 vs 结果质量、Type 1/Type 2、期望值、10/10/10
3. **复利 (Compounding)** — 三种复利、Naval 杠杆、负复利、关键拐点
4. **选择 (Choice)** — 机会成本、显隐性成本、最小遗憾、选项漏斗
5. **反馈 (Feedback)** — 结果偏差、Dalio 反思机器、决策日志
6. **长期主义 (Long-term)** — 主观 vs 客观曲线、Lindy 效应、个人 KPI 长期化
7. **风险 (Risk)** — 波动 vs 毁灭、凯利公式、反脆弱、风险预算

## 8 个交互模拟器

1. **复利成长模拟器** — 看到每天 ±1% 在 N 年后的真实差距
2. **决策成本计算器** — Type 1/Type 2 自动判定 + 决策预算建议
3. **机会成本对比器** — 把"看不见的成本"复利化可视化
4. **偏差自检测试** — 5 道经典心理学题 + 雷达图诊断
5. **人生选择模拟器** — 100 条蒙特卡洛路径,看 A/B 选项的分布
6. **长期反馈曲线** — 主观感受与客观成果的曲线对比
7. **风险毁灭模拟器** — 凯利公式 + 蒙特卡洛,演示出局率
8. **决策日志练习** — 4 要素结构化日志 + .ics 日历提醒

## 隐私

所有用户数据 (反思、决策日志、模拟器历史) **仅存储在浏览器 localStorage**,
不上传任何服务器。换设备 / 清缓存会丢失,可在「我的清单」页一键导出 JSON 备份。

## 许可

- **代码**: [MIT](./LICENSE)
- **网页内容** (模块文案、图表设计): [CC BY-NC-SA 4.0](./CONTENT-LICENSE.md)
- **第三方引用**: 遵循"合理使用"原则

## 致谢

中文语境下"人生算法"概念的系统化表达,主要受到老喻 (喻颖正) 同名作品的启发。
本网页为独立解读,不直接引用其原文。
