import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTool, type ToolMeta } from "@/data/tools";
import { Callout } from "@/components/ui/card";

export function ToolShell({
  toolSlug,
  children,
  showFinanceDisclaimer = false,
}: {
  toolSlug: string;
  children: React.ReactNode;
  showFinanceDisclaimer?: boolean;
}) {
  const meta = getTool(toolSlug);
  if (!meta) return null;
  return (
    <div className="max-w-content mx-auto px-4 md:px-8 pb-16">
      <div className="pt-8 md:pt-12">
        <Link
          href={`/m/${meta.moduleSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          回到所属模块
        </Link>
        <div className="text-meta uppercase tracking-[0.18em] text-accent mb-3 font-medium">
          交互式小程序
        </div>
        <h1 className="text-h1 text-text-primary mb-4">{meta.name}</h1>
        <p className="text-body text-text-secondary max-w-2xl leading-relaxed mb-3">
          {meta.description}
        </p>
        <p className="text-sm italic text-text-muted">
          目标洞察 · {meta.ahaMoment}
        </p>
      </div>

      <div className="mt-12">{children}</div>

      {showFinanceDisclaimer && (
        <Callout variant="warn">
          <strong>免责声明:</strong>
          本模拟器仅用于教育目的,不构成投资、理财或其他专业建议。
          任何决策请结合自身情况并咨询专业人士。
        </Callout>
      )}
    </div>
  );
}

export type { ToolMeta };
