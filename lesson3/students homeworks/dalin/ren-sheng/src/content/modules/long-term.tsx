import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function LongTermContent() {
  return (
    <>
      <Section>
        <Lede>
          慢就是快。但反过来也成立 — 快,也常常就是慢。
        </Lede>
        <p>
          长期主义不是"忍耐"。
          它是一种<strong>对世界因果尺度的判断</strong>:
          知道哪些事的因果链条很短 (今天努力,今天兑现),
          哪些事的因果链条很长 (今天努力,5 年后才显现)。
        </p>
        <p>
          走错时间尺度,你会用"短期勤奋"补"长期懒惰",越努力,越焦虑。
        </p>
      </Section>

      <Section title="主观感受 vs 客观成果:两条不重合的曲线">
        <p>
          假设你开始练琴。前 3 个月你的<strong>主观感受</strong>是:每天进步明显,有反馈,有兴奋感。
        </p>
        <p>
          3 个月后,你的<strong>主观感受</strong>开始下降:每天感觉没什么变化,弹什么都差不多。
          但你的<strong>客观水平</strong>仍在上升 — 你只是<em>感受不到</em>。
        </p>
        <p>
          这就是<strong>"放弃高发期"</strong>的来源:
          人是被主观感受驱动的。当感受曲线低于成果曲线时,你会觉得"白练了",于是放弃。
          但其实,这正是复利曲线在底部加速积累的关键时刻。
        </p>
        <Callout variant="insight">
          所有有价值的事,放弃高发期都在 3 个月、1 年、3 年这几个节点。
          知道这个,不一定能让你不想放弃,但能让你识别"这就是那个节点"。
        </Callout>
      </Section>

      <Section title="延迟满足:不是忍耐,是认知升级">
        <p>
          1972 年,斯坦福"棉花糖实验":4 岁的孩子,如果能等 15 分钟,就能拿到两块棉花糖,而不是一块。
          能等的孩子,后来在学业、收入、人际关系上都明显更好。
        </p>
        <p>
          但这个实验的<strong>误读</strong>很流行:"延迟满足 = 忍耐"。
        </p>
        <p>
          真正能做到延迟满足的孩子,不是"硬忍",而是<strong>找到了让自己不去看棉花糖的方法</strong> —
          有的转头看墙,有的玩手指,有的唱歌。
          延迟满足的本质,不是意志力,是<strong>认知策略</strong>。
        </p>
        <p>
          长期主义也是同样:不是"咬牙坚持",是"想清楚因果尺度,然后让短期诱惑变得不那么诱惑"。
        </p>
      </Section>

      <Section title="Lindy Effect:时间是真正的滤网">
        <p>
          塔勒布在《反脆弱》中阐述了一个反直觉的观察:
        </p>
        <blockquote>
          "对于不会衰老的事物 (思想、技术、文化),已经存在的时间,正比于它未来还能存在的时间。"
        </blockquote>
        <p>
          一本被读了 100 年的书,有更高概率再被读 100 年。
          一本只流行了 1 年的畅销书,大概率 5 年内就消失。
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="可衰老事物" badge="如人体">
            <p className="leading-relaxed">活了 70 年的人,预期寿命比 30 年的人短。"已存在时间"是负信号。</p>
          </ConceptCard>
          <ConceptCard title="不衰老事物" badge="如思想">
            <p className="leading-relaxed">流传 100 年的思想,比流行 1 年的更可能再活 100 年。"已存在时间"是正信号。</p>
          </ConceptCard>
        </div>
        <p>
          应用:面对一本新书 vs 一本经典,先选经典。
          面对一个新概念 vs 一个被反复验证的概念,先用后者。
          这不是保守,是<strong>用时间替你过滤</strong>。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="股市是一个把钱从没有耐心的人手里转移到有耐心的人手里的装置。"
          author="沃伦·巴菲特"
          role="伯克希尔哈撒韦董事长"
          source="多次股东大会"
          guide="这句话的'股市'可以替换成'人生'。任何复利系统,都是耐心的转移装置。"
          initials="WB"
        />
      </Section>

      <Section title="个人 KPI 长期化">
        <p>
          一个具体的实践方法:把你给自己的 KPI 时间窗口拉长。
        </p>
        <ul>
          <li>不要问"今天我学到了什么",问"今年我形成了什么能力"。</li>
          <li>不要问"这个月我赚了多少",问"3 年后我的特定知识值多少"。</li>
          <li>不要问"今天我跑了几公里",问"3 年后我的身体是什么状态"。</li>
        </ul>
        <p>
          时间窗口决定你的行为。
          短窗口让你<strong>追逐反馈</strong>,长窗口让你<strong>建造系统</strong>。
        </p>
      </Section>

      <ToolLink
        href="/tools/long-term-feedback"
        name="长期反馈曲线"
        hint="选一项你正在做的事,看主观感受与客观成果的曲线在哪里分叉、在哪里反超。"
      />

      <Section>
        <CompareCard
          leftTitle="短期主义"
          rightTitle="长期主义"
          rows={[
            { dimension: "评估窗口", left: "天 / 周", right: "年 / 5 年 / 10 年" },
            { dimension: "感受 vs 成果", left: "看感受", right: "看成果,接受感受失真" },
            { dimension: "面对放弃高发期", left: "放弃", right: "识别它,继续走" },
            { dimension: "选择新方案", left: "追逐新潮", right: "Lindy Effect 优先经典" },
            { dimension: "目标", left: "追逐 KPI", right: "建造可复利的系统" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="long-term"
        question="你正在做的哪件事,你恰好在'放弃高发期'?如果再坚持 1 年,会变成什么?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《反脆弱》</strong> Nassim Taleb — Lindy Effect 与时间作为滤网</li>
          <li><strong>《Long Game》</strong> Dorie Clark — 长期主义的实操指南</li>
          <li><strong>《纳瓦尔宝典》</strong> — "玩长期游戏"的论述</li>
          <li>Morgan Housel, "The Psychology of Money" — 时间与耐心的故事</li>
        </ul>
      </Section>
    </>
  );
}
