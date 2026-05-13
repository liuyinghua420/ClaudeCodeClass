import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PATHS = [
  {
    question: "我现在面临一个重大选择",
    modules: ["decision", "choice", "risk"],
    moduleNames: ["决策", "选择", "风险"],
  },
  {
    question: "我感觉自己每天忙但没成长",
    modules: ["compounding", "long-term", "feedback"],
    moduleNames: ["复利", "长期主义", "反馈"],
  },
  {
    question: "我想理解自己为什么常做错决定",
    modules: ["cognition", "feedback"],
    moduleNames: ["认知", "反馈"],
  },
  {
    question: "我想搭建自己的决策框架",
    modules: ["decision", "feedback"],
    moduleNames: ["决策", "反馈"],
  },
  {
    question: "我刚刚做了一个错误决定",
    modules: ["feedback", "risk"],
    moduleNames: ["反馈", "风险"],
  },
];

export function PathByQuestion() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {PATHS.map((p, i) => (
        <Link
          key={i}
          href={`/m/${p.modules[0]}`}
          className="group flex items-center justify-between gap-4 p-5 rounded-xl border border-border bg-bg-card hover:border-accent transition-all"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-text-primary mb-1.5">{p.question}</p>
            <p className="text-xs text-text-muted">
              推荐路径:{" "}
              {p.moduleNames.map((n, idx) => (
                <span key={idx}>
                  <span className="text-text-secondary">{n}</span>
                  {idx < p.moduleNames.length - 1 && (
                    <span className="mx-1.5 text-text-muted">→</span>
                  )}
                </span>
              ))}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      ))}
    </div>
  );
}
