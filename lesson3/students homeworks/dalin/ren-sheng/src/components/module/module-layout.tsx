"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { Button } from "@/components/ui/button";
import { getNextModule, getPrevModule, type ModuleMeta } from "@/data/modules";

interface Props {
  meta: ModuleMeta;
  children: React.ReactNode;
}

export function ModuleLayout({ meta, children }: Props) {
  const markCompleted = useUserStore((s) => s.markModuleCompleted);
  const completed = useUserStore((s) => s.completedModules);
  const isCompleted = completed.includes(meta.slug);

  const next = getNextModule(meta.slug);
  const prev = getPrevModule(meta.slug);

  useEffect(() => {
    return () => {};
  }, [meta.slug]);

  return (
    <article className="max-w-content mx-auto px-4 md:px-8">
      {/* 模块头 */}
      <header className="pt-12 md:pt-16 pb-8 border-b border-border">
        <div className="flex items-center gap-3 text-meta mb-4">
          <Link href="/" className="hover:text-accent">首页</Link>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary">模块 {String(meta.number).padStart(2, "0")}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">{meta.duration}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">{meta.level}</span>
        </div>
        <h1 className="text-h1 text-text-primary mb-3">
          {meta.title}
          <span className="ml-3 text-h3 font-mono text-text-muted">{meta.englishTitle}</span>
        </h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
          {meta.hook}
        </p>
      </header>

      {/* 内容 */}
      <div className="py-12 md:py-16">{children}</div>

      {/* 模块底:完成 + 跳转 */}
      <div className="border-t border-border py-12">
        <div className="rounded-2xl bg-bg-subtle p-6 md:p-8 mb-8">
          <h3 className="text-h3 text-text-primary mb-3">本模块完成</h3>
          <p className="text-text-secondary mb-5 leading-relaxed">
            如果你完成了上方的反思与互动,把这个模块标记为完成,顶部进度条会前进一步。
          </p>
          <Button
            onClick={() => markCompleted(meta.slug)}
            disabled={isCompleted}
            variant={isCompleted ? "secondary" : "primary"}
          >
            {isCompleted ? "✓ 已完成" : "标记本模块为完成"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {prev ? (
            <Link href={`/m/${prev.slug}`} className="flex-1">
              <div className="group rounded-xl border border-border p-5 hover:border-accent transition-colors h-full flex items-center gap-4">
                <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-accent shrink-0" />
                <div>
                  <div className="text-xs text-text-muted">上一模块</div>
                  <div className="font-medium text-text-primary">{prev.title}</div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link href={`/m/${next.slug}`} className="flex-1">
              <div className="group rounded-xl border border-border p-5 hover:border-accent transition-colors h-full flex items-center justify-end gap-4 text-right">
                <div>
                  <div className="text-xs text-text-muted">下一模块</div>
                  <div className="font-medium text-text-primary">{next.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent shrink-0" />
              </div>
            </Link>
          ) : (
            <Link href="/my" className="flex-1">
              <div className="group rounded-xl border border-accent/40 p-5 bg-accent/5 hover:border-accent transition-colors h-full flex items-center justify-end gap-4 text-right">
                <div>
                  <div className="text-xs text-accent">已学完七个模块</div>
                  <div className="font-medium text-text-primary">查看「我的清单」</div>
                </div>
                <ArrowRight className="w-5 h-5 text-accent shrink-0" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
