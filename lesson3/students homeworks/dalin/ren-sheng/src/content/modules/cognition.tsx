import { Section, Lede, ToolLink } from "@/components/module/section";
import { ConceptCard, Callout, CompareCard } from "@/components/ui/card";
import { QuoteCard } from "@/components/ui/quote-card";
import { ReflectionPrompt } from "@/components/ui/reflection-prompt";

export function CognitionContent() {
  return (
    <>
      <Section>
        <Lede>
          先问一个反直觉的问题:你是不是觉得自己挺理性的?
        </Lede>
        <p>
          1974 年,Daniel Kahneman 与 Amos Tversky 发表了一篇看似平凡的论文,后来彻底改写了人类对"自己"的认知。
          他们用一系列简单实验证明: <strong>大多数人在大多数情境里,并不是用"理性"在思考,而是用一些被称为"启发式 (Heuristics)"的捷径在思考</strong>。
          这些捷径平时帮我们节省脑力,但偶尔会把我们引到非常错误的地方 — 而且我们意识不到。
        </p>
        <p>
          所谓"认知",不是看你"知道多少",而是看你<strong>用什么样的镜片</strong>看世界。
          在"人生算法"里,认知是第一道工序:输入再正确,如果镜片是扭曲的,输出也无法对。
        </p>
      </Section>

      <Section title="你眼中的世界,决定你看到什么">
        <p>
          人脑不是一台 CPU,而是一台老旧的、需要省电的、由进化塑造的"启发式机器"。
          它在不知不觉中,通过几种方式扭曲了输入:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
          <ConceptCard title="心智模型 (Mental Models)" badge="芒格">
            <p className="leading-relaxed">
              你脑中预装的"看世界的模式"。芒格说:"<em>你必须把每一种模型都装进脑子里,变成一张网</em>"。
              单一模型 = 一把锤子,所有问题都像钉子。
            </p>
          </ConceptCard>
          <ConceptCard title="第一性原理" badge="物理学">
            <p className="leading-relaxed">
              不依赖类比,从最不可拆分的事实推理。Musk:"<em>不是因为别人这样做,所以我这样做</em>"。
              对抗"惯性思维"的最强武器。
            </p>
          </ConceptCard>
          <ConceptCard title="认知偏差 (Cognitive Bias)" badge="Kahneman">
            <p className="leading-relaxed">
              系统性的、可预测的判断错误。常见的有:锚定效应、确认偏差、损失厌恶、可得性偏差。
              坏消息:你无法消除偏差。好消息:你可以识别它。
            </p>
          </ConceptCard>
          <ConceptCard title="贝叶斯更新" badge="概率论">
            <p className="leading-relaxed">
              不要用"对错"看世界,用"概率"看世界。新证据出现时,温柔地修改你的概率,而不是死守原观点。
              一个人的成熟度 ≈ 他更新自己观点的速度。
            </p>
          </ConceptCard>
        </div>
      </Section>

      <Section title="为什么"理性"不是默认状态">
        <p>
          Kahneman 在《思考,快与慢》中提出了广为流传的"双系统"理论:
        </p>
        <ul>
          <li><strong>系统 1</strong>: 快、自动、不费力。"2+2=?" 你不需要"想"。</li>
          <li><strong>系统 2</strong>: 慢、刻意、费力。"17×24=?" 你必须"算"。</li>
        </ul>
        <p>
          系统 1 占据了你 95% 的决策。<strong>认知偏差,几乎全部都是系统 1 在你不察觉时做的"代笔"</strong>。
          学会"叫醒系统 2",是对抗偏差的唯一办法。
        </p>
        <Callout variant="insight">
          认知升级,不是"学更多",而是学会"在该慢的时候慢下来"。这本身,就是一种算法。
        </Callout>
      </Section>

      <ToolLink
        href="/tools/bias-test"
        name="偏差自检测试"
        hint="用 5 道经典心理学题目,直接体验你自己的偏差地图。"
      />

      <Section>
        <QuoteCard
          quote="如果你想说服别人,诉诸利益,而非诉诸理性。"
          author="查理·芒格"
          role="伯克希尔哈撒韦副主席"
          source="《穷查理宝典》"
          guide="这句话反直觉的地方在于:它建议你把自己当作'非理性的人'去理解他人,这本身就是一种最高级的理性。"
          initials="芒"
        />
      </Section>

      <Section title="一个真实案例:你为什么对'锚'毫无防备">
        <p>
          1974 年的实验:实验员先转一个写有 0–100 数字的轮盘,让参与者看到一个随机数 (比如 65),
          然后问:"非洲国家在联合国占的比例,比这个数字高还是低?"
        </p>
        <p>
          结果出乎所有人意料:看到 65 的人平均估计是 45%;看到 10 的人平均估计是 25%。
          <strong>一个明显是随机的、与问题无关的数字,显著影响了大家的"理性估计"</strong>。
        </p>
        <p>
          这个实验已重复几百次,结果几乎不变。而它带来的应用是:
          每一次报价、谈判、招标、面试薪资 — 都是一场锚定效应的较量。
          知道这一点的人,与不知道这一点的人,做的是完全不同的游戏。
        </p>
      </Section>

      <Section>
        <CompareCard
          leftTitle="未升级的认知"
          rightTitle="升级后的认知"
          rows={[
            { dimension: "看到一个观点", left: "对错", right: "概率" },
            { dimension: "遇到反对", left: "防御", right: "更新" },
            { dimension: "做判断", left: "凭直觉 (系统 1)", right: "刻意慢下来 (系统 2)" },
            { dimension: "工具箱", left: "一种思维模式", right: "多元心智模型" },
            { dimension: "对自己", left: "我很理性", right: "我可能此刻正在偏" },
          ]}
        />
      </Section>

      <ReflectionPrompt
        moduleSlug="cognition"
        question="过去一周,你做过的哪个判断,事后看是被某种偏差影响的?是哪一种?"
      />

      <Section title="延伸阅读">
        <ul>
          <li><strong>《思考,快与慢》</strong> Daniel Kahneman — 双系统理论的源头</li>
          <li><strong>《穷查理宝典》</strong> Charlie Munger — 多元思维模型清单</li>
          <li><strong>《Superforecasting》</strong> Philip Tetlock — 用贝叶斯更新做超级预测</li>
          <li><strong>Farnam Street (fs.blog)</strong> — Mental Models 的英文百科</li>
        </ul>
      </Section>
    </>
  );
}
