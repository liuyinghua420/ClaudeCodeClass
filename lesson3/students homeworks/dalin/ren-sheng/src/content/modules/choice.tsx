import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function ChoiceContent() {
  return (
    <>
      <Section>
        <Lede>
          每一次选择,你都在拒绝所有"非这一选项"的未来。
        </Lede>
        <p>
          经济学有一个概念叫"机会成本",学过的人都听过,但绝大多数人没有真正理解它。
        </p>
        <p>
          因为机会成本不是<em>另一个选项的价值</em>,而是<em>另一个选项经过复利之后的价值</em>。
          这个区别,决定了一个人对"时间"的尊重程度。
        </p>
      </Section>

      <Section title="什么是真正的机会成本">
        <p>
          机会成本的标准定义:为了选择 A,你放弃的次优选项 B 的价值。
        </p>
        <p>
          但这个定义被用错了几十年。错在哪?
        </p>
        <ul>
          <li>错误用法:"我看了 1 小时电视的机会成本是 1 小时学习。"</li>
          <li>正确用法:"我每天看 1 小时电视的机会成本,是 5 年后我本可以拥有的某项能力的复利。"</li>
        </ul>
        <Callout variant="insight">
          机会成本不是一个数字,是一条曲线。短期看不到,长期会暴击你。
        </Callout>
      </Section>

      <Section title="显性成本 vs 隐性成本">
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="显性成本" badge="看得见">
            <p className="leading-relaxed">
              你直接付出的钱、时间、精力。
              账单上写得清清楚楚,但常常是冰山的一角。
            </p>
          </ConceptCard>
          <ConceptCard title="隐性成本" badge="看不见">
            <p className="leading-relaxed">
              机会成本 + 心智成本 + 关系成本 + 健康成本。
              不写在账单上,但在长期复利后远远超过显性成本。
            </p>
          </ConceptCard>
        </div>
        <p>
          一个常见的误判:接一份高薪但消耗心智的工作,显性成本是 0 (你赚到了),
          但隐性成本可能包括:学习时间被占用、关系疏离、慢性疲劳。3 年后回看,你可能反而更穷。
        </p>
      </Section>

      <Section title="最小遗憾原则">
        <p>
          Bezos 在创立 Amazon 之前,做了一个著名的内心实验。他想象自己 80 岁,回望一生:
        </p>
        <blockquote>
          "我不想 80 岁的时候后悔自己没有去尝试这件事。我会后悔不去做,但不会后悔失败。"
        </blockquote>
        <p>
          这就是<strong>最小遗憾原则 (Regret Minimization Framework)</strong>:
          面对重大选择时,不问"哪一个能让我更成功",而问"哪一个能让我未来不后悔"。
        </p>
        <p>
          注意:这个原则只适用于<strong>不可逆的、影响终身的选择</strong>。
          对日常小事用这个,会让你陷入虚无感的深渊。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="选择是一个减法运算 — 选择什么不做,比选择做什么更重要。"
          author="史蒂夫·乔布斯"
          role="Apple 联合创始人"
          source="2004 Business Week 采访"
          guide="选择不是把时间花到正确的事上,而是把时间从所有不正确的事上拿回来。"
          initials="SJ"
        />
      </Section>

      <Section title="选项漏斗:对抗"选择疲劳"">
        <p>
          心理学家 Barry Schwartz 在《选择的悖论》中提出:
          <strong>选项越多,人越焦虑、越不容易做决定、对最终结果越不满意</strong>。
        </p>
        <p>
          应对方式不是"多看几个选项",而是"快速过滤":
        </p>
        <ol>
          <li><strong>第一层</strong>: 哪些是显然不行的?(用一两个硬条件,快速排除)</li>
          <li><strong>第二层</strong>: 剩下的里,哪些是显然好的?(同样用硬条件)</li>
          <li><strong>第三层</strong>: 剩下的几个 (≤ 3),才进入"细致比较"。</li>
        </ol>
        <p>
          这是一个倒金字塔的漏斗:从 100 个候选,迅速过滤到 3 个。
          80% 的选择质量,来自这个漏斗的前两层 — 也就是<strong>"什么不要"</strong>这个判断。
        </p>
      </Section>

      <ToolLink
        href="/tools/opportunity-cost"
        name="机会成本对比器"
        hint="把"看不见的成本"可视化。看 5 年后,你究竟用什么换了什么。"
      />

      <Section>
        <CompareCard
          leftTitle="一般人"
          rightTitle="算法思维"
          rows={[
            { dimension: "看选项", left: "看 A 有多好", right: "看放弃的 B 经过复利后多好" },
            { dimension: "纠结时", left: "比较显性成本", right: "比较隐性成本" },
            { dimension: "重大选择", left: "最大化预期收益", right: "最小化未来遗憾" },
            { dimension: "选择多时", left: "都要看一遍", right: "用漏斗快速过滤" },
            { dimension: "选完后", left: "一直担心 B", right: "全力投入 A,不再回头" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="choice"
        question="你最近在反复选择 (或反复后悔) 的一件事是什么?它的真正机会成本 (复利后) 是什么?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《选择的悖论》</strong> Barry Schwartz — 选项与幸福感的反直觉关系</li>
          <li><strong>《Decisive》</strong> Chip & Dan Heath — 4 步决策法</li>
          <li>Bezos 的"最小遗憾原则"原话访谈视频 (1999)</li>
          <li>Morgan Housel, "Same as Ever" — 关于无法逃避的取舍</li>
        </ul>
      </Section>
    </>
  );
}
