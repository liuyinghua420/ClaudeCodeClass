import Link from "next/link";
import { ArrowRight, Sparkles, Wrench, Compass } from "lucide-react";
import { MODULES } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { ModuleCardGrid } from "@/components/home/module-card-grid";
import { PathByQuestion } from "@/components/home/path-by-question";

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-meta uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            一份交互式学习产品
          </p>
          <h1 className="text-display text-text-primary mb-6">
            人生算法<span className="text-accent">.</span>
            <br />
            <span className="text-text-secondary font-normal">
              不是答案,是一种思考方式。
            </span>
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mb-8 leading-relaxed">
            7 个维度的系统讲解,8 个交互式模拟器,一份可带走的算法清单。
            <br />
            从"听过"到"会用",从此面对选择,你不再只靠直觉。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/m/cognition">
              <Button size="lg" className="gap-2">
                开始 5 分钟体验
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/library">
              <Button size="lg" variant="secondary">
                直接看工具箱
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 价值主张 */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <Sparkles className="w-7 h-7 text-accent" />
            <h3 className="text-h3 text-text-primary">
              鸡汤告诉你 What,本页教你 How
            </h3>
            <p className="text-text-secondary leading-relaxed text-[0.95rem]">
              不靠"成功故事",靠跨学科的概念框架。每个观点都可被反例修正。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Wrench className="w-7 h-7 text-accent" />
            <h3 className="text-h3 text-text-primary">
              不靠故事,靠模拟器
            </h3>
            <p className="text-text-secondary leading-relaxed text-[0.95rem]">
              每个抽象概念都配一个交互工具,让你在点击与输入中亲手验证它。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Compass className="w-7 h-7 text-accent" />
            <h3 className="text-h3 text-text-primary">
              带走属于你自己的清单
            </h3>
            <p className="text-text-secondary leading-relaxed text-[0.95rem]">
              所有反思与参数本地保存,可一键导出 Markdown 个性化算法手册。
            </p>
          </div>
        </div>
      </section>

      {/* 模块网格 */}
      <section className="py-16 md:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-h1 text-text-primary mb-2">7 个维度的学习路径</h2>
            <p className="text-text-secondary text-[0.95rem]">
              建议按顺序学习;熟悉的用户也可以直接跳转到任意模块。
            </p>
          </div>
        </div>
        <ModuleCardGrid modules={MODULES} />
      </section>

      {/* 按问题进入 */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="mb-8">
          <h2 className="text-h1 text-text-primary mb-2">按你当下的问题进入</h2>
          <p className="text-text-secondary text-[0.95rem]">
            如果你正在面对一个具体处境,我们建议这条路径。
          </p>
        </div>
        <PathByQuestion />
      </section>

      {/* 信任锚 */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-12">
          <p className="text-meta uppercase tracking-[0.18em] text-text-muted mb-3 font-medium">
            内容来源
          </p>
          <h3 className="text-h2 text-text-primary mb-4 max-w-2xl">
            整合自 12 位思想家、5 个学科领域、20+ 部经典文献
          </h3>
          <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">
            涵盖芒格、纳瓦尔、巴菲特、Ray Dalio、Daniel Kahneman、Nassim Taleb、Jeff Bezos
            等思想家;融合心理学、行为经济学、决策科学、博弈论、统计思维。
          </p>
          <blockquote className="text-quote text-text-primary border-l-4 border-l-accent pl-5 mb-3 max-w-2xl">
            "如果你想说服别人,诉诸利益,而非诉诸理性。"
          </blockquote>
          <p className="text-meta">— 查理·芒格,《穷查理宝典》</p>

          <div className="border-t border-border mt-8 pt-6 text-sm text-text-muted leading-relaxed">
            <p>
              <span className="font-medium text-text-secondary">致谢: </span>
              中文语境下"人生算法"概念的系统化表达,主要受到老喻 (喻颖正) 同名作品的启发。
              本网页为独立解读,不直接引用其原文。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
