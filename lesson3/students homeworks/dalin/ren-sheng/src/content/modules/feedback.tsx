import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function FeedbackContent() {
  return (
    <>
      <Section>
        <Lede>
          一个糟糕的决定,有时也会带来好结果。一个优秀的决定,有时也会失败。
        </Lede>
        <p>
          学会从结果中学习,听起来理所当然。但真相是:
          <strong>大部分人从结果中学到的,是错的教训</strong>。
        </p>
        <p>
          因为人脑天生擅长"事后讲故事" — 不管结果如何,总能拼出一套合理的因果。
          这种能力曾让我们的祖先在草原上活下来,但在现代世界里,它让我们一次又一次掉进同样的坑。
        </p>
      </Section>

      <Section title="结果偏差 (Outcome Bias):反馈的最大杀手">
        <p>
          经典心理学实验:同一个医疗决策,只是结果不同。
        </p>
        <ul>
          <li>结果好 → 受访者打分:决策很英明</li>
          <li>结果坏 → 受访者打分:决策很糟糕</li>
        </ul>
        <p>
          决策本身一字未变,只是结果变了,评价却完全相反。
          <strong>这就是结果偏差:用结果好坏倒推决策好坏</strong>。
        </p>
        <Callout variant="warn">
          结果偏差让你从赌博式决策的赢局里学到"我很对",从严谨决策的输局里学到"我错了"。
          长期下来,你会越赌越大,直到一次毁灭性的失败。
        </Callout>
      </Section>

      <Section title="Ray Dalio 的"痛苦 + 反思 = 进步"">
        <p>
          Bridgewater 创始人 Ray Dalio,1982 年因为一次"全押式"判断,几乎让公司破产。他后来花了 10 年,把这次失败拆解成一套机器化的反馈系统:
        </p>
        <ol>
          <li><strong>记录每一个决策</strong>,包括当时的依据、不知道的信息、预测的概率。</li>
          <li><strong>定期复盘</strong>,但<em>不看结果是好是坏</em>,只看"决策本身在当时的信息下,是否合理"。</li>
          <li><strong>提取"原则"</strong>,把每次复盘的洞察抽象成可复用的规则。</li>
          <li><strong>新决策必须先过原则的筛子</strong>,绕开过去已经踩过的坑。</li>
        </ol>
        <p>
          这个流程的精髓在第 2 步:<strong>分离决策与结果</strong>。如果你只在结果坏的时候反思,你会过度反应;只在结果好的时候反思,你会陷入幸存者偏差。
        </p>
      </Section>

      <Section>
        <QuoteCard
          quote="痛苦 + 反思 = 进步。痛苦本身不会让你进步,只有反思会。"
          author="Ray Dalio"
          role="Bridgewater 创始人"
          source="《Principles》"
          guide="这句话的另一面是:'快乐 + 反思 = 进步'。但人们总在快乐时停止反思,所以 Dalio 强调'痛苦'是反思的入口,而非唯一入口。"
          initials="RD"
        />
      </Section>

      <Section title="决策日志:对抗事后归因">
        <p>
          一个被低估的工具:在做出决策的时候,把以下四件事写下来:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="① 决策是什么" badge="事实">
            <p className="leading-relaxed">用一句话写清楚你正在决定什么、有哪几个选项。</p>
          </ConceptCard>
          <ConceptCard title="② 你预测的结果" badge="概率">
            <p className="leading-relaxed">写出你预测最可能的结果,以及你赋予的概率 (例:60%)。</p>
          </ConceptCard>
          <ConceptCard title="③ 你的依据" badge="逻辑">
            <p className="leading-relaxed">为什么你这样判断?用 2-3 个事实或推理支撑。</p>
          </ConceptCard>
          <ConceptCard title="④ 你不知道什么" badge="盲区">
            <p className="leading-relaxed">哪些关键信息你其实不知道?这些信息如何会反转你的决定?</p>
          </ConceptCard>
        </div>
        <p>
          3 个月后,回来看这份日志。
          <strong>你会发现自己当时的判断,远没有事后回忆中那么准确</strong>。
          这种"被打脸"的体验,正是最好的反馈。
        </p>
      </Section>

      <ToolLink
        href="/tools/decision-journal"
        name="决策日志练习"
        hint="花 5 分钟,记录一个你正在面对的决定。3 个月后,我们会用日历提醒你回来复盘。"
      />

      <Section title="慢思考复盘:Kahneman 的反偏差武器">
        <p>
          Kahneman 后期最重要的实践建议:做任何重大判断之后,强迫自己等 24 小时再行动。
          这 24 小时里,<strong>系统 1 的情绪会褪色,系统 2 才有机会发声</strong>。
        </p>
        <p>
          反过来,做复盘时也是同样的逻辑 — 不要在结果出来当天复盘 (情绪太重),
          也不要在 1 年后复盘 (细节太模糊)。
          最佳窗口:<strong>3 周到 3 个月</strong>。
        </p>
      </Section>

      <Section>
        <CompareCard
          leftTitle="错的反馈循环"
          rightTitle="对的反馈循环"
          rows={[
            { dimension: "评估锚点", left: "结果好坏", right: "决策本身在当时是否合理" },
            { dimension: "复盘时机", left: "结果出来当天 / 永不", right: "3 周到 3 个月" },
            { dimension: "记录方式", left: "靠记忆", right: "决策日志 (写下来)" },
            { dimension: "结论提取", left: "讲一个'幸亏 / 早知道'故事", right: "提炼可复用的原则" },
            { dimension: "对运气", left: "归因为努力 / 失误", right: "明确区分运气与决策质量" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="feedback"
        question="过去一年里,有没有一个'结果好,但决策其实草率'的事?如果重来一次,你会怎么改?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《Principles》</strong> Ray Dalio — 决策机器的原型</li>
          <li><strong>《Thinking in Bets》</strong> Annie Duke — 决策日志的实操教材</li>
          <li><strong>《思考,快与慢》</strong> Kahneman — 慢思考的科学基础</li>
          <li>Shane Parrish (Farnam Street), "The Decision Journal" — 模板可下载</li>
        </ul>
      </Section>
    </>
  );
}
