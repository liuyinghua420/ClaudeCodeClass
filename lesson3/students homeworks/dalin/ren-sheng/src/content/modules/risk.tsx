import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function RiskContent() {
  return (
    <>
      <Section>
        <Lede>
          人生算法的最后一道工序,是<strong>不被一击毙命</strong>。
        </Lede>
        <p>
          所有前面的工序 — 认知、决策、复利、选择、反馈、长期主义 —
          都建立在一个隐含前提之上:<strong>你还在场上</strong>。
        </p>
        <p>
          但只要你做的是"重复游戏",哪怕每一次的期望值都为正,
          只要存在 <strong>毁灭性风险 (Ruin Risk)</strong>,长期下来,你出局的概率几乎是 100%。
        </p>
      </Section>

      <Section title="波动 (Volatility) ≠ 风险 (Risk)">
        <p>
          一个被混用了几十年的概念,塔勒布在《黑天鹅》和《反脆弱》中反复强调它们的区别:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="波动" badge="可恢复">
            <p className="leading-relaxed">
              短期上下起伏,但不会让你出局。
              股市跌 30%,你只要还在场上,就有反弹的机会。
            </p>
          </ConceptCard>
          <ConceptCard title="毁灭性风险" badge="不可恢复">
            <p className="leading-relaxed">
              一旦发生,你<em>永远出局</em>,没有"下一次"。
              用全部资金加 5 倍杠杆 — 涨跌一波动你就 0 了。
            </p>
          </ConceptCard>
        </div>
        <Callout variant="warn">
          很多人为了"减少波动"做了不必要的牺牲;
          很多人为了"追求收益"接受了不该接受的毁灭性风险。
          区分两者,是风险管理的第一原则。
        </Callout>
      </Section>

      <Section title="凯利公式:仓位比胜率更重要">
        <p>
          1956 年,贝尔实验室科学家 John Kelly 提出了一个公式,后来被巴菲特、Munger、Bill Gross 用了一辈子:
        </p>
        <p>
          <strong>最优下注比例 f* = (b·p − q) / b</strong>
          <br />
          (b = 盈亏比, p = 胜率, q = 1−p)
        </p>
        <p>
          这个公式的洞察是:<strong>胜率 60%、盈亏比 2:1 看起来很赚钱,但全押 100 局,你出局的概率超过 80%</strong>。
        </p>
        <p>
          换言之:期望值为正,完全不等于"长期一定能赚到钱"。
          你必须用合适的仓位,让自己在<em>糟糕运气的连续打击下</em>仍能存活。
        </p>
        <p>
          实际应用中,大多数顶级投资者用<strong>半凯利或四分之一凯利</strong>,
          因为现实中的胜率与盈亏比是估计值,留一半空间防止估错。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="不要丢失什么是无法承担丢失的。第一原则:不亏钱。第二原则:永远不要忘记第一原则。"
          author="沃伦·巴菲特"
          role="伯克希尔哈撒韦董事长"
          source="多次股东大会"
          guide="这句话不是说'不要冒险',而是'不要冒会让你出局的险'。允许小亏,杜绝大亏。"
          initials="WB"
        />
      </Section>

      <Section title="塔勒布的反脆弱:从波动中获益">
        <p>
          塔勒布把世界上的事物分成三类:
        </p>
        <ul>
          <li><strong>脆弱 (Fragile)</strong>: 怕波动,波动越大越受伤。例:玻璃杯、过度负债的公司。</li>
          <li><strong>强韧 (Robust)</strong>: 不怕波动,但也无法从中获益。例:钛合金、保守储蓄。</li>
          <li><strong>反脆弱 (Antifragile)</strong>: 在波动中变得更强。例:免疫系统 (适度感染会增强)、肌肉 (撕裂后更壮)。</li>
        </ul>
        <p>
          反脆弱不是"不怕风险",是<strong>把系统设计成"小亏小赚 / 但最大下行有限,最大上行无限"</strong>。
        </p>
        <p>
          应用:不要做"小赚多次,大亏一次"的事 (这是典型的脆弱);
          要做"小亏多次,大赚一次"的事 (这是反脆弱)。
        </p>
      </Section>

      <Section title="风险预算:把毁灭性的事情挑出来">
        <p>
          一个简单实用的工具:把你的生活分成三个区域:
        </p>
        <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
          <ConceptCard title="安全区" badge="不允许失败">
            <p className="leading-relaxed">
              健康、底层财务安全、核心关系。
              这里的事情,任何决策都要"<strong>能避免毁灭性风险</strong>"为最高优先级。
            </p>
          </ConceptCard>
          <ConceptCard title="探索区" badge="允许失败">
            <p className="leading-relaxed">
              新技能、副业、新关系、小投资。
              这里允许犯错,期望从波动中获益 — 这就是反脆弱区。
            </p>
          </ConceptCard>
          <ConceptCard title="禁区" badge="拒绝">
            <p className="leading-relaxed">
              即使期望值为正,也不做的事情。
              例:全部身家 ALL IN、无止损杠杆、损害健康的快钱机会。
            </p>
          </ConceptCard>
        </div>
        <p>
          大多数人的失败,不是在探索区试错失败,而是<strong>把禁区的事当成探索区做了</strong>。
        </p>
      </Section>

      <ToolLink
        href="/tools/ruin-risk"
        name="风险毁灭模拟器"
        hint="100 条蒙特卡洛路径,看哪怕只有 1% 的毁灭风险,长期下来出局率有多惊人。"
      />

      <Section>
        <CompareCard
          leftTitle="不懂风险"
          rightTitle="懂风险"
          rows={[
            { dimension: "评估指标", left: "期望值高就行", right: "期望值 + 出局率" },
            { dimension: "下注大小", left: "凭感觉 / 全押", right: "凯利或半凯利" },
            { dimension: "对波动", left: "讨厌任何波动", right: "区分波动与毁灭" },
            { dimension: "系统设计", left: "脆弱 (大亏一次就完)", right: "反脆弱 (小亏多次,大赚一次)" },
            { dimension: "对禁区", left: "用'万一呢'去试", right: "无论概率多低,都不碰" },
          ]}
        />
      </Section>

      <Callout variant="warn">
        <strong>免责声明:</strong>
        本网页所有涉及金融、概率、仓位的模拟器与公式,仅用于教育目的,不构成投资、理财或其他专业建议。
        任何决策请结合自身情况并咨询专业人士。
      </Callout>

      <ReflectionPrompt
        moduleSlug="risk"
        question="你目前所处的环境里,有没有一个'看起来期望值正,但其实包含毁灭性风险'的选项?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《黑天鹅》</strong> Nassim Taleb — 罕见极端事件的影响</li>
          <li><strong>《反脆弱》</strong> Nassim Taleb — 从波动中获益的系统设计</li>
          <li><strong>Fortune's Formula</strong> William Poundstone — 凯利公式的传记</li>
          <li>Howard Marks, <strong>《The Most Important Thing》</strong> — 风险与不确定性的区分</li>
        </ul>
      </Section>
    </>
  );
}
