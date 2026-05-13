import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
  source?: string;
  guide?: string;
  initials?: string;
  accentColor?: string;
}

export function QuoteCard({
  quote,
  author,
  role,
  source,
  guide,
  initials,
  accentColor,
}: QuoteCardProps) {
  const initial = initials ?? author.slice(0, 2);
  return (
    <figure className="rounded-xl border border-border bg-bg-card p-6 md:p-8 my-8">
      <blockquote className="text-quote text-text-primary mb-6">
        "{quote}"
      </blockquote>
      <figcaption className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
          style={{ background: accentColor ?? "rgb(var(--accent))" }}
          aria-hidden
        >
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-text-primary">{author}</span>
          {role && <span className="text-sm text-text-muted">{role}</span>}
        </div>
        {source && (
          <span className="text-meta ml-auto hidden sm:inline">— {source}</span>
        )}
      </figcaption>
      {guide && (
        <p className={cn("text-sm text-text-secondary border-t border-border pt-4 leading-relaxed")}>
          <span className="font-semibold text-accent">编辑导读 · </span>
          {guide}
        </p>
      )}
    </figure>
  );
}
