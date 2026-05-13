import Link from "next/link";
import { notFound } from "next/navigation";
import { THINKERS, getThinker } from "@/data/thinkers";
import { MODULES } from "@/data/modules";
import { LIBRARY } from "@/data/library";
import { QuoteCard } from "@/components/ui/quote-card";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return THINKERS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getThinker(params.slug);
  if (!t) return {};
  return {
    title: `${t.name} — 人生算法 思想家专题`,
    description: t.oneLine,
  };
}

export default function ThinkerDetailPage({ params }: { params: { slug: string } }) {
  const thinker = getThinker(params.slug);
  if (!thinker) return notFound();

  const relatedModules = thinker.modules
    .map((slug) => MODULES.find((m) => m.slug === slug))
    .filter(Boolean);

  const relatedBooks = LIBRARY.filter(
    (item) => item.author === thinker.englishName || item.author === thinker.name
  );

  return (
    <div className="max-w-content mx-auto px-4 md:px-8 pb-16">
      <div className="pt-8">
        <Link
          href="/thinkers"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          所有思想家
        </Link>
      </div>

      <div className="pt-8 pb-10 border-b border-border flex flex-col md:flex-row md:items-center gap-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-semibold shrink-0"
          style={{ background: thinker.accent }}
        >
          {thinker.initials}
        </div>
        <div>
          <h1 className="text-h1 text-text-primary mb-1.5">
            {thinker.name}
            <span className="text-h3 font-mono text-text-muted ml-2">{thinker.englishName}</span>
          </h1>
          <p className="text-text-secondary mb-2">{thinker.role}</p>
          <p className="text-meta">{thinker.era}</p>
        </div>
      </div>

      <div className="my-10">
        <p className="text-quote text-text-primary max-w-2xl">{thinker.oneLine}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-h2 text-text-primary mb-5">核心思想</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {thinker.coreIdeas.map((idea, i) => (
            <div key={i} className="rounded-xl border border-border bg-bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="font-mono text-accent text-sm shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-text-primary leading-relaxed">{idea}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <QuoteCard
          quote={thinker.bestQuote.quote}
          author={thinker.name}
          role={thinker.role}
          source={thinker.bestQuote.source}
          initials={thinker.initials}
          accentColor={thinker.accent}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-h2 text-text-primary mb-5">代表作</h2>
        <ul className="space-y-2">
          {thinker.works.map((work, i) => (
            <li key={i} className="flex items-start gap-3 text-text-primary">
              <span className="text-accent">·</span>
              {work}
            </li>
          ))}
        </ul>
      </section>

      {relatedBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h2 text-text-primary mb-5">在我们的延伸阅读里</h2>
          <div className="space-y-3">
            {relatedBooks.map((book) => (
              <div key={book.id} className="rounded-xl border border-border bg-bg-card p-5">
                <h3 className="text-h3 text-text-primary mb-1">{book.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{book.hook}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-h2 text-text-primary mb-5">相关模块</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {relatedModules.map((m) =>
            m ? (
              <Link
                key={m.slug}
                href={`/m/${m.slug}`}
                className="group rounded-xl border border-border bg-bg-card p-5 hover:border-accent transition-colors"
              >
                <div className="text-meta mb-1.5">模块 {String(m.number).padStart(2, "0")}</div>
                <h3 className="text-h3 text-text-primary group-hover:text-accent transition-colors mb-1">
                  {m.title}
                </h3>
                <p className="text-sm text-text-secondary">{m.hook}</p>
              </Link>
            ) : null
          )}
        </div>
      </section>
    </div>
  );
}
