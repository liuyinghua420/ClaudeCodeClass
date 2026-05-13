import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hoverable = false,
}: {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-card p-6 transition-all duration-200",
        hoverable && "hover:border-accent hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ConceptCard({
  title,
  children,
  badge,
  className,
}: {
  title: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-h3 text-text-primary">{title}</h3>
        {badge && (
          <span className="text-xs px-2 py-1 rounded bg-bg-subtle text-text-secondary">
            {badge}
          </span>
        )}
      </div>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </Card>
  );
}

export function CompareCard({
  leftTitle,
  rightTitle,
  rows,
}: {
  leftTitle: string;
  rightTitle: string;
  rows: { dimension: string; left: string; right: string }[];
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-bg-subtle text-sm font-medium">
        <div className="p-3 text-text-secondary">维度</div>
        <div className="p-3 text-text-secondary border-l border-border">{leftTitle}</div>
        <div className="p-3 text-accent border-l border-border font-semibold">{rightTitle}</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-border text-[0.95rem]"
        >
          <div className="p-3 text-text-primary font-medium">{row.dimension}</div>
          <div className="p-3 text-text-secondary border-l border-border">{row.left}</div>
          <div className="p-3 text-text-primary border-l border-border">{row.right}</div>
        </div>
      ))}
    </div>
  );
}

export function Callout({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warn" | "insight";
}) {
  const styles = {
    info: "border-l-data-1 bg-data-1/5",
    warn: "border-l-warn bg-warn/5",
    insight: "border-l-accent bg-accent/5",
  };
  const labels = {
    info: "提示",
    warn: "警告",
    insight: "洞察",
  };
  return (
    <div className={cn("border-l-4 p-4 rounded-r-lg my-6", styles[variant])}>
      <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
        {labels[variant]}
      </div>
      <div className="text-text-primary leading-relaxed">{children}</div>
    </div>
  );
}
