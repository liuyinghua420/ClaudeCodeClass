"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ProgressBar } from "@/components/layout/progress-bar";
import { MODULES } from "@/data/modules";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-border">
      <div className="max-w-content mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg font-semibold text-text-primary hover:text-accent transition-colors">
          人生算法
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/m/${m.slug}`}
              className="px-3 py-1.5 text-sm text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle transition-colors"
            >
              {m.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/library"
            className="hidden sm:inline-flex px-3 py-1.5 text-sm text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle transition-colors"
          >
            延伸阅读
          </Link>
          <Link
            href="/my"
            className="hidden sm:inline-flex px-3 py-1.5 text-sm text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle transition-colors"
          >
            我的清单
          </Link>
          <ThemeToggle />
          <button
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:bg-bg-subtle"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] border-t border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-1">
          {MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/m/${m.slug}`}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle transition-colors"
            >
              <span className="text-meta mr-2">{String(m.number).padStart(2, "0")}</span>
              {m.title}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            href="/library"
            onClick={() => setOpen(false)}
            className="px-3 py-2 text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle"
          >
            延伸阅读
          </Link>
          <Link
            href="/thinkers"
            onClick={() => setOpen(false)}
            className="px-3 py-2 text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle"
          >
            思想家
          </Link>
          <Link
            href="/my"
            onClick={() => setOpen(false)}
            className="px-3 py-2 text-text-secondary hover:text-accent rounded-md hover:bg-bg-subtle"
          >
            我的清单
          </Link>
        </nav>
      </div>

      <ProgressBar />
    </header>
  );
}
