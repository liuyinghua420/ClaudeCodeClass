import { cn } from "@/lib/utils";

export function Section({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-16", className)}>
      {title && (
        <div className="mb-6">
          <h2 className="text-h2 text-text-primary mb-2">{title}</h2>
          {subtitle && (
            <p className="text-text-secondary text-[0.95rem] leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}
      <div className="prose-content max-w-none">{children}</div>
    </section>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl md:text-2xl font-serif text-text-primary leading-relaxed mb-8 max-w-3xl">
      {children}
    </p>
  );
}

export function ToolLink({
  href,
  name,
  hint,
}: {
  href: string;
  name: string;
  hint: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 p-5 my-8 rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 hover:border-accent hover:bg-accent/10 transition-colors"
    >
      <div>
        <div className="text-xs uppercase tracking-wider text-accent mb-1 font-semibold">
          交互式小程序
        </div>
        <div className="text-h3 text-text-primary mb-1">→ {name}</div>
        <div className="text-sm text-text-secondary">{hint}</div>
      </div>
      <span className="text-accent text-2xl group-hover:translate-x-1 transition-transform">⟶</span>
    </a>
  );
}
