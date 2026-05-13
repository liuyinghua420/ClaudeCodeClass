import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function CompoundingContent() {
  return (
    <>
      <Section>
        <Lede>
          复利不性感。它在前期看起来像直线,直到某一天它突然炸开。
        </Lede>
        <p>
          每天提升 1%,一年后是 37.78 倍。
          <br />
          每天后退 1%,一年后只剩 0.03 倍。
          <br />
          这个公式 (1.01<sup>365</sup> ≈ 37.78) 流传甚广,但它误导了大多数人 —
          因为它给了你一个错觉:<strong>复利的回报是均匀分布的</strong>。
        </p>
        <p>
          真实的复利曲线,前 80% 的时间几乎贴着横轴。
          大多数人,正是在曲线"看起来没起色"的那段时间放弃。
        </p>
      </Section>

      <Section title="三种复利:不只是钱">
        <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
          <ConceptCard title="资本复利" badge="最常见">
            <p className="leading-relaxed">
              利滚利,巴菲特财富的 99% 是 60 岁之后获得的。
              资本复利的特点是<em>线性输入,非线性输出</em>。
            </p>
          </ConceptCard>
          <ConceptCard title="能力复利" badge="最被低估">
            <p className="leading-relaxed">
              新技能建立在旧技能之上。学了概率论,你看世界的方式从此不同。
              能力复利的特点是<em>会迁移、会组合、会自加速</em>。
            </p>
          </ConceptCard>
          <ConceptCard title="关系复利" badge="最难量化">
            <p className="leading-relaxed">
              5 年来定期联系的朋友,在你需要时是"网络资本"。
              关系复利的特点是<em>必须主动维护,一旦断裂极难重建</em>。
            </p>
          </ConceptCard>
        </div>
      </Section>

      <Section title="Naval 的"特定知识 + 杠杆"公式">
        <p>
          纳瓦尔在他著名的"How to Get Rich"系列里,把财富复利拆成两个关键变量:
        </p>
        <ul>
          <li><strong>特定知识 (Specific Knowledge)</strong>: 学校教不了、容易让你"显得不像在工作"的、强烈反映你独特性的能力。</li>
          <li><strong>杠杆 (Leverage)</strong>: 把一次输入放大成 N 次输出的方式。三种杠杆是:资本、人力、代码与媒体 (零边际成本)。</li>
        </ul>
        <p>
          复利之所以强大,是因为<strong>"特定知识 × 杠杆"也在复利</strong>。
          一个写代码的人,他的代码每天 24 小时都在为他工作 — 这就是杠杆的复利。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="复利,不仅是数学概念,而是一切因果。健康、关系、心智、财富,无一例外。"
          author="纳瓦尔·拉维肯"
          role="AngelList 创始人,投资者"
          source="《纳瓦尔宝典》"
          guide="这句话的关键是'不仅是数学'。当你把复利当成世界观,而不是公式,你会停止追逐'一夜暴富'。"
          initials="NR"
        />
      </Section>

      <Section title="负复利:坏习惯的恐怖">
        <p>
          每天后退 1%,365 天后是什么?
        </p>
        <p>
          0.99<sup>365</sup> ≈ <strong>0.026</strong>。
          一年下来,只剩起点的 2.6%。
        </p>
        <p>
          坏习惯的可怕之处,不是它"今天让你后退 1%",而是它<strong>剥夺了未来本可以叠加的复利</strong>。
          每天多刷 1 小时短视频,5 年后你失去的不是 1825 小时,而是 1825 小时本可以变成的某项能力的复利。
        </p>
        <Callout variant="warn">
          复利的对称性:好的输入会复利,坏的输入也会复利。每天的微小后退,长期下来比一次大失败更难修复。
        </Callout>
      </Section>

      <ToolLink
        href="/tools/compound-simulator"
        name="复利成长模拟器"
        hint="拖动滑块,看看每天 ±1% 在 10 年后的真实差距 — 比公式更直观。"
      />

      <Section title="复利曲线的关键拐点">
        <p>
          一个被忽视的事实:<strong>复利曲线在前 70% 的时间几乎不可见</strong>。
        </p>
        <p>
          假设年化 10%,本金 1 万元,30 年后是 17.4 万。
          但前 10 年才到 2.6 万,前 20 年到 6.7 万。
          <strong>最大的回报,集中在最后 10 年</strong>。
        </p>
        <p>
          这意味着:大部分放弃,发生在曲线"还没起飞"的那段时间。
          能熬过去的人,不是更聪明,而是更早理解这条曲线长什么样。
        </p>
      </Section>

      <Section>
        <CompareCard
          leftTitle="错的复利观"
          rightTitle="对的复利观"
          rows={[
            { dimension: "时间预期", left: "几个月看效果", right: "5 年起步" },
            { dimension: "中断成本", left: "可以暂停", right: "暂停 = 重置" },
            { dimension: "投入方式", left: "短期高强度", right: "长期低强度,可持续" },
            { dimension: "评估指标", left: "今天进步多少", right: "10 年后变成什么" },
            { dimension: "心态", left: "曲线没起飞 = 失败", right: "曲线还在底部 = 还在累积" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="compounding"
        question="你正在做的哪件事,处于复利曲线的'看起来没起色'阶段?它如果坚持 5 年,会变成什么?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《纳瓦尔宝典》</strong> — 杠杆与特定知识的最佳教材</li>
          <li><strong>《滚雪球》</strong> Alice Schroeder — 巴菲特如何把复利变成性格</li>
          <li><strong>《原子习惯》</strong> James Clear — 微小复利的实操手册</li>
          <li>Morgan Housel, "The Psychology of Money" — 复利与时间的故事化讲解</li>
        </ul>
      </Section>
    </>
  );
}
