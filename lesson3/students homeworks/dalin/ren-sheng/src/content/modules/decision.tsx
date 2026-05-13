import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function DecisionContent() {
  return (
    <>
      <Section>
        <Lede>
          一个反直觉的事实:大多数人,把 90% 的决策时间花在 10% 不重要的事情上。
        </Lede>
        <p>
          你今晚吃什么,反复纠结 30 分钟。
          你要不要换工作,5 分钟就拍板。
          <strong>这两件事,在"决策预算"上完全反了</strong>。
        </p>
        <p>
          人生算法的第二道工序:决策。它不教你"做什么决定",它教你"怎么决定一个决定"。
        </p>
      </Section>

      <Section title="决策质量 ≠ 结果质量">
        <p>
          扑克世界冠军 Annie Duke 说过一句被反复引用的话:
        </p>
        <blockquote>
          "我们倾向于用结果来评判决策的质量,但实际上,一个糟糕的决定有时也会带来好结果,而一个伟大的决定有时也会带来坏结果。"
        </blockquote>
        <p>
          区分这两者,是决策的第一课:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="决策质量" badge="可控">
            <p className="leading-relaxed">
              在你能拿到的信息下,你的判断是否在数学期望上是更优的。这个,你可以努力提高。
            </p>
          </ConceptCard>
          <ConceptCard title="结果" badge="不可控">
            <p className="leading-relaxed">
              你的决策 + 不在你掌控里的"运气"共同决定。运气好,坏决策也能赢一次。
            </p>
          </ConceptCard>
        </div>
        <Callout variant="insight">
          长期来看,你只能控制"决策质量"。如果只盯着结果,你会从对的事中学到错的教训。
        </Callout>
      </Section>

      <Section title="Type 1 决策 vs Type 2 决策">
        <p>
          Jeff Bezos 在 1997 年股东信里提出了一个被无数公司沿用至今的框架:
        </p>
        <ul>
          <li><strong>Type 1 决策 (单向门)</strong>: 不可逆。一旦做了,回不去。需要慎重、缓慢、咨询多人。</li>
          <li><strong>Type 2 决策 (双向门)</strong>: 可逆。错了可以回头。应该快速、轻量、由小团队拍板。</li>
        </ul>
        <p>
          Bezos 的关键洞见:<strong>大多数决策,是 Type 2 的</strong>。但人们经常用 Type 1 的标准去对待它们 — 过度纠结,过度调研,过度等待。
          结果是:速度变慢,机会成本上升,组织变得保守。
        </p>
        <p>
          反过来也成立:<strong>对真正 Type 1 的决定 (婚姻、移民、创业、巨额借款),一定不要用 Type 2 的速度去做</strong>。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="大多数决策都应该在你拥有 70% 你希望拥有的信息时做出。如果等到 90%,大多数情况下你已经太慢了。"
          author="Jeff Bezos"
          role="Amazon 创始人"
          source="1997 致股东信 (经多次重申)"
          guide="这句话不是为了快而快,而是因为他知道大部分决定是 Type 2 — 等不起,也不必等。"
          initials="JB"
        />
      </Section>

      <Section title="期望值思维:把每个决策当成赌局">
        <p>
          一个人的认知水平,可以从他<strong>是否会用"期望值"思考</strong>来识别。
        </p>
        <p>
          假设有两个选择:
        </p>
        <ul>
          <li>选项 A: 100% 拿到 100 元</li>
          <li>选项 B: 50% 拿到 250 元,50% 什么都没有</li>
        </ul>
        <p>
          多数人会选 A (确定性收益),但 B 的<strong>期望值 = 125 元</strong>,数学上更优。
          这不意味着每次都该选 B (单次结果可能是 0),但 <strong>如果这种选择重复出现,长期一定要选 B</strong>。
        </p>
        <p>
          人生中的大部分关键决策,都是"重复出现的形态" — 投资、招聘、换工作、合作选择。
          学会用期望值思考,不是数学题,是认知题。
        </p>
      </Section>

      <Section title="10/10/10 法则:对抗短视的偏差">
        <p>
          来自 Suzy Welch 的简单工具:面对一个决定时,问自己三个问题:
        </p>
        <ul>
          <li>10 分钟后,我会怎么想?</li>
          <li>10 个月后,我会怎么想?</li>
          <li>10 年后,我会怎么想?</li>
        </ul>
        <p>
          很多让人当下纠结的事情,在 10 年的尺度下毫无意义。
          反过来,很多被当下忽视的事情,10 年后才显出复利的力量。
        </p>
      </Section>

      <ToolLink
        href="/tools/decision-cost"
        name="决策成本计算器"
        hint="判断你正在面对的决定属于哪一类,以及值得花多少时间想。"
      />

      <Section>
        <CompareCard
          leftTitle="坏决策"
          rightTitle="好决策"
          rows={[
            { dimension: "评估方式", left: "看结果", right: "看过程与信息" },
            { dimension: "速度", left: "Type 1 用速度,Type 2 用慎重", right: "Type 1 慎重,Type 2 用速度" },
            { dimension: "信息阈值", left: "等 90% 信息才动", right: "70% 信息就动 (可逆决策)" },
            { dimension: "工具", left: "直觉", right: "期望值 + 反向思考 + 10/10/10" },
            { dimension: "失败后", left: "归咎运气", right: "复盘决策本身" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="decision"
        question="你最近做过的一个决定,它是 Type 1 还是 Type 2?你为它投入的时间,是否匹配?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《Thinking in Bets》</strong> Annie Duke — 用扑克的方式做决策</li>
          <li><strong>《Principles》</strong> Ray Dalio — 把决策做成"机器"</li>
          <li>Bezos 1997 致股东信原文 — Type 1/2 框架的源头</li>
          <li><strong>《How to Decide》</strong> Annie Duke — 决策的 12 个工具</li>
        </ul>
      </Section>
    </>
  );
}
